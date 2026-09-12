'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const links = {
  github: 'https://github.com/Meetgajera16?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/meet-gajera-415333246/',
  email: 'mailto:meetgajera16@gmail.com',
  resume: '/resume',
}

const experience = [
  {
    title: 'Data Analytics Intern',
    subtitle: 'Pixbyte Future Tech LLP',
    meta: 'May 2025 – Jul 2025',
    signal: 'Analytics · SQL · BI',
    details: [
      'Built reusable Python and SQL analytics workflows for recurring reporting and validation.',
      'Developed KPI dashboards in Tableau and Excel for operational visibility.',
      'Supported ETL work and translated quantitative findings for technical and business audiences.',
    ],
  },
  {
    title: 'Course Assistant',
    subtitle: 'Stevens Institute of Technology',
    meta: 'Tableau & Excel Recitation Labs',
    signal: 'Communication · Teaching',
    details: [
      'Lead hands-on support for Tableau and Excel recitation labs.',
      'Turn formulas, visualization choices, and troubleshooting into practical explanations.',
      'Help students move from following instructions to independent problem solving.',
    ],
  },
  {
    title: 'Frontend Intern',
    subtitle: 'The Look Agency',
    meta: 'May 2024 – Jul 2024',
    signal: 'Teamwork · Delivery',
    details: [
      'Built responsive client-facing interfaces with HTML, CSS, and JavaScript.',
      'Worked with designers and developers to translate product requirements into usable experiences.',
      'Built cross-functional communication habits in an agile environment.',
    ],
  },
]

const projects = [
  {
    title: 'E-Commerce Revenue Intelligence',
    tag: 'SQL · Python · Business Analytics',
    status: 'Featured analytics project',
    details: '541,909 transactions → cancellations, inventory adjustments, revenue leakage, demand and customer KPIs.',
  },
  {
    title: 'AI Resume + Job Matching',
    tag: 'RAG · LLM · FastAPI',
    status: 'Applied AI system',
    details: 'PDF parsing → embeddings → retrieval → explainable match signals, missing skills, and recommendations.',
  },
  {
    title: 'Employee Attrition Prediction',
    tag: 'Classification · HR Analytics',
    status: 'Machine learning case study',
    details: 'EDA, preprocessing, imbalance handling, model comparison, and decision-focused evaluation.',
  },
  {
    title: 'Recommendation System',
    tag: 'PySpark · Collaborative Filtering',
    status: 'Machine learning system',
    details: 'Spark ALS and matrix factorization for personalized recommendations with held-out evaluation.',
  },
  {
    title: 'Diabetes Prediction',
    tag: 'Classification · Healthcare',
    status: 'Completed ML project',
    details: 'Preprocessing and multiple classifiers using health indicators such as glucose, BMI, age, and blood pressure.',
  },
  {
    title: 'Search Engine',
    tag: 'NLP · Information Retrieval',
    status: 'Python systems project',
    details: 'Crawling, text cleaning, inverted indexing, multi-keyword retrieval, and ranking.',
  },
]

const workSignals = [
  ['Problem Solving', 'Frame the real problem', 'Separate business events from data-quality issues before calculating KPIs.'],
  ['Teamwork', 'Build with people', 'Translate requirements, share progress, surface blockers, and improve the shared outcome.'],
  ['Communication', 'Make complexity clear', 'Teach Tableau and Excel, explain technical choices, and tailor the explanation to the audience.'],
  ['Creativity', 'Create a better route', 'Combine analytical depth, software, and interaction design instead of defaulting to the obvious implementation.'],
  ['Analytical Judgment', 'Test the evidence', 'Inspect edge cases, use decision-appropriate metrics, and challenge assumptions before presenting a result.'],
  ['Ownership', 'Close the loop', 'Move from question → data → analysis/model → validation → explanation → iteration.'],
]

const capabilities = [
  ['Analyze', 'Python · Pandas · NumPy · SQL · PostgreSQL', 'Clean, profile, transform, investigate, and build defensible KPI logic.'],
  ['Model', 'scikit-learn · PyTorch · Classification · Regression · ALS', 'Build predictive and recommendation workflows from preprocessing through evaluation.'],
  ['Reason', 'Probability · Statistics · Regression · Correlation', 'Interpret distributions, relationships, uncertainty, and model behavior.'],
  ['Explain', 'Tableau · Power BI · Excel · Data Storytelling', 'Turn analysis into dashboards, KPIs, and clear recommendations.'],
  ['Scale', 'PySpark · ETL · FastAPI · Git/GitHub · AWS', 'Move beyond notebook-only workflows into APIs, pipelines, and distributed work.'],
  ['Ship', 'Next.js · TypeScript · REST APIs · Jupyter · VS Code', 'Package technical work into something another person can use and explore.'],
]

const capabilityEvidence: Record<string, string> = {
  Analyze: 'Evidence: transaction-level E-Commerce Revenue Intelligence plus reusable Python/SQL analytics workflows.',
  Model: 'Evidence: employee attrition, diabetes classification, and collaborative-filtering recommendation projects.',
  Reason: 'Evidence: data-quality decisions, statistical interpretation, and model-evaluation choices across projects.',
  Explain: 'Evidence: Tableau/Excel recitation teaching, internship KPI reporting, and business-facing project summaries.',
  Scale: 'Evidence: PySpark ALS, ETL support, FastAPI-backed AI work, and reproducible Git/GitHub workflows.',
  Ship: 'Evidence: this interactive portfolio, API-driven AI systems, and prior frontend delivery experience.',
}

