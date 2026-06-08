"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function CountUp({ end, duration = 2, suffix = "" }) {
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
  });
  
  const display = useTransform(spring, (current) => 
    Math.round(current).toLocaleString() + suffix
  );

  useEffect(() => {
    spring.set(end);
  }, [end, spring]);

  return <motion.span style={{ display: "inline-block" }}>{display}</motion.span>;
}
