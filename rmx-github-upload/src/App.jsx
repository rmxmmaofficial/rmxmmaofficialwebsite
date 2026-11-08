import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight,
  CalendarDays, Check, ChevronDown, Clock3, Instagram, MapPin,
  Menu, MessageCircle, MoveUpRight, Phone, Play, Sparkles, X,
} from "lucide-react";
import {
  bookingSchedules, branches, galleryItems, googleReviews, googleReviewsUrl, membershipPlans, programmeOptions,
  programmeScheduleNames, programs, site, weeklySchedule,
} from "./content";

gsap.registerPlugin(ScrollTrigger);
const easing = [0.22, 1, 0.36, 1];

function getBranch(branchId) {
  return branches.find((branch) => branch.id === branchId) || branches[0];
}

function getWhatsAppLink(branchId, message) {
  const branch = getBranch(branchId);
  return "https://wa.me/" + branch.whatsapp + "?text=" + encodeURIComponent(message);
}

function getClassName(programme) {
  if (programme === "Not sure yet") return null;
  if (Object.prototype.hasOwnProperty.call(programmeScheduleNames, programme)) return programmeScheduleNames[programme];
  return programme;
}

function getPublishedSlots(branchId, day, programme) {
  const className = getClassName(programme);
  const dayClasses = weeklySchedule.find((item) => item.day === day)?.classes || [];
  if (programme === "Not sure yet") return dayClasses.length ? bookingSchedules[branchId]?.[day] || [] : [];
  if (!className || !dayClasses.includes(className)) return [];
  return bookingSchedules[branchId]?.[day] || [];
}

function getLocalDateValue(date = new Date()) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

function getWeekdayFromDate(dateValue) {
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", { weekday: "long" });
}

function formatDemoDate(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(year, month - 1, day));
}

const grievanceCategories = [
  "Membership & Administration", "Training & Coaching", "Staff & Management",
  "Safety & Facility", "Payment & Billing", "Member Feedback", "Other Concerns",
];

function Reveal({ children, className = "", delay = 0, ...props }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease: easing }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }) {
  return <div className={"eyebrow " + (light ? "eyebrow-light" : "")}><span className="eyebrow-mark" /><span>{children}</span></div>;
}

function SectionHeading({ eyebrow, title, copy, align = "left" }) {
  return (
    <div className={"section-heading section-heading-" + align}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display-heading">{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

function Logo({ className = "" }) {
  return <a href="#home" className={"brand-mark " + className} aria-label="RMX MMA & Fitness Centre home"><img src={site.logo} alt="RMX MMA & Fitness Centre" /></a>;
}

function Loader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1050);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <AnimatePresence>
      {visible && <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.45 } }} aria-hidden="true">
        <div className="loader-inner"><span className="loader-kicker">MOVE WITH PURPOSE</span><img src={site.logo} alt="" /><div className="loader-line"><span /></div></div>
      </motion.div>}
    </AnimatePresence>
  );
}

function Header({ onBookDemo }) {
  const [open, setOpen] = useState(false);
  const links = [["The RMX way", "#about"], ["Programmes", "#programs"], ["Schedule", "#schedule"], ["Coaching", "#coaches"], ["CONTACT US", "#contact"]];
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className={"desktop-nav " + (open ? "nav-open" : "")} aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="header-cta" type="button" onClick={() => onBookDemo()}><span>Book a free demo</span><ArrowUpRight size={16} /></button>
          <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onBookDemo }) {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="hero" id="home">
      {site.heroVideo ? <video className="hero-media" poster={site.heroPoster || undefined} src={site.heroVideo} autoPlay muted loop playsInline aria-label="RMX training session" /> :
        <div className="hero-media hero-photo" style={{ backgroundImage: "url(\"" + site.heroPoster + "\")" }} />}
      <div className="hero-overlay" /><div className="hero-red-orbit" />
      <div className="hero-content page-wrap">
        <div className="hero-copy">
          <motion.div className="hero-kicker" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease: easing }}><span className="live-dot" /> MIXED MARTIAL ARTS & FITNESS CENTRE</motion.div>
          <motion.h1 className="hero-title display-heading" initial={{ opacity: 0, y: 34, filter: "blur(9px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.95, delay: 0.35, ease: easing }}>TRAIN WITH<br /><span>THE BEST</span></motion.h1>
          <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55, ease: easing }}>ELITE MIXED MARTIAL ARTS & FITNESS TRAINING CENTRE</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.68, ease: easing }}>
            <a className="button button-red" href="tel:+919886685644"><Phone size={16} /> CALL NOW</a>
            <button className="button button-outline" type="button" onClick={() => onBookDemo()}><CalendarDays size={16} /> BOOK A FREE DEMO</button>
          </motion.div>
        </div>
        <div className="hero-side-note"><span className="hero-side-line" /><span>DISCIPLINE<br />IN MOTION</span></div>
        <div className="hero-bottom"><span className="hero-location"><span className="hero-location-point" /> BUILT FOR EVERY BODY. READY FOR EVERY ROUND.</span><a href="#about" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></a></div>
      </div>
      <div className="hero-index"><span>01</span><i /> 07</div>
      <button className="hero-watch" onClick={() => setPlaying(true)}><span className="play-ring"><Play size={13} fill="currentColor" /></span><span>WATCH TRAINING</span></button>
      {playing && <div className="video-modal" role="dialog" aria-modal="true" aria-label="RMX training film">
        <button className="modal-close" onClick={() => setPlaying(false)} aria-label="Close"><X /></button>
        <div className="video-modal-card video-modal-film"><span>RMX TRAINING FILM</span><video src={site.heroVideo} controls autoPlay muted playsInline aria-label="RMX mixed martial arts training film" /></div>
      </div>}
    </section>
  );
}

