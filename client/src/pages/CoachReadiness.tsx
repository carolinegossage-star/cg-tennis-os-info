/** Clubhouse Almanac assessment: a calm coaching scorebook, led by recognition and practical next moves rather than personality labels. */
import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, LockKeyhole } from "lucide-react";
import { Link } from "wouter";

type Screen = "intro" | "gate" | "results" | number;
type Dimension = "coaching_clarity" | "player_continuity" | "operational_control" | "business_visibility" | "reflective_practice" | "future_readiness";
type Report = {
  dimensionScores: Record<Dimension, number>;
  overallScore: number;
  operatingStage: string;
  operatingStageLabel: string;
  biggestOpportunity: string;
  biggestOpportunityLabel: string;
  opportunitySummary: string;
  nextMoves: string[];
  systemStartingPoint: string;
};

const API_URL = "https://api.cgtennisos.com";
const dimensions: { key: Dimension; label: string; note: string }[] = [
  { key: "coaching_clarity", label: "Coaching Clarity", note: "The purpose and priorities behind the week." },
  { key: "player_continuity", label: "Player Continuity", note: "The story of each player, carried from session to session." },
  { key: "operational_control", label: "Operational Control", note: "The practical work around the court." },
  { key: "business_visibility", label: "Business Visibility", note: "The working picture behind the coaching." },
  { key: "reflective_practice", label: "Reflective Practice", note: "What experience teaches when it is captured." },
  { key: "future_readiness", label: "Future Readiness", note: "Whether the work can grow without relying on you for everything." },
];

