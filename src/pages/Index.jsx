import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import GitHubActivity from "@/components/GitHubActivity";
import ThreeScene from "@/components/ThreeScene";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Hero Section with 3D Background */}
      <section className="relative min-h-screen flex items-center pt-20 px-6">
        <ThreeScene />
        
        {/* Glass Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] z-0" pointer-events="none"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
                >
                  <span className="text-foreground">Fortune </span>
                  <span className="gradient-text">Malaza</span>
                </motion.h1>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-2xl md:text-3xl text-muted-foreground mb-6 font-medium"
                >
                  AI & Software Engineer
                </motion.h2>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button 
                  size="lg" 
                  className="btn-glow backdrop-blur-md bg-primary/90 text-primary-foreground border border-primary/50"
                  asChild
                >
                  <Link to="/projects">
                    View Projects
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="backdrop-blur-md bg-card/30 border-border hover:bg-primary/10 hover:border-primary transition-all text-foreground"
                  asChild
                >
                  <a href="/AI Engineering CV.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 w-4 h-4" />
                    Resume
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="backdrop-blur-md bg-card/30 border-border hover:bg-primary/10 hover:border-primary transition-all text-foreground"
                  asChild
                >
                  <a href="#contact">Contact Me</a>
                </Button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex gap-4 pt-4"
              >
                {[
                  { icon: Mail, href: "mailto:fmalaza512@gmail.com", label: "Email" },
                  { icon: Github, href: "https://github.com/FortuneMal", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/mphikeleli-malaza-5b386a253", label: "LinkedIn" }
                ].map((item, index) => (
                  <a 
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-card/50 backdrop-blur-md border border-border hover:border-primary/50 hover:bg-primary/10 transition-all hover:-translate-y-1"
                    aria-label={item.label}
                  >
                    <item.icon className="w-5 h-5 text-foreground" />
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Glassy Profile Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-3xl blur-3xl opacity-50"></div>
              <Card className="relative p-2 border-border/50 bg-card/20 backdrop-blur-xl rounded-3xl overflow-hidden card-tilt">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
                  <img
                    src="/profile.jpg"
                    alt="Fortune Malaza"
                    className="w-full h-full object-cover filter contrast-125 saturate-50 grayscale-[20%]" 
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <p className="text-sm font-mono text-primary tracking-widest mb-1">STATUS</p>
                    <p className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      Open to Work
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-24 px-6 relative z-10" id="about">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-12 border-border/50 bg-card/30 backdrop-blur-lg rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">About Me</h2>
              <p className="text-lg text-muted-foreground leading-relaxed relative z-10">
                I’m someone who loves learning, creating, and connecting with people. Technology is my craft, but growth and purpose are what fuel me. My engineering journey began at ALX Africa, where I developed grit and resilience. I’m currently focused on AI engineering, using AI models and agents to turn innovative ideas into practical projects. I also have a background in data and cloud engineering, which allows me to build efficient, scalable solutions. I’m driven by a constant desire to learn and improve so I can work smarter and more effectively.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <div className="relative z-10">
        <GitHubActivity />
      </div>

      {/* Contact Section */}
      <section className="py-24 px-6 relative z-10" id="contact">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Let's Connect
            </h2>
            <p className="text-muted-foreground text-lg">
              I'm always open to discussing new opportunities and collaborations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Mail, title: "Email", value: "fmalaza512@gmail.com", href: "mailto:fmalaza512@gmail.com" },
              { icon: Github, title: "GitHub", value: "github.com/FortuneMal", href: "https://github.com/FortuneMal" },
              { icon: Linkedin, title: "LinkedIn", value: "linkedin.com/in/mphikeleli-malaza", href: "https://www.linkedin.com/in/mphikeleli-malaza-5b386a253" }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center border-border/50 bg-card/30 backdrop-blur-md rounded-2xl hover:bg-primary/5 hover:border-primary/50 transition-all card-tilt h-full flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <contact.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2 text-foreground">{contact.title}</h3>
                  <a 
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contact.value}
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;