function Ticker() {
  const words = ["DISCIPLINE", "MOVEMENT", "STRENGTH", "MINDSET", "CONSISTENCY"];
  return <div className="ticker" aria-label="Discipline, movement, strength, mindset, consistency"><div className="ticker-track">
    {[0, 1].map((copy) => <div className="ticker-group" key={copy} aria-hidden={copy === 1}>{words.map((word) => <span key={word}>{word}<i>✳</i></span>)}</div>)}
  </div></div>;
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="page-wrap about-grid">
        <Reveal className="about-visual"><div className="about-photo"><img src="/assets/art of movement.jpg" alt="Roshan Mainam celebrates after a ONE Championship bout" /></div><div className="about-photo-shade" /><div className="about-photo-stamp"><span>RMX</span><small>THE ART OF<br />MOVEMENT</small></div><div className="about-vertical">STRENGTH · FOCUS · BALANCE</div><div className="about-photo-caption"><span>ESTABLISHED IN DISCIPLINE</span><span>RMX / 001</span></div></Reveal>
        <Reveal className="about-copy" delay={0.12}>
          <Eyebrow>THE RMX WAY</Eyebrow><h2 className="display-heading">REWIRE YOUR<br /><em>WAY OF LIFE</em></h2>
          <p className="about-lead">MORE THAN A FIGHT GYM</p>
          <p className="body-copy">Led by former ONE Championship athlete Roshan Mainam, RMX uses martial arts to build physical vitality, mental clarity, self-belief and lasting discipline. Through expert coaching and a supportive community, training becomes a steady practice for managing stress, growing resilience and improving quality of life.</p>
          <div className="about-quote"><span className="quote-mark">“</span><p>Every session is a chance to move with purpose, find confidence in your progress and carry the lessons of the mat into everyday life.</p></div>
          <a href="#programs" className="text-link">Explore RMX programmes <ArrowUpRight size={17} /></a>
        </Reveal>
      </div>
    </section>
  );
}

function Programs({ onBookDemo }) {
  return (
    <section className="programs section-pad" id="programs"><div className="page-wrap">
      <Reveal className="programs-head"><SectionHeading eyebrow="FIND YOUR EDGE" title="PROGRAMMES" copy="From your first class to your next level, find the training that moves you forward." /><div className="programs-count"><span>12</span><small>PATHS TO<br />PROGRESS</small></div></Reveal>
      <div className="program-grid">{programs.map((program, index) => <motion.button type="button" className="program-card" key={program.name} aria-label={"Book a " + program.name + " demo"} onClick={() => onBookDemo("", program.name)} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: 0.55, delay: Math.min(index % 4, 3) * 0.07, ease: easing }} whileHover={{ y: -6, transition: { duration: 0.25 } }}>
        <img className="program-image" src={program.image} alt={program.alt} />
        <span className="program-index">{String(index + 1).padStart(2, "0")} / 12</span><span className="program-icon">{program.icon}</span>
        <span className="program-card-bottom"><span className="program-type">{program.type}</span><span className="program-name">{program.name}</span><span className="program-description">{program.text}</span><span className="program-arrow"><ArrowUpRight size={17} /></span></span>
      </motion.button>)}</div>
      <div className="section-cta-row"><a className="button button-red" href="tel:+919886685644"><Phone size={15} /> CALL NOW</a><button className="button button-outline" type="button" onClick={() => onBookDemo()}><CalendarDays size={15} /> BOOK A FREE DEMO</button></div>
    </div></section>
  );
}

