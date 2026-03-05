import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Github, GitCommit, Code2, Activity } from "lucide-react";

// --- CONFIGURATION ---
const GITHUB_USERNAME = "FortuneMal";
// Read token from Vite environment variables (stored in .env file)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const GitHubActivity = () => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- DYNAMIC DATA STATE ---
  const [topLanguages, setTopLanguages] = useState([]);
  const [contributions, setContributions] = useState(Array(84).fill(0));

  const getContributionColor = (level) => {
    const colors = [
      "bg-secondary", "bg-primary/20", "bg-primary/40",
      "bg-primary/60", "bg-primary",
    ];
    // Cap level at 4 for the color array
    return colors[Math.min(level, 4)] || "bg-primary";
  };

  // --- API FETCH LOGIC: Get Recent Commits ---
  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch user repositories (we only care about the first few for recent commits)
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });
        const repos = await reposResponse.json();

        const commitPromises = repos.map(async (repo) => {
          // Fetch the single most recent commit for each repository
          const commitsResponse = await fetch(repo.commits_url.replace('{/sha}', ''), {
            headers: { Authorization: `token ${GITHUB_TOKEN}` },
          });
          const recentCommit = (await commitsResponse.json())[0];

          if (recentCommit) {
            return {
              repo: repo.name,
              message: recentCommit.commit.message,
              date: new Date(recentCommit.commit.author.date).toLocaleDateString(), // Simple date formatting
              url: recentCommit.html_url
            };
          }
          return null;
        });

        const allCommits = (await Promise.all(commitPromises)).filter(Boolean);
        setCommits(allCommits);

        // Fetch User Events to build a realistic contribution graph
        const eventsResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`, {
          headers: { Authorization: `token ${GITHUB_TOKEN}` },
        });
        const events = await eventsResponse.json();

        if (Array.isArray(events)) {
          // Build a map of dates to event counts for the last 84 days
          const today = new Date();
          const activityMap = new Map();

          events.forEach(event => {
            if (event.type === "PushEvent" || event.type === "CreateEvent" || event.type === "PullRequestEvent") {
              const eventDate = new Date(event.created_at).toISOString().split('T')[0];
              activityMap.set(eventDate, (activityMap.get(eventDate) || 0) + 1);
            }
          });

          // Generate the 84-day array mapping back from today
          const newContributions = Array(84).fill(0);
          for (let i = 0; i < 84; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - (83 - i));
            const dateString = date.toISOString().split('T')[0];
            const activityCount = activityMap.get(dateString) || 0;

            // Normalize activity count to 0-4 scale for the UI
            let level = 0;
            if (activityCount > 0) level = 1;
            if (activityCount > 2) level = 2;
            if (activityCount > 4) level = 3;
            if (activityCount > 6) level = 4;

            newContributions[i] = level;
          }
          setContributions(newContributions);
        }

        // Fetch Top Languages
        const allLangsResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
          headers: { Authorization: `token ${GITHUB_TOKEN}` },
        });
        const allRepos = await allLangsResponse.json();

        let languageCounts = {};
        for (const r of allRepos) {
          if (r.language) {
            languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
          }
        }

        const totalReposWithLang = Object.values(languageCounts).reduce((a, b) => a + b, 0);
        const sortedLanguages = Object.entries(languageCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([name, count], index) => {
            const colors = ["bg-blue-500", "bg-yellow-500", "bg-green-500"];
            return {
              name,
              percentage: Math.round((count / totalReposWithLang) * 100),
              color: colors[index % colors.length]
            };
          });

        setTopLanguages(sortedLanguages);

      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
        setError("Failed to load GitHub activity. Please check console.");
      } finally {
        setLoading(false);
      }
    };

    if (GITHUB_TOKEN) {
      fetchGitHubData();
    } else {
      setCommits([
        // Fallback to static data if no token is provided
        { repo: "API-Error", message: "Token Missing or Invalid", date: "Now", url: "#" }
      ]);
      setLoading(false);
    }
  }, []); // Empty dependency array ensures it runs only once on mount



  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <Github className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold gradient-text">GitHub Activity</h2>
        </div>

        {loading && <p className="text-center text-muted-foreground">Loading activity...</p>}
        {error && <p className="text-center text-destructive">{error}</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Contributions Graph */}
          <Card className="p-6 border-border bg-card col-span-full lg:col-span-2 card-tilt group">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary group-hover:animate-pulse" />
              <h3 className="font-semibold text-foreground">Recent Activity (Last 84 Days)</h3>
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

          {/* Recent Commits (Now uses dynamic data) */}
          <Card className="p-6 border-border bg-card col-span-full card-tilt">
            <div className="flex items-center gap-2 mb-4">
              <GitCommit className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Recent Commits</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {commits.map((commit, index) => (
                <a
                  key={index}
                  href={`https://github.com/${GITHUB_USERNAME}/${commit.repo}/commit/${commit.url.split('/').pop()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors block"
                >
                  <p className="font-medium text-primary text-sm mb-1">
                    {commit.repo}
                  </p>
                  <p className="text-sm text-foreground mb-2 line-clamp-2">
                    {commit.message}
                  </p>
                  <p className="text-xs text-muted-foreground">{commit.date}</p>
                </a>
              ))}
              {commits.length === 0 && !loading && (
                <p className="text-muted-foreground">No recent activity found.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
