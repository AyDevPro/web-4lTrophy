"use client";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

export default function ScrollSync() {
  const setScroll = useAppStore((s) => s.setScroll);
  const setMouse = useAppStore((s) => s.setMouse);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY || 0);
    const onMove = (e: MouseEvent) =>
      setMouse({ x: e.clientX / window.innerWidth, y: 1 - e.clientY / window.innerHeight });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, [setScroll, setMouse]);
  return null;
}