function Schedule() {
  const [selected, setSelected] = useState(0);
  const activeDay = weeklySchedule[selected];
  return (
    <section className="schedule section-pad" id="schedule"><div className="page-wrap">
      <Reveal className="schedule-top"><SectionHeading eyebrow="THE WEEK, IN MOTION" title={<>SHOW UP.<br /><em>MOVE FORWARD.</em></>} copy="A weekly rhythm built around striking, grappling, conditioning and time on the mat." /><div className="schedule-aside"><Clock3 size={20} /><span>Weekly class focus</span><strong>MON — SUN</strong></div></Reveal>
      <div className="week-board">
        <div className="week-days" role="tablist" aria-label="Weekly schedule">{weeklySchedule.map((item, index) => <button className={"week-day " + (selected === index ? "week-day-active" : "")} key={item.day} onClick={() => setSelected(index)} role="tab" aria-selected={selected === index} aria-controls="day-schedule"><span>{String(index + 1).padStart(2, "0")}</span>{item.day.slice(0, 3)}</button>)}</div>
        <div className="day-panel" id="day-schedule" role="tabpanel">
          <div className="day-panel-title"><span className="day-label">TODAY’S FOCUS</span><h3>{activeDay.day}<span>.</span></h3><p>Explore the classes on the floor.</p></div>
          <div className="day-classes"><AnimatePresence mode="wait"><motion.div key={activeDay.day} className="day-class-list" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>{activeDay.classes.map((name, index) => <div className="day-class" key={name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong><ArrowUpRight size={18} /></div>)}</motion.div></AnimatePresence><p className="schedule-note">Class times are listed in the daily training blocks below.</p></div>
        </div>
      </div>
      <div className="schedule-mobile-hint"><ChevronDown size={14} /> Tap a day to view the focus</div>
    </div></section>
  );
}

function DailyTimings() {
  const blocks = [
    { title: "Morning general class", time: "6:30 AM — 8:30 AM", note: "1-hour sessions", number: "01" },
    { title: "Professional fighters batch", time: "11:00 AM — 2:00 PM", note: "Focused athlete training", number: "02" },
    { title: "Evening general class", time: "5:30 PM — 8:30 PM", note: "1-hour sessions", number: "03" },
    { title: "Evening fighters batch", time: "8:30 PM — 10:00 PM", note: "Focused athlete training", number: "04" },
  ];
  return (
    <section className="timings section-pad"><div className="page-wrap timing-layout">
      <Reveal className="timing-intro"><Eyebrow>MAKE IT A RITUAL</Eyebrow><h2 className="display-heading">YOUR DAY.<br /><em>YOUR ROUND.</em></h2><p className="body-copy">A schedule for everyday athletes and committed competitors—built to make consistency possible.</p><span className="timing-graphic"><span>RMX</span><i /></span></Reveal>
      <div className="timing-list">{blocks.map((block, index) => <Reveal key={block.number} delay={index * 0.05}><div className="timing-row"><span className="timing-number">{block.number}</span><div className="timing-detail"><span>{block.title}</span><strong>{block.time}</strong><small>{block.note}</small></div><ArrowUpRight className="timing-arrow" size={18} /></div></Reveal>)}
        <Reveal className="membership-note"><div className="membership-note-glow" /><div className="membership-note-icon"><Sparkles size={19} /></div><div><span className="note-kicker">ONE MEMBERSHIP. FULL ACCESS.</span><h3>Unlimited general classes.<br />Access to fighter sessions.</h3><p>An athlete-level training environment is part of the RMX membership.</p></div><a href="#membership" aria-label="Explore membership"><ArrowUpRight size={19} /></a></Reveal>
      </div>
    </div></section>
  );
}

function Gallery() {
  const [selected, setSelected] = useState(null);
  return (
    <section className="gallery section-pad" id="gallery"><div className="page-wrap">
      <Reveal className="gallery-head"><SectionHeading eyebrow="INSIDE THE RMX FLOOR" title={<>THE WORK<br /><em>IN FRAME.</em></>} copy="A glimpse of the training culture, the people behind it and the practice that carries beyond the mat." /><a className="text-link" href="#contact">Bring your story to RMX <ArrowUpRight size={17} /></a></Reveal>
      <div className="gallery-grid">{galleryItems.map((item, index) => <motion.button type="button" className={"gallery-card gallery-" + item.size} key={item.title + index} onClick={() => setSelected(item)} whileHover={{ scale: 0.99 }} aria-label={"View " + item.title + (item.mediaType === "video" ? " video" : " image")}>
        {item.mediaType === "video" ? <video className="gallery-image gallery-video" src={item.video} muted loop autoPlay playsInline preload="metadata" aria-label={item.alt} /> : <img className="gallery-image" src={item.image} alt={item.alt} />}
        <span className="gallery-overlay" /><span className="gallery-label"><small>{item.tag}</small><strong>{item.title}</strong>{item.copy && <span className="gallery-copy">{item.copy}</span>}</span><span className="gallery-open"><MoveUpRight size={18} /></span><span className="gallery-index">{String(index + 1).padStart(2, "0")}</span>
      </motion.button>)}</div>
    </div>
    <AnimatePresence>{selected && <motion.div className="image-viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close media"><X /></button><motion.div className="image-viewer-image" initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={(event) => event.stopPropagation()}>
      {selected.mediaType === "video" ? <video src={selected.video} controls autoPlay playsInline className="viewer-media" aria-label={selected.alt} /> : <img src={selected.image} alt={selected.alt} />}
      <span><small>{selected.tag}</small><strong>{selected.title}</strong></span>
    </motion.div></motion.div>}</AnimatePresence>
    </section>
  );
}

function Trainers({ onBookDemo }) {
  const photos = [
    { src: "/assets/roshan profile.jpg", alt: "Roshan Mainam in the ONE Championship cage", position: "50% 32%" },
    { src: "/assets/profile 2.jpg", alt: "Roshan Mainam with his ONE Championship medal", position: "50% 50%" },
    { src: "/assets/profile 3.jpg", alt: "Roshan Mainam celebrates with a coach after competition", position: "50% 34%" },
  ];
  const [activePhoto, setActivePhoto] = useState(0);
  const movePhoto = (direction) => setActivePhoto((activePhoto + direction + photos.length) % photos.length);
  return (
    <section className="trainers section-pad" id="coaches"><div className="page-wrap trainer-layout">
      <Reveal className="trainer-lead"><Eyebrow>COACHING WITH INTENT</Eyebrow><h2 className="display-heading">LEARN FROM<br /><em>THE JOURNEY.</em></h2><p>Roshan Mainam brings world-stage experience and a belief that coaching should build more than fighters—it should help people find their strength and direction.</p><div className="trainer-ctas"><a className="button button-red" href="tel:+919886685644"><Phone size={15} /> CALL NOW</a><button className="button button-outline" type="button" onClick={() => onBookDemo()}><CalendarDays size={15} /> BOOK A FREE DEMO</button></div></Reveal>
      <Reveal className="trainer-card" delay={0.12}><div className="trainer-image"><div className="trainer-image-glow" /><AnimatePresence mode="wait"><motion.img key={photos[activePhoto].src} src={photos[activePhoto].src} alt={photos[activePhoto].alt} style={{ objectPosition: photos[activePhoto].position }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .28 }} /></AnimatePresence><button type="button" className="trainer-photo-arrow trainer-photo-prev" onClick={() => movePhoto(-1)} aria-label="Previous Roshan Mainam photo"><ArrowLeft size={18} /></button><button type="button" className="trainer-photo-arrow trainer-photo-next" onClick={() => movePhoto(1)} aria-label="Next Roshan Mainam photo"><ArrowRight size={18} /></button><div className="trainer-photo-dots" aria-label="Roshan Mainam photos">{photos.map((photo, index) => <button type="button" key={photo.src} className={index === activePhoto ? "active" : ""} onClick={() => setActivePhoto(index)} aria-label={"Show photo " + (index + 1)} aria-current={index === activePhoto ? "true" : undefined} />)}</div></div><div className="trainer-meta"><div><span>FOUNDER & HEAD COACH · FORMER ONE CHAMPIONSHIP ATHLETE</span><h3>Roshan Mainam</h3><p>Four-time Delhi State Wrestling Champion</p></div><span className="trainer-slide-count">0{activePhoto + 1} / 03</span></div></Reveal>
      <Reveal className="trainer-bio" delay={0.17}><p>From humble beginnings in Thoubal, Manipur, to competing on the global stage of ONE Championship, Roshan Mainam’s journey reflects perseverance, sacrifice and determination.</p><p>A four-time Delhi State Wrestling Champion, he earned his place at Singapore’s prestigious Evolve Fight Team at just 23, eventually making his ONE Championship debut in 2019.</p><p>Having competed internationally and trained several prominent athletes, Roshan brings invaluable experience and technical expertise to RMX MMA & Fitness Centre.</p><p>Known for his composure, charismatic personality and generous spirit, his coaching goes beyond developing fighters. He is committed to building discipline, resilience, confidence and character through martial arts.</p><strong>His vision: to help every individual unlock their potential and lead a stronger, more purposeful life.</strong><div className="trainer-links"><a className="text-link" href="https://www.instagram.com/roshanmainam?obrf=NG9udDd0YWd1eGsz" target="_blank" rel="noreferrer"><Instagram size={16} /> FOLLOW ON INSTAGRAM <ArrowUpRight size={15} /></a><a className="text-link" href="https://www.onefc.com/features/roshan-mainam-dared-to-dream-big-to-provide-for-his-family/" target="_blank" rel="noreferrer">READ HIS STORY <ArrowUpRight size={15} /></a></div></Reveal>
    </div></section>
  );
}

