/** Clubhouse Almanac shell: Court Clay warmth, editorial navigation and direct pathways to the active product. */
/**
 * Clubhouse Almanac site shell: a calm editorial masthead and field-guide footer.
 * The footer headline uses a warm-white refinement while keeping its clay-and-ink identity.
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";

const nav = [["Home", "/"], ["About Caroline", "/about"], ["The Book", "/book"], ["Insights", "/insights"], ["Readiness Index", "/coach-readiness"], ["Pricing", "https://cgtennisos.com/pricing"], ["CG Tennis OS", "/cg-tennis-os"], ["Contact", "/contact"]] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation(); const [open, setOpen] = useState(false);
  return <div className="site-shell">
    <header className="site-header"><div className="header-inner">
      <Link href="/" className="brand-lockup" aria-label="CG Tennis OS home"><img src="/assets/cg-tennis-os-mark_ae221cfc.png" alt="CG Tennis OS coaching mark" className="brand-mark" /><span><strong>CG Tennis OS<sup>™</sup></strong><em>Coaching Intelligence. Human Wisdom.</em></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, href]) => href.startsWith("http") ? <a key={href} href={href} className="nav-link" target="_blank" rel="noreferrer">{label}</a> : <Link key={href} href={href} className={location === href ? "nav-link active" : "nav-link"}>{label}</Link>)}</nav>
      <a className="header-trial" href="https://cgtennisos.com" target="_blank" rel="noreferrer">Start here <ArrowUpRight size={15} /></a>
      <button className="mobile-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={23} />}</button>
    </div>{open && <nav className="mobile-nav">{nav.map(([label, href]) => href.startsWith("http") ? <a key={href} href={href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>{label}</a> : <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<a href="https://cgtennisos.com" target="_blank" rel="noreferrer">Start your trial <ArrowUpRight size={16} /></a></nav>}</header>
    <main>{children}</main>
    <footer className="site-footer footer-warm"><div className="footer-rule" /><div className="footer-grid"><div className="footer-brand-block"><img src="/assets/cg-tennis-os-mark_ae221cfc.png" alt="CG Tennis OS coaching mark" /><div><p className="eyebrow light">A steadier way to coach</p><h2>Keep the care.<br /><i>Build better players</i></h2></div></div><div className="footer-links"><Link href="/about">About Caroline</Link><Link href="/insights">Insights</Link><Link href="/coach-readiness">Readiness Index</Link><Link href="/cg-tennis-os">CG Tennis OS™</Link><a href="mailto:hello@cgtennisacademies.com">hello@cgtennisacademies.com</a></div><div className="footer-last"><p>One home for the coaching work that matters.</p><a href="https://cgtennisos.com" target="_blank" rel="noreferrer" className="text-link light-link">See the system <ArrowUpRight size={15} /></a></div></div><div className="footer-bottom"><span>© 2026 CG Tennis Academies.</span><span>CG Tennis OS<sup>™</sup></span></div></footer>
  </div>;
}
