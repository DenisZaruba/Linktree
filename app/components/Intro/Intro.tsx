'use client';

import { Button } from '@/app/modules/Button/Button';
import { Typography } from '@/app/modules/Typography/Typography';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './Intro.module.scss';

const Intro = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const target = imageRef.current;

    if (!container || !target) return;

    const strength = 20;

    let mouseX = 0;
    let mouseY = 0;
    let rect: DOMRect;

    const updateRect = () => {
      rect = container.getBoundingClientRect();
    };

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (mouseX - centerX) / (rect.width / 2);
      const dy = (mouseY - centerY) / (rect.height / 2);

      const clampedX = Math.max(-1, Math.min(1, dx));
      const clampedY = Math.max(-1, Math.min(1, dy));

      const moveX = clampedX * strength;
      const moveY = clampedY * strength;

      target.style.transform = `translate(${moveX}px, ${moveY}px)`;

      requestAnimationFrame(animate);
    };

    const handleResize = () => updateRect();

    updateRect();
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('resize', handleResize);

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.intro} ref={containerRef}>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <div className={styles.bodyContent}>
            <Typography variant="h1" weight="black" className={styles.title}>
              The easiest place to update and share your content
            </Typography>
            <Typography variant="h2" weight="black" className={styles.subtitle}>
              Help your followers discover everything you’re sharing all over the internet, in one simple place. They’ll thank you for it!
            </Typography>
            <Button as='a' href="/create/appearance" variant="primary" color="dark" className={styles.button}>
              Get your free Linktree
            </Button>
          </div>
        </div>

        <div className={styles.bodyImage} ref={imageRef}>
          <Image src="/images/intro.png" alt="Intro image" fill />
        </div>
      </div>
    </div>
  );
};

export default Intro;