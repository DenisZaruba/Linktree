'use client';

import { useEffect, useRef } from 'react';
import styles from './SnowFall.module.scss';

const SnowFall = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const offscreen = document.createElement('canvas');
    const offctx = offscreen.getContext('2d');

    if (!ctx || !offctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    let snowflakes: any[] = [];
    let rafId: number;
    let maxCount = 0;
    let active = false;

    const calcMaxCount = () => {
      const cellsX = Math.ceil(width / 100);
      const cellsY = Math.ceil(height / 100);
      maxCount = cellsX * cellsY;
    };

    class Snowflake {
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
      r = 0;
      o = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.vy = 1 + Math.random() * 3;
        this.vx = 0.5 - Math.random();
        this.r = 3 + Math.random() * 4;
        this.o = 0.5 + Math.random() * 0.5;
      }
    }

    const generateSnowflakes = () => {
      snowflakes = [];
      for (let i = 0; i < maxCount; i++) {
        snowflakes.push(new Snowflake());
      }
    };

    const update = () => {
      if (!active) return;

      offctx.clearRect(0, 0, width, height);

      snowflakes.forEach((flake) => {
        flake.y += flake.vy;
        flake.x += flake.vx;

        if (flake.y > height || flake.x < 0 || flake.x > width) {
          flake.reset();
        }

        offctx.globalAlpha = flake.o;
        offctx.beginPath();
        offctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        offctx.fill();
      });

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(offscreen, 0, 0);

      rafId = requestAnimationFrame(update);
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
      offscreen.width = width;
      offscreen.height = height;

      ctx.fillStyle = '#FFF';
      offctx.fillStyle = '#FFF';

      calcMaxCount();
      generateSnowflakes();

      active = width > 600;
    };

    calcMaxCount();
    generateSnowflakes();
    onResize();

    rafId = requestAnimationFrame(update);

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default SnowFall;