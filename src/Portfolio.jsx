import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Menu, X, ChevronDown } from 'lucide-react';
import p from './assets/Portfolio_profile_photo2.jpg'; 
import Movix from './assets/Movix.png'; 
import CartZ from './assets/CartZ.png';
import GemAI from './assets/GemAI.png';
import FileManagement from './assets/File.png';
import Certificate from './assets/Certificate.png';
import Quiz from './assets/Quiz.png';
import InterviewAuto from './assets/InterviewAuto.png';
import NoteApplication from './assets/NoteApplication.png';
import Helpmate from './assets/helpmate.png';
import Fruit from './assets/Fruit.png';
import Profile from './assets/Profile.jpg';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // GSAP Animation Hook
  useEffect(() => {
    // Load GSAP
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const gsap = window.gsap;
      
      // Register ScrollTrigger
      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      scrollTriggerScript.onload = () => {
        gsap.registerPlugin(window.ScrollTrigger);
        
        // Set up ScrollTrigger defaults for smooth performance
        gsap.config({
          autoSleep: 60,
          force3D: true
        });
        
        // Hero animations
        gsap.fromTo('.hero-image', 
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 1.5, ease: 'back.out(1.7)' }
        );
        
        gsap.fromTo('.hero-title', 
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
        );
        
        gsap.fromTo('.hero-subtitle', 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'power3.out' }
        );
        
        gsap.fromTo('.hero-buttons', 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 1.1, ease: 'power3.out' }
        );

        // About section animations
        gsap.fromTo('.about-text', 
          { x: -50, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.about-section',
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              once: true
            }
          }
        );
        
        gsap.fromTo('.about-card', 
          { x: 50, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.8, 
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.about-section',
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              once: true
            }
          }
        );

        // Skills icons animation - optimized for better performance
        gsap.fromTo('.skill-icon', 
          { scale: 0, y: 30, opacity: 0 },
          { 
            scale: 1, 
            y: 0,
            opacity: 1,
            duration: 0.6, 
            stagger: 0.08,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: '.skills-section',
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              once: true
            }
          }
        );

        // Projects animation
        gsap.fromTo('.project-card', 
          { y: 60, opacity: 0, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.6, 
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.projects-section',
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              once: true
            }
          }
        );

        // Contact section animation
        gsap.fromTo('.contact-item', 
          { y: 40, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.contact-section',
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              once: true
            }
          }
        );

        // Subtle parallax effect for background - reduced intensity for better performance
        gsap.to('.bg-parallax', {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: '.bg-parallax',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      };
      document.head.appendChild(scrollTriggerScript);
    };
    document.head.appendChild(script);

    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.killAll();
      }
    };
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Fixed scroll function
  const scrollToSection = (sectionName) => {
    // Convert menu item names to actual section IDs
    const sectionMap = {
      'Home': 'home',
      'About me': 'about',
      'Skills': 'skills',
      'Projects': 'projects',
      'Contact': 'contact'
    };
    
    const sectionId = sectionMap[sectionName] || sectionName.toLowerCase();
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  const skillIcons = [
    { 
      name: 'MongoDB', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      color: 'hover:text-green-400'
    },
    { 
      name: 'Express.js', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      color: 'hover:text-gray-300'
    },
    { 
      name: 'React.js', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Node.js', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: 'hover:text-green-500'
    },
    { 
      name: 'JavaScript', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      color: 'hover:text-yellow-300'
    },
    { 
      name: 'React Native', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: 'hover:text-blue-400'
    },
    // { 
    //   name: 'TypeScript', 
    //   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    //   color: 'hover:text-blue-500'
    // },
    { 
      name: 'HTML5', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      color: 'hover:text-orange-400'
    },
    { 
      name: 'CSS3', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      color: 'hover:text-blue-300'
    },
    { 
      name: 'Tailwind', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      color: 'hover:text-cyan-400'
    },
    { 
      name: 'Git', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      color: 'hover:text-red-400'
    },
    {
      name: "AWS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      color: "hover:text-orange-300"
    },
    { 
      name: 'Docker', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      color: 'hover:text-blue-600'
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'Movie Time',
      summary: 'Movie and TV trailer platform with advanced filters and dynamic content display.',
      image: `${Movix}`,
      techStack: ['HTML', 'CSS', 'Javascript', 'React', 'Redux', 'Day js', 'TMDB API'],
      liveLink: 'https://movie-time-three.vercel.app/',
      githubLink: 'https://github.com/anagpure28/MovieTime'
    },
    {
      id: 2,
      title: 'CartZ',
      summary: 'E-commerce application with user authentication, product management, and secure payment integration.',
      image: `${CartZ}`,
      techStack: ['React', 'Node js', 'MongoDB', 'Express', 'Ant Design', 'Chakra UI', 'Firebase'],
      liveLink: 'https://cart-z.vercel.app/',
      githubLink: 'https://github.com/anagpure28/CartZ'
    },
    {
      id: 3,
      title: 'File Management',
      summary: 'Manage your files effortlessly—upload, view, download, and delete in seconds.',
      image: `${FileManagement}`,
      techStack: ['React', 'Multer', 'Axios', 'Node js', 'Express js', 'MongoDB'],
      liveLink: 'https://file-management-jet.vercel.app/',
      githubLink: 'https://github.com/anagpure28/File-Management'
    },
    {
      id: 4,
      title: 'AI Interview Panel',
      summary: 'Your personal AI panel—practice, get feedback, and ace your interview.',
      image: `${InterviewAuto}`,
      techStack: ['HTML', 'CSS', 'Javascript', 'React', 'Node js', 'Express js', 'MongoDB', 'OpenAI API'],
      liveLink: 'https://interviewautoupdated-i8ydl8z17-anagpure28.vercel.app/',
      githubLink: 'https://github.com/anagpure28/InterviewAuto'
    },
    {
      id: 5,
      title: 'Quiz Application',
      summary: 'Create your own stunning AI-generated images simply by providing a prompt!',
      image: `${Quiz}`,
      techStack: ['HTML', 'CSS', 'Javascript', 'React', 'Axios'],
      liveLink: 'https://basic-quiz-application-eight.vercel.app/',
      githubLink: 'https://github.com/anagpure28/Basic-Quiz-Application'
    },
    {
      id: 6,
      title: 'AI Image Generator',
      summary: 'Create your own stunning AI-generated images simply by providing a prompt!',
      image: `${GemAI}`,
      techStack: ['React', 'Material UI', 'Open AI', 'Node js', 'MongoDB', 'Cloudinary'],
      liveLink: 'https://ai-image-generator-lovat-eta.vercel.app/',
      githubLink: 'https://github.com/anagpure28/Ai-image-generator/tree/main'
    },
    {
      id: 7,
      title: 'Note Application',
      summary: 'Write, organize, and access your notes anytime, anywhere.',
      image: `${NoteApplication}`,
      techStack: ['React', 'Chakra UI', 'Node js', 'Express js', 'MongoDB'],
      liveLink: 'https://frontend-kt8dxfa15-anagpure28.vercel.app/',
      githubLink: 'https://github.com/anagpure28/Task-Application-FE'
    },
    {
      id: 8,
      title: 'Certificate Generator',
      summary: 'Instantly create and download professional certificates with ease.',
      image: `${Certificate}`,
      techStack: ['HTML', 'CSS', 'Javascript', 'React', 'Html2canvas', 'jspdf'],
      liveLink: 'https://certificate-psi.vercel.app/',
      githubLink: 'https://github.com/anagpure28/Certificate'
    },
    {
      id: 9,
      title: 'FruitStore App',
      summary: 'Fresh fruits delivered to your doorstep—fast, easy, and delicious.',
      image: `${Fruit}`,
      techStack: ['HTML', 'CSS', 'Javascript', 'React Native', 'Expo'],
      liveLink: 'https://drive.google.com/file/d/1iS1x9hu5_7lZi3NgArdjcRgS36fqXr9X/view',
      githubLink: 'https://github.com/anagpure28/FruitStore'
    },
    {
      id: 10,
      title: 'Helpmate App',
      summary: 'Helpmate helps customers to skilled book labour at resonable price',
      image: `${Helpmate}`,
      techStack: ['HTML', 'CSS', 'Javascript', 'React Native', 'Expo'],
      liveLink: 'https://drive.google.com/file/d/1qb00MZLW5cT04h4w1e6WTYSjfJQXjdXr/view',
      githubLink: 'https://github.com/anagpure28/Helpmate/'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
      {/* Parallax Background */}
      <div className="fixed inset-0 bg-parallax opacity-10 will-change-transform">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Aniket Nagpure
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About me', 'Skills', 'Projects', 'Contact', 'Resume'].map((item) => (
                item === 'Resume' ? (
                  <a
                    key={item}
                    href="/Aniket-Nagpure-Resume.pdf" 
                    download="Aniket-Nagpure-Resume.pdf"
                    className="cursor-pointer capitalize transition-all duration-300 hover:text-blue-400 text-white"
                  >
                    {item}
                  </a>
                ) : (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`cursor-pointer capitalize transition-all duration-300 hover:text-blue-400 ${
                      activeSection === item ? 'text-blue-400' : 'text-white'
                    }`}
                  >
                    {item}
                  </button>
                )
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-lg">
            <div className="px-4 py-2 space-y-2">
              {['Home', 'About me', 'Skills', 'Projects', 'Contact', 'Resume'].map((item) => (
                item === 'Resume' ? (
                  <a
                    key={item}
                    href="/Aniket-Nagpure-Resume.pdf" 
                    download="Aniket-Nagpure-Resume.pdf"
                    className="cursor-pointer block w-full text-left py-2 capitalize hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </a>
                ) : (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="cursor-pointer block w-full text-left py-2 capitalize hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </button>
                )
              ))}
            </div>
          </div>
        )}
        {/* {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-lg">
            <div className="px-4 py-2 space-y-2">
              {['Home', 'About me', 'Skills', 'Projects', 'Contact', 'Resume'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="cursor-pointer block w-full text-left py-2 capitalize hover:text-blue-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )} */}
      </nav>

      {/* Hero Section */}
      {/* <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden"> */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10 text-center">
          <div className="mb-8">
            <img
              src={Profile}
              alt="Professional Photo"
              className="hero-image w-45 h-50 rounded-md mx-auto mb-6 border-4 border-blue-400 shadow-2xl will-change-transform"
            />
          </div>
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 pb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent will-change-transform">
            Aniket Nagpure
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-8 text-gray-300 will-change-transform">
            MERN Stack Developer | Building Digital Experiences
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 pt-6 justify-center will-change-transform">
            <button
              onClick={() => scrollToSection('projects')}
              className="cursor-pointer px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="cursor-pointer px-8 py-3 border-2 border-blue-400 rounded-full hover:bg-blue-400/10 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 pb-3 animate-bounce">
            <ChevronDown size={32} className="text-blue-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section py-20 px-4" ref={aboutRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="about-text space-y-6 will-change-transform">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate MERN Stack Developer with 2.7 years of experience building scalable web applications. 
                I specialize in creating seamless user experiences with modern technologies and best practices.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My journey in web development started with a curiosity for how things work on the internet. 
                Since then, I've worked on various projects ranging from e-commerce platforms to real-time applications, 
                always focusing on clean code, performance optimization, and user-centric design.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or sharing my knowledge with the developer community.
              </p>
            </div>
            <div className="about-card will-change-transform">
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-semibold mb-6 text-blue-400">Quick Facts</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>2.7+ years of development experience</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Specialized in MERN Stack</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span>15+ successful projects delivered</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Always learning new technologies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section py-20 px-4 bg-black/20" ref={skillsRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
            {skillIcons.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-icon flex flex-col items-center group cursor-pointer will-change-transform"
              >
                <div className="relative">
                  <div className={`w-20 h-20 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:border-blue-400/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/25 ${skill.color}`}>
                    <img 
                      src={skill.icon} 
                      alt={skill.name}
                      className="w-10 h-10 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                      style={{ 
                        filter: skill.name === 'Express.js' ? 'invert(1) brightness(90%)' : 'brightness(90%)'
                      }}
                    />
                  </div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                </div>
                <span className="mt-3 text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section py-20 px-4" ref={projectsRef}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 group will-change-transform"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm hover:scale-105 transition-all duration-300"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg text-sm hover:bg-gray-600/20 transition-all duration-300"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-20 px-4 bg-black/20" ref={contactRef}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. 
            Let's discuss how we can work together to bring your ideas to life!
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a
              href="mailto:your.email@example.com"
              className="contact-item flex flex-col items-center p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 will-change-transform"
            >
              <Mail size={32} className="text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              {/* <p className="text-gray-300 text-sm">aniketnagpureofficial@gmail.com</p> */}
              <p className="text-gray-300 text-sm">
                <a href="mailto:aniketnagpureofficial@gmail.com">
                    aniketnagpureofficial@gmail.com
                </a>
              </p>
            </a>
            
            <a
              href="tel:+919209216409"
              className="contact-item flex flex-col items-center p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 will-change-transform"
            >
              <Phone size={32} className="text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-300 text-sm">+91 9209216409</p>
            </a>
            
            <div className="contact-item flex flex-col items-center p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl backdrop-blur-sm border border-white/10 will-change-transform">
              <div className="flex gap-4 mb-4">
                <a
                  href="https://www.linkedin.com/in/aniket-nagpure-03aa711b7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://github.com/anagpure28"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Github size={24} />
                </a>
              </div>
              <h3 className="text-lg font-semibold mb-2">Social Media</h3>
              <p className="text-gray-300 text-sm">Follow me on social platforms</p>
            </div>
          </div>

          <div className="contact-item bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10 will-change-transform">
            <h3 className="text-2xl font-semibold mb-6">Ready to start a project?</h3>
            <p className="text-gray-300 mb-6">
              I'm currently available for new opportunities and would love to discuss your next project.
            </p>
            <a
              href="mailto:aniketnagpureofficial@gmail.com"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Aniket Nagpure. All rights reserved. Built with React and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;