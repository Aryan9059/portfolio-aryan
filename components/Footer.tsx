"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!footerRef.current) return;

      gsap.from(".appd-footer-item", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="appd-section py-14">
      <div className="appd-divider mb-8" />
      <div className="appd-panel flex flex-wrap items-center justify-between gap-4 px-6 py-5 text-sm text-white/65">
        <span className="appd-footer-item">Aryan Srivastava Portfolio</span>
        <span className="appd-footer-item">Building mobile-first experiences with craft and performance.</span>
      </div>
    </footer>
  );
};

export default Footer;
