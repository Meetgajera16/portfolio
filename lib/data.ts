export const personalInfo = {
  name: 'Meetkumar Gajera',
  fullName: 'Meetkumar Ashokbhai Gajera',
  title: 'Data Science Graduate Student',
  subtitle: 'Analytics · Machine Learning · Business Intelligence',
  email: 'meetgajera16@gmail.com',
  phone: '+1 (201) 284-8150',
  location: 'New Jersey, USA',
  linkedin: 'https://www.linkedin.com/in/meet-gajera-415333246/',
  github: 'https://github.com/Meetgajera16',
  bio: [
    "I'm a Data Science graduate student at Stevens Institute of Technology (GPA: 3.451), with a Bachelor's in Information Technology from Kadi Sarva Vishwavidyalaya, India.",
    'I specialize in building analytics pipelines, ML models, and KPI dashboards that translate raw data into executive-ready decisions — bridging the gap between data engineering and business strategy.',
    'Currently seeking Data Science, Analytics, or Business Intelligence internships and co-op roles for Summer / Fall 2026.',
  ],
}

export const stats = [
  { value: '3.451', label: 'GPA at Stevens' },
  { value: '93%', label: 'Model Accuracy' },
  { value: '20%', label: 'Efficiency Gained' },
  { value: '2+', label: 'Years Experience' },
]

export const education = [
  {
    degree: 'Master of Science — Data Science',
    institution: 'Stevens Institute of Technology',
    location: 'Hoboken, NJ',
    period: 'Sep 2025 – May 2027',
    gpa: '3.451 / 4.0',
    status: 'Active',
    courses: [
      { code: 'CPE 595', name: 'Applied Machine Learning', grade: 'A' },
      { code: 'MA 574', name: 'Foundational Mathematics for Data Science', grade: 'A−' },
      { code: 'MA 540', name: 'Intro to Probability Theory', grade: 'B+' },
      { code: 'ELC 081', name: 'Writing & Speaking for Academic Success I', grade: 'A' },
      { code: 'EE 627', name: 'Data Acquisition/Modeling/Analysis', grade: 'A−' },
      { code: 'MA 541', name: 'Statistical Methods', grade: 'B' },
      { code: 'MA 576', name: 'Optimization for Data Science', grade: 'B−' },
    ],
  },
  {
    degree: 'Bachelor of Engineering — Information Technology',
    institution: 'LDRP Institute of Technology & Research',
    location: 'Gandhinagar, Gujarat, India',
    period: 'Oct 2021 – Apr 2025',
    gpa: null,
    status: 'Completed',
    courses: [],
  },
]

export const skills = [
  {
    category: 'Analytics & BI',
    icon: '📊',
    items: ['Tableau', 'Power BI', 'Advanced Excel', 'KPI Reporting', 'Dashboard Design', 'Google Analytics', 'Data Validation'],
  },
  {
    category: 'Programming',
    icon: '🐍',
    items: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'PyTorch', 'SQL', 'HTML / CSS / JS'],
  },
  {
    category: 'Machine Learning',
    icon: '🤖',
    items: ['Regression', 'Classification', 'Time-Series', 'Decision Trees', 'Deep Learning', 'FQI / RL Agents'],
  },
  {
    category: 'Data Engineering',
    icon: '🗄️',
    items: ['ETL Pipelines', 'SQL Server', 'MongoDB', 'Data Warehousing', 'Data Modeling', 'Data Quality'],
  },
  {
    category: 'Cloud & Tools',
    icon: '☁️',
    items: ['AWS EC2', 'AWS S3', 'AWS IAM', 'Jupyter Notebook', 'Git', 'VBA / Macros'],
  },
  {
    category: 'Model Evaluation',
    icon: '📐',
    items: ['RMSE', 'Precision / Recall', 'ROC-AUC', 'Statistical Modeling', 'Big Data Analytics'],
  },
]

export const experience = [
  {
    role: 'Data Analytics Intern',
    company: 'Pixbyte Future Tech LLP',
    location: 'Gandhinagar, India',
    period: 'May 2025 – Jul 2025',
    bullets: [
      'Designed and optimized reusable analytics pipelines using Python and SQL, reducing manual reporting effort by 20% and improving data reliability for senior leadership.',
      'Developed self-service KPI dashboards in Tableau and Advanced Excel providing real-time operational visibility to stakeholders.',
      'Supported ETL processes by extracting, transforming, and validating financial datasets; ensured data integrity across reporting cycles.',
      'Performed quantitative and statistical analysis to surface operational trends, translating findings into actionable insights for both technical and non-technical audiences.',
    ],
  },
  {
    role: 'Frontend Intern',
    company: 'The Look Agency',
    location: 'Ahmedabad, India',
    period: 'May 2024 – Jul 2024',
    bullets: [
      'Designed and coded responsive website interfaces using HTML, CSS, and JavaScript for client-facing products.',
      'Collaborated with cross-functional teams to define product requirements and optimize UX, resulting in measurably improved engagement metrics.',
      'Worked in an agile environment with designers and developers, sharpening collaborative and technical communication skills.',
    ],
  },
]

