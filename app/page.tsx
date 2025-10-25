"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // === 粒子アニメーション ===
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const numParticles = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: numParticles }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // グラデーション粒子
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 3);
        gradient.addColorStop(0, "rgba(56,189,248,0.8)");
        gradient.addColorStop(1, "rgba(56,189,248,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden text-gray-100 bg-[#05050a]">
      {/* 粒子背景 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* ホログラム風グラデーション層 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_70%),radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.15),transparent_60%)] animate-pulse" />

      {/* ホログラム線 */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(0,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(0,255,255,0.05) 50%, rgba(0,255,255,0.05) 75%, transparent 75%, transparent)",
          backgroundSize: "200px 200px",
          maskImage:
            "radial-gradient(circle at center, rgba(0,0,0,0.4), transparent 70%)",
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center py-44 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight tracking-tight"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 drop-shadow-[0_0_25px_rgba(56,189,248,0.7)]">
            STUDENT
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-cyan-300">
            HOLOGRAPHIC PORTFOLIO
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed"
        >
          フロントエンド × AI × 画像処理の融合。<br />
          「見える未来」をコードで創り出すエンジニア。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button className="px-8 py-5 text-lg rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] hover:scale-105 transition-all duration-300">
            プロジェクトを見る
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* 下部発光ライン */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent animate-pulse" />

      {/* Tech Section */}
      <section className="py-32 relative z-10 bg-transparent border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            使用している主な技術
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Next.js",
                desc: "App Router構成で高速なSSR・SSGを実現。モダンで未来志向なWeb開発を支えます。",
              },
              {
                title: "TypeScript",
                desc: "型安全な開発で高品質と信頼性を両立。堅牢なフロントエンドを構築します。",
              },
              {
                title: "Tailwind CSS",
                desc: "統一感あるデザインとスピード開発。洗練されたUIを直感的に構築可能。",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="p-10 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(56,189,248,0.1)] hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
                  {f.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section className="py-32 relative z-10 border-t border-white/10 bg-gradient-to-b from-transparent to-[#0a0f1c]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400"
          >
            制作実績
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "ARマーカー認識アプリ",
                desc: "OpenCVでARマーカーを検出し、3Dモデルを描画するPythonアプリ。",
                tech: ["Python", "OpenCV", "NumPy"],
              },
              {
                title: "ポートフォリオサイト",
                desc: "Next.js × Tailwind × Motionで構築した未来的ポートフォリオ。",
                tech: ["Next.js", "TypeScript", "Framer Motion"],
              },
              {
                title: "ToDo管理Webアプリ",
                desc: "React＋Expressで作成したシンプルで美しいタスク管理アプリ。",
                tech: ["React", "Node.js", "MongoDB"],
              },
            ].map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-3 text-cyan-400">
                  {w.title}
                </h3>
                <p className="text-gray-300 mb-4">{w.desc}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {w.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-sm bg-cyan-400/20 text-cyan-300 rounded-full border border-cyan-400/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
