'use client';

import { useEffect, useRef } from 'react';
import styles from './Glitch.module.scss';

export default function Glitch() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // ======================
    // VERTEX SHADER (fullscreen quad)
    // ======================
    const vsSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // ======================
    // ORIGINAL FRAGMENT SHADER (cleaned only for JS string safety)
    // ======================
    const fsSource = `
      precision mediump float;

      uniform float uTime;
      uniform vec2 uResolution;

      #define pal(t, a, b, c, d) ( a + b*cos( 6.28318*(c*t+d) ) )

      float hash11(float p){
        p = fract(p * .1031);
        p *= p + 33.33;
        p *= p + p;
        return fract(p);
      }

      float hash12(vec2 p){
        vec3 p3 = fract(vec3(p.xyx) * .1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      float noise11(float f){
        float i = floor(f);
        f -= i;
        float u = f*f*(3.-2.*f);
        return mix(hash11(i), hash11(i+1.), u);
      }

      float noise12(vec2 f){
        vec2 i = floor(f);
        f -= i;
        vec2 u = f*f*(3.-2.*f);

        return mix(
          mix(hash12(i), hash12(i+vec2(1.,0.)), u.x),
          mix(hash12(i+vec2(0.,1.)), hash12(i+vec2(1.,1.)), u.x),
          u.y
        );
      }

      void main() {
        vec2 r = uResolution.xy;
        vec2 uv = (gl_FragCoord.xy*2.0 - r) / r.y;

        float xs = noise11(floor(uv.y*20.0)) * sin(floor(uv.y*0.5) + uTime);
        xs *= xs * xs;

        float x = (uv.x + xs * 0.05) * 20.0;
        float cl = floor(x);
        x -= cl;

        float h = hash11(cl - 1.0);
        h = mix(hash11(cl), h, step(x, sin(uTime + h*10.0)*0.4 + 0.4));

        h = sin(h*0.7 - noise11(uv.x - uTime*1.2)*2.0)*0.5 + 0.5;

        vec3 C = pal(
          h,
          vec3(.8,.5,.3),
          vec3(.4,1,.7),
          vec3(1,.2,.6),
          vec3(.9,.07,.7)
        ) * 0.5 - 0.45;

        C *= (0.5 + sin(uv.y*600.0)*0.5);

        float cyan = noise11(floor((uv.x+xs*.05)*200.0)+uTime)
                   * noise12(vec2(uv.x*5.0, uTime));
        C = mix(C, vec3(0,1,1), cyan*cyan*cyan*0.6);

        float orange = noise11(floor(uv.y*200.0)+uTime)
                     * noise12(vec2(uv.y*10.0,0.0)+uTime);
        orange *= orange * orange;
        C = mix(C, vec3(1,.7,0), orange);

        float glitch = noise11(uTime*2.0)*0.5;
        C += vec3(glitch*0.1, -glitch*0.05, glitch*0.15);

        float shift = noise11(uTime*3.0)*0.02;
        C.r = mix(C.r, C.g, shift);
        C.b = mix(C.b, C.g, shift*0.5);

        float n = hash12(uv*100.0 + uTime) * 0.1;
        C += vec3(n*0.2, n*0.15, n*0.25);

        gl_FragColor = vec4(C,1.0);
      }
    `;

    // ======================
    // SHADER HELPERS
    // ======================
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;

      gl.shaderSource(s, src);
      gl.compileShader(s);

      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const program = gl.createProgram();
    if (!program) return;

    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);

    if (!vs || !fs) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    // ======================
    // FULLSCREEN QUAD
    // ======================
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, 1,
        1, 1,
        -1, -1,
        1, -1,
      ]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uResolution = gl.getUniformLocation(program, 'uResolution');

    // ======================
    // RESIZE
    // ======================
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = '100%';
      canvas.style.height = '100%';

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // ======================
    // RENDER LOOP
    // ======================
    const start = performance.now();

    const render = () => {
      const t = (performance.now() - start) / 1000;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(uTime, t);
      gl.uniform2f(uResolution, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}