export const projects = [
  {
    number: '01',
    title: 'AI Resume + Job Matching Assistant',
    period: '2026 · In Progress',
    metric: 'RAG + Semantic Matching',
    description:
      'Building an AI-powered system where users upload a resume and job description, then receive a match score, missing skills, improvement suggestions, and a natural-language explanation of fit using PDF parsing, embeddings, vector search, and retrieval-augmented generation.',
    tags: ['Python', 'FastAPI', 'RAG', 'LLM', 'Embeddings', 'Vector DB', 'NLP'],
  },
  {
    number: '02',
    title: 'Employee Attrition Prediction',
    period: '2026',
    metric: 'HR Analytics Classification',
    description:
      'Developing a machine learning project to predict employee attrition using HR-related features, exploratory data analysis, feature preprocessing, classification models, and evaluation metrics to identify employees at higher risk of leaving.',
    tags: ['Python', 'Pandas', 'Scikit-learn', 'EDA', 'Classification', 'HR Analytics'],
  },
  {
    number: '03',
    title: 'Diabetes Prediction System',
    period: '2025',
    metric: 'ML Health Classification',
    description:
      'Built a machine learning classification system to predict diabetes likelihood using health indicators such as glucose level, BMI, age, blood pressure, and insulin-related features with preprocessing and model evaluation.',
    tags: ['Python', 'Machine Learning', 'Logistic Regression', 'Decision Tree', 'Random Forest'],
    github: 'https://github.com/Meetgajera16/Diabetes-Prediction',
  },
  {
    number: '04',
    title: 'Data Cleaning with Python',
    period: '2025',
    metric: 'Data Preprocessing',
    description:
      'Created a Python project focused on preparing raw datasets for analysis by handling missing values, inconsistent records, duplicates, formatting issues, and data quality problems before analytics workflows.',
    tags: ['Python', 'Pandas', 'Data Cleaning', 'Data Preprocessing', 'Data Analysis'],
    github: 'https://github.com/Meetgajera16/Data-Cleaning',
  },
  {
    number: '05',
    title: 'Search Engine',
    period: '2026',
    metric: 'Custom Ranking Engine',
    description:
      'Developed a local search engine that crawls HTML pages, cleans text using BeautifulSoup, removes stop words, builds an inverted index, and ranks search results using term-frequency based scoring for multi-keyword queries.',
    tags: ['Python', 'BeautifulSoup', 'NLP', 'Inverted Index', 'Ranking'],
  },
  {
    number: '06',
    title: 'Recommendation System',
    period: '2026',
    metric: 'Collaborative Filtering',
    description:
      'Implemented a recommendation system using matrix factorization and Spark ALS to predict user-item ratings, evaluate model performance, and generate personalized recommendations from training data.',
    tags: ['PySpark', 'ALS', 'Machine Learning', 'Matrix Factorization', 'Jupyter'],
  },
  {
    number: '07',
    title: 'Visual Hull 3D Reconstruction',
    period: '2026',
    metric: 'Computer Vision Pipeline',
    description:
      'Built a voxel-based visual hull reconstruction pipeline using silhouette consistency, camera projection matrices, and point-cloud export to reconstruct 3D object shape from multiple 2D views.',
    tags: ['Python', 'Computer Vision', '3D Reconstruction', 'Voxel Grid', 'PLY'],
  },
  {
    number: '08',
    title: 'Black Hole Animated Portfolio',
    period: '2026',
    metric: 'Interactive 3D UI',
    description:
      'Designed and built a custom animated portfolio experience using Next.js, TypeScript, Tailwind CSS, and a canvas-based black-hole starfield where projects and skills appear as interactive stars.',
    tags: ['Next.js', 'React', 'TypeScript', 'Canvas', 'Tailwind CSS'],
    github: 'https://github.com/Meetgajera16/portfolio',
  },
  {
    number: '09',
    title: 'Femini',
    period: '2025',
    metric: 'Social Impact Portal',
    description:
      'Built a centralized portal designed to support women’s financial independence by connecting users with home-service opportunities such as house maid, cooking maid, baby caretaker, and all-rounder services.',
    tags: ['Web Development', 'Portal', 'Social Impact', 'Frontend'],
    github: 'https://github.com/Meetgajera16/Femini',
  },
  {
    number: '10',
    title: 'Online Voting System',
    period: '2025',
    metric: 'Digital Voting Platform',
    description:
      'Developed an online voting system aimed at improving accessibility, transparency, and efficiency in digital elections compared with traditional paper-based voting methods.',
    tags: ['Web Development', 'Voting System', 'Security', 'Digital Platform'],
    github: 'https://github.com/Meetgajera16/Online-Voting-System',
  },
]
