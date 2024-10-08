"use client"

import React, { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Server, Database, Code, ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'

const ProjectCard: React.FC<{ title: string; description: string; icon: React.ReactNode; subProjects: { title: string; description: string; technologies: string; }[] }> = ({ title, description, icon, subProjects }) => {
  const [currentSubProject, setCurrentSubProject] = useState(0);

  const goToSubProject = (index: number) => { // Specify the type of index
    setCurrentSubProject(index);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <div className="flex items-center text-blue-400 mb-4">
        {icon}
        <span className="ml-2">{subProjects[0].technologies}</span>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg">
        <h4 className="text-lg font-semibold mb-2">{subProjects[currentSubProject].title}</h4>
        <p>{subProjects[currentSubProject].description}</p>
      </div>
      <div className="flex justify-center mt-4">
        {subProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSubProject(index)}
            className={`h-3 w-3 rounded-full mx-1 focus:outline-none transition-colors duration-200 ease-in-out ${index === currentSubProject ? 'bg-blue-400' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            aria-label={`Go to sub-project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('')

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const projects = [
    {
      title: "Trading Automation System",
      description: "Developed advanced trading automations for forex, commodities, and stock markets using C and Python, incorporating machine learning techniques for improved efficiency and accuracy.",
      icon: <Code className="mr-2" />,
      subProjects: [
        { title: "Forex Trading Bot", description: "Automated forex trading system with real-time market analysis", technologies: "C, Python" },
        { title: "Commodity Price Predictor", description: "Machine learning model for predicting commodity prices", technologies: "Python, TensorFlow" },
        { title: "Stock Market Scanner", description: "High-speed scanner for identifying trading opportunities", technologies: "C++, Python" },
        { title: "Backtesting Framework", description: "Robust framework for testing trading strategies on historical data", technologies: "Python, Pandas" },
        { title: "Risk Management Module", description: "Advanced risk calculation and position sizing module", technologies: "C, Python" },
      ],
    },
    {
      title: "Blockchain Middleware",
      description: "Implemented blockchain middleware on multiple protocols, including deposit and withdrawal functionality, using Node.js and Golang for reliable and scalable solutions.",
      icon: <Server className="mr-2" />,
      subProjects: [
        { title: "Multi-Chain Wallet", description: "Unified wallet system supporting multiple blockchain protocols", technologies: "Node.js, Golang" },
        { title: "Transaction Monitoring Service", description: "Real-time monitoring and alerting for blockchain transactions", technologies: "Golang, RabbitMQ" },
        { title: "Smart Contract Integrator", description: "Middleware for interacting with various smart contracts", technologies: "Node.js, Web3.js" },
        { title: "Blockchain Explorer API", description: "RESTful API for querying blockchain data across multiple networks", technologies: "Golang, GraphQL" },
        { title: "Gas Fee Optimizer", description: "Dynamic gas fee calculation and optimization for Ethereum transactions", technologies: "Node.js, Ethers.js" },
      ],
    },
    {
      title: "AI Trading Model",
      description: "Created and trained AI models for financial trading, resulting in increased profitability and improved risk management capabilities.",
      icon: <Database className="mr-2" />,
      subProjects: [
        { title: "Deep Learning Price Predictor", description: "LSTM-based model for predicting short-term price movements", technologies: "Python, Keras" },
        { title: "Sentiment Analysis Engine", description: "NLP model for analyzing market sentiment from news and social media", technologies: "Python, NLTK, PyTorch" },
        { title: "Reinforcement Learning Trader", description: "RL agent for optimizing trading decisions in various market conditions", technologies: "Python, TensorFlow" },
        { title: "Feature Engineering Pipeline", description: "Automated feature generation and selection for trading models", technologies: "Python, Scikit-learn" },
        { title: "Model Ensemble Framework", description: "System for combining multiple AI models for robust trading decisions", technologies: "Python, XGBoost, LightGBM" },
      ],
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('Sending...')
    try {
      await axios.post('/api/contact', formData)
      setFormStatus('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setFormStatus('Failed to send message. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" onClick={() => scrollToSection('home')} className="text-2xl font-bold">SA</a>
          <nav className="hidden md:flex space-x-8">
            {['about', 'skills', 'experience', 'projects', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => scrollToSection(section)}
                className={`hover:text-blue-400 transition-colors ${activeSection === section ? 'text-blue-400' : ''}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </nav>
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-800 py-4">
            {['about', 'skills', 'experience', 'projects', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => scrollToSection(section)}
                className="block px-4 py-2 hover:bg-gray-700"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Home Section */}
      <section id="home" className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Stephen Antoni</h1>
          <p className="text-2xl mb-8">Backend Engineer</p>
          <button onClick={() => scrollToSection('contact')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Get in touch
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">About Stephen Antoni</h2>
          <p className="text-lg mb-4">
            I&apos;m a highly experienced software developer with a strong background in financial trading automation, blockchain development, and AI modeling. With over 10 years of experience in C, and 4 years each in Node.js and Golang, I&apos;ve successfully led and overseen large-scale operations, including acting as Wallet Lead Dev for Tokenomy, acting as core developer for Jagad&apos;s open-source ICSI ICP Smart-Contract Project, and managing an 80Kwh crypto mining farm and overseeing blockchain funding processes for a crypto exchange.
          </p>
          <p className="text-lg">
            My expertise spans across various domains, including trading system development, Machine Learning model training & deployment, blockchain middleware implementation and smart contract development. I&apos;m passionate about leveraging technology to create efficient, scalable, and innovative solutions in the financial and blockchain sectors.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Node.js', 'MongoDB', 'ICP', 'Solidity', 'Git', 'C++', 'Rust','Python', 'Docker', 'Golang', 'JavaScript', 'PHP', 'MySQL', 'Machine Learning', 'Linux/Unix', 'MQL4', 'PineScript', 'Elixir'].map((skill) => (
              <div key={skill} className="bg-gray-800 rounded-lg p-4 text-center">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Experience</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold">Backend Engineer at Jagad</h3>
              <p className="text-gray-400">January 2024 - Present</p>
              <ul className="list-disc list-inside mt-2">
                <li>Research and develop technical plan for microservices architecture</li>
                <li>Implement smart contract interaction API</li>
                <li>Develop and maintain RESTful API for blockchain asset management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">Backend Engineer at Tokenomy</h3>
              <p className="text-gray-400">January 2021 - December 2023</p>
              <ul className="list-disc list-inside mt-2">
                <li>Create and manage middleware that interacts with blockchain networks</li>
                <li>Implement alerting systems and accounting for blockchain assets</li>
                <li>Oversee wallet operations supporting blockchain-origin funding and security</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">Machine Learning Engineer (Private Contractor)</h3>
              <p className="text-gray-400">January 2019 - December 2019</p>
              <ul className="list-disc list-inside mt-2">
                <li>Researched and implemented neural network architectures for trading system optimization</li>
                <li>Designed reinforcement learning systems for trading</li>
                <li>Developed complete AI architecture from feature engineering to model prediction API</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">Crypto Mining Operations Manager at MMT Tech</h3>
              <p className="text-gray-400">December 2017 - December 2019</p>
              <ul className="list-disc list-inside mt-2">
                <li>Managed an 80Kwh crypto mining farm</li>
                <li>Optimized hardware and software configurations for maximum profitability</li>
                <li>Trained staff in hardware assembly, software installation, and maintenance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center bg-gray-900">
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <p className="text-lg mb-4">Interested in collaborating or discussing a project? Let&apos;s connect!</p>
              <div className="flex space-x-4">
                <a href="https://github.com/luxeave" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Github />
                </a>
                <a href="https://www.linkedin.com/in/stephen-antoni-33840258/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin />
                </a>
                <a href="mailto:stephen@luxeave.com" className="text-gray-400 hover:text-white transition-colors">
                  <Mail />
                </a>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full md:w-1/2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 bg-gray-700 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 bg-gray-700 rounded"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 bg-gray-700 rounded"
                required
              ></textarea>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                Send Message
              </button>
              {formStatus && <p className="mt-4 text-center">{formStatus}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Stephen Antoni. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}