function Membership({ onAskMembership }) {
  return (
    <section className="membership section-pad" id="membership"><div className="page-wrap">
      <Reveal className="membership-heading"><SectionHeading eyebrow="COMMIT TO YOURSELF" title={<>CHOOSE YOUR<br /><em>TRAINING RHYTHM.</em></>} copy="Every RMX membership opens the door to unlimited general classes, fighter sessions and an athlete-level training environment." /><span className="membership-stamp">UNLIMITED<br /><b>GENERAL CLASSES</b><i>INCLUDED</i></span></Reveal>
      <div className="plans-grid">{membershipPlans.map((plan, index) => <Reveal key={plan.name} delay={index * 0.06}><article className={"plan-card " + (plan.featured ? "plan-featured" : "")}>{plan.featured && <span className="plan-tag">MOST POPULAR</span>}<div className="plan-head"><span>{plan.marker} / MEMBERSHIP</span><ArrowUpRight size={17} /></div><h3>{plan.name}</h3><p>{plan.description}</p><div className="plan-price"><a href="#contact">CONTACT US</a><span>Ask the team for current rates</span></div><ul>{plan.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul><button type="button" className={plan.featured ? "button button-red" : "button button-plan"} onClick={() => onAskMembership("", "", plan.name)}>ASK ABOUT MEMBERSHIP <ArrowUpRight size={16} /></button></article></Reveal>)}</div>
      <p className="membership-footnote">Pricing and plan terms are available from the RMX team.</p>
    </div></section>
  );
}

function BMICalculator() {
  const [weight, setWeight] = useState(72);
  const [height, setHeight] = useState(172);
  const bmi = useMemo(() => weight / Math.pow(height / 100, 2), [weight, height]);
  const category = bmi < 18.5 ? "Below reference range" : bmi < 25 ? "Within reference range" : bmi < 30 ? "Above reference range" : "30 or above";
  return (
    <section className="bmi-section section-pad" id="bmi"><div className="page-wrap bmi-layout">
      <Reveal className="bmi-intro"><Eyebrow>KNOW YOUR STARTING POINT</Eyebrow><h2 className="display-heading">A NUMBER.<br /><em>NOT YOUR STORY.</em></h2><p>A simple adult BMI estimate can offer one point of reference. It does not account for every aspect of health or athletic build.</p><a href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" target="_blank" rel="noreferrer" className="text-link">About adult BMI categories <ArrowUpRight size={16} /></a></Reveal>
      <Reveal className="bmi-card" delay={0.12}><div className="bmi-card-head"><span>BMI ESTIMATOR</span><Activity size={18} /></div><div className="bmi-value-row"><span className="bmi-value">{bmi.toFixed(1)}</span><span className="bmi-category">{category}</span></div><div className="bmi-gauge"><span style={{ left: Math.min(Math.max((bmi - 12) / 28, 0.04), 0.96) * 100 + "%" }} /></div>
        <label className="range-control"><span>Weight <b>{weight} <small>kg</small></b></span><input type="range" min="35" max="160" value={weight} onChange={(event) => setWeight(Number(event.target.value))} /><span className="range-minmax"><small>35 kg</small><small>160 kg</small></span></label>
        <label className="range-control"><span>Height <b>{height} <small>cm</small></b></span><input type="range" min="125" max="215" value={height} onChange={(event) => setHeight(Number(event.target.value))} /><span className="range-minmax"><small>125 cm</small><small>215 cm</small></span></label>
        <p className="bmi-note">For adults 20+. BMI is a screening measure, not a diagnosis. Discuss health questions with a qualified professional.</p>
      </Reveal>
    </div></section>
  );
}

function SupportGrievance() {
  const [branchId, setBranchId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const branch = branchId ? getBranch(branchId) : null;
  const whatsappMessage = "Hello RMX Support & Grievance Cell,\n\nI would like to raise a concern / request assistance.\n\nName: " + name + "\nBranch: " + (branch?.name || "") + "\nSubject: " + subject + "\nDescription: " + description + "\n\nPlease guide me regarding this matter. Thank you.";
  const emailSubject = "RMX Support & Grievance – " + (branch?.name || "");
  const emailBody = "Dear RMX Support & Management Team,\n\nI would like to bring the following matter to your attention.\n\nName: " + name + "\nBranch: " + (branch?.name || "") + "\nContact Number: " + phone + "\nCategory: " + category + "\nSubject: " + subject + "\nDescription of Concern: " + description + "\n\nI kindly request your assistance regarding this matter.\n\nThank you.";
  const emailHref = branch ? "mailto:" + site.email + "?subject=" + encodeURIComponent(emailSubject) + "&body=" + encodeURIComponent(emailBody) : undefined;

  return (
    <Reveal className="support-cell" id="support">
      <div className="support-intro"><Eyebrow>HERE TO HELP</Eyebrow><h3>SUPPORT &amp;<br /><em>GRIEVANCE CELL</em></h3><p>Members, parents, visitors and prospective students can contact RMX management directly. Your message is only shared when you choose to open WhatsApp or email.</p></div>
      <div className="support-body">
        <div className="support-categories"><span>HOW CAN WE HELP?</span><ul>{grievanceCategories.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <form className="support-form" onSubmit={(event) => event.preventDefault()}>
          <label>RMX branch<select value={branchId} onChange={(event) => setBranchId(event.target.value)} required><option value="">Select a branch</option>{branches.map((item) => <option value={item.id} key={item.id}>RMX {item.name}</option>)}</select></label>
          <label>Your name<input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Name" /></label>
          <label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Select a category</option>{grievanceCategories.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
          <label><span className="support-label-row">Contact number <span className="optional">(optional)</span></span><input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" placeholder="Phone number" /></label>
          <label>Subject<input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="What would you like help with?" /></label>
          <label className="support-description">Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={4} placeholder="Share any details that will help us understand your concern." /></label>
          <div className="support-actions">
            <a className="button button-red" href={branch ? getWhatsAppLink(branchId, whatsappMessage) : undefined} target="_blank" rel="noreferrer" aria-disabled={!branch}>CONTACT VIA WHATSAPP <ArrowUpRight size={15} /></a>
            <a className="button button-outline" href={emailHref} aria-disabled={!branch}>SEND AN EMAIL <ArrowUpRight size={15} /></a>
          </div>
          <p className="support-disclosure">Choose a branch to prepare your message. It is not sent or registered until you send it from WhatsApp or your email app.</p>
        </form>
      </div>
    </Reveal>
  );
}

function GoogleReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [engaged, setEngaged] = useState(false);
  const touchStartX = useRef(null);
  const activeReview = googleReviews[activeIndex];
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!autoplay || engaged || reducedMotion || googleReviews.length < 2) return undefined;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % googleReviews.length), 9500);
    return () => window.clearInterval(timer);
  }, [autoplay, engaged, reducedMotion]);

  function moveTo(index) {
    setActiveIndex((index + googleReviews.length) % googleReviews.length);
    setAutoplay(false);
  }

  function handlePointerDown(event) {
    if (event.pointerType === "touch") touchStartX.current = event.clientX;
  }

  function handlePointerUp(event) {
    if (touchStartX.current === null) return;
    const distance = event.clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) > 45) moveTo(activeIndex + (distance < 0 ? 1 : -1));
  }

  return (
    <Reveal className="google-reviews" id="google-reviews">
      <div className="google-reviews-heading">
        <Eyebrow>GOOGLE · MEMBER REVIEWS</Eyebrow>
        <h3>WHAT OUR<br /><em>MEMBERS SAY.</em></h3>
        <p>Real words from the people who train at RMX. Browse their Google reviews, names and ratings in their original form.</p>
        <div className="google-attribution"><span className="google-review-mark" aria-hidden="true">G</span><span>SHARED ON GOOGLE</span></div>
        <a className="text-link" href={googleReviewsUrl} target="_blank" rel="noreferrer">READ MORE GOOGLE REVIEWS <ArrowUpRight size={16} /></a>
      </div>
      <div className="review-carousel" role="region" aria-roledescription="carousel" aria-label="Google member review screenshots" onMouseEnter={() => setEngaged(true)} onMouseLeave={() => setEngaged(false)} onFocusCapture={() => setEngaged(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setEngaged(false); }}>
        <div className="review-viewport" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={() => { touchStartX.current = null; }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure className="review-slide" key={activeReview.image} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: .38, ease: easing }}>
              <img src={activeReview.image} alt={activeReview.alt} draggable="false" />
            </motion.figure>
          </AnimatePresence>
          <span className="review-image-index">{String(activeIndex + 1).padStart(2, "0")} <i /> {String(googleReviews.length).padStart(2, "0")}</span>
        </div>
        <div className="review-carousel-footer">
          <div className="review-progress" aria-hidden="true"><span style={{ transform: "scaleX(" + ((activeIndex + 1) / googleReviews.length) + ")" }} /></div>
          <div className="review-controls">
            <div className="review-pagination" role="group" aria-label="Choose a review image">{googleReviews.map((review, index) => <button type="button" key={review.image} className={index === activeIndex ? "active" : ""} aria-label={"Show review image " + (index + 1)} aria-current={index === activeIndex ? "true" : undefined} onClick={() => moveTo(index)} />)}</div>
            <div className="review-navigation">
              <button className="review-autoplay" type="button" aria-label={autoplay ? "Pause automatic review slides" : "Resume automatic review slides"} onClick={() => setAutoplay((playing) => !playing)}>{autoplay ? "PAUSE" : "PLAY"}</button>
              <button className="review-arrow" type="button" aria-label="Previous review image" onClick={() => moveTo(activeIndex - 1)}><ArrowLeft size={17} /></button>
              <button className="review-arrow" type="button" aria-label="Next review image" onClick={() => moveTo(activeIndex + 1)}><ArrowRight size={17} /></button>
            </div>
          </div>
          <p className="review-note">Each slide is an unaltered screenshot of member reviews shared on Google.</p>
        </div>
      </div>
    </Reveal>
  );
}

