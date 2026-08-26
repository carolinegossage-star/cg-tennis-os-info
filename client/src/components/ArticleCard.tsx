/** Clubhouse Almanac reading card: tier, topic and a quiet route to a considered article. */
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { Article } from "@/lib/content";
export function ArticleCard({ article }: { article: Article }) {
  const isDiagnosticFeature = article.slug === "tracking-player-development-or-remembering-it";
  return <article className={`article-card ${article.tier}${isDiagnosticFeature ? " scorecard-feature" : ""}`}>
    <div className="scorecard-rail"><span>{article.tier === "starter" ? "FIELD / START" : "FIELD / DIAGNOSE"}</span><i /><span>{article.tags[0]}</span></div>
    <div className="card-top"><span className={`tier-pill ${article.tier}`}>{article.tier === "starter" ? "Starter read" : "Deep dive"}</span><span>{article.readTime}</span></div>
    <h3>{article.title}</h3><p>{article.description}</p>
    <div className="card-bottom"><span>{article.tags[0]}</span><Link href={`/insights/${article.slug}`} className="arrow-box" aria-label={`Read ${article.title}`}><ArrowUpRight size={17} /></Link></div>
  </article>;
}
