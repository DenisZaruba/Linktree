'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
//@ts-ignore
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
//@ts-ignore
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
//@ts-ignore
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import styles from './ArcadeSpace.module.scss';

export default function ArcadeSpace() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;

    // SCENE
    const scene = new THREE.Scene();
    const bg = new THREE.Color(0x050510);
    scene.background = bg;
    scene.fog = new THREE.Fog(bg, 40, 120);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.z = 20;

    const cameraGroup = new THREE.Group();
    cameraGroup.add(camera);
    scene.add(cameraGroup);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.3;

    container.appendChild(renderer.domElement);

    // POST FX
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.2,
      0.4,
      0.85
    );
    bloom.threshold = 0.1;
    bloom.strength = 1.2;
    bloom.radius = 0.8;

    composer.addPass(bloom);

    // LIGHT
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(10, 20, 10);
    scene.add(dir);

    // MATERIAL (простий glow)
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1.5,
      roughness: 0.3,
      metalness: 0.1
    });

    // SHAPES
    const SHAPES = [
      [[1, 1, 1], [0, 1, 0]], // T
      [[1, 0], [1, 0], [1, 1]], // L
      [[1, 1, 0], [0, 1, 1]], // Z
      [[1], [1], [1], [1]] // I
    ];

    function createVoxel(shape: number[][], color: number) {
      const group = new THREE.Group();
      const geo = new THREE.BoxGeometry(1, 1, 1);

      shape.forEach((row, y) => {
        row.forEach((val, x) => {
          if (!val) return;

          const mat = baseMaterial.clone();
          mat.color.setHex(color);
          mat.emissive.setHex(color);

          const cube = new THREE.Mesh(geo, mat);

          cube.position.set(
            x - row.length / 2,
            (shape.length - y) - shape.length / 2,
            0
          );

          group.add(cube);
        });
      });

      return group;
    }

    const objects: any[] = [];
    const colors = [0xff00aa, 0x00ffcc, 0xffaa00, 0x00ff44, 0x0088ff];

    for (let i = 0; i < 60; i++) {
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const obj = createVoxel(shape, color);

      obj.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        -Math.random() * 120
      );

      const speed = Math.random() * 0.3 + 0.2;

      objects.push({
        mesh: obj,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          speed
        ),
        rot: (Math.random() - 0.5) * 0.02
      });

      scene.add(obj);
    }

    // STARS
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 1500;
    const pos = new Float32Array(starCount * 3);

    for (let i = 0; i < pos.length; i++) {
      pos[i] = (Math.random() - 0.5) * 600;
    }

    starsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const stars = new THREE.Points(
      starsGeo,
      new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.4,
        transparent: true,
        opacity: 0.6
      })
    );

    scene.add(stars);

    // MOUSE
    let mouseX = 0;
    let mouseY = 0;

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', onMouse);

    // ANIMATE
    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);

      objects.forEach(o => {
        o.mesh.position.add(o.velocity);

        o.mesh.rotation.y += o.rot;
        o.mesh.rotation.x += 0.01;

        if (o.mesh.position.z > 20) {
          o.mesh.position.z = -120;
        }
      });

      stars.position.z += 0.5;
      if (stars.position.z > 200) stars.position.z = 0;

      cameraGroup.rotation.y += (mouseX * 0.3 - cameraGroup.rotation.y) * 0.05;
      cameraGroup.rotation.x += (mouseY * 0.2 - cameraGroup.rotation.x) * 0.05;

      composer.render();
    };

    animate();

    // RESIZE
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // CLEANUP
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouse);

      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className={styles.canvasContainer} />;
}