function Contact({ onBookDemo, onAskMembership }) {
  return (
    <section className="contact section-pad" id="contact"><div className="page-wrap">
      <Reveal className="contact-head"><Eyebrow>CONTACT US</Eyebrow><h2 className="display-heading">TWO BRANCHES.<br /><em>ONE PURPOSE.</em></h2><p>Choose the branch that works for you. Call the team or book a free demo through WhatsApp.</p></Reveal>
      <div className="branch-grid">{branches.map((branch, index) => <Reveal className="branch-card" key={branch.id} delay={index * .1}><div className="branch-top"><span>RMX MMA & FITNESS CENTRE</span><MapPin size={18} /></div><h3>{branch.name}</h3><p>Find your training community. Start with a conversation or book a free demo.</p><a className="branch-directions" href={branch.maps} target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowUpRight size={16} /></a><div className="branch-links"><a href={"tel:" + branch.phone.replace(/[\s-]/g, "")}><Phone size={15} />{branch.phone}</a><a href={branch.instagram} target="_blank" rel="noreferrer"><Instagram size={15} />FOLLOW ON INSTAGRAM</a></div><div className="branch-actions"><a className="button button-red" href={"tel:" + branch.phone.replace(/[\s-]/g, "")}>CALL {branch.name.toUpperCase()}</a><button className="button button-outline" type="button" onClick={() => onBookDemo(branch.id)}>BOOK A FREE DEMO</button><a className="branch-whatsapp" href={getWhatsAppLink(branch.id, "Hello RMX Team! I would like to enquire about training at the " + branch.name + " branch.")} target="_blank" rel="noreferrer"><MessageCircle size={15} /> ENQUIRE ON WHATSAPP</a><button className="branch-membership" type="button" onClick={() => onAskMembership("", branch.id)}>ASK ABOUT MEMBERSHIP</button></div></Reveal>)}</div>
      <a className="support-jump" href="#support">SUPPORT &amp; GRIEVANCE CELL <ArrowUpRight size={15} /></a>
      <SupportGrievance />
      <GoogleReviews />
      <Reveal className="official-email"><span>OFFICIAL EMAIL</span><a href={"mailto:" + site.email}>{site.email}<ArrowUpRight size={15} /></a></Reveal>
    </div></section>
  );
}

