export const site = {
  name: "RMX MMA & Fitness Centre",
  coach: "Roshan Mainam",
  logo: "/assets/rmx logo png.PNG",
  heroVideo: "/assets/TRAIN LIKE A FIGHTER.mp4",
  heroPoster: "",
  email: "rmxmmaofficial@gmail.com",
};

export const branches = [
  {
    id: "bangalore",
    name: "Bangalore",
    phone: "+91 98866 85644",
    whatsapp: "919886685644",
    maps: "https://maps.app.goo.gl/kQfU3y6MJawuFF6m7",
    instagram: "https://www.instagram.com/rmx_mma_official?srtk=MXFwdzBhbWR3Y2pkZg%3D%3D&utm_source=qr",
  },
  {
    id: "manipur",
    name: "Manipur",
    phone: "+91 60097 89938",
    whatsapp: "916009789938",
    maps: "https://maps.app.goo.gl/uffSUGFp4nyygq6S9",
    instagram: "https://www.instagram.com/rmx_mma_manipur?dlrf=MWtlcDNpcXVtd29iNg==",
  },
];

export const programs = [
  { name: "MMA", type: "Combat", text: "Connect striking, wrestling and ground work into one adaptable game.", image: "/assets/MMA.jpg", alt: "MMA athletes competing on the mat", icon: "MMA" },
  { name: "Boxing", type: "Striking", text: "Build sharp hands, footwork, timing and composure under pressure.", image: "/assets/BOXING.jpg", alt: "Two fighters exchanging punches in the ring", icon: "BX" },
  { name: "Kickboxing", type: "Striking", text: "Combine punches and kicks with balance, pace and precision.", image: "/assets/KICKBOXING.jpg", alt: "Kickboxers sparring inside the cage", icon: "KB" },
  { name: "Muay Thai", type: "Striking", text: "Develop the full striking toolkit through authentic technique and drills.", image: "/assets/MUAY THAI (2).jpg", alt: "Muay Thai fighter landing a kick during a bout", icon: "MT" },
  { name: "Wrestling", type: "Grappling", text: "Work on stance, takedowns, control and resilient movement.", image: "/assets/WRESTLING.jpg", alt: "Wrestler working a takedown in the ring", icon: "WR" },
  { name: "Brazilian Jiu-Jitsu", type: "Grappling", text: "Learn positional control, escapes and submissions step by step.", image: "/assets/BJJ.jpg", alt: "Ground fighter applying a submission hold", icon: "BJJ" },
  { name: "Grappling", type: "Grappling", text: "Practice transitions, pins and submissions with a training partner.", image: "/assets/GRAPPLING.jpg", alt: "Grappling exchange on the canvas", icon: "GR" },
  { name: "Strength & Conditioning", type: "Performance", text: "Build the strength, stamina and repeatable output your training needs.", image: "/assets/STRENGTH AND CONDI.jpg", alt: "RMX athletes working through a strength and conditioning session", icon: "S&C" },
  { name: "Functional Fitness", type: "Performance", text: "Train useful movement patterns, stability and full-body capacity.", image: "/assets/funtioonal fitness 2.png", alt: "RMX athletes training together during a functional fitness class", icon: "FF" },
  { name: "Athlete Training", type: "Performance", text: "A focused training environment for athletes who want to develop.", image: "/assets/at .PNG", alt: "Athlete training outdoors on a running course", icon: "AT" },
  { name: "Personal Training", type: "Coaching", text: "Get individual attention around your goals, experience and pace.", image: "/assets/personal training.png", alt: "Student practising a kick with a personal coach", icon: "PT" },
  { name: "Weight Loss Transformation", type: "Lifestyle", text: "Build sustainable habits through movement, coaching and consistency.", image: "/assets/weight loss.png", alt: "Student working on boxing fitness with a coach", icon: "WT" },
];

export const weeklySchedule = [
  { day: "Monday", classes: ["Boxing", "Kickboxing"] },
  { day: "Tuesday", classes: ["Brazilian Jiu-Jitsu", "Wrestling"] },
  { day: "Wednesday", classes: ["Muay Thai"] },
  { day: "Thursday", classes: ["MMA", "Grappling"] },
  { day: "Friday", classes: ["Sparring", "Strength & Conditioning"] },
  { day: "Saturday", classes: ["Open Mat"] },
  { day: "Sunday", classes: ["Outdoor Training", "Open Mat"] },
];

