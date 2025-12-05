import { Card } from "@/components/ui/card";
import { Github, GitCommit, Code2, Activity } from "lucide-react";

const GitHubActivity = () => {
  // Placeholder data - replace with actual GitHub API data
  const topLanguages = [
    { name: "TypeScript", percentage: 35, color: "bg-blue-500" },
    { name: "Python", percentage: 25, color: "bg-yellow-500" },
    { name: "JavaScript", percentage: 20, color: "bg-amber-400" },
    { name: "Go", percentage: 12, color: "bg-cyan-500" },
    { name: "C/C++", percentage: 8, color: "bg-purple-500" },
  ];

  const recentCommits = [
    {
      repo: "portfolio-website",
      message: "Add chatbot assistant feature",
      date: "2 hours ago",
    },
    {
      repo: "cloud-infrastructure",
      message: "Update Terraform modules",
      date: "1 day ago",
    },
    {
      repo: "api-gateway",
      message: "Implement rate limiting",
      date: "3 days ago",
    },
    {
      repo: "docker-templates",
      message: "Add multi-stage build",
      date: "5 days ago",
    },
  ];

  // Generate contribution graph data
  const generateContributionData = () => {
    const weeks = 12;
    const days = 7;
    const data = [];
    
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < days; d++) {
        const level = Math.floor(Math.random() * 5);
        data.push(level);
      }
    }
    return data;
  };

  const contributions = generateContributionData();

  // 🟢 FIXED LINE 54: Removed type annotation (: number)
  const getContributionColor = (level) => {
    const colors = [
      "bg-secondary",
      "bg-primary/20",
      "bg-primary/40",
      "bg-primary/60",
      "bg-primary",
    ];
    return colors[level];
  };

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <Github className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold gradient-text">GitHub Activity</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contributions Graph */}
          <Card className="p-6 border-border bg-card col-span-full lg:col-span-2 card-tilt">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Contribution Activity</h3>
            </div>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-12 gap-1 min-w-[300px]">
                {contributions.map((level, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(level)} transition-all hover:scale-125 hover:ring-2 hover:ring-primary/50`}
                    title={`${level} contributions`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
                />
              ))}
              <span>More</span>
            </div>
          </Card>

          {/* Top Languages */}
          <Card className="p-6 border-border bg-card card-tilt">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Top Languages</h3>
            </div>
            <div className="space-y-3">
              {topLanguages.map((lang, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{lang.name}</span>
                    <span className="text-muted-foreground">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${lang.color} transition-all duration-500`}
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Commits */}
          <Card className="p-6 border-border bg-card col-span-full card-tilt">
            <div className="flex items-center gap-2 mb-4">
              <GitCommit className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Recent Commits</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentCommits.map((commit, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <p className="font-medium text-primary text-sm mb-1">
                    {commit.repo}
                  </p>
                  <p className="text-sm text-foreground mb-2 line-clamp-2">
                    {commit.message}
                  </p>
                  <p className="text-xs text-muted-foreground">{commit.date}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
