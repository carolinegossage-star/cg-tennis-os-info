/**
 * Clubhouse Almanac homepage: human authority, warm coaching materials, court geometry and purposeful interaction.
 * CourtToons behave as field-guide figures: card colour is character-owned and their full stories open as marked pages.
 */
import { ArticleCard } from "@/components/ArticleCard";
import { articles, updates } from "@/lib/content";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  MoveRight,
} from "lucide-react";
import { type CSSProperties } from "react";
import { Link } from "wouter";

type CourtToon = {
  name: string;
  archetype: string;
  colour: string;
  ink: string;
  tagline: string;
  identity: string;
  excerpt: string;
  bio: string[];
  image: string;
};

const pillars: CourtToon[] = [
  {
    name: "Ace",
    archetype: "The Optimist",
    colour: "#D6322C",
    ink: "#FFF9EF",
    tagline: "Play hard. Stay kind. Love the game.",
    identity: "Hope for the next point, confidence for the next try, and room to begin again.",
    excerpt: "Ace believes every point is a fresh start. Not because the last one did not matter. It is because the next one does.",
    bio: [
      "Ace does not remember the last point. Not because he was not paying attention, only because he is already looking at the next one. Every rally is a fresh chance. Every mistake is just something that happened on the way to something better. He throws himself into a shot before he has fully worked out the mechanics. More often than not, that is exactly what makes it work.",
      "That is the thing about Ace: He is fearless because he has decided nothing that goes wrong gets to stay wrong for long. If you have ever needed a reason to walk back onto a court after a bad set, or pick something up again after putting it down. Ace is the reminder that beginning again is not starting over. It is just the next point.",
    ],
    image: "/manus-storage/courttoon-ace-ready_d182209d.png",
  },
  {
    name: "Netty",
    archetype: "The Guardian",
    colour: "#17344A",
    ink: "#FFF9EF",
    tagline: "Know the rules. Play fair. Guard the game.",
    identity: "Wise choices, fair play, and respect for the lines that make the game work.",
    excerpt: "Netty plays by the rules — not because she has to, but because she knows what happens when people don’t.",
    bio: [
      "Netty has read the rulebook properly — not just skimmed it. She knows tennis isn’t only about who wins the point; it’s about the quiet agreement everyone makes to play it right. She’s the one who calls the ball out even when it costs her, who thanks the umpire, who remembers that the game only works if everyone protects it together.",
      "She’s not the loudest CourtToon, and she doesn’t need to be. Netty’s strength is steadiness — the kind of person who makes a court, a team, or a room feel safer just by being in it. If Ace is the spark, Netty is the reason the fire doesn’t burn the house down. She’s proof that fairness isn’t old-fashioned. It’s what lets everyone keep playing.",
    ],
    image: "/manus-storage/courttoon-netty-ready_dec3079c.png",
  },
  {
    name: "Lobs",
    archetype: "The Strategist",
    colour: "#168D91",
    ink: "#FFF9EF",
    tagline: "Watch closely. Choose wisely. Play the long game.",
    identity: "A longer view, a patient mind, and the space to choose what matters now.",
    excerpt: "Lobs doesn’t chase the point. She waits for the right one.",
    bio: [
      "Lobs never rushes. While everyone else is reacting to the last shot, she’s already three shots ahead, quietly reading the pattern nobody else has noticed yet. “Have you thought about it this way?” is practically her catchphrase — not to show off, but because she genuinely sees the board differently, and she’d rather you saw it too.",
      "Lobs is proof that power on a court doesn’t always look like force. Sometimes it looks like patience. Sometimes the smartest shot is the one you don’t rush into. She’s for anyone who’s ever needed permission to slow down, take the longer view, and trust that the win doesn’t have to come from the fastest reaction — it can come from the clearest head.",
    ],
    image: "/manus-storage/courttoon-lobs-ready_312c691b.png",
  },
  {
    name: "Spin",
    archetype: "The Philosopher",
    colour: "#7C956A",
    ink: "#122B3D",
    tagline: "Stay loose. Shift the angle. Find your rhythm.",
    identity: "Fresh ideas, quick adjustment, and the joy of trying a different angle.",
    excerpt: "Spin doesn’t fight the chaos. He finds the rhythm inside it.",
    bio: [
      "Spin sees tennis the way some people see meditation — not a battle to win, but a rhythm to find. When a match gets chaotic, he doesn’t fight it. He adjusts, tries a new angle, lets the rally teach him something. Where other players tense up, Spin loosens off. Where others force it, Spin finds the flow.",
      "He’s the reminder that creativity is its own kind of strength — that sometimes the way through isn’t harder effort, it’s a different angle entirely. Spin is for the player, or the person, who’s realised that fighting the moment rarely works as well as moving with it. Calm isn’t the absence of skill. It’s often the clearest sign of it.",
    ],
    image: "/manus-storage/courttoon-spin-ready_c7cf7e91.png",
  },
  {
    name: "Smash",
    archetype: "The Power Player",
    colour: "#C95D38",
    ink: "#FFF9EF",
    tagline: "Step in. Swing bold. Own the moment.",
    identity: "The courage to commit, step forward, and take the next brave action.",
    excerpt: "Smash doesn’t wait for the perfect moment. He commits to this one.",
    bio: [
      "Smash doesn’t hesitate. When everyone else is weighing up the safe option, Smash has already committed to the bold one — sometimes brilliantly, sometimes a little too enthusiastically, but always fully. There’s no half-swing in Smash. He’s decided that a committed miss beats a hesitant almost, every single time.",
      "That’s the lesson underneath the power: courage isn’t about being right every time. It’s about being willing to step forward anyway. Smash is for anyone who’s stood at a decision point — on the court or off it — and needed the nerve to go for it rather than play it safe. Not every swing lands. But the ones that hesitate never had a chance to.",
    ],
    image: "/manus-storage/courttoon-smash-ready_1e626eb8.png",
  },
];

