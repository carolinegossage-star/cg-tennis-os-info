/** Clubhouse Almanac routing: discovery and credibility live here; trial conversion remains at cgtennisos.com. */
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteShell } from "./components/SiteShell";
import Home from "./pages/Home";
import CoachReadiness from "./pages/CoachReadiness";
import { About, ArticlePage, Book, Contact, Insights, NotFound, Overview, UpdatePage, Updates } from "./pages/Pages";
export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><SiteShell><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/book" component={Book} /><Route path="/insights" component={Insights} /><Route path="/coach-readiness" component={CoachReadiness} /><Route path="/insights/:slug" component={ArticlePage} /><Route path="/updates" component={Updates} /><Route path="/updates/:slug" component={UpdatePage} /><Route path="/cg-tennis-os" component={Overview} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></SiteShell></TooltipProvider></ThemeProvider></ErrorBoundary>; }