export default function SpaceScrollJourney() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const heroCopyRef = useRef<HTMLDivElement | null>(null)
  const heroNameRef = useRef<HTMLHeadingElement | null>(null)
  const [introReady, setIntroReady] = useState(false)
  const [activeExperience, setActiveExperience] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const [activeCapability, setActiveCapability] = useState(0)
  const [experienceDialog, setExperienceDialog] = useState<number | null>(null)
  const [projectDialog, setProjectDialog] = useState<number | null>(null)
  const [capabilityDialog, setCapabilityDialog] = useState<number | null>(null)

  useEffect(() => {
    const closeDialog = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExperienceDialog(null)
        setProjectDialog(null)
        setCapabilityDialog(null)
      }
    }
    window.addEventListener('keydown', closeDialog)
    return () => window.removeEventListener('keydown', closeDialog)
  }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compact = window.innerWidth < 900

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x03050a, 0.012)

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 300)
    camera.position.set(0, 0, 15.5)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.25 : 1.75))
    renderer.setClearColor(0x02040a, 1)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.72
    mount.appendChild(renderer.domElement)

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      compact ? 0.42 : 0.58,
      0.62,
      0.68,
    )
    composer.addPass(bloom)

    const textureCanvas = document.createElement('canvas')
    textureCanvas.width = 256
    textureCanvas.height = 256
    const tctx = textureCanvas.getContext('2d')!
    const glow = tctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    glow.addColorStop(0, 'rgba(255,255,255,1)')
    glow.addColorStop(0.15, 'rgba(255,235,190,.92)')
    glow.addColorStop(0.42, 'rgba(255,150,55,.35)')
    glow.addColorStop(0.72, 'rgba(90,145,255,.08)')
    glow.addColorStop(1, 'rgba(0,0,0,0)')
    tctx.fillStyle = glow
    tctx.fillRect(0, 0, 256, 256)
    const glowTexture = new THREE.CanvasTexture(textureCanvas)

    // Deep star volume.
    const starCount = prefersReducedMotion ? 1800 : compact ? 3800 : 7000
    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)
    const white = new THREE.Color(0xffffff)
    const blue = new THREE.Color(0x91b9ff)
    const warm = new THREE.Color(0xffb566)

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      starPositions[i3] = (Math.random() - 0.5) * 180
      starPositions[i3 + 1] = (Math.random() - 0.5) * 95
      starPositions[i3 + 2] = (Math.random() - 0.5) * 180
      const pick = Math.random()
      const color = pick < 0.78 ? white : pick < 0.92 ? blue : warm
      starColors[i3] = color.r
      starColors[i3 + 1] = color.g
      starColors[i3 + 2] = color.b
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        size: compact ? 0.032 : 0.024,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    scene.add(stars)

    // Sparse blue-white galactic dust.
    const dustCount = prefersReducedMotion ? 500 : compact ? 1200 : 2600
    const dustGeometry = new THREE.BufferGeometry()
    const dustPositions = new Float32Array(dustCount * 3)
    const dustColors = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3
      const arm = Math.random() > 0.5 ? 1 : -1
      const t = (Math.random() - 0.5) * 2
      dustPositions[i3] = t * 35 + (Math.random() - 0.5) * 10
      dustPositions[i3 + 1] = Math.sin(t * 2.3) * 5.5 * arm + (Math.random() - 0.5) * 7
      dustPositions[i3 + 2] = -25 - Math.random() * 45
      const color = Math.random() < 0.65 ? blue : warm
      dustColors[i3] = color.r
      dustColors[i3 + 1] = color.g
      dustColors[i3 + 2] = color.b
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    dustGeometry.setAttribute('color', new THREE.BufferAttribute(dustColors, 3))
    const dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    scene.add(dust)

    // Cinematic black hole: a custom GLSL renderer replaces the old sphere + torus stack.
    // The shader draws the event horizon, turbulent accretion flow, photon ring,
    // asymmetric Doppler brightness and the vertically-lensed back side of the disk.
    const blackHole = new THREE.Group()
    blackHole.position.set(compact ? 1.55 : 4.45, 0.18, -4.35)
    scene.add(blackHole)

    const blackHoleVertex = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const blackHoleFragment = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform float uDive;
      uniform float uPulse;

      #define PI 3.141592653589793

      float hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise2(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
          mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
          f.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 m = mat2(1.63, 1.21, -1.21, 1.63);
        for (int i = 0; i < 6; i++) {
          v += a * noise2(p);
          p = m * p + 0.17;
          a *= 0.5;
        }
        return v;
      }

      float ridge(vec2 p) {
        float n = fbm(p);
        return 1.0 - abs(2.0 * n - 1.0);
      }

      mat2 rot(float a) {
        float c = cos(a), s = sin(a);
        return mat2(c, -s, s, c);
      }

      vec3 blackbody(float heat) {
        heat = clamp(heat, 0.0, 1.0);
        vec3 red = vec3(0.80, 0.075, 0.012);
        vec3 orange = vec3(1.0, 0.26, 0.035);
        vec3 gold = vec3(1.0, 0.57, 0.14);
        vec3 cream = vec3(1.0, 0.84, 0.55);
        vec3 white = vec3(1.0, 0.985, 0.94);
        vec3 c = mix(red, orange, smoothstep(0.0, 0.28, heat));
        c = mix(c, gold, smoothstep(0.22, 0.52, heat));
        c = mix(c, cream, smoothstep(0.48, 0.78, heat));
        c = mix(c, white, smoothstep(0.76, 1.0, heat));
        return c;
      }

      float ringBand(float r, float center, float width) {
        return exp(-pow((r - center) / width, 2.0));
      }

      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        p.x *= 1.48;
        p = rot(-0.035) * p;

        float t = uTime;
        float horizon = 0.318;
        float r = length(p);
        float angle = atan(p.y, p.x);

        vec3 col = vec3(0.0);
        float alpha = 0.0;

        // ---------- Outer gravitational environment ----------
        // Very low-intensity halo. This should frame the object, not wash it out.
        float halo = ringBand(r, 0.50, 0.19) * (1.0 - smoothstep(0.78, 1.18, r));
        col += vec3(0.50, 0.11, 0.025) * halo * (0.22 + 0.04 * uPulse);
        alpha = max(alpha, halo * 0.11);

        // ---------- Accretion disk ----------
        // Projected disk: thin vertically, broad horizontally, slightly warped.
        vec2 dq = vec2(p.x, (p.y + 0.012) / 0.205);
        float dr = length(dq);
        float da = atan(dq.y, dq.x);

        float innerMask = smoothstep(0.42, 0.50, dr);
        float outerMask = 1.0 - smoothstep(1.46, 1.72, dr);
        float annulus = innerMask * outerMask;

        // Domain-warped spiral turbulence gives the disk continuous filaments
        // instead of a flat torus / particle band.
        float warpA = fbm(vec2(da * 1.9 - t * 0.030, dr * 5.6 + t * 0.045));
        float warpB = fbm(vec2(da * 4.8 + warpA * 2.0 + t * 0.018, dr * 12.0 - t * 0.09));
        float fine = ridge(vec2(da * 10.0 - t * 0.10, dr * 26.0 + warpB * 4.0));
        float spiral1 = 0.5 + 0.5 * sin(da * 17.0 - dr * 34.0 + t * 0.55 + warpA * 5.2);
        float spiral2 = 0.5 + 0.5 * sin(da * 31.0 - dr * 58.0 - t * 0.82 + warpB * 5.0);
        float filaments = clamp(
          0.20 + warpA * 0.32 + warpB * 0.20 + fine * 0.14 + spiral1 * 0.09 + spiral2 * 0.05,
          0.0,
          1.0
        );
        filaments = pow(filaments, 1.30);

        float heat = 1.0 - smoothstep(0.46, 1.48, dr);
        float approaching = 0.5 + 0.5 * cos(da - 0.10);
        float doppler = mix(0.58, 1.34, pow(approaching, 2.1));
        float density = annulus * filaments * (0.52 + 0.90 * heat) * doppler;

        vec3 diskColor = blackbody(heat) * density * 1.08;

        // Back side of the disk first. It disappears beneath the horizon later.
        float backSide = smoothstep(-0.08, 0.20, dq.y);
        col += diskColor * backSide * 0.78;
        alpha = max(alpha, density * backSide * 0.58);

        // ---------- Gravitational lensing arcs ----------
        // The far side of the disk appears above and below the event horizon.
        vec2 lq = vec2(p.x, p.y / 0.72);
        float lr = length(lq);
        float la = atan(lq.y, lq.x);
        float lensWarp = fbm(vec2(la * 3.0 + t * 0.022, lr * 18.0 - t * 0.045));

        float lensRadius = 0.455 + (lensWarp - 0.5) * 0.018;
        float lens = ringBand(lr, lensRadius, 0.020 + lensWarp * 0.010);
        float verticalGate = smoothstep(0.105, 0.19, abs(p.y));
        float horizontalGate = 1.0 - smoothstep(0.66, 1.18, abs(p.x));
        lens *= verticalGate * horizontalGate;

        // Secondary broader arcs make the top wrap read like the reference,
        // but remain warm and textured instead of clipping to white.
        vec2 lq2 = vec2(p.x * 0.94, p.y / 0.91);
        float lr2 = length(lq2);
        float lens2Noise = fbm(vec2(la * 5.4 - t * 0.035, lr2 * 22.0));
        float lens2 = ringBand(lr2, 0.565, 0.035 + 0.012 * lens2Noise);
        lens2 *= smoothstep(0.13, 0.25, abs(p.y));
        lens2 *= 1.0 - smoothstep(0.74, 1.28, abs(p.x));
        lens2 *= 0.36 + 0.54 * lens2Noise;

        float lensSide = mix(0.70, 1.28, pow(0.5 + 0.5 * cos(la - 0.12), 1.8));
        vec3 lensColor = mix(
          vec3(1.0, 0.29, 0.045),
          vec3(1.0, 0.86, 0.58),
          clamp(0.35 + lensWarp * 0.72, 0.0, 1.0)
        );
        col += lensColor * lens * 1.14 * lensSide;
        col += lensColor * lens2 * 0.62 * lensSide;
        alpha = max(alpha, lens * 0.82);
        alpha = max(alpha, lens2 * 0.40);

        // ---------- Event horizon ----------
        // The silhouette is always true black and fully opaque.
        float horizonAA = 0.006;
        float horizonMask = 1.0 - smoothstep(horizon - horizonAA, horizon + horizonAA, r);
        col = mix(col, vec3(0.0), horizonMask);
        alpha = max(alpha, horizonMask);

        // Photon ring: thin, crisp, and warmer than pure white.
        float photon = ringBand(r, horizon * 1.020, 0.0085);
        float photonBoost = mix(0.72, 1.20, pow(0.5 + 0.5 * cos(angle - 0.10), 2.0));
        vec3 photonColor = mix(vec3(1.0, 0.33, 0.055), vec3(1.0, 0.90, 0.69), 0.62 + 0.28 * uPulse);
        col += photonColor * photon * 1.20 * photonBoost;
        alpha = max(alpha, photon * 0.90);

        // Front side overlays the lower edge after the horizon is drawn.
        float frontSide = 1.0 - smoothstep(-0.22, 0.015, dq.y);
        float frontDensity = density * frontSide;
        col += diskColor * frontSide * 0.88;
        alpha = max(alpha, frontDensity * 0.60);

        // Broken equatorial light line – deliberately NOT a solid white beam.
        float eqNoise = fbm(vec2(p.x * 10.0 - t * 0.12, 3.7));
        float equator = exp(-pow(p.y / 0.0115, 2.0));
        float eqGate = smoothstep(horizon * 0.94, horizon * 1.08, abs(p.x));
        eqGate *= 1.0 - smoothstep(1.08, 1.55, abs(p.x));
        float brokenEq = smoothstep(0.32, 0.82, eqNoise);
        float flare = equator * eqGate * (0.28 + 0.72 * brokenEq);
        col += vec3(1.0, 0.49, 0.12) * flare * 0.72;
        alpha = max(alpha, flare * 0.40);

        // ---------- Outer flowing plasma ----------
        // Broad turbulent sheets around the disk, especially on the right side.
        vec2 oq = vec2(p.x, p.y / 0.36);
        float orad = length(oq);
        float oa = atan(oq.y, oq.x);
        float outerNoise = fbm(vec2(oa * 4.2 - t * 0.018, orad * 9.5 + t * 0.025));
        float outerBand = smoothstep(0.92, 1.04, orad) * (1.0 - smoothstep(1.30, 1.62, orad));
        float outerFilaments = pow(clamp(outerNoise * 1.10, 0.0, 1.0), 2.2);
        float outerSide = mix(0.42, 1.0, 0.5 + 0.5 * cos(oa - 0.15));
        vec3 outerColor = mix(vec3(0.30, 0.08, 0.13), vec3(1.0, 0.31, 0.07), outerNoise);
        col += outerColor * outerBand * outerFilaments * outerSide * 0.56;
        alpha = max(alpha, outerBand * outerFilaments * 0.22);

        // Controlled highlight response. Keep the black hole readable and stop bloom white-out.
        col *= mix(0.86, 0.98, uDive);
        col = 1.0 - exp(-col * 0.92);
        col = pow(col, vec3(0.94));

        if (alpha < 0.006) discard;
        gl_FragColor = vec4(clamp(col, 0.0, 1.0), clamp(alpha, 0.0, 1.0));
      }
    `

    const blackHoleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDive: { value: 0 },
        uPulse: { value: 0 },
      },
      vertexShader: blackHoleVertex,
      fragmentShader: blackHoleFragment,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending,
    })

    const blackHoleVisual = new THREE.Mesh(
      new THREE.PlaneGeometry(compact ? 9.8 : 11.8, compact ? 6.3 : 7.6, 1, 1),
      blackHoleMaterial,
    )
    blackHole.add(blackHoleVisual)

    // Procedural deep-space nebula. This keeps the background fully dynamic too.
    const nebulaMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: blackHoleVertex,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        float hash(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }
        float n2(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
        float fbm2(vec2 p){ float v=0.0,a=.5; mat2 m=mat2(1.7,1.2,-1.2,1.7); for(int i=0;i<6;i++){v+=n2(p)*a;p=m*p+.13;a*=.5;} return v; }
        void main(){
          vec2 p=(vUv-.5)*vec2(2.0,1.12);
          float t=uTime*.012;
          float a=fbm2(p*2.2+vec2(t,-t*.55));
          float b=fbm2(p*4.5+vec2(-t*.7,t*.35)+a*.7);
          float c=fbm2(p*8.0-vec2(t*.45,t*.2));
          float lane=smoothstep(.42,.78,a*.68+b*.45);
          float spark=pow(max(0.0,c-.72),3.0)*9.0;
          vec3 navy=vec3(.006,.013,.034);
          vec3 blue=vec3(.06,.19,.42);
          vec3 violet=vec3(.20,.07,.28);
          vec3 ember=vec3(.42,.10,.035);
          vec3 col=navy;
          col+=blue*pow(a,2.4)*.7;
          col+=violet*pow(b,3.0)*.42;
          col+=ember*pow(max(0.0,b-a*.35),3.0)*.5;
          col+=vec3(.55,.72,1.0)*spark;
          float vignette=1.0-smoothstep(.45,1.1,length(p));
          col*=.78+.45*vignette;
          gl_FragColor=vec4(col,.88);
        }
      `,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      side: THREE.DoubleSide,
    })
    const nebula = new THREE.Mesh(new THREE.PlaneGeometry(320, 180), nebulaMaterial)
    nebula.position.set(0, 0, -70)
    scene.add(nebula)

    // Warp streaks appear only while the camera is being pulled into the event horizon.
    const warpCount = prefersReducedMotion ? 120 : compact ? 360 : 760
    const warpGeometry = new THREE.BufferGeometry()
    const warpPositions = new Float32Array(warpCount * 6)
    const warpColors = new Float32Array(warpCount * 6)
    for (let i = 0; i < warpCount; i++) {
      const i6 = i * 6
      const a = Math.random() * Math.PI * 2
      const r = 1.4 + Math.pow(Math.random(), 0.55) * 12
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r * 0.58
      const z = -4 - Math.random() * 26
      const stretch = 1.05 + Math.random() * 0.16
      warpPositions[i6] = x
      warpPositions[i6 + 1] = y
      warpPositions[i6 + 2] = z
      warpPositions[i6 + 3] = x * stretch
      warpPositions[i6 + 4] = y * stretch
      warpPositions[i6 + 5] = z + 1.2 + Math.random() * 2.6
      const wc = Math.random() < 0.2 ? blue : Math.random() < 0.35 ? warm : white
      for (let j = 0; j < 2; j++) {
        warpColors[i6 + j * 3] = wc.r
        warpColors[i6 + j * 3 + 1] = wc.g
        warpColors[i6 + j * 3 + 2] = wc.b
      }
    }
    warpGeometry.setAttribute('position', new THREE.BufferAttribute(warpPositions, 3))
    warpGeometry.setAttribute('color', new THREE.BufferAttribute(warpColors, 3))
    const warpMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const warpStreaks = new THREE.LineSegments(warpGeometry, warpMaterial)
    scene.add(warpStreaks)

    // Distant planet on the left, as in the approved composition.
    const planetGroup = new THREE.Group()
    planetGroup.position.set(compact ? -5.6 : -8.2, -0.7, -7.5)
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(2.3, 96, 96),
      new THREE.MeshStandardMaterial({ color: 0x0b1423, roughness: 0.9, metalness: 0.05 }),
    )
    planetGroup.add(planet)
    const atmosphere = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0x7eb1ff,
        transparent: true,
        opacity: 0.19,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    atmosphere.scale.set(6.2, 6.2, 1)
    planetGroup.add(atmosphere)
    scene.add(planetGroup)

    const keyLight = new THREE.DirectionalLight(0xffd5a0, 3.2)
    keyLight.position.set(5, 2.5, 5)
    scene.add(keyLight)
    scene.add(new THREE.AmbientLight(0x28405e, 0.7))

    // Asteroids: procedurally deformed rock, not smooth spheres.
    const asteroidCount = prefersReducedMotion ? 32 : compact ? 68 : 128

    const asteroidGeometry = new THREE.IcosahedronGeometry(0.19, 2)
    const asteroidPositions = asteroidGeometry.attributes.position as THREE.BufferAttribute
    const craterDirs = [
      new THREE.Vector3(0.72, 0.34, 0.61).normalize(),
      new THREE.Vector3(-0.48, 0.82, 0.31).normalize(),
      new THREE.Vector3(0.22, -0.56, -0.79).normalize(),
    ]

    for (let i = 0; i < asteroidPositions.count; i++) {
      const x = asteroidPositions.getX(i)
      const y = asteroidPositions.getY(i)
      const z = asteroidPositions.getZ(i)
      const dir = new THREE.Vector3(x, y, z).normalize()

      const low =
        Math.sin(dir.x * 7.4 + dir.y * 2.7) * 0.08 +
        Math.sin(dir.y * 10.1 - dir.z * 4.4) * 0.055 +
        Math.sin((dir.x + dir.z) * 15.7) * 0.032
      const high =
        Math.sin(dir.x * 31.0 + dir.z * 19.0) *
        Math.sin(dir.y * 27.0 - dir.x * 9.0) *
        0.025

      let crater = 0
      craterDirs.forEach((c, index) => {
        const d = dir.dot(c)
        const rim = THREE.MathUtils.smoothstep(d, 0.88 - index * 0.012, 0.965 - index * 0.006)
        const pit = THREE.MathUtils.smoothstep(d, 0.95 - index * 0.008, 0.992)
        crater += rim * 0.035 - pit * (0.08 + index * 0.012)
      })

      const radius = 1 + low + high + crater
      asteroidPositions.setXYZ(i, x * radius, y * radius, z * radius)
    }
    asteroidPositions.needsUpdate = true
    asteroidGeometry.computeVertexNormals()

    const asteroidMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      metalness: 0.015,
      vertexColors: false,
    })
    const asteroids = new THREE.InstancedMesh(asteroidGeometry, asteroidMaterial, asteroidCount)
    const asteroidData: {
      pos: THREE.Vector3
      velocity: THREE.Vector3
      scale: number
      shapeScale: THREE.Vector3
      rot: THREE.Euler
      spin: THREE.Vector3
      driftAmp: THREE.Vector2
      driftSpeed: THREE.Vector2
      driftPhase: number
      lane: 'free' | 'belt' | 'foreground'
      orbitRadius: number
      orbitAngle: number
      orbitSpeed: number
      orbitLift: number
    }[] = []
    const matrix = new THREE.Matrix4()
    const quat = new THREE.Quaternion()
    const scaleVec = new THREE.Vector3()

    const resetAsteroid = (item: (typeof asteroidData)[number], lane = item.lane) => {
      item.lane = lane
      if (lane === 'belt') {
        item.orbitRadius = 4.2 + Math.random() * 5.1
        item.orbitAngle = Math.random() * Math.PI * 2
        item.orbitSpeed = (Math.random() > 0.5 ? 1 : -1) * (0.06 + Math.random() * 0.14)
        item.orbitLift = (Math.random() - 0.5) * 0.9
        item.pos.set(
          blackHole.position.x + Math.cos(item.orbitAngle) * item.orbitRadius,
          blackHole.position.y + item.orbitLift,
          blackHole.position.z + Math.sin(item.orbitAngle) * item.orbitRadius * 0.28,
        )
        item.velocity.set(0, 0, 0)
      } else {
        const foreground = lane === 'foreground'
        item.pos.set(
          12 + Math.random() * 10,
          (Math.random() - 0.5) * (foreground ? 13 : 10),
          foreground ? -1 - Math.random() * 5 : -5 - Math.random() * 18,
        )
        item.velocity.set(
          -(0.45 + Math.random() * (foreground ? 0.95 : 0.42)),
          (Math.random() - 0.5) * 0.07,
          0.03 + Math.random() * (foreground ? 0.16 : 0.06),
        )
      }
      item.driftPhase = Math.random() * Math.PI * 2
      item.driftAmp.set(0.08 + Math.random() * 0.3, 0.06 + Math.random() * 0.22)
      item.driftSpeed.set(0.45 + Math.random() * 0.75, 0.25 + Math.random() * 0.55)
    }

    for (let i = 0; i < asteroidCount; i++) {
      const lane: 'free' | 'belt' | 'foreground' =
        i < asteroidCount * 0.18 ? 'belt' : i < asteroidCount * 0.33 ? 'foreground' : 'free'
      const s =
        lane === 'foreground'
          ? 0.85 + Math.random() * 1.8
          : lane === 'belt'
            ? 0.28 + Math.random() * 0.55
            : 0.22 + Math.random() * 0.78
      const rot = new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6)
      const item = {
        pos: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        scale: s,
        shapeScale: new THREE.Vector3(
          0.72 + Math.random() * 0.68,
          0.62 + Math.random() * 0.76,
          0.68 + Math.random() * 0.72,
        ),
        rot,
        spin: new THREE.Vector3(
          (Math.random() - 0.5) * 0.65,
          (Math.random() - 0.5) * 0.65,
          (Math.random() - 0.5) * 0.65,
        ),
        driftAmp: new THREE.Vector2(),
        driftSpeed: new THREE.Vector2(),
        driftPhase: Math.random() * Math.PI * 2,
        lane,
        orbitRadius: 0,
        orbitAngle: 0,
        orbitSpeed: 0,
        orbitLift: 0,
      }
      resetAsteroid(item, lane)
      quat.setFromEuler(rot)
      scaleVec.set(
        s * item.shapeScale.x,
        s * item.shapeScale.y,
        s * item.shapeScale.z,
      )
      matrix.compose(item.pos, quat, scaleVec)
      asteroids.setMatrixAt(i, matrix)

      const rockShade = new THREE.Color().setHSL(
        0.06 + Math.random() * 0.035,
        0.10 + Math.random() * 0.08,
        0.13 + Math.random() * 0.13,
      )
      asteroids.setColorAt(i, rockShade)
      asteroidData.push(item)
    }
    asteroids.instanceMatrix.needsUpdate = true
    if (asteroids.instanceColor) asteroids.instanceColor.needsUpdate = true
    scene.add(asteroids)

    // Warm black-hole rim light reveals rocky silhouettes and crater edges.
    const asteroidRimLight = new THREE.PointLight(0xff9b55, 24, 34, 1.7)
    asteroidRimLight.position.set(blackHole.position.x + 0.5, blackHole.position.y + 0.15, blackHole.position.z + 1.4)
    scene.add(asteroidRimLight)

    const asteroidCoolFill = new THREE.DirectionalLight(0x7698d8, 1.15)
    asteroidCoolFill.position.set(-7, 5, 8)
    scene.add(asteroidCoolFill)

    const clock = new THREE.Clock()
    let frame = 0
    let currentScroll = window.scrollY
    let targetScroll = window.scrollY
    let introProgress = 0

    const onScroll = () => { targetScroll = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.05)
      const elapsed = clock.elapsedTime
      currentScroll += (targetScroll - currentScroll) * 0.055
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const scroll = THREE.MathUtils.clamp(currentScroll / maxScroll, 0, 1)
      const firstDive = THREE.MathUtils.smoothstep(scroll, 0.035, 0.19)
      const deepSpace = THREE.MathUtils.smoothstep(scroll, 0.17, 0.42)

      introProgress += prefersReducedMotion ? 0.08 : (1 - introProgress) * 0.018
      const introEase = THREE.MathUtils.smoothstep(introProgress, 0.04, 0.84)

      // Cinematic hero pull: the identity is stretched and dragged toward the black hole
      // instead of simply fading away as the visitor scrolls.
      const heroViewportProgress = THREE.MathUtils.clamp(
        currentScroll / Math.max(1, window.innerHeight * 0.92),
        0,
        1,
      )
      const heroPull = THREE.MathUtils.smoothstep(heroViewportProgress, 0.03, 0.82)
      const heroFade = THREE.MathUtils.smoothstep(heroViewportProgress, 0.58, 0.98)

      if (heroCopyRef.current) {
        const copy = heroCopyRef.current
        copy.style.setProperty('--hero-pull', heroPull.toFixed(4))
        copy.style.opacity = `${introEase * (1 - heroFade * 0.96)}`
        const introX = -26 * (1 - introEase)
        const introY = 12 * (1 - introEase)
        copy.style.transform = `translate3d(${introX + heroPull * 92}px, ${introY - heroPull * 18}px, 0) scale(${1 - heroPull * 0.07})`
        copy.style.filter = `blur(${Math.max(0, heroPull - 0.72) * 8}px)`
      }

      if (heroNameRef.current) {
        const name = heroNameRef.current
        name.style.setProperty('--hero-pull', heroPull.toFixed(4))
        name.style.transform = [
          'perspective(1100px)',
          `translate3d(${heroPull * 235}px, ${heroPull * 5}px, ${-heroPull * 120}px)`,
          `rotateY(${-heroPull * 34}deg)`,
          `rotateZ(${-heroPull * 9}deg)`,
          `skewX(${-heroPull * 6.5}deg)`,
          `scaleX(${1 + heroPull * 0.16})`,
          `scaleY(${1 - heroPull * 0.18})`,
        ].join(' ')
        name.style.letterSpacing = `${-0.04 - heroPull * 0.018}em`
      }

      stars.rotation.y = elapsed * 0.006 + scroll * 0.75
      stars.rotation.x = Math.sin(elapsed * 0.07) * 0.035 + scroll * 0.12
      dust.rotation.z = -0.06 + elapsed * 0.005 - scroll * 0.14

      blackHole.scale.setScalar(THREE.MathUtils.lerp(0.72, 1, introEase) * THREE.MathUtils.lerp(1, 1.38, firstDive))
      blackHole.position.x = THREE.MathUtils.lerp(compact ? 1.55 : 4.45, compact ? 0.40 : 1.18, firstDive)
      blackHole.position.y = 0.22 + Math.sin(elapsed * 0.18) * 0.035
      blackHole.rotation.z = -0.025 + Math.sin(elapsed * 0.065) * 0.012
      blackHoleVisual.quaternion.copy(camera.quaternion)
      blackHoleMaterial.uniforms.uTime.value = elapsed
      blackHoleMaterial.uniforms.uDive.value = firstDive
      blackHoleMaterial.uniforms.uPulse.value = 0.5 + 0.5 * Math.sin(elapsed * 0.9)
      nebulaMaterial.uniforms.uTime.value = elapsed
      nebula.quaternion.copy(camera.quaternion)
      nebula.position.x = camera.position.x
      nebula.position.y = camera.position.y
      warpMaterial.opacity = Math.pow(firstDive * (1 - deepSpace * 0.72), 1.4) * 0.58
      warpStreaks.rotation.z = elapsed * 0.012
      warpStreaks.position.z = firstDive * 3.2

      planet.rotation.y += 0.0008
      planetGroup.position.x = THREE.MathUtils.lerp(compact ? -5.6 : -8.2, -10.5, firstDive)

      const asteroidFlow = 0.18 + firstDive * 3.8
      const blackHoleWorld = blackHole.position
      for (let i = 0; i < asteroidCount; i++) {
        const item = asteroidData[i]
        item.rot.x += item.spin.x * delta * 0.9
        item.rot.y += item.spin.y * delta * 0.9
        item.rot.z += item.spin.z * delta * 0.7

        if (item.lane === 'belt') {
          item.orbitAngle += item.orbitSpeed * delta * (1 + firstDive * 0.85)
          const beltRadiusPulse = 1 + Math.sin(elapsed * 0.6 + item.driftPhase) * 0.025
          item.pos.x = blackHoleWorld.x + Math.cos(item.orbitAngle) * item.orbitRadius * beltRadiusPulse
          item.pos.y = blackHoleWorld.y + item.orbitLift + Math.sin(elapsed * item.driftSpeed.y + item.driftPhase) * 0.12
          item.pos.z =
            blackHoleWorld.z +
            Math.sin(item.orbitAngle) * item.orbitRadius * 0.28 +
            Math.cos(elapsed * item.driftSpeed.x + item.driftPhase) * 0.16
        } else {
          item.pos.x += item.velocity.x * delta * asteroidFlow
          item.pos.y +=
            item.velocity.y * delta * asteroidFlow +
            Math.sin(elapsed * item.driftSpeed.y + item.driftPhase) * item.driftAmp.y * delta
          item.pos.z +=
            item.velocity.z * delta * (0.65 + firstDive * (item.lane === 'foreground' ? 11.5 : 6.4))

          if (item.lane === 'foreground') {
            item.pos.x += Math.sin(elapsed * item.driftSpeed.x + item.driftPhase) * 0.012
          }

          if (item.pos.x < -15 - item.scale * 3.8 || item.pos.z > 6.5) {
            resetAsteroid(item, item.lane)
          }
        }

        const px = item.pos.x + Math.sin(elapsed * item.driftSpeed.x + item.driftPhase) * item.driftAmp.x
        const py = item.pos.y
        const pz = item.pos.z

        quat.setFromEuler(item.rot)
        const diveScaleBoost = item.lane === 'foreground' ? 1 + firstDive * 0.38 : 1 + firstDive * 0.1
        scaleVec.set(
          item.scale * item.shapeScale.x * diveScaleBoost,
          item.scale * item.shapeScale.y * diveScaleBoost,
          item.scale * item.shapeScale.z * diveScaleBoost,
        )
        matrix.compose(new THREE.Vector3(px, py, pz), quat, scaleVec)
        asteroids.setMatrixAt(i, matrix)
      }
      asteroids.instanceMatrix.needsUpdate = true
      asteroidRimLight.position.set(
        blackHole.position.x + 0.45,
        blackHole.position.y + 0.2,
        blackHole.position.z + 1.35,
      )
      asteroidRimLight.intensity = 20 + firstDive * 12 + Math.sin(elapsed * 0.9) * 1.5

      // Camera begins at the approved hero composition, then actually flies toward the hole as the page scrolls.
      const introCamera = new THREE.Vector3(0, 0.12, THREE.MathUtils.lerp(18.5, 15.5, introEase))
      const approachCamera = new THREE.Vector3(1.1, 0.15, 9.2)
      const horizonCamera = new THREE.Vector3(1.2, 0.08, 4.5)
      const deepCamera = new THREE.Vector3(0.2, 0.25, 13.2)

      if (firstDive < 0.55) {
        camera.position.lerpVectors(introCamera, approachCamera, firstDive / 0.55)
      } else if (firstDive < 0.93) {
        camera.position.lerpVectors(approachCamera, horizonCamera, (firstDive - 0.55) / 0.38)
      } else {
        camera.position.lerpVectors(horizonCamera, deepCamera, deepSpace)
      }
      camera.position.x += Math.sin(elapsed * 0.25) * 0.025
      camera.position.y += Math.cos(elapsed * 0.22) * 0.02
      camera.lookAt(
        THREE.MathUtils.lerp(blackHole.position.x, 0, deepSpace),
        THREE.MathUtils.lerp(0.2, 0, deepSpace),
        THREE.MathUtils.lerp(-2.5, -18, deepSpace),
      )

      bloom.strength = 0.56 + firstDive * 0.12 - deepSpace * 0.08
      bloom.radius = 0.62 + firstDive * 0.05

      if (elapsed > (prefersReducedMotion ? 0.1 : 0.75)) setIntroReady(true)
      composer.render()
      frame = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 900 ? 1.25 : 1.75))
      composer.setSize(window.innerWidth, window.innerHeight)
      bloom.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      starGeometry.dispose(); (stars.material as THREE.Material).dispose()
      dustGeometry.dispose(); (dust.material as THREE.Material).dispose()
      blackHoleVisual.geometry.dispose(); blackHoleMaterial.dispose()
      nebula.geometry.dispose(); nebulaMaterial.dispose()
      warpGeometry.dispose(); warpMaterial.dispose()
      planet.geometry.dispose(); (planet.material as THREE.Material).dispose()
      asteroidGeometry.dispose(); asteroidMaterial.dispose()
      glowTexture.dispose()
      composer.dispose(); renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <main className="space-scroll-root">
      <div ref={mountRef} className="space-webgl" aria-hidden="true" />
      <div className="space-global-vignette" aria-hidden="true" />

      <header className="space-nav-shell">
        <button className="space-brand" onClick={() => scrollTo('home')}>GAJERA</button>
        <nav className="space-nav-links" aria-label="Portfolio sections">
          {[
            ['home', 'Home'], ['experience', 'Experience'], ['projects', 'Projects'],
            ['workstyle', 'How I Work'], ['skills', 'Skills'], ['education', 'Education'], ['contact', 'Contact'],
          ].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </nav>
        <div className="space-nav-mantra">DATA · PEOPLE · IMPACT</div>
      </header>

      <section id="home" className={`space-hero ${introReady ? 'is-ready' : ''}`}>
        <div ref={heroCopyRef} className="space-hero-copy">
          <p className="space-kicker">EXPLORING DATA<br />BEYOND BOUNDARIES</p>
          <span className="space-kicker-line" />
          <h1 ref={heroNameRef} className="space-hero-name" data-text="Meet Gajera"><span>Meet</span> Gajera</h1>
          <h2>MS Data Science Candidate</h2>
          <p className="space-hero-lead">
            Building machine-learning and analytics systems<br className="hidden md:block" />
            to turn complex data into meaningful impact.
          </p>
          <div className="space-hero-actions">
            <button className="space-primary-button" onClick={() => scrollTo('experience')}>
              Enter the Black Hole <span>→</span>
            </button>
            <a href={links.resume} className="space-secondary-button">Resume</a>
            <a href={links.github} target="_blank" rel="noreferrer" className="space-secondary-button">GitHub</a>
          </div>
          <div className="space-hero-microcopy">
            <span />
            <p>DEEPER INSIGHTS<br />BRIGHTER SOLUTIONS<br />A LARGER TOMORROW</p>
          </div>
        </div>

        <aside className="space-hero-right-copy">
          <p>SAME DATA.</p>
          <p>A BRIGHTER</p>
          <p>UNIVERSE.</p>
          <span />
        </aside>

        <div className="space-scroll-cue" onClick={() => scrollTo('experience')}>
          <span>SCROLL TO ENTER</span>
          <i />
        </div>
      </section>

      <ScrollSection
        id="experience"
        eyebrow="02 / EXPERIENCE SHAPES PERSPECTIVE"
        title="Experience"
        subtitle="Real work. Deeper impact."
        copy="From learning to building, every experience is a gravity point that shaped how I solve problems, communicate, and work with people."
      >
        <div className="experience-orbit-layout">
          <div className="experience-orbit-center">
            <span>REAL<br />EXPERIENCES</span>
            <strong>A BRIGHTER<br />TOMORROW</strong>
          </div>
          {experience.map((item, index) => (
            <button
              key={item.title}
              className={`experience-orb experience-orb-${index + 1} ${activeExperience === index ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveExperience(index)}
              onClick={() => {
                setActiveExperience(index)
                setExperienceDialog(index)
              }}
            >
              <span className="orb-icon">{index === 0 ? '▥' : index === 1 ? '⌘' : '⌗'}</span>
              <strong>{item.title}</strong>
              <small>{item.signal}</small>
            </button>
          ))}
        </div>
        <p className="experience-click-hint">
          Select an orbit to open role details
        </p>
      </ScrollSection>

      <ScrollSection
        id="projects"
        eyebrow="03 / SELECTED WORK"
        title="Projects in Orbit"
        subtitle="From messy data to usable systems."
        copy="Each project is positioned around a real decision, technical method, and output—not just a list of tools."
      >
        <div className="project-constellation">
          {projects.map((project, index) => (
            <button
              key={project.title}
              className={`project-planet project-planet-${index + 1} ${activeProject === index ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveProject(index)}
              onClick={() => {
                setActiveProject(index)
                setProjectDialog(index)
              }}
            >
              <span className="project-planet-glow" />
              <strong>{project.title}</strong>
              <small>{project.tag}</small>
            </button>
          ))}
          <div className="constellation-core"><span>SELECTED</span><strong>WORK</strong></div>
        </div>
        <p className="experience-click-hint">
          Select a project planet to open details
        </p>
      </ScrollSection>

      <ScrollSection
        id="workstyle"
        eyebrow="04 / HOW I WORK"
        title="Decision Orbit"
        subtitle="Soft skills shown as behavior."
        copy="Recruiters should not have to trust a self-rating. Each signal below is tied to how I actually approach work."
      >
        <div className="signal-grid">
          {workSignals.map(([signal, behavior, proof], index) => (
            <article className="signal-card" key={signal} style={{ '--delay': `${index * 80}ms` } as CSSProperties}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{signal}</p>
              <h3>{behavior}</h3>
              <div className="signal-line" />
              <small>{proof}</small>
            </article>
          ))}
        </div>
      </ScrollSection>

      <ScrollSection
        id="skills"
        eyebrow="05 / TECHNICAL CAPABILITIES"
        title="Capability Constellation"
        subtitle="Tools connected to outcomes."
        copy="Instead of rating myself Advanced or Intermediate, I show what each part of the stack helps me do."
      >
        <div className="capability-grid">
          {capabilities.map(([title, tools, proof], index) => (
            <button
              className={`capability-orb capability-orb-button ${activeCapability === index ? 'is-active' : ''}`}
              key={title}
              onClick={() => {
                setActiveCapability(index)
                setCapabilityDialog(index)
              }}
              onMouseEnter={() => setActiveCapability(index)}
              aria-label={`Show ${title} capability details`}
            >
              <div className="capability-orb-sphere"><span>{String(index + 1).padStart(2, '0')}</span></div>
              <div>
                <h3>{title}</h3>
                <p>{tools}</p>
                <small>{proof}</small>
              </div>
            </button>
          ))}
        </div>
        <p className="experience-click-hint">
          Select a capability to open tools and evidence
        </p>
      </ScrollSection>

      <ScrollSection
        id="education"
        eyebrow="06 / EDUCATION"
        title="Academic Orbit"
        subtitle="Foundations for the systems I build."
        copy="Graduate data-science study and an engineering background anchor the practical work in mathematics, statistics, software, and analytical reasoning."
      >
        <div className="education-grid">
          <article className="education-featured">
            <span>2025 — Present</span>
            <h3>Stevens Institute of Technology</h3>
            <p>Master of Science in Data Science</p>
            <small>Hoboken, New Jersey · Cumulative GPA 3.451 / 4.00 · 20 graduate units earned</small>
            <div className="coursework-cloud" aria-label="Relevant graduate coursework">
              <span>Applied Machine Learning · A</span>
              <span>Foundational Mathematics for Data Science · A-</span>
              <span>Probability Theory · B+</span>
              <span>Data Acquisition / Modeling / Analysis · A-</span>
              <span>Statistical Methods · B</span>
              <span>Optimization for Data Science · B-</span>
            </div>
          </article>
          <article>
            <span>Completed 2025</span>
            <h3>LDRP Institute of Technology & Research</h3>
            <p>Bachelor of Engineering in Information Technology</p>
            <small>Gandhinagar, India</small>
          </article>
        </div>
      </ScrollSection>

      <section id="contact" className="space-contact-section">
        <div className="contact-professional-shell">
          <div className="contact-intro">
            <p className="contact-eyebrow">07 / CONNECT</p>
            <h2>Let&apos;s turn complex data<br />into clear decisions.</h2>
            <p className="contact-summary">
              I&apos;m interested in data science, analytics, and applied machine-learning opportunities where rigorous analysis, clear communication, and thoughtful systems matter.
            </p>
            <div className="contact-role-line">
              <span>DATA SCIENCE</span><i />
              <span>ANALYTICS</span><i />
              <span>APPLIED ML</span>
            </div>
          </div>

          <div className="contact-action-grid">
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="contact-action-card">
              <span>01</span>
              <div><strong>LinkedIn</strong><small>Professional profile & experience</small></div>
              <b>↗</b>
            </a>
            <a href={links.github} target="_blank" rel="noreferrer" className="contact-action-card">
              <span>02</span>
              <div><strong>GitHub</strong><small>Projects, code & implementation</small></div>
              <b>↗</b>
            </a>
            <a href={links.email} className="contact-action-card">
              <span>03</span>
              <div><strong>Email</strong><small>Direct professional contact</small></div>
              <b>↗</b>
            </a>
            <a href={links.resume} className="contact-action-card contact-action-primary">
              <span>04</span>
              <div><strong>Resume</strong><small>Recruiter-ready profile snapshot</small></div>
              <b>→</b>
            </a>
          </div>
        </div>
      </section>

      {experienceDialog !== null && (
        <ExperienceDialog
          item={experience[experienceDialog]}
          onClose={() => setExperienceDialog(null)}
        />
      )}

      {projectDialog !== null && (
        <PortfolioDialog
          kicker="Selected Project"
          title={projects[projectDialog].title}
          subtitle={projects[projectDialog].status}
          signal={projects[projectDialog].tag}
          meta="Project case study"
          details={[projects[projectDialog].details]}
          onClose={() => setProjectDialog(null)}
        />
      )}

      {capabilityDialog !== null && (
        <PortfolioDialog
          kicker="Technical Capability"
          title={capabilities[capabilityDialog][0]}
          subtitle={capabilities[capabilityDialog][1]}
          signal="Tools + Evidence"
          meta="Capability demonstrated through portfolio work"
          details={[
            capabilities[capabilityDialog][2],
            capabilityEvidence[capabilities[capabilityDialog][0]] ?? 'Applied across portfolio projects and coursework.',
          ]}
          onClose={() => setCapabilityDialog(null)}
        />
      )}
    </main>
  )
}