const problems = [
  ["Your week lives in too many places.", "Sessions, notes, messages and parent questions scatter across the week."],
  ["Your renewals feel difficult on the drive home.", "The coaching comes first. The business picture arrives late."],
  ["Each player needs a clearer next step.", "A strong coaching relationship needs more than remembering last Tuesday."],
  ["Your coaching time is valuable, part-time.", "You need a system that gives time back to the court, not another screen to maintain."],
];

export default function Home() {
  return (
    <>
      <section className="home-hero"><div className="hero-line" /><div className="frame hero-grid"><div className="hero-copy"><p className="eyebrow">CG Tennis OS™ / Coaching operating system</p><p className="hero-kicker">A clearer way to coach</p><h1>Are you a <i>high-performing coach?</i> Build better players, faster.</h1><p className="hero-strap">Coaching Intelligence. Human Wisdom.</p><p className="hero-support">One clear operating system for coaches, players and clubs who want the important coaching work to stick.</p><div className="hero-actions"><a href="https://cgtennisos.com" target="_blank" rel="noreferrer" className="button-primary">Start your free trial <ArrowUpRight size={17} /></a><Link href="/cg-tennis-os" className="text-link">How it helps <MoveRight size={17} /></Link></div><p className="hero-trust"><Check size={15} /> Built from 39 years on court.</p></div><div className="hero-figure"><span>The working<br />kit.</span><img src="/manus-storage/cg-hero-coach-equipment_e0d7f5aa.png" alt="Editorial illustration of a tennis coach’s racket bag, notebook, towel, rackets and basket of balls beside a clay court bench" /></div></div><div className="hero-scroll">Scroll for the story <ArrowDown size={15} /></div></section>
      <section className="problem-section"><div className="frame problem-grid"><aside className="section-mark"><b>01</b><i /><span>The problem</span></aside><div><p className="eyebrow">For the everyday work</p><h2>Good coaching is personal.<br /><i>The admin around it does not have to be a daily scramble.</i></h2></div><div className="problem-note"><p>CG Tennis OS™ gives coaching intelligence a place to live: your players, session plans, parent communication and the rhythm of a working week.</p><Link href="/cg-tennis-os" className="text-link">Explore the system <ArrowUpRight size={16} /></Link></div></div><div className="frame problem-list">{problems.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>
      <section className="story-section"><div className="frame story-grid"><aside className="section-mark"><b>02</b><i /><span>The work behind it</span></aside><div><p className="eyebrow">Thirty-nine years on court</p><h2>Not software designed by people who have never coached a session.</h2></div><div><p>Caroline Gossage has worked with players, parents and fellow coaches across every stage of the game. CG Tennis OS™ is the system shaped by that experience — practical enough for a busy week, human enough for a player’s long-term story.</p><Link href="/about" className="button-secondary">Read Caroline’s story <ArrowUpRight size={17} /></Link></div></div></section>
      <section className="pillar-section"><div className="frame"><aside className="section-mark light-mark"><b>03</b><i /><span>Meet the family</span></aside><div className="pillar-intro"><div><p className="eyebrow peach">The Five Pillars</p><h2>More human,<br /><i>on purpose.</i></h2></div><p>CourtToons turns the habits that shape tennis into stories players, parents and coaches can understand, enjoy and carry with them.</p></div><div className="pillar-row" id="courttoons">{pillars.map((pillar, index) => { const profileId = `courttoon-${pillar.name.toLowerCase()}`; return <article className="pillar-card" key={pillar.name} style={{ "--character": pillar.colour, "--character-ink": pillar.ink } as CSSProperties}><a href={`#${profileId}`} aria-label={`Read the full ${pillar.name} CourtToon biography`}><span className="pillar-number">0{index + 1}</span><span className="pillar-archetype">{pillar.archetype}</span><img src={pillar.image} alt={`${pillar.name} CourtToon character`} /><h3>{pillar.name}</h3><p>{pillar.identity}</p><span className="pillar-more">Read their story <ArrowUpRight size={14} /></span></a></article>; })}</div></div><div className="courttoon-profiles">{pillars.map((pillar, index) => { const profileId = `courttoon-${pillar.name.toLowerCase()}`; return <section className="courttoon-dialog" id={profileId} key={profileId} role="dialog" aria-modal="true" aria-labelledby={`${profileId}-title`} style={{ "--character": pillar.colour, "--character-ink": pillar.ink } as CSSProperties}><a className="courttoon-close" href="#courttoons" aria-label={`Close ${pillar.name} biography`}>Close <span>×</span></a><div className="courttoon-dialog-grid"><div className="courttoon-dialog-art"><span>0{index + 1}</span><img src={pillar.image} alt="" /></div><div className="courttoon-dialog-copy"><p className="courttoon-kicker">CourtToon field guide / {pillar.archetype}</p><h2 id={`${profileId}-title`}>{pillar.name}</h2><p className="courttoon-tagline">{pillar.tagline}</p><p className="courttoon-identity">{pillar.identity}</p><div className="courttoon-bio">{pillar.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><blockquote>“{pillar.excerpt}”</blockquote></div></div></section>; })}</div></section>
      <section className="home-insights"><div className="frame home-insights-grid"><div className="image-frame"><img src="/manus-storage/insights-coaching-board_ef17bed1.png" alt="Illustrated courtside coaching board" /></div><div><aside className="section-mark"><b>04</b><i /><span>Find a useful answer</span></aside><p className="eyebrow">Search-led thinking</p><h2>Practical ideas for the coaching problems you actually face.</h2><p>Specific starter reads for a question in front of you. Deeper diagnostic guides for when you are ready to look at the system around your coaching.</p><Link href="/insights" className="button-primary">Visit Insights <ArrowUpRight size={17} /></Link></div></div></section>
      <section className="updates-preview"><div className="frame updates-preview-grid"><div><p className="eyebrow peach">Product progress</p><h2>Follow the work <i>as it develops.</i></h2><p>Short, honest notes from the development of CG Tennis OS™ — made to be shared, discussed and useful beyond a release number.</p><Link href="/updates" className="text-link light-link">Read all updates <MoveRight size={17} /></Link></div><Link href={`/updates/${updates[0].slug}`} className="update-tease"><span>{updates[0].type}</span><time>{updates[0].date}</time><h3>{updates[0].title}</h3><p>{updates[0].summary}</p><ArrowUpRight size={21} /></Link></div></section>
      <section className="quiz-hold quiz-live"><div className="frame quiz-hold-grid"><div><p className="eyebrow">A useful next step</p><h2>How ready is your coaching <i>operation?</i></h2></div><div><p>The Coach Operating Readiness Index™ gives you a considered picture of where memory, manual effort and fragmented information are making the week harder than it needs to be.</p><Link href="/coach-readiness" className="button-primary">Take the five-minute assessment <ArrowUpRight size={17} /></Link></div></div></section>
    </>
  );
}
