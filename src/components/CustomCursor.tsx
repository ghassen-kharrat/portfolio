import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    addEventListeners();
    handleLinkHoverEvents();
    return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseenter", onMouseEnter);
    document.removeEventListener("mouseleave", onMouseLeave);
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const onMouseDown = () => {
    setClicked(true);
  };

  const onMouseUp = () => {
    setClicked(false);
  };

  const onMouseLeave = () => {
    setHidden(true);
  };

  const onMouseEnter = () => {
    setHidden(false);
  };

  const handleLinkHoverEvents = () => {
    document.querySelectorAll("a, button, [role=button], input[type=submit]").forEach(el => {
      el.addEventListener("mouseover", () => setLinkHovered(true));
      el.addEventListener("mouseout", () => setLinkHovered(false));
    });
  };

  const cursorVariants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(100, 255, 218, 0.1)",
      mixBlendMode: "difference" as const,
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(100, 255, 218, 0.25)",
      mixBlendMode: "difference" as const,
    },
    link: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(100, 255, 218, 0.3)",
      mixBlendMode: "difference" as const,
    },
  };

  const dotVariants = {
    default: {
      x: position.x - 4,
      y: position.y - 4,
      height: 8,
      width: 8,
      backgroundColor: "#64ffda",
    },
    clicked: {
      x: position.x - 3,
      y: position.y - 3,
      height: 6,
      width: 6,
      backgroundColor: "#64ffda",
    },
    link: {
      x: position.x - 5,
      y: position.y - 5,
      height: 10,
      width: 10,
      backgroundColor: "#64ffda",
    },
  };

  return (
    <>
      <motion.div 
        className="custom-cursor-outer fixed top-0 left-0 rounded-full border border-primary pointer-events-none z-50"
        variants={cursorVariants}
        animate={
          hidden 
            ? { opacity: 0 } 
            : clicked 
              ? "clicked" 
              : linkHovered 
                ? "link" 
                : "default"
        }
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.8,
        }}
      />
      <motion.div
        className="custom-cursor-inner fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={dotVariants}
        animate={
          hidden 
            ? { opacity: 0 } 
            : clicked 
              ? "clicked" 
              : linkHovered 
                ? "link" 
                : "default"
        }
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 25,
        }}
      />
    </>
  );
};

export default CustomCursor; 