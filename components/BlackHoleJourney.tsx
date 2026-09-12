'use client'

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

type SectionName =
  | 'identity'
  | 'experience'
  | 'projects'
  | 'approach'
  | 'skills'
  | 'education'
  | 'connect'
  | 'thankyou'


type ApproachRecord = {
  title: string
  signal: string
  position: string
  proof: string
  details: string[]
}

type SkillRecord = {
  title: string
  evidence: string
  position: string
  delay: string
  tools: string
  details: string[]
}

type ExperienceRecord = {
  title: string
  subtitle: string
  meta: string
  position: string
  details: string[]
}

type EducationRecord = {
  title: string
  subtitle: string
  meta: string
  position: string
  details: string[]
}

type ProjectRecord = {
  title: string
  tag: string
  status: string
  position: string
  details: string[]
  tools: string
  href?: string
}

const PROFILE_LINKS = {
  github: 'https://github.com/Meetgajera16?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/meet-gajera-415333246/',
  email: 'mailto:meetgajera16@gmail.com',
  resume: '/resume',
}

const experience: ExperienceRecord[] = [
  {
    title: 'Data Analytics Intern',
    subtitle: 'Pixbyte Future Tech LLP',
    meta: 'Gandhinagar, India • May 2025 – Jul 2025',
    position: 'left-[23%] top-[46%]',
    details: [
      'Built reusable analytics workflows with Python and SQL for recurring reporting and data validation.',
      'Developed KPI dashboards in Tableau and Excel to improve operational visibility for stakeholders.',
      'Supported ETL work by extracting, transforming, and validating financial datasets across reporting cycles.',
      'Translated quantitative findings into clear recommendations for technical and non-technical audiences.',
    ],
  },
  {
    title: 'Course Assistant',
    subtitle: 'Stevens Institute of Technology',
    meta: 'Hoboken, New Jersey • Tableau & Excel Recitation Labs',
    position: 'left-[50%] top-[28%]',
    details: [
      'Support hands-on recitation labs focused on Tableau and Excel.',
      'Explain analytics workflows, formulas, visualization choices, and troubleshooting steps to students.',
      'Help students move from instructions to independent problem solving during lab sessions.',
      'Strengthen technical communication by turning complex steps into practical demonstrations.',
    ],
  },
  {
    title: 'Frontend Intern',
    subtitle: 'The Look Agency',
    meta: 'Ahmedabad, India • May 2024 – Jul 2024',
    position: 'left-[76%] top-[54%]',
    details: [
      'Built responsive client-facing interfaces with HTML, CSS, and JavaScript.',
      'Worked with designers and developers to translate product requirements into usable experiences.',
      'Gained experience collaborating in an agile environment and communicating across functions.',
    ],
  },
]

const projects: ProjectRecord[] = [
  {
    title: 'E-Commerce Revenue Intelligence',
    tag: 'SQL • Python • Business Analytics',
    status: 'In Progress • Featured Analytics Project',
    position: 'left-[12%] top-[42%]',
    tools: 'Python, Pandas, SQL, PostgreSQL, Descriptive Analytics',
    details: [
      'Business problem: understand revenue leakage, demand, cancellations, product performance, and customer behavior.',
      'Analyzing 541,909 online-retail transaction rows and separating cancellations, inventory adjustments, zero-price transactions, and duplicate records before KPI analysis.',
      'Building country, product, customer, cancellation, refund, and monthly-demand metrics using SQL and Python.',
      'Focus: move from messy transactional data to defensible business decisions instead of jumping directly to machine learning.',
    ],
  },
  {
    title: 'AI Resume + Job Matching Assistant',
    tag: 'RAG • LLM • FastAPI',
    status: 'In Progress • Applied AI System',
    position: 'left-[32%] top-[23%]',
    tools: 'Python, FastAPI, LangChain, Embeddings, Vector Search, REST APIs',
    details: [
      'Problem: compare a resume with a job description and explain the strength of the match.',
      'Pipeline: PDF parsing → text processing → embeddings → vector retrieval → LLM-generated explanation.',
      'Outputs include match signals, missing skills, improvement suggestions, and a natural-language explanation of fit.',
      'Designed around API endpoints for ingestion, matching, and explainability.',
    ],
  },
  {
    title: 'Employee Attrition Prediction',
    tag: 'Classification • HR Analytics',
    status: 'Machine Learning Case Study',
    position: 'left-[55%] top-[27%]',
    tools: 'Python, Pandas, scikit-learn, Logistic Regression, Random Forest, SMOTE',
    details: [
      'Problem: identify employees at higher risk of leaving using structured workforce data.',
      'Workflow includes exploratory analysis, preprocessing, class-imbalance handling, model comparison, and evaluation.',
      'Uses classification metrics to compare model behavior rather than relying only on accuracy.',
      'Connects model outputs to HR decision support and interpretable risk factors.',
    ],
  },
  {
    title: 'Recommendation System',
    tag: 'PySpark • Collaborative Filtering',
    status: 'Machine Learning Project',
    position: 'left-[79%] top-[40%]',
    tools: 'PySpark, ALS, Matrix Factorization, Model Evaluation, Jupyter',
    details: [
      'Built a collaborative-filtering workflow to predict user-item preferences from interaction data.',
      'Used Spark ALS and matrix factorization to generate personalized recommendations at scale.',
      'Evaluated prediction quality and compared model behavior on held-out data.',
    ],
  },
  {
    title: 'Diabetes Prediction System',
    tag: 'Classification • Healthcare Analytics',
    status: 'Completed ML Project',
    position: 'left-[28%] top-[73%]',
    tools: 'Python, Data Preprocessing, Logistic Regression, Decision Tree, Random Forest',
    href: 'https://github.com/Meetgajera16/Diabetes-Prediction',
    details: [
      'Built a classification workflow to estimate diabetes likelihood from health indicators.',
      'Worked with features including glucose, BMI, age, blood pressure, and insulin-related measurements.',
      'Applied preprocessing, model training, and evaluation to compare predictive approaches.',
    ],
  },
  {
    title: 'Search Engine',
    tag: 'NLP • Information Retrieval',
    status: 'Python Systems Project',
    position: 'left-[70%] top-[73%]',
    tools: 'Python, BeautifulSoup, NLP, Inverted Index, Ranking',
    details: [
      'Built a local search engine that crawls HTML pages and cleans text for indexing.',
      'Created an inverted index and term-frequency-based ranking for multi-keyword queries.',
      'Connects text processing, retrieval logic, and ranking into one end-to-end system.',
    ],
  },
]


