import React, { useEffect, useRef } from "react";

export default function WebGLShaderWaveform() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeObserver;
    let animationFrameId;

    const syncSize = () => {
      const w = canvas.clientWidth || 800;
      const h = canvas.clientHeight || 256;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
          vec2 uv = (v_texCoord - 0.5) * 2.0;
          uv.x *= u_resolution.x / u_resolution.y;
          
          float dist = length(uv);
          
          // Waveform modulation (breathing, minimal pulse)
          float angle = atan(uv.y, uv.x);
          
          // Double sine wave waves
          float wave1 = 0.035 * sin(angle * 8.0 + u_time * 2.2) * sin(u_time * 0.7);
          float wave2 = 0.018 * sin(angle * 14.0 - u_time * 3.5) * cos(u_time * 0.4);
          float wave = wave1 + wave2;
          
          // Pulse band
          float pulse = smoothstep(0.45 + wave, 0.44 + wave, dist) - smoothstep(0.435 + wave, 0.42 + wave, dist);
          
          // Additional secondary inner ring
          float waveInner = 0.012 * cos(angle * 6.0 - u_time * 1.3);
          float pulseInner = smoothstep(0.35 + waveInner, 0.345 + waveInner, dist) - smoothstep(0.34 + waveInner, 0.33 + waveInner, dist);
          
          // Core glow inside the circle
          float core = smoothstep(0.38, 0.0, dist) * 0.18;
          
          // Original Stitch colors: Monochromatic Warm White & Silver
          vec3 warmWhite = vec3(0.91, 0.91, 0.91); // Warm white
          vec3 silver = vec3(0.77, 0.77, 0.78);    // Silver/Light gray
          
          // Interpolate colors along the circular path
          vec3 color = mix(warmWhite, silver, sin(angle + u_time) * 0.5 + 0.5);
          
          // Glow intensity
          float intensity = pulse * 1.1 + pulseInner * 0.6 + core;
          
          gl_FragColor = vec4(color * intensity, intensity * 0.85);
      }
    `;

    const cs = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
      }
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = (t) => {
      if (typeof ResizeObserver === "undefined") syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block rounded-xl"
      style={{ background: "transparent" }}
    />
  );
}
