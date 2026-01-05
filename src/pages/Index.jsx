import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, Download, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import GitHubActivity from "@/components/GitHubActivity";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  <span className="gradient-text">Fortune Malaza</span>
                </h1>
                <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">
                  AI & Software Engineer
                </h2>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="btn-glow"
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
                  className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all"
                  asChild
                >
                  <a 
                      href="/SoftwareEngineeringCV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    <Download className="mr-2 w-4 h-4" />
                    Download Resume
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all"
                  asChild
                >
                  <a href="#contact">
                    Contact Me
                  </a>
                </Button>
              </div>

              <div className="flex gap-4 pt-4">
                <a 
                  href="mailto:fmalaza512@gmail.com"
                  className="p-3 rounded-lg bg-secondary hover:bg-card-hover transition-all hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/FortuneMal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary hover:bg-card-hover transition-all hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/mphikeleli-malaza-5b386a253"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary hover:bg-card-hover transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-glow rounded-3xl blur-3xl opacity-20"></div>
                <Card className="relative p-8 border-border bg-card/50 backdrop-blur">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                    
                    <img
                      src="/profile.jpg"
                      alt="Fortune Malaza Profile Picture"
                      // CHANGED: Removed redundant 'rounded-2xl' from here
                      className="w-full h-full object-cover" 
                    />
                    
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-24 px-6" id="about">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 md:p-12 border-border bg-card animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 gradient-text">About Me</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am someone who loves learning, creating and connecting with people. 
              Tech is my craft, but growth and purpose are my fuel. I started my 
              engineering journey at ALX Africa — the first place that taught me 
              grit and resilience.
            </p>
          </Card>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <GitHubActivity />

      {/* Contact Section */}
      <section className="py-24 px-6 bg-muted/30" id="contact">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Let's Connect
            </h2>
            <p className="text-muted-foreground text-lg">
              I'm always open to discussing new opportunities and collaborations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center card-tilt border-border bg-card animate-slide-up">
              <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-bold mb-2">Email</h3>
              <a 
                href="mailto:fmalaza512@gmail.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                fmalaza512@gmail.com
              </a>
            </Card>

            <Card className="p-6 text-center card-tilt border-border bg-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <Github className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-bold mb-2">GitHub</h3>
              <a 
                href="https://github.com/FortuneMal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                github.com/FortuneMal
              </a>
            </Card>

            <Card className="p-6 text-center card-tilt border-border bg-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Linkedin className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-bold mb-2">LinkedIn</h3>
              <a 
                href="https://www.linkedin.com/in/mphikeleli-malaza-5b386a253"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                linkedin.com/in/mphikeleli-malaza
              </a>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;