import { useState, useEffect, useRef, useCallback } from "react";

export default function useVoice(wakeWord = "jarvis") {
    const [isListening, setIsListening] = useState(false);
    const [command, setCommand] = useState("");
    const recogRef = useRef(null);
    const errorCooldownRef = useRef(false);
    const restartTimeoutRef = useRef(null);
    const processedIndexRef = useRef(-1);
    const wakeWordRef = useRef(wakeWord);

    // Keep wakeWordRef in sync without re-initialising recognition
    useEffect(() => {
        wakeWordRef.current = wakeWord.toLowerCase();
    }, [wakeWord]);

    // Initialise recognition only once
    useEffect(() => {
        const hasSR =
            "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
        if (!hasSR) {
            console.warn("SpeechRecognition not supported in this browser.");
            return;
        }
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recogRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
            if (!errorCooldownRef.current) {
                restartRecognition();
            }
        };

        recognition.onerror = (event) => {
            if (event.error === "no-speech") {
                errorCooldownRef.current = true;
                safeStop();
                restartAfterDelay(1000);
                return;
            }
            console.error("Speech recognition error:", event.error);
            if (event.error === "network") {
                errorCooldownRef.current = true;
                safeStop();
                restartAfterDelay(5000);
            }
            if (event.error === "audio-capture") {
                errorCooldownRef.current = true;
                safeStop();
                restartAfterDelay(1500);
            }
        };

        recognition.onresult = (event) => {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    // Only process each result index once (global — never reset)
                    if (i <= processedIndexRef.current) continue;
                    processedIndexRef.current = i;

                    const raw = event.results[i][0].transcript;
                    const text = raw.toLowerCase().trim();
                    console.log("Heard final transcript at index", i, ":", text);

                    const ww = wakeWordRef.current;
                    if (text.includes(ww)) {
                        const userCommand = text.replace(ww, "").trim();
                        if (userCommand) {
                            setCommand(userCommand);
                        }
                    }
                }
            }
        };

        const safeStop = () => {
            try { recognition.stop(); } catch (_) {}
        };

        const restartRecognition = () => {
            clearTimeout(restartTimeoutRef.current);
            try {
                recognition.start();
            } catch {
                restartAfterDelay(500);
            }
        };

        function restartAfterDelay(ms) {
            clearTimeout(restartTimeoutRef.current);
            restartTimeoutRef.current = setTimeout(() => {
                errorCooldownRef.current = false;
                restartRecognition();
            }, ms);
        }

        recognition.start();

        return () => {
            clearTimeout(restartTimeoutRef.current);
            recognition.onstart = null;
            recognition.onend = null;
            recognition.onerror = null;
            recognition.onresult = null;
            safeStop();
        };
    }, []); // ← empty deps: only init once

    const speak = useCallback((text) => {
        if (!text) return;
        const synth = window.speechSynthesis;
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.pitch = 1;
        utterance.rate = 1;
        synth.speak(utterance);
    }, []);

    const resetCommand = useCallback(() => {
        setCommand("");
    }, []);

    return { isListening, command, resetCommand, speak };
}
