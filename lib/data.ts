export const personalInfo = {
  name: 'Meet Gajera',
  fullName: 'Meetkumar Ashokbhai Gajera',
  title: 'Data Science Graduate Student',
  subtitle: 'Analytics · Machine Learning · Business Intelligence',
  email: 'meetgajera16@gmail.com',
  phone: '+1 (201) 284-8150',
  location: 'New Jersey, USA',
  linkedin: 'https://linkedin.com/in/meetgajera',
  github: 'https://github.com/meetgajera',
  bio: [
    "I'm a Data Science graduate student at Stevens Institute of Technology (GPA: 3.727), with a Bachelor's in Information Technology from Kadi Sarva Vishwavidyalaya, India.",
    'I specialize in building analytics pipelines, ML models, and KPI dashboards that translate raw data into executive-ready decisions — bridging the gap between data engineering and business strategy.',
    'Currently seeking Data Science, Analytics, or Business Intelligence internships and co-op roles for Summer / Fall 2026.',
  ],
}

export const stats = [
  { value: '3.727', label: 'GPA at Stevens' },
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
    gpa: '3.727 / 4.0',
    status: 'Active',
    courses: [
      { code: 'CPE 595', name: 'Applied Machine Learning', grade: 'A' },
      { code: 'MA 574', name: 'Foundational Mathematics for Data Science', grade: 'A−' },
      { code: 'MA 540', name: 'Intro to Probability Theory', grade: 'B+' },
      { code: 'ELC 081', name: 'Writing & Speaking for Academic Success I', grade: 'A' },
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
    title: 'DEMI — Workforce Attrition Platform',
    period: 'Sep 2025 – Dec 2025',
    description:
      'End-to-end predictive analytics solution forecasting employee attrition and optimizing HR budget allocation. Implemented a Fitted Q-Iteration (FQI) reinforcement learning agent to simulate and evaluate retention strategies, achieving 87% prediction accuracy and reducing forecast error by 18%.',
    tags: ['Python', 'Scikit-learn', 'RL / FQI', 'HR Analytics', 'Predictive Modeling'],
    metric: '87% accuracy',
  },
  {
    number: '02',
    title: 'Feminis — Demand & Supply Platform',
    period: 'Jun 2023 – Nov 2023',
    description:
      'Financial platform connecting gig-workers to opportunities via ML-powered demand–supply matching. Deployed classification models that achieved 93% matching accuracy, directly increasing user transaction volume and financial independence for platform participants.',
    tags: ['Python', 'Classification', 'FinTech', 'ML Matching', 'Gig Economy'],
    metric: '93% match rate',
  },
]
