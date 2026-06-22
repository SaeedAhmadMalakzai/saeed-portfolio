"use client";

// ============================================
// Walking Silhouettes Background - Three.js
// Matches fromanother.love video exactly
// ============================================
// Two blurred walking person silhouettes crossing the screen
// Heavy Gaussian blur creates the dreamy, soft shadow effect

import * as THREE from 'three';
import { useEffect, useRef } from 'react';

// --- Vertex Shader ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// --- Fragment Shader: Procedural Walking Person ---
const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uPhase;
  uniform float uDirection;
  uniform float uBlurSize;
  uniform float uScale;

  varying vec2 vUv;

  // --- Noise functions ---
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  // --- SDF Primitives ---
  float sdCircle(vec2 p, float r) {
    return length(p) - r;
  }

  float sdSegment(vec2 p, vec2 a, vec2 b, float r) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h) - r;
  }

  float sdEllipse(vec2 p, vec2 ab) {
    float k0 = length(p / ab);
    float k1 = length(p / (ab * ab));
    return k0 * (k0 - 1.0) / (k1 + 0.0001);
  }

  // --- Walking Person SDF ---
  float personSDF(vec2 p, float t) {
    // Walking cycle
    float cycle = t * 3.5;
    float legSwing = sin(cycle) * 0.20;
    float armSwing = sin(cycle + 3.14159) * 0.14;
    float bodyBob = abs(sin(cycle)) * 0.045;

    float d = 100.0;

    // Head
    d = min(d, sdCircle(p - vec2(0.0, 0.54 + bodyBob), 0.10));

    // Neck
    d = min(d, sdSegment(p, vec2(0.0, 0.44 + bodyBob), vec2(0.0, 0.38 + bodyBob), 0.035));

    // Upper torso (chest)
    d = min(d, sdEllipse(p - vec2(0.0, 0.28 + bodyBob), vec2(0.15, 0.12)));

    // Lower torso (abdomen)
    d = min(d, sdEllipse(p - vec2(0.0, 0.10 + bodyBob), vec2(0.13, 0.14)));

    // Hips
    d = min(d, sdEllipse(p - vec2(0.0, -0.02 + bodyBob), vec2(0.12, 0.07)));

    // --- Left Leg (swinging forward/back) ---
    vec2 lHip = vec2(-0.06, -0.06 + bodyBob);
    vec2 lKnee = vec2(-0.10 + legSwing * 0.6, -0.30 + bodyBob + abs(legSwing) * 0.12);
    vec2 lFoot = vec2(-0.14 + legSwing, -0.62 + bodyBob);
    d = min(d, sdSegment(p, lHip, lKnee, 0.05));
    d = min(d, sdSegment(p, lKnee, lFoot, 0.042));
    // Shoe
    d = min(d, sdEllipse(p - lFoot, vec2(0.055, 0.025)));

    // --- Right Leg ---
    vec2 rHip = vec2(0.06, -0.06 + bodyBob);
    vec2 rKnee = vec2(0.10 - legSwing * 0.6, -0.30 + bodyBob + abs(legSwing) * 0.12);
    vec2 rFoot = vec2(0.14 - legSwing, -0.62 + bodyBob);
    d = min(d, sdSegment(p, rHip, rKnee, 0.05));
    d = min(d, sdSegment(p, rKnee, rFoot, 0.042));
    // Shoe
    d = min(d, sdEllipse(p - rFoot, vec2(0.055, 0.025)));

    // --- Left Arm ---
    vec2 lShoulder = vec2(-0.17, 0.34 + bodyBob);
    vec2 lElbow = vec2(-0.24 + armSwing * 0.5, 0.14 + bodyBob);
    vec2 lHand = vec2(-0.28 + armSwing, -0.02 + bodyBob);
    d = min(d, sdSegment(p, lShoulder, lElbow, 0.038));
    d = min(d, sdSegment(p, lElbow, lHand, 0.032));
    d = min(d, sdCircle(p - lHand, 0.032));

    // --- Right Arm ---
    vec2 rShoulder = vec2(0.17, 0.34 + bodyBob);
    vec2 rElbow = vec2(0.24 - armSwing * 0.5, 0.14 + bodyBob);
    vec2 rHand = vec2(0.28 - armSwing, -0.02 + bodyBob);
    d = min(d, sdSegment(p, rShoulder, rElbow, 0.038));
    d = min(d, sdSegment(p, rElbow, rHand, 0.032));
    d = min(d, sdCircle(p - rHand, 0.032));

    return d;
  }

  // --- Heavy Gaussian Blur (creates the dreamy effect) ---
  float blurredPerson(vec2 uv, float t, float blurRadius) {
    float result = 0.0;
    float totalWeight = 0.0;

    // 64 samples for heavy blur
    for (int i = 0; i < 64; i++) {
      float fi = float(i);
      float angle = fi * 2.39996; // Golden angle for even distribution
      float radius = blurRadius * sqrt(fi / 64.0);

      vec2 offset = vec2(cos(angle), sin(angle)) * radius;

      // Gaussian weight
      float dist = fi / 64.0;
      float weight = exp(-dist * dist * 4.0);

      float d = personSDF((uv + offset) * 2.0 - 1.0, t);
      float shape = smoothstep(0.06, -0.03, d);

      result += shape * weight;
      totalWeight += weight;
    }

    return result / totalWeight;
  }

  void main() {
    vec2 uv = vUv;

    // Flip if walking left
    if (uDirection < 0.0) {
      uv.x = 1.0 - uv.x;
    }

    // Apply scale (person size relative to screen)
    uv = (uv - 0.5) / uScale + 0.5;

    // Get blurred silhouette
    float silhouette = blurredPerson(uv, uTime + uPhase, uBlurSize);

    // Add subtle organic noise
    float n = noise(uv * 4.0 + uTime * 0.15) * 0.06;
    silhouette = max(0.0, silhouette + n * silhouette);

    // Color
    vec3 color = uColor * silhouette;
    float alpha = silhouette * uOpacity;

    // Soft edge fade
    float edgeFade = 1.0 - smoothstep(0.35, 0.5, length(vUv - 0.5));
    alpha *= edgeFade;

    gl_FragColor = vec4(color, alpha);
  }
