"use client";

import Image from "next/image";
import { useState } from "react";
import "./ComicModal.css";

interface ComicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const comicPages = [
  {
    imageSrc: "/comic1.png",
    imageAlt: "Navigation 1 comic page",
    body:
      "The village was already alive with movement under the warm morning sun. " +
      "Kura lay beneath an old tree at its edge, phone glowing softly in his hand, while the world passed him by. " +
      "Empty wrappers and scattered belongings marked the ground around him like traces of another slow day.\n\n" +
      "Beyond the shade, villagers worked, trained, and carried their lives forward without pause.\n\n" +
      "A quiet thought sometimes surfaced in Kura’s mind, small and uncertain, telling him he should change.\n\n" +
      "But before it could grow, a familiar answer always followed, heavier and more comforting.\n\n" +
      "Tomorrow.",
  },
  {
    imageSrc: "/comic-placeholder.png",
    imageAlt: "Navigation 2 coming soon page",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
  },
  {
    imageSrc: "/comic-placeholder.png",
    imageAlt: "Navigation 3 coming soon page",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Donec sed odio dui.",
  },
  {
    imageSrc: "/comic-placeholder.png",
    imageAlt: "Navigation 4 coming soon page",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper.",
  },
  {
    imageSrc: "/comic-placeholder.png",
    imageAlt: "Navigation 5 coming soon page",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas faucibus mollis interdum.",
  },
  {
    imageSrc: "/comic-placeholder.png",
    imageAlt: "Navigation 6 coming soon page",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue.",
  },
  {
    imageSrc: "/comic-placeholder.png",
    imageAlt: "Navigation 7 coming soon page",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
  },
];

export default function ComicModal({ isOpen, onClose }: ComicModalProps) {
  const [step, setStep] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<"next" | "prev">("next");

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1);
    setIsFlipping(false);
    setFlipDir("next");
    onClose();
  };

  const handlePageChange = (newStep: number, dir: "next" | "prev") => {
    if (isFlipping || newStep === step) return;

    setFlipDir(dir);
    setIsFlipping(true);

    setTimeout(() => {
      setStep(newStep);
    }, 400);

    setTimeout(() => {
      setIsFlipping(false);
    }, 800);
  };

  const nextStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (step < comicPages.length) {
      handlePageChange(step + 1, "next");
    } else {
      handleClose();
    }
  };

  const prevStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (step > 1) {
      handlePageChange(step - 1, "prev");
    }
  };

  const currentComic = comicPages[step - 1];

  return (
    <div className="comic-modal-overlay" onClick={handleClose}>
      <div className="comic-modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="comic-close-btn">
          &times;
        </button>

        <div className="comic-fullscreen-viewer">
          <div className="comic-page-wrapper">
            <div className="comic-spread">
              <section
                className={`comic-spread-page comic-spread-image-page ${
                  isFlipping && flipDir === "prev" ? "flipping-page-prev" : ""
                }`}
              >
                <Image
                  src={currentComic.imageSrc}
                  alt={currentComic.imageAlt}
                  className="comic-full-img"
                  width={1600}
                  height={1200}
                  priority={step === 1}
                />
              </section>

              <section
                className={`comic-spread-page comic-spread-story-page ${
                  isFlipping && flipDir === "next" ? "flipping-page-next" : ""
                }`}
              >
                <p>{currentComic.body}</p>
              </section>
            </div>
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
              <span className="comic-page-num">
                NAVIGATION {step} / {comicPages.length}
              </span>
              <div className="comic-dots">
                {comicPages.map((_, i) => (
                  <span
                    key={i}
                    className={step === i + 1 ? "active" : ""}
                    onClick={() =>
                      handlePageChange(i + 1, i + 1 > step ? "next" : "prev")
                    }
                  />
                ))}
              </div>
            </div>

            <button onClick={nextStep} disabled={isFlipping} className="comic-nav-btn next">
              {step === comicPages.length ? "DONE" : ">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