const approach: ApproachRecord[] = [
  {
    title: 'Frame the Real Problem',
    signal: 'Problem solving',
    position: 'left-[18%] top-[42%]',
    proof: 'E-commerce revenue intelligence',
    details: [
      'Separated cancellations, inventory adjustments, zero-price transactions, and duplicates before calculating business KPIs.',
      'Focused first on what each record means operationally instead of treating every row as clean sales data.',
      'This is how I approach ambiguity: define the decision, challenge assumptions, then choose the analysis.',
    ],
  },
  {
    title: 'Build With People',
    signal: 'Teamwork',
    position: 'left-[39%] top-[24%]',
    proof: 'Internships + cross-functional delivery',
    details: [
      'Worked with designers, developers, and business stakeholders across software and analytics work.',
      'Translate requirements into concrete tasks, share progress, surface blockers, and adjust when feedback changes the direction.',
      'The goal is not just to finish my part — it is to help the team reach a usable outcome.',
    ],
  },
  {
    title: 'Make Complexity Clear',
    signal: 'Communication',
    position: 'left-[66%] top-[25%]',
    proof: 'Course Assistant — Tableau & Excel labs',
    details: [
      'Explain formulas, analytics workflows, visualization choices, and troubleshooting steps during hands-on recitation labs.',
      'Adapt explanations when a student understands the concept but is stuck on the process — or the reverse.',
      'The same habit carries into data work: technical depth matters only when the audience can act on it.',
    ],
  },
  {
    title: 'Create a Better Route',
    signal: 'Creativity',
    position: 'left-[82%] top-[48%]',
    proof: 'AI systems + interactive portfolio',
    details: [
      'Combine technical ideas with interaction design instead of defaulting to the first obvious implementation.',
      'The black-hole portfolio turns projects, skills, and evidence into an explorable system rather than a static resume clone.',
      'My applied-AI work follows the same pattern: connect tools in a way that makes the output easier to use and understand.',
    ],
  },
  {
    title: 'Test the Evidence',
    signal: 'Analytical judgment',
    position: 'left-[61%] top-[73%]',
    proof: 'ML evaluation + data quality decisions',
    details: [
      'Compare model behavior with appropriate metrics instead of relying only on accuracy.',
      'Validate assumptions, inspect edge cases, and separate data-quality problems from legitimate business events.',
      'I want the result to be defensible, not merely impressive-looking.',
    ],
  },
  {
    title: 'Close the Loop',
    signal: 'Ownership',
    position: 'left-[31%] top-[72%]',
    proof: 'Projects from question to usable output',
    details: [
      'Move from business question to data preparation, analysis or modeling, validation, and a result someone can use.',
      'Document decisions and revisit weak points instead of treating the first working version as finished.',
      'That loop — build, inspect, explain, improve — is the working style I want recruiters to remember.',
    ],
  },
]

const skills: SkillRecord[] = [
  {
    title: 'Analyze',
    evidence: 'Turn raw data into trustworthy signals',
    position: 'left-[16%] top-[38%]',
    delay: '0s',
    tools: 'Python • Pandas • NumPy • SQL • PostgreSQL',
    details: [
      'Clean, profile, transform, and investigate structured data before analysis.',
      'Write SQL for joins, aggregations, CTEs, window functions, and KPI logic.',
      'Evidence: transaction-level e-commerce analysis and reusable analytics workflows.',
    ],
  },
  {
    title: 'Model',
    evidence: 'Build and compare predictive approaches',
    position: 'left-[39%] top-[22%]',
    delay: '0.15s',
    tools: 'scikit-learn • PyTorch • Classification • Regression • ALS',
    details: [
      'Build supervised-learning and recommendation workflows from preprocessing through evaluation.',
      'Compare model behavior with metrics that match the decision context.',
      'Evidence: attrition, diabetes prediction, and collaborative-filtering projects.',
    ],
  },
  {
    title: 'Reason',
    evidence: 'Use statistics to challenge assumptions',
    position: 'left-[69%] top-[29%]',
    delay: '0.3s',
    tools: 'Probability • Descriptive Statistics • Regression • Correlation',
    details: [
      'Use quantitative reasoning to interpret distributions, relationships, uncertainty, and model outputs.',
      'Separate unusual observations from actual data problems before removing information.',
      'Evidence: graduate coursework plus project-level data-quality and evaluation decisions.',
    ],
  },
  {
    title: 'Explain',
    evidence: 'Make analysis useful to other people',
    position: 'left-[82%] top-[58%]',
    delay: '0.45s',
    tools: 'Tableau • Power BI • Excel • KPI Reporting • Data Storytelling',
    details: [
      'Translate technical findings into dashboards, KPIs, and concise recommendations.',
      'Design visual explanations around the question the audience needs to answer.',
      'Evidence: analytics internship reporting and Tableau / Excel recitation teaching.',
    ],
  },
  {
    title: 'Scale',
    evidence: 'Move beyond notebook-only workflows',
    position: 'left-[57%] top-[75%]',
    delay: '0.6s',
    tools: 'PySpark • ETL • FastAPI • Git/GitHub • AWS',
    details: [
      'Build ETL-oriented workflows, API-backed projects, and distributed recommendation pipelines.',
      'Use version control and reproducible development environments to keep project work organized.',
      'Evidence: Spark ALS, FastAPI-based AI work, internship ETL support, and GitHub delivery.',
    ],
  },
  {
    title: 'Ship',
    evidence: 'Connect analysis, software, and user experience',
    position: 'left-[28%] top-[72%]',
    delay: '0.75s',
    tools: 'Next.js • TypeScript • REST APIs • Jupyter • VS Code',
    details: [
      'Package technical work into something another person can actually explore or use.',
      'Bridge analytics and software thinking when a project needs more than a notebook.',
      'Evidence: interactive portfolio, API-driven AI assistant, and prior frontend delivery.',
    ],
  },
]

const education: EducationRecord[] = [
  {
    title: 'Stevens Institute of Technology',
    subtitle: 'Master of Science in Data Science',
    meta: 'Hoboken, New Jersey • GPA: 3.451 / 4.00 • Expected May 2027',
    position: 'left-[34%] top-[50%]',
    details: [
      'Graduate study focused on applied machine learning, probability, mathematics for data science, and analytical problem solving.',
      'Current work connects academic concepts to portfolio projects in analytics, machine learning, and data systems.',
    ],
  },
  {
    title: 'LDRP Institute of Technology & Research',
    subtitle: 'Bachelor of Engineering in Information Technology',
    meta: 'Gandhinagar, India • Completed 2025',
    position: 'left-[68%] top-[50%]',
    details: [
      'Built an engineering foundation in programming, databases, computer systems, and structured problem solving.',
      'Progressed from technical fundamentals into application development, analytics, and data science.',
    ],
  },
]

