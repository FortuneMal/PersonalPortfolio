import React, { useState } from "react";
import { Award, Calendar, ExternalLink, X, FileText, ZoomIn } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      title: "Agile with Atlassian Jira",
      issuer: "Atlassian",
      date: "2025",
      category: "Agile",
      pdfUrl: "/public/Agile with Atlassian Jira.pdf", 
      link: "#"
    },
    {
      title: "Software Engineering Certificate",
      issuer: "ALX Africa",
      date: "2025",
      category: "Software Development",
      pdfUrl: "/public/ALX Software Engineering Certificate.pdf",
      link: "#"
    },
    {
      title: "Generative AI with Large Language Models",
      issuer: "Amazon Web Services (AWS)",
      date: "2025",
      category: "Gen AI",
      pdfUrl: "/public/Generative AI with Large Language Models.pdf",
      link: "#"
    },
    {
      title: "Microsoft Power Platform Fundamentals",
      issuer: "Microsoft",
      date: "2025",
      category: "Power Platform",
      pdfUrl: "/public/Microsoft Power Platform Fundamentals.pdf",
      link: "#"
    },
    {
      title: "Python Project for Data Engineering",
      issuer: "IBM",
      date: "2025",
      category: "Data Engineering",
      pdfUrl: "/public/Python Project for Data Engineering.pdf",
      link: "#"
    },
    {
      title: "AWS Cloud Practitioner Essentials",
      issuer: "Amazon Web Services (AWS)",
      date: "2025",
      category: "Cloud Engineering",
      pdfUrl: "/public/AWS Cloud Practitioner Essentials.pdf",
      link: "#"
    },
    {
      title: "Containers with Docker, Kubernetes and Openshift",
      issuer: "IBM",
      date: "2025",
      category: "Cloud Engineering",
      pdfUrl: "/public/Containers with Docker, Kubernetes and Openshift.pdf",
      link: "#"
    },
    {
      title: "DevOps on AWS Code, Build, and Test",
      issuer: "AWS",
      date: "2025",
      category: "Cloud Engineering",
      pdfUrl: "/public/DevOps on AWS Code, Build, and Test.pdf",
      link: "#"
    },
    {
      title: "Introduction to Data Engineering",
      issuer: "IBM",
      date: "2025",
      category: "Data Engineering",
      pdfUrl: "/public/Introduction to Data Engineering.pdf",
      link: "#"
    },
    {
      title: "Introduction to Generative AI",
      issuer: "Google Cloud",
      date: "2025",
      category: "Gen AI",
      pdfUrl: "/public/Introduction to Generative AI.pdf",
      link: "#"
    },
    {
      title: "Version Control with Git",
      issuer: "Atlassian",
      date: "2025",
      category: "Agile",
      pdfUrl: "/public/Version Control with Git.pdf",
      link: "#"
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Certificates & Achievements
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            Fortune Malaza — AI & Software Engineer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <Card
              key={index}
              onClick={() => setSelectedCert(cert)}
              className="p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border bg-card/50 backdrop-blur-sm cursor-pointer group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <Badge variant="outline" className="border-primary/50 text-primary whitespace-nowrap ml-2">
                      {cert.category}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3 font-medium">
                    {cert.issuer}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{cert.date}</span>
                    </div>
                    <span className="text-xs font-bold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                      <FileText className="w-3 h-3" /> View PDF
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Certificate Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
              className="relative bg-card border border-border rounded-2xl max-w-5xl w-full h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold leading-none">{selectedCert.title}</h2>
                    <p className="text-xs text-muted-foreground mt-1">{selectedCert.issuer} • {selectedCert.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href={selectedCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-primary"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body (PDF Viewer) */}
              <div className="flex-1 bg-neutral-900 relative">
                <iframe
                  src={`${selectedCert.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full border-none"
                  title={selectedCert.title}
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-border flex justify-center gap-4 bg-muted/30">
                <a 
                  href={selectedCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all hover:shadow-lg active:scale-95"
                >
                  Verify Credential <ExternalLink className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-2.5 rounded-xl border border-border font-semibold hover:bg-muted transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            {/* Click outside to close */}
            <div className="absolute inset-0 -z-10" onClick={() => setSelectedCert(null)}></div>
          </div>
        )}

        <div className="mt-12 p-8 rounded-2xl border border-dashed border-border bg-muted/30 text-center">
          <Award className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
          <p className="text-muted-foreground italic max-w-md mx-auto">
            "Education is the most powerful weapon which you can use to change the world."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Certificates;