const questions: { id: string; dimension: Dimension; label: string; question: string; options: { id: "a" | "b" | "c" | "d" | "e"; text: string }[] }[] = [
  { id: "coaching_compass", dimension: "coaching_clarity", label: "The coaching compass", question: "When you plan a week of sessions, what is most likely guiding the choices?", options: [{ id: "a", text: "A clear set of priorities that I can explain to players and parents." }, { id: "b", text: "A reliable plan, with room to adjust for the people in front of me." }, { id: "c", text: "A mix of useful ideas, current needs and what the week allows." }, { id: "d", text: "Mostly the next session in the diary." }, { id: "e", text: "Whichever ball I pull out of the basket first." }] },
  { id: "weekly_priorities", dimension: "coaching_clarity", label: "Thursday afternoon", question: "A player needs a different approach halfway through the week. What helps you decide what changes?", options: [{ id: "a", text: "I can check the player’s stated goal and adjust with purpose." }, { id: "b", text: "I know the broad direction and make a considered call." }, { id: "c", text: "I work it out from the last few conversations." }, { id: "d", text: "I try a few things and hope one lands." }, { id: "e", text: "A fresh drill and a convincing tone of voice." }] },
  { id: "last_session", dimension: "player_continuity", label: "The first question", question: "A player walks on court and asks, “What did we work on last week?” What happens next?", options: [{ id: "a", text: "We can see the previous focus and pick up the thread together." }, { id: "b", text: "I have a short note that brings it back quickly." }, { id: "c", text: "I can usually remember after a moment." }, { id: "d", text: "I look through messages, notebooks or the recesses of my brain." }, { id: "e", text: "I say, “Great question,” and start buying time." }] },
  { id: "player_story", dimension: "player_continuity", label: "The progress update", question: "A parent asks how their child is getting on. How easy is it to give a useful answer?", options: [{ id: "a", text: "I can describe their goals, recent work, progress and next step." }, { id: "b", text: "I have enough notes to give a clear, grounded update." }, { id: "c", text: "I know the general picture, even if some detail is missing." }, { id: "d", text: "I rely on memory and the last session that comes to mind." }, { id: "e", text: "Somehow I am still there 35 minutes later." }] },
  { id: "rain_cancellation", dimension: "operational_control", label: "Rain at 3.42 pm", question: "The forecast changes, courts close and several sessions need attention. What does the next hour look like?", options: [{ id: "a", text: "A clear process moves bookings and communication into place." }, { id: "b", text: "I have a routine that handles most of it without much fuss." }, { id: "c", text: "I send the key messages, then tidy up the loose ends later." }, { id: "d", text: "I open several apps and start working through the list." }, { id: "e", text: "Rain. WhatsApp. Screenshots. A very long afternoon." }] },
  { id: "message_traffic", dimension: "operational_control", label: "The message thread", question: "A parent catches you after a session and then follows up on WhatsApp. What happens next?", options: [{ id: "a", text: "I note the important point and arrange the right next conversation." }, { id: "b", text: "I answer clearly and make sure it is not lost afterwards." }, { id: "c", text: "I reply, though the follow-up can take some remembering." }, { id: "d", text: "I have good intentions and a message thread that keeps moving." }, { id: "e", text: "I will sort it. I usually do." }] },
  { id: "business_picture", dimension: "business_visibility", label: "A fuller term", question: "Someone asks whether you can take on more players next term. How quickly can you see what capacity you really have?", options: [{ id: "a", text: "I can see capacity, workload and the knock-on effect before I answer." }, { id: "b", text: "I have a current view and can make a sound decision." }, { id: "c", text: "I need a quick check across a few places first." }, { id: "d", text: "I work it out after looking at the diary, notes and recent messages." }, { id: "e", text: "I say yes, then make a new colour-coded spreadsheet." }] },
  { id: "time_leaks", dimension: "business_visibility", label: "The end of the month", question: "Where do you notice the time that disappears around coaching?", options: [{ id: "a", text: "I review the week regularly and can see the repeated drains." }, { id: "b", text: "I have a good sense of where the pressure tends to build." }, { id: "c", text: "I spot it when a week gets especially busy." }, { id: "d", text: "I know it is happening, but not always where or why." }, { id: "e", text: "It is probably in the spreadsheet nobody opens." }] },
  { id: "session_reflection", dimension: "reflective_practice", label: "After the useful session", question: "A session teaches you something worth keeping. What normally happens to that thought?", options: [{ id: "a", text: "I capture it promptly and use it when planning what comes next." }, { id: "b", text: "I make a quick note that I can find again." }, { id: "c", text: "I reflect on it, even if the note is not always there." }, { id: "d", text: "I mean to record it when I get a moment." }, { id: "e", text: "It joins the collection of excellent thoughts from the drive home." }] },
  { id: "growth_test", dimension: "future_readiness", label: "The next step", question: "Two new players, another venue and a coach joining the week all arrive at once. What is most likely to happen?", options: [{ id: "a", text: "The work has enough shape to absorb the change without losing the thread." }, { id: "b", text: "There is a little set-up, but the core routines would hold." }, { id: "c", text: "We could make it work, with a period of close attention." }, { id: "d", text: "Most of it would still depend on me personally holding it together." }, { id: "e", text: "I would need another notebook, another coffee and a quiet word with myself." }] },
];

function DimensionBars({ report }: { report: Report }) {
  return <div className="report-bars">{dimensions.map((dimension, index) => <div className="report-bar" key={dimension.key}><div><span>0{index + 1}</span><b>{dimension.label}</b><strong>{report.dimensionScores[dimension.key]}</strong></div><i><em style={{ width: `${report.dimensionScores[dimension.key]}%` }} /></i></div>)}</div>;
}

