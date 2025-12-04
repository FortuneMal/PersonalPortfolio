import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Projects = () => {
  const projects = [
    {
      title: "Project Alpha",
      description: "A modern web application built with React and TypeScript, featuring real-time data synchronization.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Cloud Infrastructure Tool",
      description: "DevOps automation tool for managing cloud resources across multiple providers.",
      technologies: ["Python", "AWS", "Docker", "Terraform"],
      github: "https://github.com",
      demo: "",
    },
    {
      title: "API Gateway Service",
      description: "High-performance API gateway with rate limiting, authentication, and monitoring.",
      technologies: ["Node.js", "Express", "Redis", "MongoDB"],
      github: "https://github.com",
      demo: "https://demo.com",
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