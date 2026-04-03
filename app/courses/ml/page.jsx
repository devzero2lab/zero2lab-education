"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  Clock, Globe, Star, CheckCircle, ChevronRight, PlayCircle,
  Play, Video, Code, Folder, ExternalLink, Monitor, Award,
  ArrowRight, Briefcase
} from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

function Page() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const courseId = "677a02ca6360d9d4edf96737";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [openCurriculumSet, setOpenCurriculumSet] = useState(new Set([0, 1]));
  const [openFaq, setOpenFaq] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          const res = await fetch(
            `${apiUrl}/api/usercourses?userId=${user.id}&action=check&courseId=${courseId}`
          );
          const data = await res.json();
          setIsEnrolled(data.isEnrolled || false);
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
    const onKey = (e) => { if (e.key === "Escape") setIsVideoOpen(false); };
    window.addEventListener("keydown", onKey);
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [isVideoOpen]);

  const curriculumData = [
    {
      title: "Week 1: Foundations of AI & Python",
      modules: ["Why Python Programming", "Data Types and Operators", "Data Structures in Python", "Control Flow", "Functions", "Scripting", "Intro to OOP"]
    },
    {
      title: "Week 2–3: NumPy, Pandas & Visualization",
      modules: ["Anaconda & Jupyter Notebooks", "NumPy Essentials", "Pandas for Data Analysis", "Matplotlib", "Seaborn"]
    },
    {
      title: "Week 4–5: Linear Algebra Essentials",
      modules: ["Intro to Linear Algebra", "Vectors", "Linear Combination", "Linear Transformations & Matrices", "Vector Labs", "Linear Algebra in Neural Networks"]
    },
    {
      title: "Week 6–7: Intro to Machine Learning",
      modules: ["Introduction to ML", "Linear Regression", "Logistic Regression", "Decision Trees", "Naive Bayes", "SVM", "Ensemble Methods"]
    },
    {
      title: "Week 8–9: Advanced ML & Projects",
      modules: ["Regression Models", "Classification Basics", "Clustering", "Dimensionality Reduction", "End-to-End ML Project", "Model Deployment Basics"]
    },
  ];

  const faqData = [
    { q: "Is this course for beginners?", a: "Yes! This course is designed to take you from the fundamentals to an advanced level. A basic understanding of programming concepts is helpful but not required." },
    { q: "What if I miss a live class?", a: "No problem. All live classes are recorded and will be available in your student dashboard within 24 hours." },
    { q: "Do you offer installment payment plans?", a: "Yes, we offer flexible 2 and 3-month installment plans. You can select this option during checkout." },
    { q: "Will I get a certificate after completion?", a: "Absolutely. You will receive a professional, verifiable certificate that you can share on your LinkedIn profile and resume." },
  ];

  const testimonials = [
    {
      quote: "මෙම පාඨමාලාව මගේ career එක සම්පූර්ණයෙන්ම වෙනස් කළා. Real-world projects නිසා top tech company එකක AI Engineer position එකක් ගන්න පුළුවන් වුණා.",
      name: "Kasun Perera",
      role: "AI Engineer at WSO2",
      image: "/images/students/Amanda Bandara.jpg",
      beforeAfter: "Accounting → AI Engineering",
      rating: 5,
    },
    {
      quote: "Instructors ලා industry experts ලා. Practical insights textbooks වල නැති. Every penny worth it!",
      name: "Thilini Silva",
      role: "ML Engineer at PickMe",
      image: "/images/students/Anushanga Munasinghe.jpg",
      beforeAfter: "IT Support → ML Engineer",
      rating: 5,
    },
    {
      quote: "3 months කින් job offer 4ක් ආවා. Portfolio projects නිසා interviews වල confident ව answer කරන්න පුළුවන් වුණා.",
      name: "Nimali Jayasinghe",
      role: "ML Engineer at IFS",
      image: "/images/students/Fazla Fiyas.jpg",
      beforeAfter: "Marketing → ML Engineering",
      rating: 5,
    }
  ];

  const outcomes = [
    "Build 5+ real-world AI & Data Science projects for your portfolio",
    "Master in-demand tools used by top companies worldwide",
    "Earn a verifiable certificate valued by global employers",
    "Understand linear algebra, calculus, and statistics in depth",
    "Deploy machine learning models to production environments",
    "Work with Python, NumPy, Pandas, Scikit-learn, and more",
  ];

  const toggleCurriculum = (index) => {
    setOpenCurriculumSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) { next.delete(index); } else { next.add(index); }
      return next;
    });
  };

  const totalLectures = curriculumData.reduce((acc, c) => acc + c.modules.length, 0);

  return (
    <div className={`${inter.className} bg-[#f7f8fa] min-h-screen`} style={{ color: "#1a1a2e" }}>

      {/* ── HERO BANNER ── */}
      <div style={{ background: "linear-gradient(135deg, #0f1130 0%, #1a1040 60%, #0d0d2b 100%)" }}
        className="text-white pt-20 pb-10 md:pt-28 md:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="lg:pr-[360px] xl:pr-[390px]">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-medium">
              <span>Courses</span>
              <ChevronRight className="w-3 h-3" />
              <span>Machine Learning</span>
            </div>

            {/* Badge */}
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-sm mb-3"
              style={{ background: "#d4f5a0", color: "#0f1130" }}>
              Bestseller
            </span>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-3 tracking-tight">
              Mastering Machine Learning:<br className="hidden sm:block" />
              From Zero to Professional Engineer
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-slate-300 mb-5 max-w-xl leading-relaxed">
              Master the skills reshaping the tech industry. Build real-world projects, work with cutting-edge AI architectures, and secure a high-paying career.
            </p>

            {/* Ratings row */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium mb-4">
              <div className="flex items-center gap-1">
                <span className="text-amber-400 font-bold text-sm">4.9</span>
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <span className="text-slate-400 ml-0.5">(206 ratings)</span>
              </div>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300">150+ students enrolled</span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Last updated 10/2025</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>English / Sinhala</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── LEFT CONTENT ── */}
          <div className="w-full lg:flex-1 min-w-0 pt-6 pb-16 space-y-10">

            {/* WHAT YOU'LL LEARN */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-4">What you&apos;ll learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {outcomes.map((item, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-[13px] text-gray-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* REQUIREMENTS */}
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">Requirements</h2>
              <ul className="space-y-2">
                {["Basic understanding of logic or mathematics.", "A computer with internet access.", "No previous programming experience needed — we teach you everything from scratch!"].map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-gray-700">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* DESCRIPTION */}
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">Description</h2>
              <div className="text-[13px] text-gray-700 space-y-3 leading-relaxed">
                <p>Are you ready to start your path to becoming a Data Scientist or AI Engineer?</p>
                <p>This comprehensive course will be your guide to learning how to use the power of Python to analyze data, create beautiful visualizations, and use powerful machine learning algorithms. Data Scientist has been ranked the #1 job on Glassdoor with an average salary of over $120,000 in the United States.</p>
                <p>We designed this course to be <strong>highly practical</strong>. We won&apos;t just teach you the theory — we make sure you actively build real-world models and applications to cement your understanding.</p>
              </div>
            </section>

            {/* CURRICULUM */}
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-1">Course Content</h2>
              <p className="text-xs text-gray-500 mb-4 font-medium">
                {curriculumData.length} sections &nbsp;•&nbsp; {totalLectures} lectures &nbsp;•&nbsp; 60h 15m total
              </p>

              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                {curriculumData.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0">
                    <button
                      className="w-full flex items-center justify-between px-5 py-3.5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                      onClick={() => toggleCurriculum(index)}
                    >
                      <div className="flex items-center gap-2.5">
                        <ChevronRight className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${openCurriculumSet.has(index) ? 'rotate-90' : ''}`} />
                        <span className="text-[13px] font-semibold text-gray-900">{item.title}</span>
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium hidden sm:block shrink-0">
                        {item.modules.length} lectures
                      </span>
                    </button>

                    {openCurriculumSet.has(index) && (
                      <div className="px-5 py-3 bg-white border-t border-gray-100 space-y-2.5">
                        {item.modules.map((mod, modIdx) => (
                          <div key={modIdx} className="flex items-center justify-between gap-3 group cursor-pointer">
                            <div className="flex items-center gap-2.5">
                              <PlayCircle className="w-3.5 h-3.5 text-gray-400 shrink-0 group-hover:text-blue-600 transition-colors" />
                              <span className="text-[12px] text-gray-700 group-hover:text-blue-600 transition-colors">{mod}</span>
                            </div>
                            <span className="text-[11px] text-gray-400 shrink-0 hidden sm:block">03:45</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* TESTIMONIALS */}
            <section>
              <div className="flex items-center gap-2 mb-5">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <h2 className="text-base font-bold text-gray-900">4.9 course rating</h2>
                <span className="text-xs text-gray-500 font-medium">• 206 ratings</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {testimonials.map((test, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <Image
                        src={test.image}
                        width={36}
                        height={36}
                        alt={test.name}
                        className="rounded-full object-cover bg-gray-100 shrink-0"
                      />
                      <div>
                        <div className="text-[13px] font-semibold text-gray-900">{test.name}</div>
                        <div className="text-[11px] text-gray-500">{test.role}</div>
                      </div>
                      <div className="ml-auto flex text-amber-400 gap-0.5 shrink-0">
                        {[...Array(test.rating)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                      </div>
                    </div>
                    <p className="text-[12px] text-gray-700 leading-relaxed line-clamp-4 mb-3">
                      {test.quote}
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-200 rounded text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                      <Briefcase className="w-2.5 h-2.5 text-gray-400" />
                      <span>{test.beforeAfter.split(" → ")[0]}</span>
                      <ArrowRight className="w-2.5 h-2.5 text-gray-400" />
                      <span className="text-gray-800">{test.beforeAfter.split(" → ")[1]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {faqData.map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span className="text-[13px] font-semibold text-gray-900 pr-4">{item.q}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${openFaq === index ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-4 border-t border-gray-100 bg-gray-50">
                        <p className="text-[12px] text-gray-600 leading-relaxed pt-3">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ── RIGHT STICKY SIDEBAR ── */}
          <div className="w-full lg:w-[320px] xl:w-[340px] shrink-0 lg:sticky top-6
            order-first lg:order-last -mt-4 md:-mt-8 lg:-mt-[280px] xl:-mt-[300px]
            mb-6 lg:mb-0 max-w-[380px] mx-auto lg:mx-0">

            <div className="bg-white rounded-xl shadow-lg shadow-gray-200/60 border border-gray-200 overflow-hidden">

              {/* Thumbnail */}
              <div
                className="relative w-full aspect-video bg-gray-900 cursor-pointer group"
                onClick={() => setIsVideoOpen(true)}
              >
                <Image
                  src="/images/homepage/hero.png"
                  alt="Course Preview"
                  fill
                  className="object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-5 h-5 text-gray-900 fill-current ml-0.5" />
                  </div>
                  <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded-full tracking-wide">
                    Preview this course
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">

                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-2xl font-extrabold text-gray-900">LKR 16,500</span>
                    <span className="text-sm text-gray-400 line-through">30,000</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">45% off</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 w-fit mt-2">
                    <Clock className="w-3 h-3" />
                    <span><strong>2 days</strong> left at this price!</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2.5">
                  {loading ? (
                    <button disabled className="w-full py-3 rounded-lg text-sm font-bold bg-gray-100 text-gray-400">
                      Checking...
                    </button>
                  ) : isEnrolled ? (
                    <Link href="/dashboard"
                      className="w-full py-3 rounded-lg text-white flex justify-center items-center text-sm font-bold transition-all duration-200 hover:opacity-90"
                      style={{ background: "#0f1130" }}>
                      Go to Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link href={`/courses/${courseId}/enroll`}
                        className="w-full py-3 rounded-lg text-white flex justify-center items-center text-sm font-bold transition-all duration-200 hover:opacity-90 shadow-sm"
                        style={{ background: "#7c3aed" }}>
                        Add to Cart
                      </Link>
                      <button
                        className="w-full py-3 rounded-lg border border-gray-800 bg-white text-gray-900 text-sm font-bold hover:bg-gray-50 transition-colors duration-200">
                        Buy Now
                      </button>
                    </>
                  )}
                  <p className="text-center text-[11px] text-gray-400 font-medium">
                    30-Day Money-Back Guarantee
                  </p>
                </div>

                {/* Course Includes */}
                <div className="pt-3 border-t border-gray-100">
                  <h3 className="text-[12px] font-bold text-gray-900 mb-3 uppercase tracking-wide">This course includes:</h3>
                  <div className="space-y-2.5">
                    {[
                      { icon: Video, text: "60 hours on-demand video" },
                      { icon: Code, text: "5+ real-world projects" },
                      { icon: Folder, text: "Coding labs & assignments" },
                      { icon: ExternalLink, text: "Full lifetime access" },
                      { icon: Monitor, text: "Access on mobile and TV" },
                      { icon: Award, text: "Certificate of completion" },
                    ].map(({ icon: Icon, text }, i) => (
                      <div key={i} className="flex items-center gap-3 text-[12px] text-gray-700">
                        <Icon className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button className="text-[12px] font-semibold text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    Share this course
                  </button>
                </div>

              </div>
            </div>

            {/* Team banner below card */}
            <div className="mt-4 border border-gray-200 rounded-xl p-4 bg-white shadow-sm text-center">
              <h4 className="text-[13px] font-bold text-gray-900 mb-1">Training 5+ employees?</h4>
              <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">Get your team access to 10+ top courses anytime, anywhere.</p>
              <button className="w-full py-2 rounded-lg border border-gray-800 text-gray-900 text-[12px] font-bold hover:bg-gray-50 transition-colors">
                Try Zero2Lab Business
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── VIDEO MODAL ── */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/A3ltFssuAKg?autoplay=1&rel=0"
              title="Course Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Page;