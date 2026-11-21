"use client";

import { useEffect } from "react";

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export default function AdSense() {
  useEffect(() => {
    if (!CLIENT) return;
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem("ebay-cal:consent") !== "accepted") return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  return null;
}