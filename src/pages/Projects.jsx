import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Projects = () => {
  const projects = [
    {
      title: "BudgetEase",
      description: "BudgetEase is a full-stack personal finance management application designed to help users track expenses, set budgets, and manage savings goals. It provides a clear overview of financial activity, enabling users to make informed decisions about their spending and savings habits.",
      technologies: ["React", "HTML", "TailwindCSS", "MongoDB", "Node.js"],
      github: "https://github.com/FortuneMal/BudgetEasev2",
      demo: "https://fortunemal.github.io/BudgetEasev2/",
    },
    
    {
      title: "MercuryAI",
      description: "MercuryAI is an AI-powered portfolio assistant that helps users generate professional bios, project summaries, and learning reflections for their portfolios. The app features a tabbed interface, tone selection, and persistent storage of generated outputs. It uses Google Gemini for content generation via a secure backend API proxy.",
      technologies: ["React", "HTML", "CSS"],
      github: "https://github.com/FortuneMal/MercuryAI",
      demo: "https://cdfkns.github.io/MercuryAI/",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            My Projects
          </h1>
          <p className="text-muted-foreground text-lg">
            A collection of my work and contributions to the tech community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="p-6 card-interactive animate-slide-up border-border bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-primary/50 hover:bg-primary/10"
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
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;