export default function BlackHoleJourney() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const identityShownRef = useRef(false)
  const entryTargetRef = useRef(0)
  const entryProgressRef = useRef(0)
  const entryTimerRef = useRef<number | null>(null)

  const [showIdentity, setShowIdentity] = useState(false)
  const [nameEnteringBlackHole, setNameEnteringBlackHole] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionName>('identity')

  const [selectedExperience, setSelectedExperience] = useState(experience[0].title)
  const [selectedEducation, setSelectedEducation] = useState(education[0].title)
  const [selectedSkill, setSelectedSkill] = useState(skills[0].title)
  const [selectedProject, setSelectedProject] = useState(projects[0].title)
  const [selectedApproach, setSelectedApproach] = useState(approach[0].title)

  const [openExperience, setOpenExperience] = useState<ExperienceRecord | null>(null)
  const [openEducation, setOpenEducation] = useState<EducationRecord | null>(null)
  const [openSkill, setOpenSkill] = useState<SkillRecord | null>(null)
  const [openProject, setOpenProject] = useState<ProjectRecord | null>(null)
  const [openApproach, setOpenApproach] = useState<ApproachRecord | null>(null)

  const activeExperience = useMemo(
    () => experience.find((item) => item.title === selectedExperience) ?? experience[0],
    [selectedExperience],
  )

  const activeEducation = useMemo(
    () => education.find((item) => item.title === selectedEducation) ?? education[0],
    [selectedEducation],
  )

  const activeSkill = useMemo(
    () => skills.find((item) => item.title === selectedSkill) ?? skills[0],
    [selectedSkill],
  )

  const activeProject = useMemo(
    () => projects.find((item) => item.title === selectedProject) ?? projects[0],
    [selectedProject],
  )

  const activeApproach = useMemo(
    () => approach.find((item) => item.title === selectedApproach) ?? approach[0],
    [selectedApproach],
  )

  const closeAllPopups = () => {
    setOpenExperience(null)
    setOpenEducation(null)
    setOpenSkill(null)
    setOpenProject(null)
    setOpenApproach(null)
  }

  const handleIdentityMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  const goToSection = (section: SectionName) => {
    if (!showIdentity && section !== 'identity') return
    closeAllPopups()

    if (entryTimerRef.current) {
      window.clearTimeout(entryTimerRef.current)
      entryTimerRef.current = null
    }

    if (section === 'identity') {
      entryTargetRef.current = 0
      setNameEnteringBlackHole(false)
      setActiveSection('identity')
      return
    }

    entryTargetRef.current = 1
    setNameEnteringBlackHole(true)
    setActiveSection(section)
  }

  const skipIntro = () => {
    identityShownRef.current = true
    entryTargetRef.current = 0
    entryProgressRef.current = 0
    setShowIdentity(true)
    setNameEnteringBlackHole(false)
    setActiveSection('identity')
  }

  const goNext = () => {
    if (!showIdentity) return
    closeAllPopups()

    if (activeSection === 'identity') {
      setNameEnteringBlackHole(true)
      entryTargetRef.current = 1

      if (entryTimerRef.current) window.clearTimeout(entryTimerRef.current)
      entryTimerRef.current = window.setTimeout(() => {
        setActiveSection('experience')
        entryTimerRef.current = null
      }, 3000)
      return
    }

    if (activeSection === 'experience') {
      setActiveSection('projects')
      return
    }

    if (activeSection === 'projects') {
      setActiveSection('approach')
      return
    }

    if (activeSection === 'approach') {
      setActiveSection('skills')
      return
    }

    if (activeSection === 'skills') {
      setActiveSection('education')
      return
    }

    if (activeSection === 'education') {
      setActiveSection('connect')
      return
    }

    if (activeSection === 'connect') {
      setActiveSection('thankyou')
    }
  }

  const goBack = () => {
    closeAllPopups()

    if (activeSection === 'thankyou') {
      setActiveSection('connect')
      return
    }

    if (activeSection === 'connect') {
      setActiveSection('education')
      return
    }

    if (activeSection === 'education') {
      setActiveSection('skills')
      return
    }

    if (activeSection === 'skills') {
      setActiveSection('approach')
      return
    }

    if (activeSection === 'approach') {
      setActiveSection('projects')
      return
    }

    if (activeSection === 'projects') {
      setActiveSection('experience')
      return
    }

    if (activeSection === 'experience') {
      entryTargetRef.current = 0
      setNameEnteringBlackHole(false)
      setActiveSection('identity')
    }
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAllPopups()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    return () => {
      if (entryTimerRef.current) window.clearTimeout(entryTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000006, 0.018)

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      260,
    )
    camera.position.set(0, 0.1, 15)

    const isCompact = window.innerWidth < 900
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCompact ? 1.25 : 1.75))
    renderer.setClearColor(0x000006, 1)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.82
    mount.appendChild(renderer.domElement)

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.9,
      0.68,
      0.2,
    )
    composer.addPass(bloomPass)

    const clock = new THREE.Clock()
    let lastElapsed = 0
    let animationFrame = 0

    const makeGlowTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 256

      const ctx = canvas.getContext('2d')
      if (!ctx) return new THREE.Texture()

      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(0.18, 'rgba(255,246,200,0.82)')
      gradient.addColorStop(0.44, 'rgba(255,180,60,0.32)')
      gradient.addColorStop(0.72, 'rgba(100,150,255,0.1)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 256, 256)

      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      return texture
    }

    const glowTexture = makeGlowTexture()

    const starGeometry = new THREE.BufferGeometry()
    const starCount = prefersReducedMotion ? 1200 : isCompact ? 2800 : 4800
    const starPositions = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)

    const white = new THREE.Color(0xffffff)
    const blue = new THREE.Color(0x8fb6ff)
    const gold = new THREE.Color(0xd4af37)

    for (let i = 0; i < starCount; i += 1) {
      const i3 = i * 3
      starPositions[i3] = (Math.random() - 0.5) * 145
      starPositions[i3 + 1] = (Math.random() - 0.5) * 84
      starPositions[i3 + 2] = (Math.random() - 0.5) * 140

      const pick = Math.random()
      const color = pick < 0.78 ? white : pick < 0.92 ? blue : gold

      starColors[i3] = color.r
      starColors[i3 + 1] = color.g
      starColors[i3 + 2] = color.b
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))

    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        size: 0.022,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    scene.add(stars)

    const solarSystem = new THREE.Group()
    solarSystem.position.set(-1.8, -0.08, -0.6)
    solarSystem.scale.setScalar(1.05)
    solarSystem.rotation.z = -0.18
    scene.add(solarSystem)

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.46, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0xfff2a8 }),
    )
    solarSystem.add(sun)

    const sunLight = new THREE.PointLight(0xffe9a8, 5.4, 14)
    sunLight.position.set(0, 0, 0)
    solarSystem.add(sunLight)

    const sunGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xd4af37,
        transparent: true,
        opacity: 0.58,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    sunGlow.scale.set(3.9, 3.9, 1)
    solarSystem.add(sunGlow)

    const planetRecords: {
      mesh: THREE.Mesh
      orbit: THREE.Line
      radius: number
      speed: number
      angle: number
      yScale: number
    }[] = []

    const planetData = [
      { radius: 1.15, size: 0.075, color: 0xd8dee9, speed: 1.25 },
      { radius: 1.85, size: 0.12, color: 0x6b8fd6, speed: -0.82 },
      { radius: 2.62, size: 0.105, color: 0xb89b42, speed: 0.58 },
      { radius: 3.42, size: 0.085, color: 0x7f8795, speed: -0.42 },
    ]

    planetData.forEach((data) => {
      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(data.size, 32, 32),
        new THREE.MeshStandardMaterial({
          color: data.color,
          roughness: 0.78,
          metalness: 0.08,
        }),
      )

      const planetGlow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexture,
          color: data.color,
          transparent: true,
          opacity: 0.24,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      )

      planetGlow.scale.set(data.size * 7, data.size * 7, 1)
      planet.add(planetGlow)

      const curve = new THREE.EllipseCurve(
        0,
        0,
        data.radius,
        data.radius * 0.46,
        0,
        Math.PI * 2,
      )

      const points = curve.getPoints(180)
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
        points.map((point) => new THREE.Vector3(point.x, point.y, 0)),
      )

      const orbit = new THREE.Line(
        orbitGeometry,
        new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.11,
        }),
      )

      solarSystem.add(orbit)
      solarSystem.add(planet)

      planetRecords.push({
        mesh: planet,
        orbit,
        radius: data.radius,
        speed: data.speed,
        angle: Math.random() * Math.PI * 2,
        yScale: 0.46,
      })
    })

    const blackHole = new THREE.Group()
    blackHole.position.set(3.7, 0, -2.05)
    blackHole.scale.setScalar(0.001)
    scene.add(blackHole)

    const eventHorizon = new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 96, 96),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    )
    eventHorizon.scale.set(1.52, 0.46, 0.72)
    eventHorizon.position.z = 0.28
    blackHole.add(eventHorizon)

    const darkLens = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0x000000,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    )
    darkLens.scale.set(6.1, 2.4, 1)
    darkLens.position.z = 0.42
    blackHole.add(darkLens)

    const ringConfigs = [
      { radius: 1.74, tube: 0.045, color: 0xffffff, opacity: 0.46, scaleY: 0.28 },
      { radius: 1.95, tube: 0.075, color: 0xffe1a6, opacity: 0.38, scaleY: 0.29 },
      { radius: 2.28, tube: 0.13, color: 0xff9e38, opacity: 0.32, scaleY: 0.31 },
      { radius: 2.74, tube: 0.18, color: 0xd36f2b, opacity: 0.23, scaleY: 0.34 },
      { radius: 3.25, tube: 0.18, color: 0x3d8cff, opacity: 0.12, scaleY: 0.39 },
    ]

    const ringMeshes: THREE.Mesh[] = []
    const ringMaterials: THREE.MeshBasicMaterial[] = []

    ringConfigs.forEach((config, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      })

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(config.radius, config.tube, 24, 300),
        material,
      )

      ring.rotation.x = Math.PI / 2.42
      ring.rotation.z = -0.2 + index * 0.025
      ring.scale.y = config.scaleY
      ring.position.z = -0.04 - index * 0.015

      ringMeshes.push(ring)
      ringMaterials.push(material)
      blackHole.add(ring)
    })

    const diskCount = prefersReducedMotion ? 1400 : isCompact ? 3600 : 6200
    const diskGeometry = new THREE.BufferGeometry()
    const diskPositions = new Float32Array(diskCount * 3)
    const diskColors = new Float32Array(diskCount * 3)
    const diskRadii = new Float32Array(diskCount)
    const diskAngles = new Float32Array(diskCount)
    const diskSpeeds = new Float32Array(diskCount)

    for (let i = 0; i < diskCount; i += 1) {
      const i3 = i * 3
      const radius = 1.46 + Math.random() * 4.2
      const angle = Math.random() * Math.PI * 2
      const height = (Math.random() - 0.5) * 0.06

      diskRadii[i] = radius
      diskAngles[i] = angle
      diskSpeeds[i] = 0.006 + Math.random() * 0.019

      diskPositions[i3] = Math.cos(angle) * radius
      diskPositions[i3 + 1] = height
      diskPositions[i3 + 2] = Math.sin(angle) * radius * 0.25

      const color =
        Math.random() < 0.3
          ? new THREE.Color(0xffffff)
          : Math.random() < 0.56
            ? new THREE.Color(0xffc15f)
            : Math.random() < 0.84
              ? new THREE.Color(0xd4af37)
              : new THREE.Color(0x6aa7ff)

      diskColors[i3] = color.r
      diskColors[i3 + 1] = color.g
      diskColors[i3 + 2] = color.b
    }

    diskGeometry.setAttribute('position', new THREE.BufferAttribute(diskPositions, 3))
    diskGeometry.setAttribute('color', new THREE.BufferAttribute(diskColors, 3))

    const diskParticles = new THREE.Points(
      diskGeometry,
      new THREE.PointsMaterial({
        size: 0.017,
        vertexColors: true,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )

    diskParticles.rotation.x = Math.PI / 2.42
    diskParticles.rotation.z = -0.2
    blackHole.add(diskParticles)

    const streamCount = prefersReducedMotion ? 450 : isCompact ? 1100 : 2000
    const streamGeometry = new THREE.BufferGeometry()
    const streamPositions = new Float32Array(streamCount * 3)
    const streamColors = new Float32Array(streamCount * 3)

    for (let i = 0; i < streamCount; i += 1) {
      const i3 = i * 3
      const t = Math.random()
      const curve = Math.sin(t * Math.PI) * 0.92

      streamPositions[i3] = -3.9 + t * 6.6 + (Math.random() - 0.5) * 0.35
      streamPositions[i3 + 1] = (Math.random() - 0.5) * curve
      streamPositions[i3 + 2] = -1.05 + (Math.random() - 0.5) * curve

      const color =
        t < 0.5
          ? new THREE.Color(0xffc35a)
          : Math.random() < 0.6
            ? new THREE.Color(0xffffff)
            : new THREE.Color(0x6aa7ff)

      streamColors[i3] = color.r
      streamColors[i3 + 1] = color.g
      streamColors[i3 + 2] = color.b
    }

    streamGeometry.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3))
    streamGeometry.setAttribute('color', new THREE.BufferAttribute(streamColors, 3))

    const pullStream = new THREE.Points(
      streamGeometry,
      new THREE.PointsMaterial({
        size: 0.018,
        vertexColors: true,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    scene.add(pullStream)

    const tunnelGeometry = new THREE.BufferGeometry()
    const tunnelCount = prefersReducedMotion ? 300 : isCompact ? 650 : 1100
    const tunnelPositions = new Float32Array(tunnelCount * 3)

    for (let i = 0; i < tunnelCount; i += 1) {
      const i3 = i * 3
      tunnelPositions[i3] = (Math.random() - 0.5) * 22
      tunnelPositions[i3 + 1] = (Math.random() - 0.5) * 9
      tunnelPositions[i3 + 2] = (Math.random() - 0.5) * 9
    }

    tunnelGeometry.setAttribute('position', new THREE.BufferAttribute(tunnelPositions, 3))

    const tunnelDust = new THREE.Points(
      tunnelGeometry,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.026,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    scene.add(tunnelDust)

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      const delta = Math.min(0.05, Math.max(0, elapsed - lastElapsed))
      lastElapsed = elapsed

      // The black hole forms first while the recruiter stays outside it.
      // Only an explicit Home-page action starts the cinematic dive.
      const blackHoleBirth = THREE.MathUtils.smoothstep(elapsed, 0.6, 2.35)
      const entrySpeed = delta / 3.0
      entryProgressRef.current = THREE.MathUtils.clamp(
        entryProgressRef.current + (entryTargetRef.current === 1 ? entrySpeed : -entrySpeed * 1.2),
        0,
        1,
      )

      const entryProgress = entryProgressRef.current
      const swallow = THREE.MathUtils.smoothstep(entryProgress, 0.04, 0.68)
      const cameraDive = THREE.MathUtils.smoothstep(entryProgress, 0.12, 0.9)
      const insideFade = THREE.MathUtils.smoothstep(entryProgress, 0.78, 1.0)

      stars.rotation.y += 0.0008 + cameraDive * 0.004
      stars.rotation.x += 0.00025 + cameraDive * 0.001

      ;(stars.material as THREE.PointsMaterial).opacity = THREE.MathUtils.lerp(
        0.75,
        0.25,
        insideFade,
      )

      sun.rotation.y += 0.014
      sunGlow.scale.setScalar(3.9 + Math.sin(elapsed * 2.25) * 0.22)

      planetRecords.forEach((planet) => {
        planet.angle += 0.016 * planet.speed

        const x = Math.cos(planet.angle) * planet.radius
        const y = Math.sin(planet.angle) * planet.radius * planet.yScale
        const z = Math.sin(planet.angle) * 0.22

        planet.mesh.position.set(x, y, z)

        const orbitMaterial = planet.orbit.material as THREE.LineBasicMaterial
        orbitMaterial.opacity = THREE.MathUtils.lerp(0.11, 0.01, swallow)
      })

      solarSystem.position.x = THREE.MathUtils.lerp(
        -1.8,
        blackHole.position.x - 0.05,
        swallow,
      )
      solarSystem.position.z = THREE.MathUtils.lerp(-0.6, -0.25, swallow)
      solarSystem.rotation.z = -0.18 + swallow * 1.7
      solarSystem.rotation.y = swallow * 3.0
      solarSystem.scale.setScalar(THREE.MathUtils.lerp(1.05, 0.012, swallow))

      blackHole.position.x = THREE.MathUtils.lerp(3.95, 3.45, blackHoleBirth)
      blackHole.scale.setScalar(THREE.MathUtils.lerp(0.001, 1.72, blackHoleBirth))
      blackHole.rotation.z = Math.sin(elapsed * 0.12) * 0.025

      ;(darkLens.material as THREE.SpriteMaterial).opacity =
        THREE.MathUtils.lerp(0, 0.98, blackHoleBirth) * (1 - insideFade)

      ringMeshes.forEach((ring, index) => {
        ring.rotation.z += index % 2 === 0 ? -0.0016 : 0.0011
        ring.scale.x = 1 + Math.sin(elapsed * 0.35 + index) * 0.015
        ring.scale.y =
          ringConfigs[index].scaleY + Math.sin(elapsed * 0.4 + index) * 0.012

        ringMaterials[index].opacity =
          THREE.MathUtils.lerp(0, ringConfigs[index].opacity, blackHoleBirth) *
          (1 - insideFade)
      })

      const diskArray = diskGeometry.attributes.position.array as Float32Array

      for (let i = 0; i < diskCount; i += 1) {
        const i3 = i * 3
        diskAngles[i] += diskSpeeds[i] * (1 + blackHoleBirth * 2.8 + cameraDive * 2.3)

        const radiusPulse = diskRadii[i] + Math.sin(elapsed * 1.7 + i) * 0.018
        const angle = diskAngles[i]

        diskArray[i3] = Math.cos(angle) * radiusPulse
        diskArray[i3 + 2] = Math.sin(angle) * radiusPulse * 0.25
      }

      diskGeometry.attributes.position.needsUpdate = true
      diskParticles.rotation.z -= 0.0048

      ;(diskParticles.material as THREE.PointsMaterial).opacity =
        THREE.MathUtils.lerp(0, 0.65, blackHoleBirth) * (1 - insideFade)

      const streamArray = streamGeometry.attributes.position.array as Float32Array

      for (let i = 0; i < streamCount; i += 1) {
        const i3 = i * 3
        streamArray[i3] += 0.007 * swallow
        streamArray[i3 + 1] += Math.sin(elapsed * 2.2 + i) * 0.001 * swallow

        if (streamArray[i3] > blackHole.position.x + 1.35) {
          streamArray[i3] = -3.9 + Math.random() * 0.8
          streamArray[i3 + 1] = (Math.random() - 0.5) * 0.8
          streamArray[i3 + 2] = -1.05 + (Math.random() - 0.5) * 0.8
        }
      }

      streamGeometry.attributes.position.needsUpdate = true

      ;(pullStream.material as THREE.PointsMaterial).opacity =
        THREE.MathUtils.lerp(0, 0.55, swallow) * (1 - insideFade)

      const tunnelArray = tunnelGeometry.attributes.position.array as Float32Array

      ;(tunnelDust.material as THREE.PointsMaterial).opacity =
        0.04 * blackHoleBirth + 0.18 * swallow + 0.45 * cameraDive

      for (let i = 0; i < tunnelCount; i += 1) {
        const i3 = i * 3
        tunnelArray[i3] += 0.01 * blackHoleBirth + 0.04 * swallow + 0.09 * cameraDive
        tunnelArray[i3 + 1] *= 0.9985
        tunnelArray[i3 + 2] *= 0.9985

        if (tunnelArray[i3] > 8.5) {
          tunnelArray[i3] = -8.5
          tunnelArray[i3 + 1] = (Math.random() - 0.5) * 5.5
          tunnelArray[i3 + 2] = (Math.random() - 0.5) * 5.5
        }
      }

      tunnelGeometry.attributes.position.needsUpdate = true

      const cameraIntro = new THREE.Vector3(0, 0.1, 15)
      const cameraApproach = new THREE.Vector3(2.45, 0.02, 7.2)
      const cameraHorizon = new THREE.Vector3(3.25, 0, 3.0)
      const cameraInside = new THREE.Vector3(3.45, 0, -1.8)

      if (cameraDive < 0.5) {
        camera.position.lerpVectors(cameraIntro, cameraApproach, cameraDive / 0.5)
      } else if (cameraDive < 0.82) {
        camera.position.lerpVectors(
          cameraApproach,
          cameraHorizon,
          (cameraDive - 0.5) / 0.32,
        )
      } else {
        camera.position.lerpVectors(
          cameraHorizon,
          cameraInside,
          (cameraDive - 0.82) / 0.18,
        )
      }

      camera.position.x += Math.sin(elapsed * 0.8) * 0.025 * cameraDive
      camera.position.y += Math.cos(elapsed * 0.7) * 0.025 * cameraDive

      if (insideFade < 0.95) camera.lookAt(blackHole.position.x, 0, 0)
      else camera.lookAt(3.45, 0, -4)

      bloomPass.strength = THREE.MathUtils.lerp(0.9, 1.08, cameraDive)
      bloomPass.radius = THREE.MathUtils.lerp(0.68, 0.84, cameraDive)

      if (elapsed > (prefersReducedMotion ? 0.35 : 2.55) && !identityShownRef.current) {
        identityShownRef.current = true
        setShowIdentity(true)
      }

      composer.render()
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 900 ? 1.25 : 1.75))

      composer.setSize(window.innerWidth, window.innerHeight)
      bloomPass.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)

      starGeometry.dispose()
      ;(stars.material as THREE.PointsMaterial).dispose()

      sun.geometry.dispose()
      ;(sun.material as THREE.MeshBasicMaterial).dispose()
      ;(sunGlow.material as THREE.SpriteMaterial).dispose()

      planetRecords.forEach((planet) => {
        planet.mesh.geometry.dispose()
        ;(planet.mesh.material as THREE.MeshStandardMaterial).dispose()
        planet.orbit.geometry.dispose()
        ;(planet.orbit.material as THREE.LineBasicMaterial).dispose()
      })

      eventHorizon.geometry.dispose()
      ;(eventHorizon.material as THREE.MeshBasicMaterial).dispose()

      ringMeshes.forEach((ring) => ring.geometry.dispose())
      ringMaterials.forEach((material) => material.dispose())

      diskGeometry.dispose()
      ;(diskParticles.material as THREE.PointsMaterial).dispose()

      streamGeometry.dispose()
      ;(pullStream.material as THREE.PointsMaterial).dispose()

      tunnelGeometry.dispose()
      ;(tunnelDust.material as THREE.PointsMaterial).dispose()

      ;(darkLens.material as THREE.SpriteMaterial).dispose()
      glowTexture.dispose()

      renderer.dispose()
      composer.dispose()

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02030a] text-[#EDE8DD]">
      <div
        ref={mountRef}
        className={`fixed inset-0 z-0 transition-opacity duration-[1600ms] ${
          activeSection !== 'identity'
            ? 'opacity-[0.7]'
            : showIdentity
              ? 'opacity-[0.9]'
              : 'opacity-100'
        }`}
      />

      <div
        className={`stage-visual stage-visual-home ${
          activeSection === 'identity' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`stage-visual stage-visual-experience ${
          activeSection === 'experience' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`pointer-events-none fixed inset-0 z-10 bg-black transition-opacity duration-[1600ms] ${
          activeSection !== 'identity'
            ? 'opacity-[0.36]'
            : showIdentity
              ? 'opacity-[0.22]'
              : 'opacity-0'
        }`}
      />

      {showIdentity && (
        <>
          <button
            onClick={() => goToSection('identity')}
            className="scene-wordmark fixed left-6 top-6 z-50 md:left-10 md:top-8"
            aria-label="Return to portfolio home"
          >
            GAJERA
          </button>

          <nav className="space-top-nav fixed left-1/2 top-7 z-50 hidden -translate-x-1/2 items-center gap-6 lg:flex">
            {([
              ['identity', 'HOME'],
              ['experience', 'EXPERIENCE'],
              ['projects', 'PROJECTS'],
              ['skills', 'SKILLS'],
              ['education', 'EDUCATION'],
              ['connect', 'CONTACT'],
            ] as [SectionName, string][]).map(([section, label]) => (
              <button
                key={section}
                onClick={() => goToSection(section)}
                className={`space-top-link ${activeSection === section ? 'is-active' : ''}`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="space-corner-copy fixed right-6 top-6 z-50 hidden text-right lg:block md:right-10 md:top-8">
            <p>DATA</p>
            <p>PEOPLE</p>
            <p>A BRIGHTER TOMORROW</p>
          </div>
        </>
      )}

      {!showIdentity && (
        <>
          <div className="pointer-events-none fixed bottom-10 left-1/2 z-30 -translate-x-1/2 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.42em] text-[#8AA0BC]">
              Black hole forming
            </p>
            <div className="mx-auto mt-4 h-14 w-px bg-gradient-to-b from-[#D4AF37] to-transparent" />
          </div>

          <button
            onClick={skipIntro}
            className="fixed right-6 top-6 z-50 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#D7DFEF] backdrop-blur-xl transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
          >
            Skip intro
          </button>
        </>
      )}

      <section
        onMouseMove={handleIdentityMouseMove}
        className={`identity-stage fixed inset-0 z-20 flex items-center px-6 transition-all duration-[1200ms] md:px-10 lg:px-20 ${
          showIdentity && activeSection === 'identity'
            ? 'pointer-events-auto scale-100 opacity-100 blur-0'
            : activeSection !== 'identity'
              ? 'pointer-events-none scale-[0.08] opacity-0 blur-3xl'
              : 'pointer-events-none scale-75 opacity-0 blur-xl'
        }`}
      >
        <div className="identity-back-glow" />
        <div className="space-console">
          <p>A MORE</p>
          <p>INSIGHTFUL</p>
          <p>TOMORROW</p>
        </div>

        <div className="identity-copy-wrap">
          <div className={`identity-card ${nameEnteringBlackHole ? 'identity-collapse' : ''}`}>
            <p className="eyebrow-kicker">Exploring Data</p>
            <p className="eyebrow-kicker second">Beyond Boundaries</p>
            <div className="eyebrow-line" />

            <h1 className="identity-title font-display text-[clamp(4rem,9vw,8rem)] font-black leading-[0.88] text-[#F4EFE3]">
              <span className="identity-title-meet">Meet</span> <span>Gajera</span>
            </h1>

            <p className="mt-5 text-lg text-[#F0F4FB] md:text-2xl">
              MS Data Science Candidate
            </p>

            <p className="identity-subtitle mt-8 max-w-2xl text-lg leading-8 text-[#D2DDEF] md:text-[1.45rem] md:leading-10">
              Building machine-learning and analytics systems
              <br />
              to turn complex data into meaningful impact.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button onClick={goNext} className="gravity-button gravity-entry-button">
                Enter the Black Hole
              </button>
              <a href={PROFILE_LINKS.resume} className="gravity-button secondary">
                View Resume
              </a>
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="gravity-button secondary"
              >
                GitHub
              </a>
            </div>

            <div className="identity-callout">
              <div className="callout-divider" />
              <div>
                <p>DEEPER INSIGHTS</p>
                <p>BRIGHTER SOLUTIONS</p>
                <p>A LARGER TOMORROW</p>
              </div>
            </div>
          </div>
        </div>

        <div className="side-annotation right-mid">
          <p>SAME DATA.</p>
          <p>A BRIGHTER</p>
          <p>UNIVERSE.</p>
        </div>

        <div className="side-annotation right-low card">
          <h3>GRAVITATION CREATES OPPORTUNITY.</h3>
          <p>EVEN IN DARKNESS,</p>
          <p>THERE IS STRUCTURE.</p>
        </div>

        <div className="space-rock-caption">
          <p>DATA</p>
          <p>ANALYTICS</p>
          <p>MACHINE LEARNING</p>
          <p>REAL IMPACT</p>
        </div>
      </section>

      <OrbitSection
        visible={activeSection === 'experience'}
        className="experience-universe"
        nebulaClassName="section-nebula"
        coreClassName="deep-core"
        eyebrow="02 / Professional experience"
        title="Experience Orbit"
        text="Start with the work I have already done: analytics, teaching, and software delivery. Click a star for evidence and responsibilities."
        footer={
          <InfoCard
            eyebrow="Selected experience"
            title={activeExperience.title}
            subtitle={activeExperience.subtitle}
            meta={activeExperience.meta}
            details={activeExperience.details}
          />
        }
        controls={<BottomControls onBack={goBack} onNext={goNext} nextLabel="View Projects" />}
      >
        {experience.map((item, index) => (
          <StarButton
            key={item.title}
            itemTitle={item.title}
            position={item.position}
            active={selectedExperience === item.title}
            delay={`${index * 0.2}s`}
            onHover={() => setSelectedExperience(item.title)}
            onClick={() => {
              setSelectedExperience(item.title)
              setOpenExperience(item)
            }}
          />
        ))}
      </OrbitSection>

      <OrbitSection
        visible={activeSection === 'projects'}
        className="projects-universe"
        nebulaClassName="section-nebula projects-nebula"
        coreClassName="deep-core projects-core"
        eyebrow="03 / Selected work"
        title="Featured Projects"
        text="A focused set of analytics, machine-learning, retrieval, and data-system projects. Each star explains the problem, method, and evidence."
        footer={
          <InfoCard
            eyebrow={activeProject.tag}
            title={activeProject.title}
            subtitle={activeProject.status}
            meta={activeProject.tools}
            details={activeProject.details}
            href={activeProject.href}
          />
        }
        controls={<BottomControls onBack={goBack} onNext={goNext} nextLabel="See How I Work" />}
      >
        {projects.map((project, index) => (
          <StarButton
            key={project.title}
            itemTitle={project.title}
            position={project.position}
            active={selectedProject === project.title}
            delay={`${index * 0.16}s`}
            withSparks
            projectDot
            onHover={() => setSelectedProject(project.title)}
            onClick={() => {
              setSelectedProject(project.title)
              setOpenProject(project)
            }}
          />
        ))}
      </OrbitSection>

      <OrbitSection
        visible={activeSection === 'approach'}
        className="skills-universe"
        nebulaClassName="section-nebula skills-nebula-strong"
        coreClassName="deep-core skills-core"
        eyebrow="04 / How I work"
        title="The Decision Orbit"
        text="Soft skills are not badges here. Each signal is tied to a behavior and a place where I have had to use it. Follow the orbit from ambiguity to a usable result."
        footer={
          <InfoCard
            eyebrow={activeApproach.signal}
            title={activeApproach.title}
            subtitle={activeApproach.proof}
            meta="Behavior → evidence → outcome"
            details={activeApproach.details}
          />
        }
        controls={<BottomControls onBack={goBack} onNext={goNext} nextLabel="Explore Capabilities" />}
      >
        {approach.map((item, index) => (
          <StarButton
            key={item.title}
            itemTitle={item.title}
            position={item.position}
            active={selectedApproach === item.title}
            delay={`${index * 0.14}s`}
            withSparks
            onHover={() => setSelectedApproach(item.title)}
            onClick={() => {
              setSelectedApproach(item.title)
              setOpenApproach(item)
            }}
          />
        ))}
      </OrbitSection>

      <OrbitSection
        visible={activeSection === 'skills'}
        className="skills-universe"
        nebulaClassName="section-nebula skills-nebula-strong"
        coreClassName="deep-core skills-core"
        eyebrow="05 / Technical capabilities"
        title="Capability Constellation"
        text="Technical skills are grouped by what they let me do: analyze, model, reason, explain, scale, and ship. Every capability points back to real work."
        footer={
          <InfoCard
            eyebrow="Technical signal"
            title={activeSkill.title}
            subtitle={activeSkill.evidence}
            meta={activeSkill.tools}
            details={activeSkill.details}
          />
        }
        controls={<BottomControls onBack={goBack} onNext={goNext} nextLabel="View Foundation" />}
      >
        {skills.map((skill) => (
          <StarButton
            key={skill.title}
            itemTitle={skill.title}
            position={skill.position}
            active={selectedSkill === skill.title}
            delay={skill.delay}
            withSparks
            onHover={() => setSelectedSkill(skill.title)}
            onClick={() => {
              setSelectedSkill(skill.title)
              setOpenSkill(skill)
            }}
          />
        ))}
      </OrbitSection>

      <OrbitSection
        visible={activeSection === 'education'}
        className="education-universe"
        nebulaClassName="section-nebula"
        coreClassName="deep-core"
        eyebrow="06 / Education"
        title="Academic Foundation"
        text="Graduate data-science training at Stevens built on an Information Technology engineering foundation."
        footer={
          <InfoCard
            eyebrow="Selected education"
            title={activeEducation.title}
            subtitle={activeEducation.subtitle}
            meta={activeEducation.meta}
            details={activeEducation.details}
          />
        }
        controls={<BottomControls onBack={goBack} onNext={goNext} nextLabel="Contact Me" />}
      >
        {education.map((item, index) => (
          <StarButton
            key={item.title}
            itemTitle={item.title}
            position={item.position}
            active={selectedEducation === item.title}
            delay={`${index * 0.22}s`}
            onHover={() => setSelectedEducation(item.title)}
            onClick={() => {
              setSelectedEducation(item.title)
              setOpenEducation(item)
            }}
          />
        ))}
      </OrbitSection>

      <section
        className={`connect-universe fixed inset-0 z-20 overflow-hidden transition-all duration-[1100ms] ${
          activeSection === 'connect'
            ? 'pointer-events-auto scale-100 opacity-100 blur-0'
            : 'pointer-events-none scale-110 opacity-0 blur-2xl'
        }`}
      >
        <div className="connect-nebula" />

        <div className="connect-page-grid">
          <div className="connect-left-panel">
            <p className="text-xs font-black uppercase tracking-[0.45em] text-[#D4AF37]">
              06 / Contact
            </p>

            <h2 className="connect-title mt-5 font-display text-[clamp(3.4rem,6vw,7rem)] font-black leading-none text-[#F4EFE3]">
              Let&apos;s Connect
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#A8B7D4] md:text-lg">
              Explore my code, review my resume, or reach me directly about data science,
              analytics, and applied machine-learning opportunities.
            </p>

            <div className="connect-social-stack mt-8">
              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="connect-wide-card"
              >
                <span>01</span>
                <div>
                  <h3>LinkedIn</h3>
                  <p>Career profile, experience, and professional updates.</p>
                </div>
              </a>

              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="connect-wide-card"
              >
                <span>02</span>
                <div>
                  <h3>GitHub</h3>
                  <p>Repositories, technical projects, and implementation details.</p>
                </div>
              </a>

              <a href={PROFILE_LINKS.email} className="connect-wide-card">
                <span>03</span>
                <div>
                  <h3>Email</h3>
                  <p>Reach me directly at meetgajera16@gmail.com.</p>
                </div>
              </a>
            </div>
          </div>

          <div className="connect-hole-column">
            <SimpleBlackHole />
          </div>

          <div className="connect-right-panel">
            <div className="resume-orbit-card compact-connect-card">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#D4AF37]">
                Recruiter snapshot
              </p>

              <h3 className="mt-4 font-display text-4xl font-black leading-none text-[#F4EFE3] md:text-5xl">
                View Resume
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#A8B7D4]">
                MS Data Science candidate with analytics internship experience, teaching
                experience, and hands-on projects across SQL, Python, ML, BI, and data systems.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="resume-mini-pill">Python</div>
                <div className="resume-mini-pill">SQL</div>
                <div className="resume-mini-pill">Machine Learning</div>
                <div className="resume-mini-pill">Tableau / Power BI</div>
              </div>

              <a href={PROFILE_LINKS.resume} className="resume-download-button mt-6">
                Open Resume
              </a>
            </div>

            <MessageBox />
          </div>
        </div>

        <div className="connect-bottom-controls">
          <button onClick={goBack} className="gravity-button secondary">
            Back
          </button>

          <button onClick={goNext} className="gravity-button">
            Finish Journey
          </button>
        </div>
      </section>

      <section
        className={`thankyou-universe fixed inset-0 z-20 overflow-hidden px-6 py-8 transition-all duration-[1100ms] md:px-14 ${
          activeSection === 'thankyou'
            ? 'pointer-events-auto scale-100 opacity-100 blur-0'
            : 'pointer-events-none scale-110 opacity-0 blur-2xl'
        }`}
      >
        <div className="thankyou-nebula" />
        <SimpleBlackHole variant="thankyou" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center text-center">
          <p className="text-xs font-black uppercase tracking-[0.45em] text-[#D4AF37]">
            07 / Journey complete
          </p>

          <h2 className="thank-you-final mt-6 font-display text-[clamp(4.5rem,11vw,12rem)] font-black leading-none text-[#F4EFE3]">
            Thank You
          </h2>

          <p className="mt-4 text-sm font-black uppercase tracking-[0.38em] text-[#8AA0BC]">
            For exploring my work
          </p>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[#A8B7D4] md:text-xl">
            You&apos;ve seen the experience, projects, technical stack, and academic
            foundation behind my data-science journey. The visual concept is memorable;
            the evidence is what I want you to remember.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={PROFILE_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="gravity-button"
            >
              LinkedIn
            </a>

            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="gravity-button secondary"
            >
              GitHub
            </a>

            <button onClick={() => goToSection('identity')} className="gravity-button secondary">
              Restart Journey
            </button>
          </div>
        </div>
      </section>

      {openExperience && (
        <PopupCard
          eyebrow="Experience details"
          title={openExperience.title}
          subtitle={openExperience.subtitle}
          meta={openExperience.meta}
          details={openExperience.details}
          onClose={() => setOpenExperience(null)}
        />
      )}

      {openEducation && (
        <PopupCard
          eyebrow="Education details"
          title={openEducation.title}
          subtitle={openEducation.subtitle}
          meta={openEducation.meta}
          details={openEducation.details}
          onClose={() => setOpenEducation(null)}
        />
      )}

      {openApproach && (
        <PopupCard
          eyebrow={openApproach.signal}
          title={openApproach.title}
          subtitle={openApproach.proof}
          meta="Behavior → evidence → outcome"
          details={openApproach.details}
          onClose={() => setOpenApproach(null)}
        />
      )}

      {openSkill && (
        <PopupCard
          eyebrow="Skill details"
          title={openSkill.title}
          subtitle={openSkill.evidence}
          meta={openSkill.tools}
          details={openSkill.details}
          onClose={() => setOpenSkill(null)}
        />
      )}

      {openProject && (
        <PopupCard
          eyebrow={openProject.tag}
          title={openProject.title}
          subtitle={openProject.status}
          meta={openProject.tools}
          details={openProject.details}
          href={openProject.href}
          onClose={() => setOpenProject(null)}
        />
      )}
    </main>
  )
}

function OrbitSection({
  visible,
  className,
  nebulaClassName,
  coreClassName,
  eyebrow,
  title,
  text,
  footer,
  controls,
  children,
}: {
  visible: boolean
  className: string
  nebulaClassName: string
  coreClassName: string
  eyebrow: string
  title: string
  text: string
  footer: ReactNode
  controls: ReactNode
  children: ReactNode
}) {
  return (
    <section
      className={`${className} fixed inset-0 z-20 overflow-hidden px-6 py-8 transition-all duration-[1300ms] md:px-14 ${
        visible
          ? 'pointer-events-auto scale-100 opacity-100 blur-0'
          : 'pointer-events-none scale-[1.18] opacity-0 blur-3xl'
      }`}
    >
      <div className={nebulaClassName} />
      <div className={coreClassName} />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col">
        <SectionHeader eyebrow={eyebrow} title={title} text={text} />

        <div className="orbit-field relative mt-8 min-h-[480px] flex-1">
          <div className="field-orbit orbit-a" />
          <div className="field-orbit orbit-b" />
          <div className="field-orbit orbit-c" />
          {children}
        </div>

        {footer}
        {controls}
      </div>
    </section>
  )
}

function StarButton({
  itemTitle,
  position,
  active,
  delay,
  onHover,
  onClick,
  withSparks = true,
  projectDot = false,
}: {
  itemTitle: string
  position: string
  active: boolean
  delay: string
  onHover: () => void
  onClick: () => void
  withSparks?: boolean
  projectDot?: boolean
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      className={`field-star absolute ${position} ${active ? 'field-star-active' : ''}`}
      style={{ animationDelay: delay }}
      aria-label={`Open ${itemTitle} details`}
    >
      <span className="field-star-comet" />
      <span className="field-star-trail" />
      <span className={`field-star-core ${projectDot ? 'project-core-dot' : ''}`} />
      <span className="field-star-ring" />

      {withSparks && (
        <>
          <span className="field-spark spark-one" />
          <span className="field-spark spark-two" />
          <span className="field-spark spark-three" />
        </>
      )}

      <span className="field-star-label">{itemTitle}</span>
    </button>
  )
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text: string
}) {
  return (
    <div className="pt-6 text-center">
      <p className="text-xs font-black uppercase tracking-[0.45em] text-[#D4AF37]">
        {eyebrow}
      </p>

      <h2 className="mt-5 font-display text-[clamp(3rem,7vw,7rem)] font-black leading-none text-[#F4EFE3]">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#9FB0CC] md:text-lg">
        {text}
      </p>
    </div>
  )
}

function InfoCard({
  eyebrow,
  title,
  subtitle,
  meta,
  details,
  href,
}: {
  eyebrow: string
  title: string
  subtitle: string
  meta: string
  details: string[]
  href?: string
}) {
  return (
    <div className="relative z-20 mx-auto mb-5 w-full max-w-5xl">
      <div key={title} className="info-card">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#D4AF37]">
              {eyebrow}
            </p>

            <h3 className="mt-3 text-3xl font-black text-[#F4EFE3] md:text-5xl">
              {title}
            </h3>

            <p className="mt-3 text-sm font-bold uppercase tracking-[0.22em] text-[#8FA5C8]">
              {subtitle}
            </p>
          </div>

          <div className="info-meta-box">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#D4AF37]">
              Tools / Focus
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#C8D4EA]">
              {meta}
            </p>

            {href && (
              <a href={href} target="_blank" rel="noreferrer" className="project-link-button mt-4">
                Open Repository
              </a>
            )}
          </div>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2">
          {details.map((item) => (
            <div key={item} className="info-pill">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PopupCard({
  eyebrow,
  title,
  subtitle,
  meta,
  details,
  href,
  onClose,
}: {
  eyebrow: string
  title: string
  subtitle: string
  meta: string
  details: string[]
  href?: string
  onClose: () => void
}) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-card" onClick={(event) => event.stopPropagation()}>
        <div className="popup-blackhole-picture" aria-hidden="true">
          <SimpleBlackHole variant="popup" />
        </div>

        <button onClick={onClose} className="popup-close" aria-label="Close popup">
          ×
        </button>

        <p className="relative z-10 text-xs font-black uppercase tracking-[0.32em] text-[#D4AF37]">
          {eyebrow}
        </p>

        <h3 className="relative z-10 mt-4 font-display text-5xl font-black leading-none text-[#F4EFE3] md:text-7xl">
          {title}
        </h3>

        <p className="relative z-10 mt-4 text-sm font-bold uppercase tracking-[0.22em] text-[#8FA5C8]">
          {subtitle}
        </p>

        <div className="popup-meta relative z-10 mt-6">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-[#D4AF37]">
            Focus / Tools
          </p>
          <p className="mt-2 text-sm leading-6 text-[#C8D4EA]">{meta}</p>

          {href && (
            <a href={href} target="_blank" rel="noreferrer" className="project-link-button mt-4">
              Open Repository
            </a>
          )}
        </div>

        <div className="relative z-10 mt-7 grid gap-3 md:grid-cols-2">
          {details.map((item) => (
            <div key={item} className="popup-pill">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SimpleBlackHole({ variant = 'connect' }: { variant?: 'connect' | 'thankyou' | 'popup' }) {
  return (
    <div className={`simple-blackhole-3d ${variant === 'thankyou' ? 'thankyou-hole' : ''} ${variant === 'popup' ? 'popup-hole' : ''}`} aria-hidden="true">
      <span className="blackhole-space-dust dust-a" />
      <span className="blackhole-space-dust dust-b" />
      <span className="blackhole-shadow" />
      <span className="blackhole-glow" />
      <span className="blackhole-ring ring-one" />
      <span className="blackhole-ring ring-two" />
      <span className="blackhole-ring ring-three" />
      <span className="blackhole-particle particle-one" />
      <span className="blackhole-particle particle-two" />
      <span className="blackhole-particle particle-three" />
    </div>
  )
}

function MessageBox() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const mailSubject = encodeURIComponent(`Portfolio message from ${name || 'visitor'}`)
  const mailBody = encodeURIComponent(
    `Hi Meet,\n\n${message || 'I visited your portfolio and wanted to connect.'}\n\nFrom: ${
      name || 'Visitor'
    }`,
  )

  return (
    <div className="message-orbit-card compact-connect-card">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-[#D4AF37]">
        Send message
      </p>

      <h3 className="mt-4 font-display text-4xl font-black leading-none text-[#F4EFE3] md:text-5xl">
        Write to Me
      </h3>

      <p className="mt-4 text-sm leading-7 text-[#A8B7D4]">
        Type a short message and it will open your email app ready to send.
      </p>

      <div className="mt-5 grid gap-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className="message-input"
        />

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write your message..."
          rows={3}
          className="message-input resize-none"
        />

        <a
          href={`mailto:meetgajera16@gmail.com?subject=${mailSubject}&body=${mailBody}`}
          className="message-send-button"
        >
          Send Message
        </a>
      </div>
    </div>
  )
}

function BottomControls({
  onBack,
  onNext,
  nextLabel,
}: {
  onBack: () => void
  onNext: () => void
  nextLabel: string
}) {
  return (
    <div className="relative z-30 mx-auto flex items-center justify-center gap-4 pb-2">
      <button onClick={onBack} className="gravity-button secondary">
        Back
      </button>
      <button onClick={onNext} className="gravity-button">
        {nextLabel}
      </button>
    </div>
  )
}