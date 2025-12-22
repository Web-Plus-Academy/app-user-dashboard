export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
  image: string;
  enrolled: boolean;
  progress: number; // 0-100
  status: 'not-started' | 'in-progress' | 'completed';
  category: string;
  rating: number;
  students: number;
}

export interface Internship {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  location: string;
  stipend: string;
  applicationStatus: 'not-applied' | 'applied' | 'shortlisted' | 'selected' | 'rejected';
  deadline: string;
  skills: string[];
}

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  speaker: string;
  description: string;
  type: 'webinar' | 'workshop' | 'conference' | 'meetup';
  registered: boolean;
  attendees: number;
  image: string;
}

export interface Workshop {
  id: string;
  topic: string;
  trainer: string;
  schedule: string;
  duration: string;
  description: string;
  registered: boolean;
  attendanceStatus: 'not-attended' | 'attended' | 'upcoming';
  capacity: number;
  enrolled: number;
  skills: string[];
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    description: 'Master the core concepts of machine learning with hands-on projects using Python and TensorFlow.',
    duration: '12 weeks',
    instructor: 'Dr. Sarah Chen',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    enrolled: true,
    progress: 65,
    status: 'in-progress',
    category: 'AI & ML',
    rating: 4.8,
    students: 2340,
  },
  {
    id: '2',
    title: 'Full Stack Web Development',
    description: 'Build modern web applications from scratch using React, Node.js, and MongoDB.',
    duration: '16 weeks',
    instructor: 'Mike Roberts',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
    enrolled: true,
    progress: 100,
    status: 'completed',
    category: 'Web Development',
    rating: 4.9,
    students: 3120,
  },
  {
    id: '3',
    title: 'Natural Language Processing',
    description: 'Deep dive into NLP techniques, transformers, and building chatbots with state-of-the-art models.',
    duration: '10 weeks',
    instructor: 'Prof. James Liu',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    enrolled: false,
    progress: 0,
    status: 'not-started',
    category: 'AI & ML',
    rating: 4.7,
    students: 1890,
  },
  {
    id: '4',
    title: 'Data Science with Python',
    description: 'Learn data analysis, visualization, and statistical modeling using Python libraries.',
    duration: '8 weeks',
    instructor: 'Emily Watson',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    enrolled: true,
    progress: 30,
    status: 'in-progress',
    category: 'Data Science',
    rating: 4.6,
    students: 4200,
  },
  {
    id: '5',
    title: 'Cloud Computing with AWS',
    description: 'Master AWS services and deploy scalable applications in the cloud.',
    duration: '10 weeks',
    instructor: 'David Park',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    enrolled: false,
    progress: 0,
    status: 'not-started',
    category: 'Cloud',
    rating: 4.8,
    students: 2100,
  },
  {
    id: '6',
    title: 'Cybersecurity Essentials',
    description: 'Learn ethical hacking, security protocols, and protect systems from cyber threats.',
    duration: '12 weeks',
    instructor: 'Lisa Anderson',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    enrolled: false,
    progress: 0,
    status: 'not-started',
    category: 'Security',
    rating: 4.9,
    students: 1650,
  },
];

export const internships: Internship[] = [
  {
    id: '1',
    role: 'AI/ML Engineering Intern',
    company: 'TechCorp AI',
    duration: '6 months',
    description: 'Work on cutting-edge machine learning models and contribute to production AI systems.',
    location: 'San Francisco, CA (Hybrid)',
    stipend: '$4,500/month',
    applicationStatus: 'shortlisted',
    deadline: '2024-02-15',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
  },
  {
    id: '2',
    role: 'Full Stack Developer Intern',
    company: 'StartupHub',
    duration: '3 months',
    description: 'Build and maintain web applications using modern technologies in a fast-paced startup environment.',
    location: 'Remote',
    stipend: '$3,000/month',
    applicationStatus: 'applied',
    deadline: '2024-02-20',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    id: '3',
    role: 'Data Science Intern',
    company: 'Analytics Pro',
    duration: '4 months',
    description: 'Analyze large datasets and build predictive models for business intelligence.',
    location: 'New York, NY',
    stipend: '$4,000/month',
    applicationStatus: 'selected',
    deadline: '2024-01-30',
    skills: ['Python', 'SQL', 'Tableau', 'Statistics'],
  },
  {
    id: '4',
    role: 'Cloud Engineering Intern',
    company: 'CloudNine Solutions',
    duration: '6 months',
    description: 'Design and implement cloud infrastructure solutions on AWS and Azure.',
    location: 'Seattle, WA',
    stipend: '$5,000/month',
    applicationStatus: 'not-applied',
    deadline: '2024-03-01',
    skills: ['AWS', 'Azure', 'Terraform', 'Kubernetes'],
  },
];