`;

// ============================================
// React Component
// ============================================

export default function WalkingSilhouettes() {
  const containerRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Prevent double init
    if (cleanupRef.current) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: false, // We handle blur in shader
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // --- Shared Geometry ---
    const geometry = new THREE.PlaneGeometry(2, 2);

    // --- Person Configurations ---
    // These match the video: two people crossing paths
    const personConfigs = [
      {
        // Person 1: Darker blue, bottom area, moving LEFT (from right to left)
        color: new THREE.Color(0x1a3a5c),
        opacity: 0.50,
        blurSize: 0.08,
        scale: 1.1,
        phase: 0.0,
        direction: -1.0,
        startX: 0.85,
        startY: -0.20,
        speed: 0.0009,
      },
      {
        // Person 2: Lighter blue, upper area, moving RIGHT (from left to right)
        color: new THREE.Color(0x2d4f70),
        opacity: 0.42,
        blurSize: 0.09,
        scale: 0.95,
        phase: 3.14159,
        direction: 1.0,
        startX: -0.15,
        startY: 0.10,
        speed: 0.00075,
      },
    ];

    // --- Create People ---
    const people = personConfigs.map((cfg) => {
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(width, height) },
          uColor: { value: cfg.color },
          uOpacity: { value: cfg.opacity },
          uPhase: { value: cfg.phase },
          uDirection: { value: cfg.direction },
          uBlurSize: { value: cfg.blurSize },
          uScale: { value: cfg.scale },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      return {
        mesh,
        material,
        x: cfg.startX,
        y: cfg.startY,
        speed: cfg.speed,
        direction: cfg.direction,
        baseY: cfg.startY,
      };
    });

    // --- Animation ---
    const clock = new THREE.Clock();
    let frameId;

    function animate() {
      frameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      people.forEach((person, i) => {
        const mat = person.material;
        mat.uniforms.uTime.value = elapsed;

        // Move horizontally
        person.x += person.speed * person.direction;

        // Wrap around screen
        if (person.direction > 0 && person.x > 1.4) {
          person.x = -0.4;
        } else if (person.direction < 0 && person.x < -0.4) {
          person.x = 1.4;
        }

        // Subtle vertical drift (breathing/walking bounce)
        const driftY = Math.sin(elapsed * 0.4 + i * 3.0) * 0.015;

        // Position the mesh
        person.mesh.position.x = person.x;
        person.mesh.position.y = person.baseY + driftY;
      });

      renderer.render(scene, camera);
    }
    animate();

    // --- Resize ---
    function onResize() {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      people.forEach(p => {
        p.material.uniforms.uResolution.value.set(w, h);
      });
    }
    window.addEventListener('resize', onResize);

    // --- Cleanup function ---
    cleanupRef.current = () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      people.forEach(p => p.material.dispose());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#f5f3e8', // Cream background from video
      }}
    />
  );
}