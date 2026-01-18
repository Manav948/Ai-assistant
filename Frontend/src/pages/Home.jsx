import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bot from "../assets/home.png";

const features = [
  {
    title: "Smart Conversations",
    desc: "Ask questions, get instant answers, and have natural conversations powered by AI.",
  },
  {
    title: "Task Automation",
    desc: "Let the assistant handle reminders, notes, and repetitive daily tasks.",
  },
  {
    title: "Always Available",
    desc: "Your assistant works 24/7 so you never miss anything important.",
  },
];

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(125%_125%_at_50%_10%,#0f0c29_30%,#302b63_70%,#24243e_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[length:14px_24px]" />

      {/* hero */}
      <section className="flex min-h-screen flex-col md:flex-row items-center justify-between px-8 md:px-20 gap-12">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 mt-28 md:mt-0"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Your Virtual Assistant <br />
            <span className="text-cyan-400">Smarter. Faster. Easier.</span>
          </h1>

          <p className="text-gray-300 mb-8 text-lg max-w-xl">
            Let our intelligent assistant help you streamline your daily tasks,
            manage information, and boost productivity with ease.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/30"
            >
              Get Started
            </Link>

            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition"
            >
              Live Demo
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <video
            src="/video-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-80 md:w-[420px] rounded-2xl
               drop-shadow-[0_0_30px_#00ffe7]
               border border-white/10"
          />
        </motion.div>
      </section>

      {/* features */}
      <section className="px-8 md:px-20 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-14"
        >
          Why Choose Our Assistant?
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-cyan-400/40 transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* image */}
      <section className="px-8 md:px-20 py-28">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="absolute -inset-4 rounded-full bg-cyan-400/20 blur-3xl" />

            <img
              src="/ai-img.png"
              alt="AI Dashboard Preview"
              className="relative w-[320px] md:w-[420px] rounded-2xl border border-white/10 shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Designed for <span className="text-cyan-400">Productivity</span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              A clean, distraction-free interface that helps you focus on what matters.
              Chat naturally, manage tasks effortlessly, and stay organized—all in one place.
            </p>

            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Modern & minimal UI
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Fast AI-powered responses
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Works seamlessly across devices
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="px-8 md:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple. Powerful. Intelligent.
          </h2>
          <p className="text-gray-300 text-lg">
            Sign up, start chatting, and let the assistant handle the rest.
            No setup. No learning curve. Just results.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-20 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-12 text-center backdrop-blur-xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to experience the future?
          </h3>
          <p className="text-gray-300 mb-8">
            Start using your personal AI assistant today.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/40"
          >
            Create Free Account
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
