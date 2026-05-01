"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightRays from "./ui/LightRays";

gsap.registerPlugin(ScrollTrigger);

interface CardPosition {
  x: number;
  y: number;
}

const PROJECTS = [
  { id: 1, title: "Featured Projects", subtitle: "", image: "" },
  { id: 2, title: "Phi Launcher", subtitle: "Minimal. Focused. Elegant", image: "/appd/icons/phi_launcher.png" },
  { id: 3, title: "Hype.pass", subtitle: "Passwords. Made. Secure", image: "/appd/icons/hypepass.png" },
  { id: 4, title: "Fizanto Fuzz", subtitle: "Chat & Connect with Fizantians", image: "/appd/icons/fizanto_fuzz.png" },
  { id: 5, title: "FSC", subtitle: "Play across your Limits", image: "/appd/icons/fsc.png" },
  { id: 6, title: "Huddle", subtitle: "Tasks done right", image: "/appd/icons/huddle.png" },
];

const FLOATING_BACKGROUND_IMAGES = [
  "/icons/phi_launcher.png",
  "/icons/hypepass.png",
  "/icons/fizanto_fuzz.png",
  "/icons/fsc.png",
  "/icons/huddle.png",
];

const FEATURED_CARD_POS_SMALL: CardPosition[] = [
  { y: 100, x: 1000 },
  { y: 1250, x: 1950 },
  { y: 1500, x: 850 },
  { y: 200, x: 2100 },
  { y: 250, x: 600 },
  { y: 1100, x: 1650 },
  { y: 1000, x: 800 },
  { y: 900, x: 2200 },
];

const FEATURED_CARD_POS_LARGE: CardPosition[] = [
  { y: 800, x: 5000 },
  { y: 240, x: 4450 },
  { y: 1200, x: 3450 },
  { y: 500, x: 2200 },
  { y: 750, x: 1100 },
  { y: 1850, x: 3350 },
  { y: 2200, x: 1300 },
  { y: 3000, x: 1950 },
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const indicatorContainerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const featuredImgCardsRef = useRef<NodeListOf<HTMLElement> | null>(null);

  const initAnimations = useCallback(() => {
    if (window.innerWidth <= 1000) {
      scrollTriggerRef.current?.kill();
      ScrollTrigger.getById("featured-work-trigger")?.kill();
      scrollTriggerRef.current = null;
      return;
    }

    scrollTriggerRef.current?.kill();
    scrollTriggerRef.current = null;
    ScrollTrigger.getById("featured-work-trigger")?.kill();

    const featuredCardPos =
      window.innerWidth >= 1600 ? FEATURED_CARD_POS_LARGE : FEATURED_CARD_POS_SMALL;

    if (!imagesContainerRef.current) return;
    imagesContainerRef.current.innerHTML = "";

    FLOATING_BACKGROUND_IMAGES.forEach((imageSrc, i) => {
      const featuredImgCard = document.createElement("div");
      featuredImgCard.className = `
        featured-img-card featured-img-card-${i}
        absolute w-80 h-80 md:w-96 md:h-96
        rounded-3xl overflow-hidden
        bg-white/5 border border-white/10
        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        backdrop-blur-xl
      `;

      const img = document.createElement("img");
      img.src = imageSrc;
      img.alt = "Project";
      img.className = `
        absolute inset-0
        w-full h-full
        object-cover
        scale-105
      `;

      const overlay = document.createElement("div");
      overlay.className = `
        absolute inset-0
        bg-gradient-to-t
        from-black/80 via-black/40 to-transparent
      `;

      const textContainer = document.createElement("div");
      textContainer.className = `
        absolute bottom-6 left-6 right-6
        text-white z-10
      `;

      const project = PROJECTS[(i % (PROJECTS.length - 1)) + 1];

      const title = document.createElement("h3");
      title.textContent = project.title;
      title.className = "text-lg font-semibold tracking-wide";

      const subtitle = document.createElement("p");
      subtitle.textContent = project.subtitle;
      subtitle.className = "text-sm text-gray-300 mt-1";

      textContainer.appendChild(title);
      textContainer.appendChild(subtitle);

      featuredImgCard.appendChild(img);
      featuredImgCard.appendChild(overlay);
      featuredImgCard.appendChild(textContainer);

      const position = featuredCardPos[i];

      gsap.set(featuredImgCard, {
        x: position.x,
        y: position.y,
        z: -1500,
        scale: 0,
      });

      imagesContainerRef.current.appendChild(featuredImgCard);
    });

    featuredImgCardsRef.current =
      sectionRef.current?.querySelectorAll(".featured-img-card") ?? null;

    scrollTriggerRef.current = ScrollTrigger.create({
      id: "featured-work-trigger",
      trigger: sectionRef.current,
      start: "top top",
      end: () =>
        `+=${window.innerHeight * (FLOATING_BACKGROUND_IMAGES.length * 0.45)}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        featuredImgCardsRef.current?.forEach((card, index) => {
          const staggerOffset = index * 0.075;
          const scaledProgress = (self.progress - staggerOffset) * 2;
          const individualProgress = Math.max(0, Math.min(1, scaledProgress));

          const newZ = -1500 + 3000 * individualProgress;
          const scale = Math.min(1, individualProgress * 10);

          gsap.set(card, {
            z: newZ,
            scale,
            boxShadow: `0 30px 80px rgba(0,0,0,${
              0.3 + individualProgress * 0.4
            })`,
          });
        });
      },
    });
  }, []);

  useEffect(() => {
    initAnimations();
    window.addEventListener("resize", initAnimations);
    return () => {
      window.removeEventListener("resize", initAnimations);
      scrollTriggerRef.current?.kill();
      ScrollTrigger.getById("featured-work-trigger")?.kill();
      scrollTriggerRef.current = null;
    };
  }, [initAnimations]);

  return (
    <section
      ref={sectionRef}
      className="featured-work appd-section relative min-h-screen overflow-hidden py-0"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 z-0 opacity-35">
          <LightRays
            raysOrigin="top-center"
            raysColor="#52d3ff"
            raysSpeed={0.8}
            lightSpread={1.2}
            rayLength={1.6}
            fadeDistance={1.1}
            saturation={1}
            followMouse={true}
            mouseInfluence={0.06}
            noiseAmount={0.02}
            distortion={0.05}
            className="h-full w-full z-0"
          />
        </div>
        <div className="absolute left-12 top-14 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-8 top-1/3 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="absolute left-1/2 top-14 z-10 w-full max-w-5xl -translate-x-1/2 text-center pointer-events-none">
        <p className="appd-kicker">Featured Work</p>
      </div>

      <div
        ref={imagesContainerRef}
        className="absolute left-1/2 top-1/2 h-[200vh] w-[200vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          perspective: "500px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      />

      <div
        ref={indicatorContainerRef}
        className="absolute top-1/2 right-8 -translate-y-1/2 w-6 flex flex-col gap-2 items-center"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      />
    </section>
  );
}
