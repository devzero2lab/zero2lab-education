"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { TechStackSection } from "@/app/components/TechStackSection";
import { Clock, Calendar, BookOpen, Users, Star, Award, Gift, ArrowRight, Play, Video, Folder, Target, UserCheck, Globe, Tool, BookOpenCheck, CircleCheck, HelpCircle, LightbulbIcon, Rocket, Briefcase, GraduationCap, Users2, CheckCircle, TrendingUp, Zap, Shield, Heart, Trophy, Sparkles, MessageCircle, Code, Database, Brain, ChevronRight, PlayCircle, Download, ExternalLink } from "lucide-react";

// --- Helper Components ---

// Icon component for features
const FeatureIcon = ({ children }) => (
  <div className="bg-blue-50 text-blue-600 rounded-lg w-12 h-12 flex items-center justify-center">
    {children}
  </div>
);

// Accordion Item Component for Curriculum and FAQ
const AccordionItem = ({ title, children, isOpen, onClick }) => (
  <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
    <button
      className="w-full flex justify-between items-center text-left p-5 bg-white hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <span className="text-lg font-medium text-gray-800">{title}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current text-blue-600">
          <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </motion.span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-5 pb-5 text-gray-600 bg-gray-50"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Enhanced Testimonial Card Component
const TestimonialCard = ({ quote, name, role, image, salary, beforeAfter, rating, videoThumbnail }) => (
  <motion.div 
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
    whileHover={{ scale: 1.02 }}
  >
    {/* Background gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div className="relative z-10">
      {/* Video play button overlay */}
      {videoThumbnail && (
        <div className="absolute top-4 right-4 z-20">
          <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transition-colors group-hover:scale-110">
            <PlayCircle className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Rating */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {[...Array(rating)].map((_, i) => (
            <motion.svg 
              key={i} 
              className="w-4 h-4 text-yellow-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: i * 0.1 }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </div>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
          Success Story
        </span>
      </div>
      
      <p className="text-gray-700 mb-6 italic leading-relaxed text-sm">"{quote}"</p>
      
      {/* Career transformation */}
      <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <div className="text-xs text-gray-500 mb-1">Career Transformation</div>
        <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <span>{beforeAfter.split(' → ')[0]}</span>
          <ArrowRight className="w-3 h-3 text-blue-600" />
          <span className="text-blue-600">{beforeAfter.split(' → ')[1]}</span>
        </div>
      </div>
      
      {/* Salary info */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Current Salary</div>
        <div className="text-lg font-bold text-emerald-600">{salary}</div>
      </div>
      
      {/* Profile */}
      <div className="flex items-center">
        <Image src={image} alt={name} width={48} height={48} className="rounded-full mr-4 ring-2 ring-blue-100" />
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// Professional Stats Counter Component
const StatCounter = ({ number, label, icon: Icon }) => (
  <motion.div 
    className="text-center group p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white transition-all duration-300"
    whileHover={{ y: -4 }}
  >
    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 transition-all duration-300 group-hover:scale-105 border border-blue-100">
      <Icon className="w-8 h-8" />
    </div>
    <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
      {number}
    </div>
    <div className="text-slate-600 text-sm font-medium">
      {label}
    </div>
  </motion.div>
);

// --- Main Page Component ---

function Page() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const courseId = "677a02ca6360d9d4edf96737";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // State for Accordions
  const [openCurriculumSet, setOpenCurriculumSet] = useState(new Set([0,1,2,3,4,5]));
  const [openFaq, setOpenFaq] = useState(null);
  const [showAllTech, setShowAllTech] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Function to expand all curriculum sections
  const expandAllCurriculum = (e) => {
    e.preventDefault(); // Prevent any default behavior
    const allIndexes = new Set(curriculumData.map((_, index) => index));
    
    // First update the state
    setOpenCurriculumSet(allIndexes);
    
    // Use requestAnimationFrame to ensure the DOM has updated before scrolling
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const curriculumSection = document.getElementById('curriculum');
        if (curriculumSection) {
          const headerOffset = 100; // Adjust this value based on your header height
          const elementPosition = curriculumSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    });
  };
  const [promoEndsAt, setPromoEndsAt] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [promoDismissed, setPromoDismissed] = useState(false);
  const [showOfferHint, setShowOfferHint] = useState(false);

  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          const response = await axios.get(`${apiUrl}/api/usercourses`, {
            params: { userId: user.id },
          });
          const userCourses = response.data.userCourses || [];
          const enrolled = userCourses.some(
            (course) => course.courseId._id === courseId
          );
          setIsEnrolled(enrolled);
        } catch (error) {
          console.error("Error checking enrollment status:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkEnrollmentStatus();
  }, [isLoaded, isSignedIn, user, courseId, apiUrl]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close video on ESC and handle body scroll when modal open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsVideoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    if (isVideoOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = prev;
      };
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [isVideoOpen]);

  // Promo countdown (5 days), persisted per browser via localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = "mlPromoEndsAt";
    const dismissedKey = "mlPromoDismissed";
    const dismissed = localStorage.getItem(dismissedKey) === "true";
    setPromoDismissed(dismissed);
    let endsAt = localStorage.getItem(key);
    if (!endsAt) {
      const fiveDaysMs = 5 * 24 * 60 * 60 * 1000;
      const newEndsAt = Date.now() + fiveDaysMs;
      localStorage.setItem(key, String(newEndsAt));
      endsAt = String(newEndsAt);
    }
    const endsAtNum = Number(endsAt);
    setPromoEndsAt(endsAtNum);

    const compute = () => {
      const now = Date.now();
      const diff = Math.max(0, endsAtNum - now);
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((diff % (60 * 1000)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    compute();
    const interval = setInterval(compute, 1000);
    return () => clearInterval(interval);
  }, []);

  // Control mobile-only floating offer hint visibility
  useEffect(() => {
    const isActive = (timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds) > 0;
    const mobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    setShowOfferHint(mobile && isActive && !promoDismissed);
  }, [timeLeft, promoDismissed]);

  // Enhanced data for the page
  const techStack = [
    { name: "Python", logo: "/images/skills/python.png", category: "Programming", popularity: 95 },
    { name: "Scikit-learn", logo: "/images/skills/sklearn.png", category: "ML Library", popularity: 85 },
    { name: "Pandas", logo: "/images/skills/pandas.png", category: "Data Analysis", popularity: 92 },
    { name: "NumPy", logo: "/images/skills/numpy.png", category: "Scientific Computing", popularity: 94 },
    { name: "Jupyter", logo: "/images/skills/jupyter.png", category: "ML Library", popularity: 89 },
    { name: "Matplotlib", logo: "/images/skills/docker.png", category: "ML Library", popularity: 91 },
  
    
  ];

  const industryPartners = [
    { name: "Google", logo: "/images/partners/google.png" },
    { name: "Microsoft", logo: "/images/partners/microsoft.png" },
    { name: "Amazon", logo: "/images/partners/amazon.png" },
    { name: "Meta", logo: "/images/partners/meta.png" },
    { name: "OpenAI", logo: "/images/partners/openai.png" },
    { name: "Nvidia", logo: "/images/partners/nvidia.png" },
  ];

  
  const curriculumData = [
    { 
      title: "Week 1: Foundations of AI & Python", 
      content: "Introduction to Generative AI, setting up your Python environment, and mastering data structures.",
      modules: ["Why Python Programming", "Data Types and Operators", "Data Structures in Python", "Control Flow","Functions","Scripting","Introduction to Object-Oriented Programming"]
    },
    { 
      title: "Week 2-3: Numpy, Pandas, Matplotlib", 
      content: "Introduction to Numpy, Pandas, Matplotlib, Seaborn",
      modules: ["Anaconda","Jupyter" ,"Notebooks", "NumPy" ,"Pandas","Matplotlib","Seaborn"]
    },
    { 
      title: "Week 4-5: Linear Algebra Essentials", 
      content: "Introduction to Linear Algebra, Vectors, Linear Combination, Linear Transformation and Matrices, Vectors Lab, Linear Combination Lab, Linear Mapping Lab, Linear Algebra in Neural Networks",
      modules: ["Introduction to Linear Algebra", "Vectors", "Linear Combination", "Linear Transformation and Matrices", "Vectors Lab", "Linear Combination Lab", "Linear Mapping Lab", "Linear Algebra in Neural Networks"]
    },
    { 
      title: "Week 6-7: Intro to Machine Learning", 
      content: "Introduction to Machine Learning, Linear Regression, Logistic Regression, Decision Trees, Naive Bayes, Support Vector Machines, Ensemble Methods, Course Recap",
      modules: ["Introduction to Machine Learning", "Linear Regression", "Logistic Regression", "Decision Trees", "Naive Bayes", "Support Vector Machines", "Ensemble Methods", "Course Recap"]
    },
    { 
      title: "Week 8-9: Advanced ML and Projects", 
      content: "Regression Models, Classification Basics, Practical Exercises (Supervised), Clustering, Dimensionality Reduction, Practical Exercises (Unsupervised), End-to-End ML Project, Model Deployment Basics",
      modules: ["Regression Models", "Classification Basics", "Practical Exercises (Supervised)", "Clustering", "Dimensionality Reduction", "Practical Exercises (Unsupervised)", "End-to-End ML Project", "Model Deployment Basics"]
    },
  ];
  
  const faqData = [
    { q: "Is this course for beginners?", a: "Yes! This course is designed to take you from the fundamentals to an advanced level. A basic understanding of programming concepts is helpful but not required." },
    { q: "What if I miss a live class?", a: "No problem. All live classes are recorded and will be available in your student dashboard within 24 hours." },
    { q: "Do you offer installment payment plans?", a: "Yes, we offer flexible 2 and 3-month installment plans. You can select this option during checkout." },
    { q: "Will I get a certificate after completion?", a: "Absolutely. You will receive a professional, verifiable certificate that you can share on your LinkedIn profile and resume." },
   
  ];

  // Meta details per curriculum section
  const curriculumMeta = [
    { hours: 6, difficulty: "Beginner" },
    { hours: 10, difficulty: "Intermediate" },
    { hours: 12, difficulty: "Intermediate" },
    { hours: 8, difficulty: "Advanced" },
    { hours: 6, difficulty: "Advanced" },
  ];

  const testimonials = [
    {
      quote: "මෙම පාඨමාලාව මගේ career එක සම්පූර්ණයෙන්ම වෙනස් කළා. Real-world projects වල සහ hands-on experience එක නිසා මට top tech company එකක AI Engineer position එකක් ගන්න පුළුවන් වුණා.",
      name: "Kasun Perera",
      role: "AI Engineer at WSO2",
      image: "/images/students/Amanda Bandara.jpg",
      salary: "LKR 180k/month",
      beforeAfter: "Accounting → AI Engineering",
      rating: 5,
      videoThumbnail: "/images/testimonials/kasun-video.jpg"
    },
    {
      quote: "Instructors ලා industry experts ලා. Practical insights තියෙනවා textbooks වල නැති. Every penny worth it!",
      name: "Thilini Silva",
      role: "ML Engineer at PickMe",
      image: "/images/students/Anushanga Munasinghe.jpg",
      salary: "LKR 150k/month",
      beforeAfter: "IT Support → ML Engineer",
      rating: 5,
      videoThumbnail: "/images/testimonials/thilini-video.jpg"
    },
    {
      quote: "Zero knowledge ඉදන් hero level එකට! Curriculum structure එක perfect, community support එක amazing. Best investment මගේ life එකේ.",
      name: "Ruwan Fernando",
      role: "Data Scientist at Dialog",
      image: "/images/students/Denuwan Sathsara.jpg",
      salary: "LKR 160k/month",
      beforeAfter: "Banking → Data Science",
      rating: 5,
      videoThumbnail: "/images/testimonials/ruwan-video.jpg"
    },
    {
      quote: "3 months කින් job offer 4ක් ආවා. Portfolio projects නිසා interviews වල confident ව answer කරන්න පුළුවන් වුණා.",
      name: "Nimali Jayasinghe",
      role: "ML Engineer at IFS",
      image: "/images/students/Fazla Fiyas.jpg",
      salary: "LKR 170k/month",
      beforeAfter: "Marketing → ML Engineering",
      rating: 5,
      videoThumbnail: "/images/testimonials/nimali-video.jpg"
    }
  ];

  const outcomes = [
    { Icon: Rocket, title: "Launch Your AI Career", description: "Build a portfolio of 5+ real-world AI projects" },
    { Icon: Tool, title: "Job Ready Skills", description: "Master in-demand tools used by top companies" },
    { Icon: Award, title: "Industry Recognition", description: "Earn a certificate valued by employers" },
    { Icon: Globe, title: "Global Network", description: "Join our community of AI professionals" }
  ];

  // Animation Variants for Framer Motion
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="bg-white">
      {/* Mobile Offer Hint (top-right floating) */}
      {showOfferHint && (
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("limited-offer");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className="md:hidden fixed bottom-6 right-4 z-[55] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-lg ring-1 ring-white/40 hover:opacity-95 active:opacity-90"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16-4H4m16 0l-2-3m2 3l-2 3M4 8l2-3M4 8l2 3" />
          </svg>
          Offer
        </button>
      )}
      {/* --- 1. ENHANCED HERO SECTION --- */}
      <section className="pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative overflow-hidden">
        {/* Subtle Professional Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-400/10 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-br from-slate-400/10 to-blue-400/10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-transparent via-white/3 to-transparent blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 max-w-[1400px] relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            {/* Left side: Text content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Professional Hero Badges */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-full px-2 py-2 inline-flex items-center gap-3 shadow-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                    <span className="text-slate-600 text-sm font-medium">Months</span>
                  </div>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex items-center gap-1 pr-2">
                    <span className="text-indigo-600 font-bold text-sm">60+</span>
                    <span className="text-slate-600 text-sm font-medium">Hours</span>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <h1 className="font-bold tracking-tight text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-7xl text-slate-900 leading-[1.15] sm:leading-tight">
                  Transform Your Career with
                  <br />
                  <span className="relative inline-block mt-2 sm:mt-3">
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
                      Machine Learning
                    </span>
                  </span>
                </h1>
                
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-lg sm:text-2xl lg:text-3xl text-slate-600 font-medium leading-relaxed">
                    From Zero to <span className="text-blue-600 font-semibold">Professional ML Engineer</span> in 16 Weeks
                  </p>
                  <p className="text-base sm:text-xl text-slate-500 font-medium">
                    Join 150+ successful graduates now working at top companies
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-6 sm:space-y-8"
              >
                <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-medium max-w-3xl">
                  Master the skills that are reshaping every industry. Build real-world projects, 
                  work with cutting-edge AI technologies, and join the ranks of highly-paid ML engineers.
                </p>
                
                {/* Professional Key Benefits - Concise Hero Pills */}
                <div className="flex flex-wrap gap-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-full"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-emerald-900 font-semibold whitespace-nowrap">100% Job Ready</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-full"
                  >
                    <Rocket className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-blue-900 font-semibold whitespace-nowrap">Real Projects</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-50 to-indigo-100/50 border border-indigo-200 rounded-full"
                  >
                    <Shield className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm text-indigo-900 font-semibold whitespace-nowrap">Certified</span>
                  </motion.div>
                  
                  
                </div>
              </motion.div>
              
              {/* Professional CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                {loading ? (
                  <div className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-slate-400 rounded-xl text-center">
                    Loading...
                  </div>
                ) : isEnrolled ? (
                  <Link 
                    href="/dashboard" 
                    className="group relative w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-center hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Continue Learning 
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ) : (
                  <>
                    <Link 
                      href={`/courses/${courseId}/enroll`} 
                      className="group relative w-full sm:w-auto px-3 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-center hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Enroll Now - Save 45%
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                    <a 
                      href="https://drive.google.com/file/d/10KmM_guPoTf2FUiHFyXgPByhScjTSV-F/view"
                      
                      className="group w-full sm:w-auto px-2  py-4 text-lg font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl text-center hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Download Full Syllabus
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>
                  </>
                )}
              </motion.div>
              
              {/* Professional Social Proof */}
              <motion.div 
                className="flex flex-col xl:flex-row items-start xl:items-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <Image src="/images/students/Amanda Bandara.jpg" alt="student" width={44} height={44} className="rounded-full ring-2 ring-white shadow-md" />
                    <Image src="/images/students/Anushanga Munasinghe.jpg" alt="student" width={44} height={44} className="rounded-full ring-2 ring-white shadow-md" />
                    <Image src="/images/students/Denuwan Sathsara.jpg" alt="student" width={44} height={44} className="rounded-full ring-2 ring-white shadow-md" />
                    <Image src="/images/students/Fazla Fiyas.jpg" alt="student" width={44} height={44} className="rounded-full ring-2 ring-white shadow-md" />
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 ring-2 ring-white shadow-md flex items-center justify-center text-white font-bold text-xs">
                      150+
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-800 font-semibold mb-1">
                      Join 150+ successful graduates
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <motion.svg 
                            key={i} 
                            className="w-3.5 h-3.5 text-yellow-500" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 1.4 + i * 0.1 }}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </div>
                      <span className="text-slate-600 font-medium">4.9/5</span>
                      <span className="text-slate-400">•</span>
                      
                    </div>
                  </div>
                </div>
                
                {/* Live enrollment indicator */}
                <motion.div 
                  className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-emerald-700 font-semibold">12 students enrolled today</span>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Right side: Enhanced Video (thumbnail -> modal player) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6, delay: 0.2 }} 
              className="relative flex justify-center lg:justify-end"
            >
              <button 
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="group relative w-full max-w-2xl aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Image 
                  src="/images/homepage/hero.png"
                  alt="Course introduction"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/40 transition-all duration-300" />
                
                {/* Video overlay content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {/* <div className="flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/95 backdrop-blur group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
                    <svg className="w-12 h-12 md:w-14 md:h-14 text-blue-600 group-hover:text-blue-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div> */}
                  
                  {/* Video title and duration */}
                  {/* <div className="mt-8 text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-white/90">
                      Watch Course Introduction
                    </h3>
                    <p className="text-base md:text-lg text-white/80 font-medium">
                      5 minutes • See what you'll learn
                    </p>
                  </div> */}
                </div>
                
                {/* Play button pulse effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/20 animate-ping"></div>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Fullscreen Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-7xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/A3ltFssuAKg?autoplay=1&rel=0"
              title="AI Engineer Course Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-2xl shadow-3xl"
            />
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 md:top-4 md:-right-12 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur text-gray-700 shadow-xl hover:bg-white hover:scale-110 transition-all duration-200"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* PROMOTION BAR */}
      {!promoDismissed && (timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds > 0) && (
        <div id="limited-offer" className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white border-b border-blue-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row items-center gap-4 lg:gap-6 justify-between relative max-w-6xl">
            <div className="flex items-center gap-3 pr-8">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur">
                Limited Offer
              </span>
              <p className="text-xl md: font-bold">
                Master Machine Learning + Get 2 Courses FREE!
              </p>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hrs", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Sec", value: timeLeft.seconds },
                ].map((t, i) => (
                  <div key={i} className="text-center">
                    <div className="min-w-[48px] px-2 py-1 rounded-md bg-white/10 font-semibold">
                      {String(t.value).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] uppercase tracking-wide opacity-80 mt-0.5">
                      {t.label}
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                href={`/courses/${courseId}/enroll`} 
                className="whitespace-nowrap inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-md bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
              >
                Claim Offer
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
                  <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </Link>
            </div>
            <button
              type="button"
              aria-label="Dismiss promotion"
              onClick={() => {
                setPromoDismissed(true);
                try { localStorage.setItem("mlPromoDismissed", "true"); } catch {}
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      

      {/* --- 2. ENHANCED STATS SECTION --- */}
      <motion.section 
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        className="py-16 bg-white border-b border-slate-100"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Proven Track Record of Success
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
              Numbers that speak for our excellence and commitment to student success
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <StatCounter number="150+" label="Students Enrolled" icon={Users2} />
            <StatCounter number="95%" label="Job Placement Rate" icon={Briefcase} />
            <StatCounter number="4.9/5" label="Course Rating" icon={Star} />
            <StatCounter number="60+" label="Hours of Content" icon={Video} />
          </div>
        </div>
      </motion.section>

      {/* --- 3. TECH STACK SECTION --- */}
      <TechStackSection techStack={techStack} />

      {/* --- 4. OUTCOMES SECTION --- */}
      <motion.section 
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        className="bg-white py-8 md:py-8"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
              What You'll Achieve
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your career with these tangible outcomes
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-2">
                      {outcome.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      {outcome.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

  
      
      
      {/* --- 6. CURRICULUM SECTION --- */}
      <motion.section 
        id="curriculum" 
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        className="bg-white py-12 md:py-8"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
              Comprehensive Curriculum
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              A professional, outcome-driven syllabus designed to take you from fundamentals to deployment
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {curriculumData.map((item, index) => (
              <AccordionItem 
                key={index} 
                title={item.title}
                isOpen={openCurriculumSet.has(index)}
                onClick={() => {
                  setOpenCurriculumSet((prev) => {
                    const next = new Set(prev);
                    if (next.has(index)) {
                      next.delete(index);
                    } else {
                      next.add(index);
                    }
                    // Ensure at least one remains open
                    if (next.size === 0) {
                      next.add(0);
                    }
                    return next;
                  });
                }}
              >
                {/* Intro blurb */}
                <div className="mb-4 md:mb-5">
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {item.content}
                  </p>
                </div>

                {/* Meta badges */}
                <div className="mb-3 md:mb-4 flex flex-wrap items-center gap-2 md:gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs md:text-sm font-medium">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                    </svg>
                    {curriculumMeta[index]?.hours || 8} hrs content
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs md:text-sm font-medium">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                    </svg>
                    {item.modules.length} modules
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs md:text-sm font-medium">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657 1.79-3 4-3s4 1.343 4 3-1.79 3-4 3-4 1.343-4 3" />
                    </svg>
                    {curriculumMeta[index]?.difficulty || "Intermediate"}
                  </span>
                </div>

                {/* Modules as professional pills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                  {item.modules.map((module, modIndex) => (
                    <div 
                      key={modIndex} 
                      className="flex items-center gap-2.5 md:gap-3 p-2.5 md:p-3 rounded-lg border border-gray-100 bg-gradient-to-br from-gray-50 to-white hover:shadow-sm transition-shadow"
                    >
                      <span className="inline-flex items-center justify-center h-6 w-6 md:h-7 md:w-7 rounded-md bg-blue-50 text-blue-600 text-sm md:text-base">✓</span>
                      <span className="text-sm md:text-base text-gray-800 font-medium">
                        {module}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Highlights row */}
                <div className="mt-4 md:mt-5 flex flex-wrap gap-2 md:gap-3">
                  {[
                    { label: "Video Lectures", icon: (
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )},
                    { label: "Coding Labs", icon: (
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    )},
                    { label: "Projects", icon: (
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  ].map((b, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-700 px-2.5 py-1 rounded-full bg-gray-100">
                      <span className="text-gray-700">{b.icon}</span>
                      {b.label}
                    </span>
                  ))}
                </div>

                {/* CTA row */
                }
                <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-2 md:gap-3">
                  <Link 
                    href={`/courses/${courseId}/enroll`} 
                    className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-md bg-blue-600 text-white text-sm md:text-base font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Enroll Now
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
                      <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </Link>
                  
                  
                </div>
              </AccordionItem>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- 7. ENHANCED TESTIMONIALS SECTION --- */}
      <motion.section 
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        className="py-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6"
            >
              <CheckCircle className="w-4 h-4" />
              95% Job Success Rate
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Real Students, Real Success Stories
            </motion.h2>
            
            
            
            {/* Success metrics */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {[
                { number: "150+", label: "Successful Graduates", icon: GraduationCap },
                { number: "3 months", label: "Average Job Search Time", icon: Clock },
                { number: "4.9/5", label: "Student Satisfaction", icon: Heart }
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md mb-2">
                    <metric.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{metric.number}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
          
          
          
          {/* CTA after testimonials */}
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Write Your Success Story?
            </h3>
            <Link 
              href={`/courses/${courseId}/enroll`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600  text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Sparkles className="w-5 h-5" />
              Join These Success Stories
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* --- 8. ENHANCED PRICING SECTION --- */}
      <motion.section 
        id="pricing" 
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        className="py-16 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                Limited Time - 45% OFF
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Transform Your Career Today
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Complete Machine Learning mastery with lifetime access, job placement support, and industry certification
              </motion.p>
              
              {/* ROI Calculator */}
              <motion.div 
                className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-6 max-w-2xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Investment Return</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">LKR 16500</div>
                      <div className="text-sm text-gray-600">Course Investment</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">LKR 160k+/month</div>
                      <div className="text-sm text-gray-600">Average Graduate Salary</div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <span className="font-semibold text-emerald-600">ROI: 290%</span> in first month alone!
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Value Proposition */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included:</h3>
                <div className="space-y-4">
                  {[
                    { icon: Video, title: "60+ Hours of Expert-led Video Content", desc: "Comprehensive coverage from basics to advanced topics" },
                    { icon: Rocket, title: "5+ Real-world Portfolio Projects", desc: "Build projects that showcase your skills to employers" },
                    { icon: BookOpenCheck, title: "Lifetime Access to Course Materials", desc: "Learn at your pace with lifetime access to updates" },
                    { icon: Users2, title: "Private Student Community Access", desc: "Network with peers and get help from instructors" },
                    { icon: Briefcase, title: "Career Guidance & Interview Prep", desc: "Get help with resumes, portfolios, and interviews" },
                    { icon: Award, title: "Industry Recognized Certificate", desc: "Shareable certificate upon successful completion" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg text-blue-600">
                        {React.createElement(item.icon, { size: 24 })}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Right: Pricing Box */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-blue-50 rounded-xl p-8 border border-blue-100"
              >
                <div className="text-center mb-6">
                  <p className="text-blue-700 mb-2 font-medium">Limited Time Offer</p>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-xl text-gray-500 line-through">LKR 30,000</span>
                    <span className="text-4xl font-bold text-gray-900">LKR 16,500</span>
                  </div>
                  <p className="text-green-700 font-semibold bg-green-100 px-4 py-2 rounded-full inline-block">
                    You Save LKR 45,000 (45% OFF)
                  </p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Installment payment plans available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Lifetime access & updates</span>
                  </div>
                </div>
                
                {loading ? (
                  <div className="w-full px-8 py-4 text-lg font-medium text-white bg-gray-400 rounded-lg text-center">
                    Loading...
                  </div>
                ) : isEnrolled ? (
                  <Link 
                    href="/dashboard" 
                    className="block w-full px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-lg text-center border border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    Go to Dashboard →
                  </Link>
                ) : (
                  <Link 
                    href={`/courses/${courseId}/enroll`} 
                    className="block w-full px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg text-center hover:bg-blue-700 transition-colors"
                  >
                    Enroll Now - Save 45%
                  </Link>
                )}
                
                <p className="text-center text-gray-600 text-sm mt-4">
                  Limited spots available at this price
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- 9. FAQ SECTION --- */}
      <motion.section 
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        className="py-8 bg-gray-50"
      >
        <div className="container mx-auto px-6 lg:px-[200px] xl:px-[300px] 2xl:px-[400px] max-w-[1920px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about the course
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqData.map((item, index) => (
              <AccordionItem 
                key={index} 
                title={item.q}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <p className="text-gray-700 leading-relaxed">{item.a}</p>
              </AccordionItem>
            ))}
          </div>
        </div>
      </motion.section>

      
    </div>
  );
}

export default Page;