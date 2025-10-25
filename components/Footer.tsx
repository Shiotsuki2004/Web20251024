"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // === 粒子アニメーション ===
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const numParticles = 40;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: numParticles }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
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

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 2);
        gradient.addColorStop(0, "rgba(56,189,248,0.6)");
        gradient.addColorStop(1, "rgba(56,189,248,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <footer className="relative py-10 text-center border-t border-cyan-400/20 bg-[#05050a] overflow-hidden">
      {/* 粒子キャンバス */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 光のグリッド */}
      <motion.div
        className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(56,189,248,0.05) 0 1px,transparent 1px 20px),repeating-linear-gradient(90deg,rgba(147,51,234,0.05) 0 1px,transparent 1px 20px)] pointer-events-none"
        animate={{ backgroundPosition: ["0 0", "100px 100px"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* メインテキスト */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-sm text-gray-400"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">
          © {new Date().getFullYear()} STUDENT Holographic Portfolio
        </span>
        <br />
        <span className="text-xs text-gray-500">
          Crafted with passion — Frontend × AI × Vision
        </span>
      </motion.p>

      {/* 底部発光ライン */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
        animate={{ scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </footer>
  );
}



// export default function Footer(){
//     return(
//         <footer className="py-10 text-center text-gray-500 border-t border-gray-100">
//             <p className="text-sm">
//                 © {new Date().getFullYear()} Modern Web Project. All rights reserved.
//             </p>
//         </footer>
//             );
// }