function Footer({ onBookDemo, onAskMembership }) {
  const quickLinks = [["About", "#about"], ["Programs", "#programs"], ["Schedule", "#schedule"], ["Membership", "#membership"], ["CONTACT US", "#contact"], ["SUPPORT & GRIEVANCE CELL", "#support"]];
  return (
    <footer className="footer"><div className="footer-top page-wrap">
      <div className="footer-brand"><Logo className="footer-logo" /><p>RMX MMA & Fitness Centre.<br />Move with purpose. Build a stronger life.</p></div>
      <div className="footer-nav"><span>EXPLORE RMX</span>{quickLinks.map(([name, href]) => <a href={href} key={href}>{name}<ArrowUpRight size={13} /></a>)}</div>
      <div className="footer-join"><span>READY WHEN YOU ARE</span><div className="footer-ctas"><a className="button button-red" href="tel:+919886685644"><Phone size={14} /> CALL NOW</a><button className="button button-outline" type="button" onClick={() => onBookDemo()}>BOOK A FREE DEMO <ArrowUpRight size={15} /></button><button type="button" className="footer-membership" onClick={() => onAskMembership()}>ASK ABOUT MEMBERSHIP</button></div><small>Elite MMA · Fitness · Development</small></div>
    </div><div className="footer-bottom page-wrap"><span>© {new Date().getFullYear()} RMX MMA & FITNESS CENTRE</span><a href="#home">BACK TO TOP <ArrowUpRight size={13} /></a><a href={"mailto:" + site.email}>{site.email}</a></div></footer>
  );
}