function ScrollSection({ id, eyebrow, title, subtitle, copy, children }: {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  copy: string
  children: ReactNode
}) {
  return (
    <section id={id} className="space-scroll-section">
      <div className="section-reading-panel">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p className="section-copy">{copy}</p>
        <span className="section-rule" />
      </div>
      <div className="section-interaction-panel">{children}</div>
    </section>
  )
}

function ExperienceDialog({ item, onClose }: {
  item: (typeof experience)[number]
  onClose: () => void
}) {
  return (
    <PortfolioDialog
      kicker="Professional Experience"
      title={item.title}
      subtitle={item.subtitle}
      signal={item.signal}
      meta={item.meta}
      details={item.details}
      onClose={onClose}
    />
  )
}

function PortfolioDialog({ kicker, title, subtitle, signal, meta, details, onClose }: {
  kicker: string
  title: string
  subtitle: string
  signal: string
  meta: string
  details: string[]
  onClose: () => void
}) {
  return (
    <div className="experience-dialog-overlay" onMouseDown={onClose} role="presentation">
      <article
        className="experience-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${title} details`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="experience-dialog-close" onClick={onClose} aria-label={`Close ${title} details`}>×</button>
        <div className="experience-dialog-orbit" aria-hidden="true"><span /></div>
        <p className="experience-dialog-kicker">{kicker}</p>
        <div className="experience-dialog-header">
          <div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
          <span className="experience-dialog-signal">{signal}</span>
        </div>
        <p className="experience-dialog-meta">{meta}</p>
        <div className="experience-dialog-rule" />
        <ul>
          {details.map((detail) => <li key={detail}>{detail}</li>)}
        </ul>
        <div className="experience-dialog-footer">
          <span>CLICK OUTSIDE OR PRESS ESC TO CLOSE</span>
          <i />
        </div>
      </article>
    </div>
  )
}