export const events: Event[] = [
  {
    id: '1',
    name: 'AI in 2024: Trends & Predictions',
    date: '2024-02-15',
    time: '2:00 PM EST',
    speaker: 'Dr. Andrew Ng',
    description: 'Join us for an exclusive webinar on the future of AI and what to expect in 2024 and beyond.',
    type: 'webinar',
    registered: true,
    attendees: 1250,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
  },
  {
    id: '2',
    name: 'Hackathon: Build with GPT-4',
    date: '2024-02-22',
    time: '9:00 AM EST',
    speaker: 'OpenAI Team',
    description: '48-hour hackathon to build innovative applications using GPT-4 and other AI technologies.',
    type: 'conference',
    registered: false,
    attendees: 500,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
  },
  {
    id: '3',
    name: 'Career Fair: Tech Giants',
    date: '2024-03-05',
    time: '10:00 AM EST',
    speaker: 'Multiple Companies',
    description: 'Connect with recruiters from Google, Meta, Amazon, and more top tech companies.',
    type: 'meetup',
    registered: true,
    attendees: 2000,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
  },
  {
    id: '4',
    name: 'Introduction to Quantum Computing',
    date: '2024-03-12',
    time: '3:00 PM EST',
    speaker: 'Prof. Maria Santos',
    description: 'A beginner-friendly introduction to quantum computing concepts and applications.',
    type: 'webinar',
    registered: false,
    attendees: 800,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
  },
];

export const workshops: Workshop[] = [
  {
    id: '1',
    topic: 'Building RAG Applications',
    trainer: 'Jennifer Lee',
    schedule: 'Feb 18-19, 2024',
    duration: '2 days',
    description: 'Hands-on workshop on building Retrieval-Augmented Generation systems with LangChain.',
    registered: true,
    attendanceStatus: 'upcoming',
    capacity: 50,
    enrolled: 45,
    skills: ['LangChain', 'Vector DBs', 'OpenAI API'],
  },
  {
    id: '2',
    topic: 'Advanced React Patterns',
    trainer: 'Dan Wilson',
    schedule: 'Feb 25, 2024',
    duration: '1 day',
    description: 'Master advanced React patterns including render props, HOCs, and custom hooks.',
    registered: true,
    attendanceStatus: 'attended',
    capacity: 40,
    enrolled: 40,
    skills: ['React', 'TypeScript', 'State Management'],
  },
  {
    id: '3',
    topic: 'MLOps Best Practices',
    trainer: 'Alex Kumar',
    schedule: 'Mar 1-2, 2024',
    duration: '2 days',
    description: 'Learn to deploy and monitor ML models in production environments.',
    registered: false,
    attendanceStatus: 'upcoming',
    capacity: 35,
    enrolled: 28,
    skills: ['MLflow', 'Docker', 'CI/CD', 'Monitoring'],
  },
  {
    id: '4',
    topic: 'System Design Interview Prep',
    trainer: 'Priya Sharma',
    schedule: 'Mar 8, 2024',
    duration: '1 day',
    description: 'Prepare for system design interviews with real-world case studies and mock sessions.',
    registered: false,
    attendanceStatus: 'upcoming',
    capacity: 30,
    enrolled: 22,
    skills: ['System Design', 'Scalability', 'Architecture'],
  },
];

export const userStats = {
  enrolledCourses: 1,
  registeredInternships: 5,
  eventsAttended: 15,
  workshopsRegistered: 26,
  // completedCourses: 1,
};
