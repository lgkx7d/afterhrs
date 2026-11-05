'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const BACKGROUND_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const BACKGROUND_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uVelocity;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.02 + vec2(uTime * 0.035, -uTime * 0.025);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    vec2 ptr = (uPointer - 0.5) * vec2(aspect, 1.0);

    // Smooth horizon lens distortion around cursor
    float dist = length(p - ptr);
    float warp = exp(-dist * 3.0) * (0.06 + uVelocity * 0.12);
    vec2 warpedUv = p + normalize(p - ptr + 0.0001) * warp;

    // Layered volumetric darkroom smoke
    float n1 = fbm(warpedUv * 2.2 + vec2(0.0, uTime * 0.04));
    float n2 = fbm(warpedUv * 3.8 - vec2(uTime * 0.05, n1 * 1.2));
    float smoke = smoothstep(0.22, 0.90, n1 * 0.58 + n2 * 0.52);

    // Subtle vertical studio light beam on right flank
    float rightStreak = exp(-abs(p.x - 0.48 + sin(uv.y * 3.2 + uTime * 0.35) * 0.03) * 10.5);

    // Deep pitch void & arterial crimson palette
    vec3 voidBlack = vec3(0.014, 0.010, 0.012);
    vec3 deepCrimson = vec3(0.36, 0.0, 0.025);
    vec3 bloodRed = vec3(0.86, 0.015, 0.015);
    vec3 burntEmber = vec3(0.82, 0.26, 0.05);

    vec3 col = mix(voidBlack, deepCrimson, smoke * 0.72);

    // Pointer spotlight bloom
    float spot = exp(-dist * 2.4);
    col = mix(col, bloodRed, spot * smoke * 0.58);
    col += burntEmber * rightStreak * 0.22 * (0.5 + 0.5 * n2);

    // Vignette framing
    float vig = smoothstep(1.32, 0.22, length(p * vec2(0.82, 1.08)));
    col *= vig;

    // Fine analog film grain
    float grain = (hash(uv * uResolution + fract(uTime * 60.0)) - 0.5) * 0.035;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * High-Gloss Ferrofluid Obsidian-Chrome Singularity Shader
 * Recomputes true surface normals via finite differences on a smooth harmonic liquid field
 * so studio area lights, clearcoat speculars, and Fresnel rim reflections glide seamlessly.
 */
