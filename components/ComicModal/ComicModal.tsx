"use client";

import { useState } from "react";
import "./ComicModal.css";

interface ComicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComicModal({ isOpen, onClose }: ComicModalProps) {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const nextStep = () => setStep(prev => (prev < 4 ? prev + 1 : prev));
  const prevStep = () => setStep(prev => (prev > 1 ? prev - 1 : prev));

  const comicPages = [
    { src: "/comic1.png", alt: "Chapter 1: The Chosen One" },
    { src: "/comic-placeholder.png", alt: "Chapter 2: Coming Soon" },
    { src: "/comic-placeholder.png", alt: "Chapter 3: Coming Soon" },
    { src: "/comic-placeholder.png", alt: "Chapter 4: Coming Soon" }
  ];

  const currentComic = comicPages[step - 1];

  return (
    <div className="comic-modal-overlay">
      <div className="comic-modal-content">
        <button onClick={onClose} className="comic-close-btn">×</button>
        
        <div className="comic-fullscreen-viewer">
          <div className="comic-page-wrapper">
             <img src={currentComic.src} alt={currentComic.alt} className="comic-full-img" />
          </div>

          <div className="comic-bottom-controls">
            <button 
              onClick={prevStep} 
              disabled={step === 1}
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
                    onClick={() => setStep(i + 1)}
                  />
                ))}
              </div>
            </div>

            <button 
              onClick={() => step < 4 ? nextStep() : onClose()} 
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
