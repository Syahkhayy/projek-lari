"use client";

import { useState, useEffect, useRef } from "react";
import "./Mascot.css";

const MESSAGES = [
  "Slow and steady...",
  "Shell-o!",
  "Is it snack time?",
  "I'm not slow, I'm efficient.",
  "Nice pace!",
  "Can you carry me?",
  "Wheeee!",
];

export default function Mascot() {
  const [pos, setPos] = useState({ x: 100, y: 0 });
  const [vel, setVel] = useState({ x: 0.5, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  
  const requestRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(null);

  // Constants
  const GRAVITY = 0.5;
  const FRICTION = 0.98;
  const GROUND_Y = typeof window !== "undefined" ? window.innerHeight - 100 : 500;

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setVel({ x: 0, y: 0 });
    setMessage("HEY! Put me down! 🐢");
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      setPos({
        x: clientX - 40,
        y: clientY - 40
      });
      
      // Flip based on movement while dragging
      if (Math.abs(clientX - pos.x) > 1) {
        setIsFlipped(clientX < pos.x);
      }
    };

    const handleEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        setTimeout(() => setMessage(""), 2000);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, pos.x]);

  const animate = (time: number) => {
    if (lastTimeRef.current !== undefined && !isDragging) {
      setPos((prev) => {
        let newX = prev.x + vel.x;
        let newY = prev.y + vel.y;
        let newVelY = vel.y + GRAVITY;
        let newVelX = vel.x;

        // Collision with floor
        if (newY >= GROUND_Y) {
          newY = GROUND_Y;
          newVelY = 0;
          
          // Slow walking logic when on ground
          if (Math.abs(newVelX) < 0.1) {
             newVelX = Math.random() > 0.5 ? 0.4 : -0.4;
          }
          newVelX *= FRICTION;
        }

        // Screen boundaries
        if (newX < 0 || newX > window.innerWidth - 80) {
          newVelX *= -1;
          newX = Math.max(0, Math.min(newX, window.innerWidth - 80));
        }

        setVel({ x: newVelX, y: newVelY });
        setIsFlipped(newVelX < 0);
        return { x: newX, y: newY };
      });
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [isDragging, vel]);

  // Periodic random messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && Math.random() > 0.8) {
        setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
        setTimeout(() => setMessage(""), 3000);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isDragging]);

  return (
    <div
      className={`mascot-container ${isDragging ? "is-dragging" : ""}`}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      style={{
        left: 0,
        top: 0,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    >
      {message && <div className="speech-bubble">{message}</div>}
      <img
        src="/mascot.png"
        alt="Turtle Mascot"
        className={`mascot-sprite ${isFlipped ? "turtle-flipped" : ""}`}
        draggable={false}
      />
    </div>
  );
}