const FERROFLUID_VERTEX_SHADER = /* glsl */ `
  precision highp float;
  varying vec3 vWorldNormal;
  varying vec3 vViewDir;
  varying vec3 vLocalPos;
  varying float vDisplacement;

  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uHoverEnergy;

  // Smooth 3D harmonic liquid flow field (zero jagged edges, pure organic ferrofluid)
  float liquidField(vec3 dir, float t, vec2 ptr) {
    // Primary slow sculptural swells
    float w1 = sin(dir.x * 2.4 + t * 0.85) * cos(dir.y * 2.2 - t * 0.72) * sin(dir.z * 2.6 + t * 0.64);
    // Secondary harmonic acoustic ripples
    float w2 = sin(dir.y * 4.2 - t * 1.35 + dir.x * 1.8) * cos(dir.z * 3.8 + t * 1.15);
    // Tertiary silk undulation
    float w3 = cos((dir.x + dir.z) * 3.4 - t * 0.95) * sin(dir.y * 3.0 + t * 0.8);

    // Pointer magnetic pull crest
    vec3 ptrDir = normalize(vec3(ptr.x * 0.9, ptr.y * 0.9, 1.0));
    float ptrAlign = max(dot(dir, ptrDir), 0.0);
    float magneticBulge = pow(ptrAlign, 3.5) * (0.14 + uHoverEnergy * 0.08) * sin(ptrAlign * 5.0 - t * 2.2);

    return w1 * 0.14 + w2 * 0.055 + w3 * 0.035 + magneticBulge;
  }

  vec3 displacePoint(vec3 unitDir, float t, vec2 ptr) {
    float d = liquidField(unitDir, t, ptr);
    return unitDir * (1.0 + d);
  }

  void main() {
    vec3 unitDir = normalize(position);
    float d = liquidField(unitDir, uTime, uPointer);
    vDisplacement = d;
    vLocalPos = unitDir;

    // Finite-difference tangent basis on the sphere for ultra-smooth, physically accurate glossy normals
    float eps = 0.012;
    vec3 up = abs(unitDir.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 tangent = normalize(cross(up, unitDir));
    vec3 bitangent = normalize(cross(unitDir, tangent));

    vec3 dirT = normalize(unitDir + tangent * eps);
    vec3 dirB = normalize(unitDir + bitangent * eps);

    vec3 p0 = displacePoint(unitDir, uTime, uPointer);
    vec3 pT = displacePoint(dirT, uTime, uPointer);
    vec3 pB = displacePoint(dirB, uTime, uPointer);

    vec3 displacedNormal = normalize(cross(pT - p0, pB - p0));

    vec4 worldPosition = modelMatrix * vec4(p0, 1.0);
    vWorldNormal = normalize(mat3(modelMatrix) * displacedNormal);
    vViewDir = normalize(cameraPosition - worldPosition.xyz);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const FERROFLUID_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  varying vec3 vWorldNormal;
  varying vec3 vViewDir;
  varying vec3 vLocalPos;
  varying float vDisplacement;

  uniform float uTime;
  uniform vec2 uPointer;

  // Razor-sharp darkroom studio light-strip reflection environment (Black Obsidian + Crimson Laser Coat)
  vec3 sampleStudioEnvironment(vec3 R) {
    // 1. Curved architectural crimson laser light strip (razor-sharp automotive reflection band)
    float arc1 = exp(-abs(R.y - 0.28 + sin(R.x * 2.6 + uTime * 0.45) * 0.14) * 34.0);
    // 2. Secondary lower counter-arc reflection
    float arc2 = exp(-abs(R.y + 0.34 - cos(R.x * 2.2 - uTime * 0.35) * 0.12) * 38.0);
    // 3. Overhead crimson softbox gradient with crisp studio cutoff
    float topBox = smoothstep(0.62, 0.94, dot(R, normalize(vec3(0.55, 0.78, 0.28))));
    // 4. Deep arterial floor bounce
    float floorBounce = smoothstep(0.25, 0.92, dot(R, normalize(vec3(-0.35, -0.86, 0.36))));

    vec3 env = vec3(0.008, 0.002, 0.004); // Pitch-black polished obsidian mirror core
    env += vec3(0.95, 0.02, 0.02) * topBox * 0.95;
    env += vec3(1.0, 0.12, 0.03) * arc1 * 1.45;
    env += vec3(0.90, 0.03, 0.01) * arc2 * 0.95;
    env += vec3(0.48, 0.0, 0.02) * floorBounce * 0.65;

    return env;
  }

  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(vViewDir);
    float NdotV = max(dot(N, V), 0.0);

    // Mirror reflection vector
    vec3 R = reflect(-V, N);

    // Schlick Fresnel for high-gloss black glass clearcoat
    float fresnel = pow(1.0 - NdotV, 3.0);
    float outerRim = pow(1.0 - NdotV, 5.2);

    // Key Light 1 (Upper-Right Scarlet Studio Key — tight pinpoint mirror highlight)
    vec3 L1 = normalize(vec3(2.2 + uPointer.x * 0.7, 2.4 + uPointer.y * 0.5, 2.8));
    vec3 H1 = normalize(L1 + V);
    float NdotL1 = max(dot(N, L1), 0.0);
    float NdotH1 = max(dot(N, H1), 0.0);

    // Key Light 2 (Left Rim Counter-Key)
    vec3 L2 = normalize(vec3(-2.6, 0.8, 1.6));
    vec3 H2 = normalize(L2 + V);
    float NdotH2 = max(dot(N, H2), 0.0);

    // Key Light 3 (Lower-Right Warm Ember Accent)
    vec3 L3 = normalize(vec3(1.6, -2.4, 2.0));
    vec3 H3 = normalize(L3 + V);
    float NdotH3 = max(dot(N, H3), 0.0);

    // Pinpoint high-gloss clearcoat speculars (high exponent = wet glass, zero chalky blur)
    float specPin1 = pow(NdotH1, 520.0) * 2.4 + pow(NdotH1, 85.0) * 0.55;
    float specPin2 = pow(NdotH2, 420.0) * 1.6 + pow(NdotH2, 70.0) * 0.40;
    float specPin3 = pow(NdotH3, 320.0) * 1.2;

    // Deep pitch-obsidian body with subtle arterial crimson depth in wave crests
    vec3 obsidianCore = vec3(0.010, 0.003, 0.005);
    vec3 crimsonSubsurface = vec3(0.38, 0.0, 0.02) * smoothstep(-0.04, 0.16, vDisplacement);
    vec3 baseBody = obsidianCore + crimsonSubsurface * (NdotL1 * 0.65 + 0.2);

    // Studio mirror reflection
    vec3 envReflection = sampleStudioEnvironment(R);

    // Combine pitch-obsidian core with glossy studio reflections
    vec3 color = mix(baseBody, envReflection, 0.48 + fresnel * 0.45);

    // Add tight wet-glass specular glints
    color += vec3(1.0, 0.82, 0.76) * specPin1;
    color += vec3(1.0, 0.18, 0.06) * specPin2;
    color += vec3(1.0, 0.36, 0.08) * specPin3;

    // Saturated blood-red Fresnel rim contour around the liquid silhouette
    vec3 scarletRim = mix(vec3(0.92, 0.01, 0.01), vec3(1.0, 0.28, 0.04), outerRim);
    color += scarletRim * fresnel * 1.25;

    // Filmic contrast curve to preserve deep blacks and glowing crimson edges
    color = color / (1.0 + color * 0.25);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function VolumetricSmokeBackdrop() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const { size } = useThree();
  const pointerTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const pointerCurrent = useRef(new THREE.Vector2(0.5, 0.5));
  const lastPointer = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uVelocity: { value: 0 },
      uResolution: { value: new THREE.Vector2(1440, 900) },
    }),
    []
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerTarget.current.set(
        e.clientX / Math.max(window.innerWidth, 1),
        1.0 - e.clientY / Math.max(window.innerHeight, 1)
      );
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;
    pointerCurrent.current.lerp(pointerTarget.current, 0.08);
    const vel = pointerCurrent.current.distanceTo(lastPointer.current) * 14.0;
    lastPointer.current.copy(pointerCurrent.current);

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uPointer.value.copy(pointerCurrent.current);
    materialRef.current.uniforms.uVelocity.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uVelocity.value,
      Math.min(vel, 1.5),
      0.1
    );
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={BACKGROUND_VERTEX_SHADER}
        fragmentShader={BACKGROUND_FRAGMENT_SHADER}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

function FerrofluidObsidianOrb() {
  const groupRef = useRef<THREE.Group | null>(null);
  const orbRef = useRef<THREE.Mesh | null>(null);
  const innerRingRef = useRef<THREE.Mesh | null>(null);
  const outerRingRef = useRef<THREE.Mesh | null>(null);
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const lastPointer = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uHoverEnergy: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.set(
        (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1,
        -(e.clientY / Math.max(window.innerHeight, 1)) * 2 + 1
      );
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const pointerSpeed = pointer.current.distanceTo(lastPointer.current) * 18.0;
    lastPointer.current.copy(pointer.current);

    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
      matRef.current.uniforms.uPointer.value.lerp(pointer.current, 0.06);
      matRef.current.uniforms.uHoverEnergy.value = THREE.MathUtils.lerp(
        matRef.current.uniforms.uHoverEnergy.value,
        Math.min(pointerSpeed, 1.2),
        0.08
      );
    }

    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        0.72 + pointer.current.x * 0.22,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        0.04 + pointer.current.y * 0.16 + Math.sin(t * 0.55) * 0.05,
        0.05
      );
    }

    if (orbRef.current) {
      orbRef.current.rotation.y += delta * 0.18;
      orbRef.current.rotation.x = THREE.MathUtils.lerp(
        orbRef.current.rotation.x,
        pointer.current.y * 0.28,
        0.05
      );
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = t * 0.22;
      innerRingRef.current.rotation.x = 1.18 + Math.sin(t * 0.35) * 0.12 + pointer.current.y * 0.18;
      innerRingRef.current.rotation.y = -0.38 + pointer.current.x * 0.22;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -t * 0.15;
      outerRingRef.current.rotation.x = 1.42 + Math.cos(t * 0.28) * 0.1 - pointer.current.y * 0.14;
      outerRingRef.current.rotation.y = 0.46 - pointer.current.x * 0.16;
    }
  });

  return (
    <group ref={groupRef} position={[0.72, 0.04, 0]}>
      {/* Ultra-Smooth Glossy Liquid Obsidian-Mercury Singularity Core */}
      <mesh ref={orbRef} scale={1.12}>
        <sphereGeometry args={[1, 160, 160]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={FERROFLUID_VERTEX_SHADER}
          fragmentShader={FERROFLUID_FRAGMENT_SHADER}
          uniforms={uniforms}
        />
      </mesh>

      {/* Precision Razor-Thin Crimson Laser Orbital Ring I */}
      <mesh ref={innerRingRef} scale={1.58}>
        <torusGeometry args={[1, 0.0045, 32, 220]} />
        <meshBasicMaterial color="#FF1E00" transparent opacity={0.62} />
      </mesh>

      {/* Precision Razor-Thin Platinum-Ember Orbital Ring II */}
      <mesh ref={outerRingRef} scale={1.92}>
        <torusGeometry args={[1, 0.0028, 24, 220]} />
        <meshBasicMaterial color="#FF6A3D" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function SparseDepthEmbers() {
  const pointsRef = useRef<THREE.Points | null>(null);
  const count = 56;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9.5;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6.0;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4.0;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.025;
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.12;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FF2E00"
        size={0.028}
        transparent
        opacity={0.48}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function CrimsonSoundstageCanvas() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.02 }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-void-950"
      aria-hidden="true"
    >
      {/* CSS Fallback & Base Atmospheric Gradient (Always present under Canvas) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 68% 46%, rgba(230, 0, 0, 0.24) 0%, rgba(74, 0, 6, 0.14) 42%, rgba(5, 5, 5, 0.98) 78%)',
        }}
      />

      {!reducedMotion && (
        <Canvas
          dpr={[1, 1.75]}
          frameloop={isVisible ? 'always' : 'never'}
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
        >
          <VolumetricSmokeBackdrop />
          <FerrofluidObsidianOrb />
          <SparseDepthEmbers />
        </Canvas>
      )}
    </div>
  );
}
