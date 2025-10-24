"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
        >
          モダンで美しいWebを、
          <span className="text-blue-600">Next.js</span>で。
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10"
        >
          TypeScriptとTailwind CSSを使って、スピーディかつ美しいモダンサイトを構築します。
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button className="px-6 py-4 text-lg rounded-2xl shadow-md hover:shadow-lg">
            はじめる
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "TypeScript",
              desc: "型安全で保守性の高い開発を実現します。",
            },
            {
              title: "Tailwind CSS",
              desc: "デザインと開発をシームレスに。洗練されたUIを素早く構築。",
            },
            {
              title: "Next.js",
              desc: "最新のApp Router構成で高速なSSR・SSGを実現。",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 border-t border-gray-100">
        <p className="text-sm">
          © {new Date().getFullYear()} Modern Web Project. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
