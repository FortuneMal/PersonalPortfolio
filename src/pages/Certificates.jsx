import { Award, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Certificates = () => {
  const certificates = [
    {
      title: "Agile with Atlassian Jira",
      issuer: "Atlassian",
      date: "2025",
      category: "Agile",
    },
    {
      title: "Software Engineering Certificate",
      issuer: "ALX Africa",
      date: "2025",
      category: "Software Development",
    },
    {
      title: "Generative AI with Large Language Models",
      issuer: "Amazon Web Services (AWS)",
      date: "2025",
      category: "Gen AI",
    },
    {
      title: "Microsoft Power Platform Fundamentals",
      issuer: "Microsoft",
      date: "2025",
      category: "Power Platform",
    },
    {
      title: "Python Project for Data Engineering",
      issuer: "IBM",
      date: "2025",
      category: "Data Engineering",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Certificates & Achievements
          </h1>
          <p className="text-muted-foreground text-lg">
            Professional certifications and learning milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <Card
              key={index}
              className="p-6 card-interactive animate-slide-up border-border bg-card cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {cert.title}
                    </h3>
                    <Badge variant="outline" className="border-primary/50 text-primary">
                      {cert.category}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">
                    {cert.issuer}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-xl border border-dashed border-border bg-muted/30 text-center">
          <Award className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            More certificates can be added here as you upload them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Certificates;