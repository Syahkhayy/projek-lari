"use client";

import { useState, useEffect } from "react";
import "./OnboardingModal.css";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasSeenBefore?: boolean;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);

  // Reset to first page every time the modal is opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const nextStep = () => setStep(prev => prev + 1);

  const onboardingSteps = [
    {
      header: "Welcome To Kura",
      icon: "🐢",
      content: (
        <>
          <p>Meet Kura, a small turtle chosen to protect his village from an invasion, through a race.</p>
          <p>But Kura is weak, slow, and easily exhausted (ehem, like those someone).</p>
          <p>Your real-life runs will help Kura train, improve, and slowly prepare for his hero moment.</p>
        </>
      ),
      btnText: "TELL ME MORE"
    },
    {
      header: "Your Runs Train Kura",
      icon: "🏃",
      content: (
        <>
          <p>Every time you log a run, Kura’s endurance improves.</p>
          <p>At the beginning, Kura can barely run 1 KM continuously.</p>
          <p>As you stay consistent, Kura will slowly be able to run farther in a single race.</p>
        </>
      ),
      btnText: "EXPLAIN ENDURANCE"
    },
    {
      header: "Kura's Endurance",
      icon: "⚡",
      content: (
        <>
          <p>Kura’s endurance shows how far he can run continuously in a single race.</p>
          <p><strong>1 KM endurance</strong> → Kura gets exhausted after 1 KM</p>
          <p><strong>5 KM endurance</strong> → Kura can keep running for 5 KM</p>
          <p>The farther Kura can run, the closer he gets to challenging <strong>AR. Nab</strong>.</p>
        </>
      ),
      btnText: "WHAT IF I REST?"
    },
    {
      header: "Kura Can Get Rusty",
      icon: "💤",
      content: (
        <>
          <p>If you stop training for too long, Kura may lose some endurance and become rusty.</p>
          <p>But don’t worry, Kura can rest up to <strong>3 days</strong>, without getting rusty.</p>
          <p>You can always continue the journey together, anytime, anywhere.</p>
        </>
      ),
      btnText: "THE UNKNOWN AWAITS"
    },
    {
      header: "Prepare for the Unknown",
      icon: "⚔️",
      content: (
        <>
          <p>Somewhere beyond the village, <strong>AR. Nab</strong> is still training, waiting.</p>
          <p>Nobody knows how far he can run, one witnessed he traveled through valleys at ease.</p>
          <p>Help Kura grow stronger. And one day, challenge the impossible together.</p>
        </>
      ),
      btnText: "LET'S TRAIN!"
    }
  ];

  const currentStep = onboardingSteps[step - 1];

  return (
    <div className="kura-modal-overlay">
      <div className="kura-modal-content pixel-card">
        <div className="modal-header">
          <h2 className="pixel-font">{currentStep.header}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="modal-body">
          <div className="onboarding-step">
            <div className="onboarding-icon">{currentStep.icon}</div>
            <div className="onboarding-text-content">
              {currentStep.content}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            onClick={step === onboardingSteps.length ? onClose : nextStep} 
            className="pixel-btn pixel-btn-primary onboarding-action-btn"
          >
            {currentStep.btnText}
          </button>
          
          <div className="step-dots">
            {onboardingSteps.map((_, i) => (
              <span 
                key={i}
                className={step === i + 1 ? "active" : ""} 
                onClick={() => setStep(i + 1)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
