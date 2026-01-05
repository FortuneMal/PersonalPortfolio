import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Briefcase, GraduationCap, Award, Code } from "lucide-react";

const Resume = () => {
  // Define the path to your CV PDF file
  const CV_DOWNLOAD_PATH = "/AI Engineering CV.pdf";

  const resumeSections = [
    {
      icon: GraduationCap,
      title: "Education",
      items: [
        {
          title: "ALX Africa Software Engineering Program",
          subtitle: "Full Stack Development",
          period: "2023 - 2025",
        },
        {
          title: "National Senior Certificate",
          subtitle: "High School",
          period: "2021",
        },
        {
          title: "Microsoft AI Fluency Program",
          subtitle: "Gen AI basic course",
          period: "2025",
        },
      ],
    },
    {
      icon: Briefcase,
      title: "Experience",
      items: [
        {
          title: "Videographer & Editor",
          subtitle: "Volunteer at Church",
          period: "2022 - Present",
        },
      ],
    },
    {
      icon: Code,
      title: "Technical Skills",
      items: [
        {
          title: "Languages",
          subtitle: "JavaScript, Python, C/C++, Shell",
          period: "",
        },
        {
          title: "Cloud & DevOps",
          subtitle: "AWS, Azure, Docker, Kubernetes",
          period: "",
        },
        {
          title: "Frameworks & Databases",
          subtitle: "React, Node.js, TailwindCSS, MongoDB, PostgreSQL",
          period: "",
        },
      ],
    },
    {
      icon: Award,
      title: "Certifications",
      items: [
        {
          title: "Agile with Atlassian Jira",
          subtitle: "Agile Project Management",
          period: "2025",
        },
        {
          title: "Generative AI with LLMs",
          subtitle: "Coursera/DeepLearning.AI Specialization",
          period: "2025",
        },
        {
          title: "Microsoft Power Platform Fundamentals",
          subtitle: "Power Platform Development",
          period: "2025",
        },
        {
          title: "Python Project for Data Engineering",
          subtitle: "Data Engineering/IBM",
          period: "2025",
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
            asChild
          >
            <a 
              href={CV_DOWNLOAD_PATH}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 w-5 h-5 group-hover:animate-bounce" />
              Download Full CV
            </a>
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
            asChild
          >
            <a 
              href={CV_DOWNLOAD_PATH}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 w-5 h-5" />
              Download Full CV (PDF)
            </a>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Resume;