function BookingModal({ mode, initialBranch = "", initialProgramme = "", initialPlan = "", onClose }) {
  const [branchId, setBranchId] = useState(initialBranch || "bangalore");
  const [programme, setProgramme] = useState(initialProgramme || (mode === "membership" ? "MMA" : ""));
  const [preferredDate, setPreferredDate] = useState("");
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");
  const [notice, setNotice] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const todayDate = getLocalDateValue();
  const slots = useMemo(() => day ? getPublishedSlots(branchId, day, programme || "Not sure yet") : [], [branchId, day, programme]);
  const weekendRequest = day === "Saturday" || day === "Sunday";
  function changeBranch(value) { setBranchId(value); setPreferredDate(""); setDay(""); setSlot(""); setNotice(""); }
  function changeProgramme(value) { setProgramme(value); setPreferredDate(""); setDay(""); setSlot(""); setNotice(""); }
  function submit(event) {
    event.preventDefault();
    const branch = getBranch(branchId);
    if (mode === "membership") {
      const message = "Hello RMX Team! I'm interested in joining RMX MMA & Fitness Centre.\n\nPreferred Branch: " + branch.name + "\nTraining Interest: " + programme + (initialPlan ? "\nPreferred Membership: " + initialPlan : "") + "\n\nPlease share the available membership plans and details.\n\nThank you!";
      window.open(getWhatsAppLink(branchId, message), "_blank", "noopener,noreferrer");
      setNotice("Your membership enquiry is ready. Send the WhatsApp message and the RMX team will share the details.");
      return;
    }
    if (!preferredDate || preferredDate < todayDate || !day || getWeekdayFromDate(preferredDate) !== day || !slot) return;
    const formattedDate = formatDemoDate(preferredDate);
    const preferredTime = slot === "request" ? "Please suggest a suitable time for " + day + ", " + formattedDate : slot;
    const message = "Hello RMX Team! I would like to book a free demo session.\n\nName: " + name + "\nBranch: " + branch.name + "\nProgramme: " + programme + "\nPreferred Date: " + formattedDate + "\nPreferred Day: " + day + "\nPreferred Time: " + preferredTime + "\nContact Number: " + phone + "\n\nPlease confirm the availability of this session. Thank you!";
    window.open(getWhatsAppLink(branchId, message), "_blank", "noopener,noreferrer");
    setNotice("Your enquiry is ready. Send the WhatsApp message to complete your request. The RMX team will confirm availability.");
  }
  return <div className="booking-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button type="button" className="modal-close booking-close" onClick={onClose} aria-label="Close booking form"><X /></button><div className="booking-kicker">RMX MMA & FITNESS CENTRE</div><h2 id="booking-title">{mode === "membership" ? "ASK ABOUT MEMBERSHIP" : "BOOK A FREE DEMO"}</h2><p className="booking-intro">{mode === "membership" ? "Choose your branch and training interest. Your message will open in WhatsApp." : "Choose a branch, programme, preferred date and published training time. The team will confirm availability."}</p><form onSubmit={submit}>
    <label>Branch<select value={branchId} onChange={(event) => changeBranch(event.target.value)} required>{branches.map((branch) => <option value={branch.id} key={branch.id}>{branch.name}</option>)}</select></label>
    <label>Preferred training programme<select value={programme} onChange={(event) => changeProgramme(event.target.value)} required><option value="" disabled>Select a programme</option>{programmeOptions.map((option) => <option value={option} key={option}>{option}</option>)}</select></label>
    {mode !== "membership" && <>
      <div className="booking-date-row">
        <label>Preferred date<input type="date" value={preferredDate} min={todayDate} onChange={(event) => { const value = event.target.value; setPreferredDate(value); setDay(getWeekdayFromDate(value)); setSlot(""); setNotice(""); }} required /></label>
        <label>Preferred day<select value={day} onChange={(event) => { setDay(event.target.value); setPreferredDate(""); setSlot(""); setNotice(""); }} required><option value="">Select a day</option>{weeklySchedule.map((item) => <option value={item.day} key={item.day}>{item.day}</option>)}</select></label>
      </div>
      <label className="booking-wide-field">Preferred time slot<select value={slot} onChange={(event) => setSlot(event.target.value)} required disabled={!day}><option value="">{!day ? "Select a date and day first" : slots.length ? "Select a published time" : "No configured slot — enquire on WhatsApp"}</option>{slots.map((time) => <option key={time} value={time}>{time}</option>)}{day && !slots.length && <option value="request">Ask RMX to suggest a suitable time</option>}</select>{weekendRequest ? <small className="booking-help">Weekend time slots aren’t published. Send an availability request for this date; RMX will confirm a suitable session.</small> : day && !slots.length ? <small className="booking-help">There is no configured slot for this programme on this date. You can still ask RMX about availability.</small> : null}</label>
      <label>Full name<input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" /></label>
      <label>Contact phone number<input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required autoComplete="tel" /></label>
    </>}
    <button className="button button-red booking-submit" type="submit">{mode === "membership" ? "ENQUIRE ON WHATSAPP" : "CONTINUE TO WHATSAPP"} <MessageCircle size={16} /></button>
    {notice && <p className="booking-notice" role="status">{notice}</p>}
  </form></section></div>;
}