export default function CoachReadiness() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coachingRole, setCoachingRole] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const currentQuestion = typeof screen === "number" ? questions[screen] : null;
  const progress = typeof screen === "number" ? ((screen + 1) / questions.length) * 100 : 0;
  const questionComplete = useMemo(() => questions.every((question) => answers[question.id]), [answers]);

  const answerQuestion = (option: "a" | "b" | "c" | "d" | "e") => {
    if (!currentQuestion || typeof screen !== "number") return;
    setAnswers((current) => ({ ...current, [currentQuestion.id]: option }));
    setScreen(screen === questions.length - 1 ? "gate" : screen + 1);
  };

  const goBack = () => {
    setError("");
    if (screen === "gate") setScreen(questions.length - 1);
    else if (typeof screen === "number") setScreen(screen === 0 ? "intro" : screen - 1);
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!questionComplete) { setScreen(0); return; }
    setSubmitting(true); setError("");
    try {
      const response = await fetch(`${API_URL}/api/quiz-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, coaching_role: coachingRole, answers, marketing_consent: marketingConsent }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.report) throw new Error(payload?.error || "We could not save your assessment. Please try again.");
      setReport(payload.report); setScreen("results");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We could not save your assessment. Please try again.");
    } finally { setSubmitting(false); }
  };

  if (screen === "intro") return <>
    <section className="readiness-hero"><div className="readiness-court-line" /><div className="frame readiness-hero-grid"><div><p className="eyebrow peach">Coach operating readiness</p><p className="readiness-number">01 / 06</p><h1>The Coach Operating <i>Readiness Index™</i></h1><p className="readiness-dek">How ready is your coaching operation for the demands of today’s coaching world?</p><p>Discover where your coaching operation relies on memory, manual effort and fragmented information — and what to improve next.</p><div className="readiness-actions"><button className="button-primary" onClick={() => setScreen(0)}>Start the assessment <ArrowRight size={17} /></button><span>Takes about five minutes.</span></div></div><figure className="readiness-cameo"><span>THE COACH<br />AT WORK</span><img src="/manus-storage/readiness-coaching-note_ac27cd4b.png" alt="CourtToon illustration of Caroline reviewing a coaching notebook courtside" /></figure><aside className="readiness-scorecard"><p className="eyebrow peach">A working picture</p><strong>06</strong><span>dimensions of your coaching operation</span><i /><p>Not a verdict on you as a coach. A clearer view of the work around the court.</p></aside></div></section>
    <section className="readiness-method"><div className="frame readiness-method-grid"><aside className="section-mark"><b>02</b><i /><span>Where it comes from</span></aside><div><p className="eyebrow">A long-standing question, reconsidered</p><h2>The book asked about the coach. <i>The Index looks at the operation around them.</i></h2><p>The six-part structure is a direct evolution of the Who, What, When, Why, How and Where framework that closed <i>Are You a High-Performing Coach?</i> in 2013. The philosophy has not moved. The lens has matured alongside the coach.</p></div></div></section>
    <section className="readiness-dimensions"><div className="frame"><div className="readiness-section-head"><div><p className="eyebrow peach">The six dimensions</p><h2>Find the part of the week <i>asking for your attention.</i></h2></div><p>Each dimension looks at a different part of how the coaching operation works day to day.</p></div><div className="dimension-grid">{dimensions.map((dimension, index) => <article key={dimension.key}><span>0{index + 1}</span><h3>{dimension.label}</h3><p>{dimension.note}</p>{dimension.key === "reflective_practice" && <blockquote>“Identify which attributes on your list of unmeasureables you have not mastered yet, and start working on it right away.”</blockquote>}</article>)}</div></div></section>
    <section className="readiness-start"><div className="frame readiness-start-grid"><div><p className="eyebrow">A considered first step</p><h2>Useful before you ever <i>open the system.</i></h2></div><div><p>Your individual answers will not be shared or published. The report will give you a score, a current operating stage, your clearest opportunity, and three practical next moves.</p><button className="button-primary" onClick={() => setScreen(0)}>Start the assessment <ArrowRight size={17} /></button></div></div></section>
  </>;

  if (typeof screen === "number" && currentQuestion) return <section className="assessment-shell"><div className="assessment-top"><div className="frame assessment-top-inner"><Link href="/coach-readiness" className="assessment-exit"><ArrowLeft size={15} /> Leave assessment</Link><span>Question {screen + 1} of {questions.length}</span></div><div className="assessment-progress"><i style={{ width: `${progress}%` }} /></div></div><div className="assessment-question frame"><button className="assessment-back" onClick={goBack}><ChevronLeft size={18} /> Back</button><div className="question-sheet"><div className="question-stamp"><span>0{screen + 1}</span><p>{currentQuestion.label}</p><i>{dimensions.find((dimension) => dimension.key === currentQuestion.dimension)?.label}</i></div><h1>{currentQuestion.question}</h1><div className="answer-list">{currentQuestion.options.map((option) => <button key={option.id} onClick={() => answerQuestion(option.id)}><b>{option.id.toUpperCase()}</b><span>{option.text}</span><ArrowRight size={17} /></button>)}</div></div></div></section>;

  if (screen === "gate") return <section className="assessment-shell"><div className="assessment-top"><div className="frame assessment-top-inner"><button className="assessment-exit" onClick={goBack}><ArrowLeft size={15} /> Back to questions</button><span>{questions.length} questions complete</span></div><div className="assessment-progress"><i style={{ width: "100%" }} /></div></div><div className="assessment-question frame"><div className="question-sheet email-gate"><p className="eyebrow">Your report is ready</p><h1>Where should we send your Coach Operating <i>Readiness Report™?</i></h1><p className="gate-dek">Enter your details to receive your full report and practical action plan.</p><form onSubmit={submitLead}><label>Your name<input required maxLength={255} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Your name" /></label><label>Email address<input required type="email" maxLength={255} value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" /></label><label>Coaching role<select required value={coachingRole} onChange={(event) => setCoachingRole(event.target.value)}><option value="" disabled>Select one</option><option value="independent">Independent coach</option><option value="academy">Academy or club</option><option value="other">Other</option></select></label><label className="consent"><input type="checkbox" checked={marketingConsent} onChange={(event) => setMarketingConsent(event.target.checked)} /><span>I’m happy to receive occasional emails from CG Tennis OS™.</span></label><p className="privacy-note"><LockKeyhole size={15} /> Your individual answers will not be shared or published. We will use your email to send your results and, occasionally, related coaching content — you can unsubscribe any time.</p>{error && <p className="form-error" role="alert">{error}</p>}<button className="button-primary" type="submit" disabled={submitting}>{submitting ? "Preparing your report…" : "See my report"} <ArrowRight size={17} /></button></form></div></div></section>;

  if (screen === "results" && report) return <section className="report-page"><header className="report-hero"><div className="frame report-hero-grid"><div><p className="eyebrow peach">Coach Operating Readiness Report™</p><p className="report-label">Your current stage</p><h1>{report.operatingStageLabel}</h1><p>Your coaching operation has a readiness score of <strong>{report.overallScore}</strong> out of 100.</p></div><aside className="overall-score"><span>Readiness score</span><strong>{report.overallScore}</strong><i>/ 100</i></aside></div></header><section className="report-detail"><div className="frame report-detail-grid"><aside className="report-margin"><span>YOUR READINESS PROFILE</span><i /><p>This is a starting point. The useful thing is what you can see more clearly from here.</p></aside><div><p className="eyebrow">Six dimensions</p><h2>A clearer picture of the operation <i>around your coaching.</i></h2><DimensionBars report={report} /><section className="opportunity-card"><p className="eyebrow peach">Your biggest opportunity</p><h3>{report.biggestOpportunityLabel}</h3><p>{report.opportunitySummary}</p></section><section className="next-moves"><p className="eyebrow">Your three next moves</p><h3>Three useful changes <i>for the coming week.</i></h3>{report.nextMoves.map((move, index) => <div key={move}><span>0{index + 1}</span><p>{move}</p></div>)}</section><section className="system-pointer"><p className="eyebrow peach">A useful starting point in CG Tennis OS™</p><h3>{report.systemStartingPoint}</h3><p>CG Tennis OS™ turns the moving parts of coaching into one clear operating system — so you can coach better, run better, and grow without everything depending on you.</p><a href="https://cgtennisos.com/register" target="_blank" rel="noreferrer" className="button-primary">Create your free CG Tennis OS™ account <ArrowUpRight size={17} /></a><small>Create your account and we’ll be in touch with your full Coach Operating Readiness Report™.</small></section><blockquote className="report-close">You do not need to become a different coach. You need a coaching operation worthy of the coach you have become.</blockquote><p className="direct-coaching">This report tells you what’s happening. What to do next — in real depth — is something I work through directly with a small number of coaches at a time. If that is ever of interest, keep an eye out.</p></div></div></section></section>;

  return null;
}