const weekdayDemoSlots = [
  "6:30 AM – 7:30 AM",
  "7:30 AM – 8:30 AM",
  "5:30 PM – 6:30 PM",
  "6:30 PM – 7:30 PM",
  "7:30 PM – 8:30 PM",
];

// Keep each branch editable on its own. The weekday slots come from the
// supplied booking brief; weekend hours were not published, so those stay empty.
export const bookingSchedules = {
  bangalore: {
    Monday: [...weekdayDemoSlots],
    Tuesday: [...weekdayDemoSlots],
    Wednesday: [...weekdayDemoSlots],
    Thursday: [...weekdayDemoSlots],
    Friday: [...weekdayDemoSlots],
    Saturday: [],
    Sunday: [],
  },
  manipur: {
    Monday: [...weekdayDemoSlots],
    Tuesday: [...weekdayDemoSlots],
    Wednesday: [...weekdayDemoSlots],
    Thursday: [...weekdayDemoSlots],
    Friday: [...weekdayDemoSlots],
    Saturday: [],
    Sunday: [],
  },
};

export const galleryItems = [
  { title: "The work", tag: "Training floor", mediaType: "image", image: "/assets/gym floor 1.png", alt: "RMX training gloves on the gym floor", size: "tall" },
  { title: "Stay sharp", tag: "Striking", mediaType: "image", image: "/assets/stay sharp.jpg", alt: "RMX members sharpening their skills during class", size: "wide" },
  { title: "Built together", tag: "Community", mediaType: "image", image: "/assets/cm.PNG", alt: "RMX athletes spending time together after training", size: "normal" },
  { title: "Thang-Ta — movement, find your rhythm", tag: "Thang-Ta", mediaType: "video", video: "/assets/thang ta.mov", alt: "Thang-Ta movement training at RMX", size: "normal" },
  { title: "SOUL HEALING", tag: "Wellbeing", copy: "Martial arts creates space to manage stress, steady the mind and build confidence through a supportive practice.", mediaType: "image", image: "/assets/sh.png", alt: "RMX students resting during a soul healing session", size: "normal" },
  { title: "TEAM WORK", tag: "Community", copy: "We learn side by side, support one another and grow stronger through shared discipline and respect.", mediaType: "image", image: "/assets/team work.png", alt: "RMX teammates sharing a moment of support and connection", size: "normal" },
];

// Populate only with reviews that can be verified against RMX's Google listing.
export const googleReviews = [
  { image: "/assets/review 1.png", alt: "Google review screenshot with five-star feedback from keVin, Dhnhs Shty and Appu Gyadi" },
  { image: "/assets/review 2.png", alt: "Google review screenshot with five-star feedback from Rithin Benny" },
  { image: "/assets/review 3.png", alt: "Google review screenshot with five-star feedback from Anzar Malik and Soumya Vs" },
  { image: "/assets/review 4.png", alt: "Google review screenshot with five-star feedback from Athul raveendran, Pankoj Sil and Anaswar Aravind" },
  { image: "/assets/review 5.png", alt: "Google review screenshot with five-star feedback from Chime Chuntso, saurabh dwivedi and Navadeepth N" },
];
export const googleReviewsUrl = "https://share.google/uIaW41TYzXerVCZn7";

export const membershipPlans = [
  { name: "Monthly", marker: "01", description: "A flexible start to build a steady training rhythm.", features: ["Unlimited general classes", "Access to professional fighter sessions", "Athlete-level training environment"] },
  { name: "Quarterly", marker: "02", description: "A longer runway to practise, adapt and keep progressing.", features: ["Unlimited general classes", "Access to professional fighter sessions", "Athlete-level training environment"] },
  { name: "Annual", marker: "03", description: "Make training a lasting part of the way you live.", features: ["Unlimited general classes", "Access to professional fighter sessions", "Athlete-level training environment"] },
  { name: "Elite Athlete", marker: "04", description: "A focused package for athletes pursuing performance goals.", features: ["Athlete-focused training", "Coach-led performance development", "Membership details on enquiry"] },
];

export const programmeOptions = [...programs.map(({ name }) => name), "Thang-Ta", "Not sure yet"];

export const programmeScheduleNames = {
  "Brazilian Jiu-Jitsu": "Brazilian Jiu-Jitsu",
  "Strength & Conditioning": "Strength & Conditioning",
  "Not sure yet": null,
};