function MobileContactBar({ onBookDemo }) {
  return <div className="mobile-contact-bar"><a href="tel:+919886685644"><Phone size={15} />CALL NOW</a><button type="button" onClick={() => onBookDemo()}><CalendarDays size={15} />BOOK A FREE DEMO</button></div>;
}

export default function App() {
  const [booking, setBooking] = useState(null);
  const openBooking = (branchId = "", programme = "") => setBooking({ mode: "demo", branchId, programme });
  const openMembership = (programme = "", branchId = "", plan = "") => setBooking({ mode: "membership", branchId, programme, plan });
  useEffect(() => {
    const progress = document.querySelector("#scroll-progress");
    const tween = gsap.to(progress, { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.35 } });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return <>
    <Loader /><div id="scroll-progress" /><Header onBookDemo={openBooking} />
    <main><Hero onBookDemo={openBooking} /><Ticker /><About /><Programs onBookDemo={openBooking} /><Schedule /><DailyTimings /><Gallery /><Trainers onBookDemo={openBooking} /><Membership onAskMembership={openMembership} /><BMICalculator /><Contact onBookDemo={openBooking} onAskMembership={openMembership} /></main>
    <Footer onBookDemo={openBooking} onAskMembership={openMembership} /><MobileContactBar onBookDemo={openBooking} />
    <AnimatePresence>{booking && <BookingModal key={booking.mode + booking.plan} mode={booking.mode} initialBranch={booking.branchId} initialProgramme={booking.programme} initialPlan={booking.plan} onClose={() => setBooking(null)} />}</AnimatePresence>
  </>;
}
