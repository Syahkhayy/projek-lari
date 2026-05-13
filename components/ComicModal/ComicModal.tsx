"use client";

import { useState } from "react";
import "./ComicModal.css";

interface ComicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComicModal({ isOpen, onClose }: ComicModalProps) {
  const [step, setStep] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<'next' | 'prev'>('next');

  if (!isOpen) return null;

  const handlePageChange = (newStep: number, dir: 'next' | 'prev') => {
    if (isFlipping || newStep === step) return;
    
    setFlipDir(dir);
    setIsFlipping(true);
    
    // Swap image at the "peak" of the flip (middle of animation)
    setTimeout(() => {
      setStep(newStep);
    }, 400);

    // Reset flipping state after animation ends
    setTimeout(() => {
      setIsFlipping(false);
    }, 800);
  };

  const nextStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (step < 4) {
      handlePageChange(step + 1, 'next');
    } else {
      onClose();
    }
  };

  const prevStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (step > 1) {
      handlePageChange(step - 1, 'prev');
    }
  };

  const comicPages = [
    { src: "/comic1.png", alt: "Chapter 1: The Chosen One" },
    { src: "/comic-placeholder.png", alt: "Chapter 2: Coming Soon" },
    { src: "/comic-placeholder.png", alt: "Chapter 3: Coming Soon" },
    { src: "/comic-placeholder.png", alt: "Chapter 4: Coming Soon" }
  ];

  const currentComic = comicPages[step - 1];

  return (
    <div className="comic-modal-overlay" onClick={onClose}>
      <div className="comic-modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="comic-close-btn">×</button>
        
        <div className="comic-fullscreen-viewer">
          <div className={`comic-page-wrapper ${isFlipping ? `flipping-${flipDir}` : ""}`}>
             <img src={currentComic.src} alt={currentComic.alt} className="comic-full-img" />
          </div>

          <div className="comic-bottom-controls">
            <button 
              onClick={prevStep} 
              disabled={step === 1 || isFlipping}
              className="comic-nav-btn prev"
            >
              &lt;
            </button>
            
            <div className="comic-meta">
              <span className="comic-page-num">PAGE {step} / 4</span>
              <div className="comic-dots">
                {comicPages.map((_, i) => (
                  <span 
                    key={i} 
                    className={step === i + 1 ? "active" : ""}
                    onClick={() => handlePageChange(i + 1, i + 1 > step ? 'next' : 'prev')}
                  />
                ))}
              </div>
            </div>

            <button 
              onClick={nextStep} 
              disabled={isFlipping}
              className="comic-nav-btn next"
            >
              {step === 4 ? "DONE" : ">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
