import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Use MotionValues for high performance without triggering React re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Use Springs for smooth trailing effect
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const dotSmoothX = useSpring(mouseX, { damping: 25, stiffness: 400, mass: 0.1 });
  const dotSmoothY = useSpring(mouseY, { damping: 25, stiffness: 400, mass: 0.1 });

  useEffect(() => {
    setMounted(true);
    
    // Only show custom cursor on non-touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setIsVisible(true);
      document.documentElement.style.cursor = 'none'; // Hide native cursor dynamically
    }

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName?.toLowerCase() === 'a' ||
        target.tagName?.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const attachListeners = () => {
      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mouseover', handleMouseOver);
    };

    const detachListeners = () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };

    attachListeners();

    // Listen for Astro view transitions to re-apply cursor hiding and listeners if needed
    document.addEventListener('astro:page-load', () => {
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.documentElement.style.cursor = 'none';
      }
    });

    return () => {
      detachListeners();
      document.documentElement.style.cursor = 'auto'; // Restore cursor on unmount
    };
  }, [mouseX, mouseY]);

  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotSmoothX,
          y: dotSmoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
      
      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-blue-400 rounded-full pointer-events-none z-[9998]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      />
    </>
  );
};

