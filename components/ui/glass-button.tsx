"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

type GlassButtonSize = "sm" | "default" | "lg" | "icon";
type GlassButtonVariant = "default" | "accent" | "ghost";

const sizeClasses: Record<GlassButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  default: "px-7 py-3.5 text-sm sm:text-[15px]",
  lg: "px-9 py-4 text-base",
  icon: "flex h-11 w-11 items-center justify-center",
};

const glassConfig: Record<
  GlassButtonVariant,
  {
    bgTop: string;
    bgBottom: string;
    border: string;
    borderBottom: string;
    glow: string;
    glowBlur: string;
    shimmer: string;
  }
> = {
  default: {
    bgTop: "rgba(109, 40, 217, 0.16)",
    bgBottom: "rgba(59, 130, 246, 0.06)",
    border: "rgba(196, 181, 253, 0.28)",
    borderBottom: "rgba(96, 165, 250, 0.12)",
    glow: "radial-gradient(ellipse at center, rgba(129, 140, 248, 0.2) 0%, transparent 72%)",
    glowBlur: "blur(16px)",
    shimmer: "rgba(224, 231, 255, 0.18)",
  },
  accent: {
    bgTop: "rgba(34, 211, 238, 0.2)",
    bgBottom: "rgba(14, 165, 233, 0.07)",
    border: "rgba(165, 243, 252, 0.34)",
    borderBottom: "rgba(6, 182, 212, 0.16)",
    glow: "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.24) 0%, transparent 72%)",
    glowBlur: "blur(18px)",
    shimmer: "rgba(207, 250, 254, 0.22)",
  },
  ghost: {
    bgTop: "rgba(255,255,255,0.05)",
    bgBottom: "rgba(255,255,255,0.014)",
    border: "rgba(255,255,255,0.18)",
    borderBottom: "rgba(255,255,255,0.05)",
    glow: "radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, transparent 70%)",
    glowBlur: "blur(10px)",
    shimmer: "rgba(255,255,255,0.12)",
  },
};

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: GlassButtonSize;
  variant?: GlassButtonVariant;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    { className, children, size = "default", variant = "default", onMouseMove, onMouseEnter, onMouseLeave, onPointerDown, onPointerUp, ...props },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const springX = useSpring(rawX, { stiffness: 280, damping: 28 });
    const springY = useSpring(rawY, { stiffness: 280, damping: 28 });
    const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
    const shimmerX = useMotionValue(-100);
    const shimmerOpacity = useMotionValue(0);
    const [pressed, setPressed] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);
    const [ripples, setRipples] = React.useState<
      { id: number; x: number; y: number }[]
    >([]);
    const rippleCounter = React.useRef(0);
    const cfg = glassConfig[variant];

    const setRefs = (node: HTMLButtonElement | null) => {
      buttonRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      const el = buttonRef.current;
      if (!el) return;

      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (event.clientX - left) / width - 0.5;
      const y = (event.clientY - top) / height - 0.5;

      rawX.set(x);
      rawY.set(y);
      shimmerX.set(((event.clientX - left) / width) * 100);
      onMouseMove?.(event);
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
      setHovered(true);
      shimmerOpacity.set(1);
      onMouseEnter?.(event);
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
      setHovered(false);
      rawX.set(0);
      rawY.set(0);
      shimmerOpacity.set(0);
      onMouseLeave?.(event);
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
      setPressed(true);
      const el = buttonRef.current;
      if (el) {
        const { left, top } = el.getBoundingClientRect();
        const id = rippleCounter.current++;
        setRipples((current) => [
          ...current,
          { id, x: event.clientX - left, y: event.clientY - top },
        ]);
        window.setTimeout(() => {
          setRipples((current) => current.filter((ripple) => ripple.id !== id));
        }, 700);
      }
      onPointerDown?.(event);
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
      setPressed(false);
      onPointerUp?.(event);
    };

    return (
      <motion.div
        className="relative inline-flex [perspective:900px]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 360, damping: 30 }}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-4 rounded-full"
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: cfg.glow, filter: cfg.glowBlur }}
        />

        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-5 -bottom-3 h-4 rounded-full"
          animate={hovered ? { opacity: 0.48, scaleX: 1 } : { opacity: 0.22, scaleX: 0.84 }}
          transition={{ duration: 0.3 }}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.56) 0%, transparent 78%)",
            filter: "blur(7px)",
          }}
        />

        <motion.button
          ref={setRefs}
          className={cn(
            "group relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-sans font-medium tracking-[0.01em] text-[--glass-btn-text] outline-none select-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 disabled:pointer-events-none disabled:opacity-55",
            sizeClasses[size],
            className
          )}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setPressed(false)}
          animate={pressed ? { y: 2 } : { y: 0 }}
          transition={{ type: "spring", stiffness: 600, damping: 34 }}
          style={{
            background: pressed
              ? "linear-gradient(170deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 100%)"
              : `linear-gradient(170deg, ${cfg.bgTop} 0%, ${cfg.bgBottom} 100%)`,
            backdropFilter: "blur(12px) saturate(155%)",
            WebkitBackdropFilter: "blur(12px) saturate(155%)",
            border: "1px solid transparent",
            backgroundClip: "padding-box",
            boxShadow: pressed
              ? [
                  "0 1px 3px rgba(0,0,0,0.5)",
                  "inset 0 2px 8px rgba(0,0,0,0.32)",
                  `inset 0 0 0 1px ${cfg.borderBottom}`,
                ].join(", ")
              : [
                  "0 10px 30px rgba(0,0,0,0.28)",
                  `0 1px 0 ${cfg.border} inset`,
                  `0 -1px 0 ${cfg.borderBottom} inset`,
                  `1px 0 0 ${cfg.borderBottom} inset`,
                  `-1px 0 0 ${cfg.borderBottom} inset`,
                ].join(", "),
            transformStyle: "preserve-3d",
          }}
          {...(props as React.ComponentProps<typeof motion.button>)}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.012) 42%, rgba(255,255,255,0) 72%)",
              opacity: pressed ? 0.35 : 1,
            }}
          />

          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-0 h-px rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${cfg.border} 40%, ${cfg.border} 60%, transparent 100%)`,
              opacity: pressed ? 0.3 : 1,
            }}
          />

          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
            style={{ opacity: shimmerOpacity }}
          >
            <motion.span
              className="absolute inset-0"
              style={{
                background: useTransform(
                  shimmerX,
                  (value) =>
                    `radial-gradient(circle 92px at ${value}% 42%, ${cfg.shimmer} 0%, transparent 66%)`
                ),
              }}
            />
          </motion.span>

          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
          >
            {ripples.map(({ id, x, y }) => (
              <motion.span
                key={id}
                className="absolute rounded-full bg-white/20"
                style={{ left: x - 4, top: y - 4, width: 8, height: 8 }}
                initial={{ scale: 0, opacity: 0.7 }}
                animate={{ scale: 12, opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />
            ))}
          </span>

          <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
        </motion.button>
      </motion.div>
    );
  }
);

GlassButton.displayName = "GlassButton";

export { GlassButton };
