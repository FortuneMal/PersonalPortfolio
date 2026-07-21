import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "BudgetEase",
      description: "BudgetEase is a full-stack personal finance management application designed to help users track expenses, set budgets, and manage savings goals. It provides a clear overview of financial activity, enabling users to make informed decisions about their spending and savings habits.",
      technologies: ["React", "HTML", "TailwindCSS", "MongoDB", "Node.js"],
      github: "https://github.com/FortuneMal/BudgetEasev2",
      demo: "https://budget-easev2-git-main-fortunemals-projects.vercel.app/",
    },
    {
      title: "MercuryAI",
      description: "MercuryAI is an AI-powered portfolio assistant that helps users generate professional bios, project summaries, and learning reflections for their portfolios. The app features a tabbed interface, tone selection, and persistent storage of generated outputs. It uses Google Gemini for content generation via a secure backend API proxy.",
      technologies: ["React", "HTML", "CSS"],
      github: "https://github.com/FortuneMal/MercuryAI",
      demo: "https://cdfkns.github.io/MercuryAI/",
    },
    {
      title: "Eye-Spend",
      description: "AI Expense Guardian: Real-time Receipt Audit and Risk PredictionProject OverviewThe AI Expense Guardian is a modern, responsive web application built with Streamlit and deployed using Docker and OpenShift.",
      technologies: ["Python", "Streamlit", "Dockerfile", "OpenShift"],
      github: "https://github.com/FortuneMal/Eye-Spend",
      demo: "https://eyespendai.streamlit.app/",
    },
    {
      title: "LifePulse",
      description: "LifePulse is a deep learning application designed to predict heart disease risk by analyzing clinical patient data through a custom-trained Artificial Neural Network. Built with TensorFlow and Streamlit, the system achieves a 99.35% test accuracy to assist medical professionals with early diagnostic insights. The platform features an automated preprocessing pipeline for real-time feature scaling and a diagnostic dashboard that translates complex probability scores into clear visual feedback.",
      technologies: ["Python", "Streamlit", "Jupyter Notebook"],
      github: "https://github.com/FortuneMal/AI-Health",
      demo: "https://lifepulse.streamlit.app/",
    },
    {
      title: "SumAI",
      description: "SumAI is a next-generation news analysis platform that summarizes articles and extracts sentiment through a futuristic cyberpunk interface. Built with Python and Gradio, the application leverages the Groq LPU Inference Engine and Llama 3-70b to process long-form content in milliseconds while bypassing ads and paywalls. Key features include a visual sentiment orb for emotional tone mapping, a Neurolink TTS engine for high-fidelity audio conversion, and a multi-protocol translation layer supporting several South African and European languages.",
      technologies: ["Python", "Gradio", "Groq Llama 3"],
      github: "https://github.com/FortuneMal/SumAI",
      demo: "https://huggingface.co/spaces/FortuneMal/SumAI",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 relative overflow-hidden bg-background">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
            My <span className="text-primary">Projects</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A collection of my work and contributions to the tech community, focused on AI, machine learning, and scalable web applications.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ 
                y: -10, 
                rotateX: 2, 
                rotateY: -2,
                transition: { duration: 0.3 } 
              }}
              style={{ perspective: 1000 }}
              className="h-full"
            >
              <Card className="p-6 h-full flex flex-col border-border/50 bg-card/40 backdrop-blur-md rounded-2xl hover:bg-card/60 transition-all hover:border-primary/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex-grow">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-secondary/50 text-secondary-foreground border border-border/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 relative z-10 mt-auto">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-primary/50 hover:bg-primary/10 bg-transparent"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  {project.demo && (
                    <Button
                      size="sm"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;