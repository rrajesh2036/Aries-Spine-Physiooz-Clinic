import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Sparkles, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

interface SpineModel3DProps {
  className?: string;
}

type SpineSection = 'all' | 'cervical' | 'thoracic' | 'lumbar';

export const SpineModel3D: React.FC<SpineModel3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<SpineSection>('all');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [glowIntensity, setGlowIntensity] = useState<boolean>(true);
  const [hudCollapsed, setHudCollapsed] = useState<boolean>(false);
  const [selectedVertebra, setSelectedVertebra] = useState<string | null>(null);

  // References for render loop and interaction
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const spineGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.05, y: 0 });
  const isPointerDownRef = useRef<boolean>(false);
  const prevPointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetCameraYRef = useRef<number>(0);
  const targetCameraZRef = useRef<number>(18);
  const particlesRef = useRef<THREE.Points | null>(null);
  const spineDiscsRef = useRef<THREE.Mesh[]>([]);
  const spinalCordRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    // 2. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Subtle atmospheric fog matching off-white background
    scene.fog = new THREE.FogExp2(0x10243A, 0.015);

    // 3. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);
    cameraRef.current = camera;

    // 4. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 5. Lighting Rig (Balanced Medical Studio)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Warm directional key light
    const keyLight = new THREE.DirectionalLight(0xdff4f7, 2.2);
    keyLight.position.set(10, 15, 12);
    scene.add(keyLight);

    // Medical teal rim/fill light
    const tealRimLight = new THREE.DirectionalLight(0x16b8a6, 2.8);
    tealRimLight.position.set(-12, -8, 8);
    scene.add(tealRimLight);

    // Cyan backlight for silhouette glow
    const backLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    backLight.position.set(0, 10, -12);
    scene.add(backLight);

    // Grounding contact shadow plane
    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x071524,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -7.8;
    scene.add(shadowMesh);

    // 6. BUILD PROCEDURAL 3D ANATOMICAL SPINE & UPPER BODY
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    spineGroupRef.current = masterGroup;

    // Materials
    const boneMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xeef5f8,
      roughness: 0.3,
      metalness: 0.12,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      reflectivity: 0.5,
    });

    const discMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x16b8a6,
      emissive: 0x107a70,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      transmission: 0.4,
      transparent: true,
      opacity: 0.88,
    });

    const neuralCordMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x16b8a6,
      emissiveIntensity: 1.2,
      roughness: 0.15,
      transparent: true,
      opacity: 0.75,
    });

    // Torso silhouette subtle contour lines
    const torsoCurvePoints: THREE.Vector3[] = [];
    const torsoHeight = 15;
    for (let i = 0; i <= 36; i++) {
      const t = (i / 36) * Math.PI * 2;
      const x = Math.cos(t) * 3.6;
      const z = Math.sin(t) * 1.8;
      torsoCurvePoints.push(new THREE.Vector3(x, 0, z));
    }
    const torsoLoopGeo = new THREE.BufferGeometry().setFromPoints(torsoCurvePoints);
    const torsoOutlineMat = new THREE.LineBasicMaterial({
      color: 0x16b8a6,
      transparent: true,
      opacity: 0.16,
    });

    // Create 4 subtle anatomical torso ring markers at shoulder, mid-chest, lower ribs, pelvis
    const ringHeights = [4.8, 1.5, -2.2, -6.0];
    const ringScales = [1.35, 1.2, 1.05, 1.15];
    ringHeights.forEach((h, idx) => {
      const ring = new THREE.LineLoop(torsoLoopGeo, torsoOutlineMat);
      ring.position.y = h;
      ring.scale.set(ringScales[idx], 1, ringScales[idx] * 0.9);
      masterGroup.add(ring);
    });

    // Vertebrae generation definition
    // 7 Cervical (C1-C7), 12 Thoracic (T1-T12), 5 Lumbar (L1-L5), Sacrum
    const vertebraeData: {
      id: string;
      label: string;
      region: SpineSection;
      y: number;
      bodyRadius: number;
      bodyHeight: number;
      processLength: number;
      curvatureZ: number;
      tiltX: number;
    }[] = [];

    let currentY = 5.6;

    // Cervical (C1 to C7) - Lordosis (curves anteriorly / forward in Z)
    for (let i = 1; i <= 7; i++) {
      const curve = Math.sin((i / 7) * Math.PI) * 0.45;
      vertebraeData.push({
        id: `c${i}`,
        label: `C${i} Cervical`,
        region: 'cervical',
        y: currentY,
        bodyRadius: 0.65 + i * 0.03,
        bodyHeight: 0.32,
        processLength: 0.75 + i * 0.05,
        curvatureZ: curve,
        tiltX: -0.04,
      });
      currentY -= 0.42;
    }

    // Thoracic (T1 to T12) - Kyphosis (curves posteriorly / backward in Z)
    for (let i = 1; i <= 12; i++) {
      const curve = -Math.sin((i / 12) * Math.PI) * 0.7;
      vertebraeData.push({
        id: `t${i}`,
        label: `T${i} Thoracic`,
        region: 'thoracic',
        y: currentY,
        bodyRadius: 0.88 + i * 0.04,
        bodyHeight: 0.38,
        processLength: 1.15 + i * 0.04,
        curvatureZ: curve,
        tiltX: 0.03,
      });
      currentY -= 0.48;
    }

    // Lumbar (L1 to L5) - Lordosis (curves anteriorly / inward)
    for (let i = 1; i <= 5; i++) {
      const curve = Math.sin((i / 5) * Math.PI) * 0.55;
      vertebraeData.push({
        id: `l${i}`,
        label: `L${i} Lumbar`,
        region: 'lumbar',
        y: currentY,
        bodyRadius: 1.35 + i * 0.06,
        bodyHeight: 0.46,
        processLength: 1.45,
        curvatureZ: curve,
        tiltX: -0.05,
      });
      currentY -= 0.58;
    }

    const discs: THREE.Mesh[] = [];

    // Assemble each vertebra composite
    vertebraeData.forEach((v) => {
      const vertebraGroup = new THREE.Group();
      vertebraGroup.name = v.id;
      vertebraGroup.position.set(0, v.y, v.curvatureZ);
      vertebraGroup.rotation.x = v.tiltX;

      // 1. Vertebral body (Cylinder with rounded bevel appearance)
      const bodyGeo = new THREE.CylinderGeometry(
        v.bodyRadius * 0.95,
        v.bodyRadius,
        v.bodyHeight,
        24
      );
      const bodyMesh = new THREE.Mesh(bodyGeo, boneMaterial);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      vertebraGroup.add(bodyMesh);

      // 2. Posterior spinous process (Back bone protrusion)
      const spineProcessGeo = new THREE.ConeGeometry(v.bodyRadius * 0.4, v.processLength, 12);
      const spineProcessMesh = new THREE.Mesh(spineProcessGeo, boneMaterial);
      spineProcessMesh.rotation.x = Math.PI / 2 + 0.2;
      spineProcessMesh.position.set(0, -0.05, -v.processLength * 0.5 - 0.2);
      vertebraGroup.add(spineProcessMesh);

      // 3. Left & Right transverse processes (Lateral side wings)
      const transProcessGeo = new THREE.CylinderGeometry(0.12, 0.22, v.bodyRadius * 1.5, 8);
      const leftTransMesh = new THREE.Mesh(transProcessGeo, boneMaterial);
      leftTransMesh.rotation.z = Math.PI / 2.3;
      leftTransMesh.rotation.y = -0.3;
      leftTransMesh.position.set(-v.bodyRadius * 1.1, 0, -0.2);
      vertebraGroup.add(leftTransMesh);

      const rightTransMesh = new THREE.Mesh(transProcessGeo, boneMaterial);
      rightTransMesh.rotation.z = -Math.PI / 2.3;
      rightTransMesh.rotation.y = 0.3;
      rightTransMesh.position.set(v.bodyRadius * 1.1, 0, -0.2);
      vertebraGroup.add(rightTransMesh);

      // 4. Intervertebral Disc underneath
      const discGeo = new THREE.CylinderGeometry(
        v.bodyRadius * 0.92,
        v.bodyRadius * 0.92,
        0.12,
        24
      );
      const discMesh = new THREE.Mesh(discGeo, discMaterial.clone());
      discMesh.position.set(0, -v.bodyHeight * 0.5 - 0.06, 0);
      vertebraGroup.add(discMesh);
      discs.push(discMesh);

      masterGroup.add(vertebraGroup);
    });
    spineDiscsRef.current = discs;

    // Sacrum and Coccyx base
    const sacrumGeo = new THREE.ConeGeometry(1.7, 2.2, 16);
    const sacrumMesh = new THREE.Mesh(sacrumGeo, boneMaterial);
    sacrumMesh.position.set(0, currentY - 0.8, -0.2);
    sacrumMesh.rotation.x = Math.PI + 0.25;
    masterGroup.add(sacrumMesh);

    // Spinal Cord (Central neural pathway with cyan glow)
    const cordCurvePoints: THREE.Vector3[] = [];
    vertebraeData.forEach((v) => {
      cordCurvePoints.push(new THREE.Vector3(0, v.y, v.curvatureZ - 0.22));
    });
    const cordCurve = new THREE.CatmullRomCurve3(cordCurvePoints);
    const cordGeo = new THREE.TubeGeometry(cordCurve, 40, 0.2, 12, false);
    const cordMesh = new THREE.Mesh(cordGeo, neuralCordMat);
    masterGroup.add(cordMesh);
    spinalCordRef.current = cordMesh;

    // 7. Ambient Glowing Bio-energy Particles
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 3.5;
      const y = -7 + Math.random() * 14;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.005,
        y: 0.008 + Math.random() * 0.012,
        z: (Math.random() - 0.5) * 0.005,
      });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Create soft particle circular texture procedurally
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(22, 184, 166, 1)');
      gradient.addColorStop(0.4, 'rgba(56, 189, 248, 0.6)');
      gradient.addColorStop(1, 'rgba(16, 36, 58, 0)');
      pCtx.fillStyle = gradient;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.45,
      map: pTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);
    particlesRef.current = particles;

    // Center spine vertically
    masterGroup.position.y = 0.5;

    // 8. Pointer Event Handlers for Parallax & Orbit
    const handlePointerDown = (e: PointerEvent) => {
      isPointerDownRef.current = true;
      prevPointerPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      if (isPointerDownRef.current) {
        const deltaX = e.clientX - prevPointerPosRef.current.x;
        const deltaY = e.clientY - prevPointerPosRef.current.y;
        targetRotationRef.current.y += deltaX * 0.008;
        targetRotationRef.current.x += deltaY * 0.005;
        prevPointerPosRef.current = { x: e.clientX, y: e.clientY };
      } else {
        // Subtle ambient parallax
        targetRotationRef.current.y = relX * 0.45;
        targetRotationRef.current.x = -relY * 0.35 + 0.05;
      }
    };

    const handlePointerUp = () => {
      isPointerDownRef.current = false;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 9. Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let frameId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating breathing motion
      if (spineGroupRef.current) {
        spineGroupRef.current.position.y = 0.4 + Math.sin(elapsedTime * 1.2) * 0.22;

        if (isRotating && !isPointerDownRef.current) {
          targetRotationRef.current.y += delta * 0.25;
        }

        // Smooth damping interpolation
        spineGroupRef.current.rotation.y = THREE.MathUtils.damp(
          spineGroupRef.current.rotation.y,
          targetRotationRef.current.y,
          4,
          delta
        );
        spineGroupRef.current.rotation.x = THREE.MathUtils.damp(
          spineGroupRef.current.rotation.x,
          targetRotationRef.current.x,
          4,
          delta
        );
      }

      // Smooth camera section transition
      if (cameraRef.current) {
        cameraRef.current.position.y = THREE.MathUtils.damp(
          cameraRef.current.position.y,
          targetCameraYRef.current,
          3.5,
          delta
        );
        cameraRef.current.position.z = THREE.MathUtils.damp(
          cameraRef.current.position.z,
          targetCameraZRef.current,
          3.5,
          delta
        );
      }

      // Bioluminescent spinal cord pulse
      if (spinalCordRef.current) {
        const mat = spinalCordRef.current.material as THREE.MeshPhysicalMaterial;
        mat.emissiveIntensity = 1.0 + Math.sin(elapsedTime * 2.5) * 0.4;
      }

      // Animate bio-particles rising
      if (particlesRef.current) {
        const posAttr = particlesRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleVelocities[i].y;
          if (positions[i * 3 + 1] > 7.5) {
            positions[i * 3 + 1] = -7.5;
          }
        }
        posAttr.needsUpdate = true;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement && container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      pTexture.dispose();
      boneMaterial.dispose();
      discMaterial.dispose();
      neuralCordMat.dispose();
      particleMat.dispose();
    };
  }, [isRotating]);

  // Handle Section Camera Shifts
  const handleSectionSelect = (section: SpineSection) => {
    setActiveSection(section);
    if (section === 'cervical') {
      targetCameraYRef.current = 4.2;
      targetCameraZRef.current = 11;
      setSelectedVertebra('C1-C7 Cervical Vertebrae (Neck & Posture Support)');
    } else if (section === 'thoracic') {
      targetCameraYRef.current = 0.5;
      targetCameraZRef.current = 13;
      setSelectedVertebra('T1-T12 Thoracic Vertebrae (Mid-Back & Ribcage Mobility)');
    } else if (section === 'lumbar') {
      targetCameraYRef.current = -3.8;
      targetCameraZRef.current = 11;
      setSelectedVertebra('L1-L5 Lumbar Spine & Sacrum (Weight Bearing & Core Base)');
    } else {
      targetCameraYRef.current = 0;
      targetCameraZRef.current = 18;
      setSelectedVertebra('Full Anatomical Spine (Lordotic & Kyphotic Curvature)');
    }
  };

  // Toggle glow intensity
  const toggleGlow = () => {
    const next = !glowIntensity;
    setGlowIntensity(next);
    spineDiscsRef.current.forEach((disc) => {
      const mat = disc.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = next ? 0.9 : 0.2;
    });
  };

  return (
    <div className={`relative w-full h-full min-h-[480px] md:min-h-[560px] flex flex-col items-center justify-center select-none overflow-hidden ${className}`}>
      {/* 3D WebGL Canvas Mounting Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing absolute inset-0 z-0"
        title="Click and drag to rotate the 3D anatomical spine"
      />

      {/* Floating Anatomical Badge - Top Left */}
      <div className="absolute top-4 left-4 z-10 pointer-events-auto bg-white/80 backdrop-blur-md border border-slate-200/90 rounded-xl p-3 shadow-sm max-w-[280px]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#10243A] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#16B8A6]" />
          <span>Interactive 3D Spine</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {selectedVertebra || 'Cervical, Thoracic & Lumbar anatomy with disc hydration glow.'}
        </p>
        <div className="mt-2 text-[11px] text-slate-400">
          Rotate: Drag mouse or swipe · Focus sections below
        </div>
      </div>

      {/* Collapsible Bottom Control Dock (Zero Viewport Occlusion as per Skill Guidelines) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[94%] max-w-[580px] pointer-events-auto transition-all duration-300">
        {/* Collapse / Expand Toggle Button */}
        <div className="flex justify-center -mb-2">
          <button
            onClick={() => setHudCollapsed(!hudCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90 rounded-full text-xs font-medium shadow-sm transition-all"
            aria-label={hudCollapsed ? "Expand 3D Controls" : "Collapse 3D Controls"}
          >
            <SlidersHorizontal className="w-3 h-3 text-[#16B8A6]" />
            <span>{hudCollapsed ? "Show 3D Anatomy Controls" : "Hide Controls"}</span>
            {hudCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Control Dock Panel */}
        {!hudCollapsed && (
          <div className="bg-white/90 backdrop-blur-lg border border-slate-200/90 rounded-2xl p-2.5 shadow-lg mt-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {/* Region Selector Pills */}
              <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl">
                <button
                  onClick={() => handleSectionSelect('all')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeSection === 'all'
                      ? 'bg-white text-[#10243A] shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Full Spine
                </button>
                <button
                  onClick={() => handleSectionSelect('cervical')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeSection === 'cervical'
                      ? 'bg-white text-[#10243A] shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Cervical (Neck)
                </button>
                <button
                  onClick={() => handleSectionSelect('thoracic')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeSection === 'thoracic'
                      ? 'bg-white text-[#10243A] shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Thoracic (Mid)
                </button>
                <button
                  onClick={() => handleSectionSelect('lumbar')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeSection === 'lumbar'
                      ? 'bg-white text-[#10243A] shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Lumbar (Lower)
                </button>
              </div>

              {/* Utility Toggles: Rotation and Glow */}
              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className={`p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
                    isRotating
                      ? 'bg-[#16B8A6]/10 border-[#16B8A6]/30 text-[#10243A]'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                  title={isRotating ? "Pause automatic rotation" : "Enable rotation"}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                  <span className="hidden sm:inline text-[11px]">{isRotating ? 'Auto' : 'Paused'}</span>
                </button>

                <button
                  onClick={toggleGlow}
                  className={`p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
                    glowIntensity
                      ? 'bg-[#16B8A6]/10 border-[#16B8A6]/30 text-[#10243A]'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                  title="Toggle neural energy glow"
                >
                  <Eye className="w-3.5 h-3.5 text-[#16B8A6]" />
                  <span className="hidden sm:inline text-[11px]">Neural Glow</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
