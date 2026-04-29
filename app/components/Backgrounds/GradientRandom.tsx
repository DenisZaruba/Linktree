'use client';

import { useEffect, useRef } from 'react';
import styles from './GradientRandom.module.scss';

const animationDuration = 2000;

function getRandomColor() {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
}

function getRandomGradient() {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const angle = Math.floor(Math.random() * 360);
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

const GradientRandom = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const overlapDelay = animationDuration / 2;
    let intervalId: NodeJS.Timeout;

    const createGradient = (isInitial = false) => {
      const el = document.createElement('div');

      el.className = `${styles.gradient} ${!isInitial ? styles.fadeIn : ''}`;
      el.style.backgroundImage = getRandomGradient();

      if (isInitial) {
        el.style.opacity = '1';
      }

      container.appendChild(el);

      if (!isInitial) {
        setTimeout(() => {
          container.removeChild(el);
        }, animationDuration + overlapDelay);
      }
    };

    // перший градієнт
    createGradient(true);

    // цикл
    intervalId = setInterval(() => {
      createGradient(false);
    }, overlapDelay);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div ref={containerRef} className={styles.container} />;
};

export default GradientRandom;