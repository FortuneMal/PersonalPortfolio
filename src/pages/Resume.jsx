import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Briefcase, GraduationCap, Award, Code } from "lucide-react";

const Resume = () => {
  const resumeSections = [
    {
      icon: GraduationCap,
      title: "Education",
      items: [
        {
          title: "ALX Africa Software Engineering Program",
          subtitle: "Full Stack Development",
          period: "2023 - Present",
        },
        {
          title: "Self-Directed Learning",
          subtitle: "Cloud Computing & DevOps",
          period: "Ongoing",
        },
      ],
    },
    {
      icon: Briefcase,
      title: "Experience",
      items: [
        {
          title: "Software Engineering Projects",
          subtitle: "Full Stack Development",
          period: "Various",
        },
        {
          title: "Open Source Contributions",
          subtitle: "Community Projects",
          period: "Ongoing",
        },
      ],
    },
    {
      icon: Code,
      title: "Technical Skills",
      items: [
        {
          title: "Languages",
          subtitle: "JavaScript, TypeScript, Python, Go, C/C++",
          period: "",
        },
        {
          title: "Cloud & DevOps",
          subtitle: "AWS, GCP, Docker, Kubernetes, CI/CD",
          period: "",
        },
      ],
    },
    {
      icon: Award,
      title: "Certifications",
      items: [
        {
          title: "Cloud Certifications",
          subtitle: "AWS, Google Cloud Platform",
          period: "2024",
        },
        {
          title: "Development Certifications",
          subtitle: "Full Stack, DevOps",
          period: "2024",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            My Resume
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            A snapshot of my journey, skills, and accomplishments.
          </p>
          <Button
            size="lg"
            className="btn-glow group"
          >
            <Download className="mr-2 w-5 h-5 group-hover:animate-bounce" />
            Download Full CV
          </Button>
        </div>

        {/* Resume Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {resumeSections.map((section, sectionIndex) => (
            <Card
              key={sectionIndex}
              className="p-6 border-border bg-card card-tilt animate-slide-up"
              style={{ animationDelay: `${sectionIndex * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <section.icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                    {item.period && (
                      <p className="text-xs text-primary mt-2">{item.period}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-12 p-8 text-center border-border bg-gradient-to-br from-card to-secondary/30 animate-fade-in">
          <h3 className="text-2xl font-bold mb-4 gradient-text">
            Want the full details?
          </h3>
          <p className="text-muted-foreground mb-6">
            Download my complete CV to see my full work history, projects, and references.
          </p>
          <Button
            size="lg"
            className="btn-glow"
          >
            <Download className="mr-2 w-5 h-5" />
            Download Full CV (PDF)
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Resume;