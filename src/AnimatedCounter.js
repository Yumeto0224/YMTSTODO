import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedCounter({ value }) {
  const motionValue = useMotionValue(value);
  const rounded = useTransform(motionValue, latest => Math.round(latest));

  useEffect(() => {
    // valueが変わった時だけアニメーションする
    const controls = animate(motionValue, value, {
      duration: 0.4,
      ease: "easeOut",
    });

    return controls.stop; // クリーンアップ
  }, [value, motionValue]);

  return <motion.span>{rounded}</motion.span>;
}
