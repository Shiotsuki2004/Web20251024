import { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

// type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
//   variant?: "primary" | "secondary" | "outline";
//   size?: "sm" | "md" | "lg";
// };

type ButtonProps = React.ComponentProps<typeof motion.button> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
};


/**
 * モダンでアニメーション付きのボタン
 * Tailwind + Framer Motion + TypeScript対応
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.03 }}
      className={clsx(baseStyle, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
