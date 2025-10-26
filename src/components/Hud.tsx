"use client";
import { useEffect, useState } from "react";

export default function Hud() {
  const [hint, setHint] = useState("Bouge la souris — scroll pour accélérer");
  useEffect(() => {
    const t = setTimeout(() => setHint("Astuce: préfère un trackpad/souris pour profiter des particules"), 4000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="absolute inset-x-0 top-4 flex justify-center pointer-events-none">
      <div className="px-4 py-2 rounded-xl bg-black/40 text-white text-sm backdrop-blur">
        {hint}
      </div>
    </div>
  );
}
