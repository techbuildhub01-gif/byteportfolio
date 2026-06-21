// ───────────────────────────────────────────────────────────────
//  Edit everything about your portfolio from this one file.
// ───────────────────────────────────────────────────────────────

export const profile = {
  name: "Sheikh Farjad Ahmed",
  brand: "Sheikh Farjad", // shown as <brand/> in the navbar & footer logo
  photo: "/profile.jpeg", // save your photo at public/profile.jpg (or change ext). Empty/missing → shows your initials instead.
  // hero headline — one line per array item (the LAST line gets the gradient)
  headline: ["I build web apps", "and software —", "from idea to deployment."],
  role: "Web Developer",
  tagline:
    "A developer who enjoys turning ideas into clean, working products — from the first interface to the final deploy.",
  location: "Karachi, PK",
  status: "Available for work",
  email: "techbuildhub01@gmail.com",
  resumeUrl: "Resume.pdf", // put resume.pdf in public/ then set this to "/resume.pdf" (or paste a Drive/online link). The Résumé button appears once this isn't "#".
  socials: {
    github: "https://github.com/techbuildhub01-gif",
    linkedin: "#", // paste your LinkedIn URL (icon stays hidden until you do)
    twitter: "#", // paste your X / Twitter URL (icon stays hidden until you do)
  },
};

// ── Contact form ──────────────────────────────────────────────
// Get a FREE access key from https://web3forms.com — just type your email,
// no signup needed. Paste it below and the contact form sends messages
// straight to that inbox. Leave it as-is and the form falls back to opening
// the visitor's mail app instead.
export const web3formsKey = "1d65bfda-929a-406a-8f30-65df315c060e";

export const stats = [
  // placeholder metrics — change these to your real numbers
  { value: "2+", label: "projects built" },
  { value: "CS", label: "student @ Sir Syed" },
  { value: "PK", label: "based in Karachi" },
];

export const about = {
  // each string is a paragraph
  paragraphs: [
    "I'm a Computer Science student at Sir Syed University of Engineering & Technology and an aspiring software engineer who enjoys turning ideas into functional products. From designing user interfaces to developing backend systems and deploying applications, I love building complete solutions while continuously learning new technologies and industry-standard development practices.",
    "I enjoy developing web applications and automation tools, especially projects that combine clean user interfaces with efficient backend systems. Currently, I'm learning advanced full-stack development concepts and improving my problem-solving skills through practical software projects.",
  ],
  // a short "build log" of facts — read top to bottom
  log: [
    { k: "now", v: "CS student @ Sir Syed University, Karachi" },
    { k: "building", v: "Web apps & desktop software" },
    { k: "stack", v: "Next.js · React · JavaScript · C++" },
    { k: "status", v: "Open to work & internships" },
  ],
};

export const skills = [
  // edit freely — these reflect your current stack
  {
    group: "Frontend",
    items: ["React", "Next.js", "JavaScript", "HTML", "CSS", "Tailwind"],
  },
  {
    group: "Languages",
    items: ["C++", "C# / .NET", "JavaScript", "Data Structures"],
  },
  {
    group: "Tools",
    items: ["Git & GitHub", "Vercel", "VS Code", "Windows Forms"],
  },
  {
    group: "Currently",
    items: ["Full-stack development", "Problem solving", "Shipping real projects"],
  },
];

export const projects = [
  {
    name: "Grocery Store",
    role: "Frontend Developer",
    blurb:
      "An e-commerce grocery web app with product browsing, categories, cart and wishlist, built with a clean, responsive Next.js front-end.",
    tags: ["Next.js", "React", "JavaScript"],
    year: "2026",
    image: "/grocery.jpg", // put the image file in public/grocery.jpg
    live: "https://grocery-store-app-01.vercel.app/",
    code: "#", // paste the GitHub repo URL here to show a "Code" link
    featured: true,
  },
  {
    name: "DSA Project",
    role: "Developer",
    blurb:
      "A C++ desktop application built for my university Data Structures course, using a Windows Forms interface. It features a simple arithmetic calculator and a Zakat calculator.",
    tags: ["C++", "Windows Forms", ".NET"],
    year: "2024",
    image: "/dsa.png", // put the image file in public/dsa.png
    live: "#", // desktop app — no live demo
    code: "https://github.com/techbuildhub01-gif/DSA-PROJECT",
    featured: true,
  },
  {
    name: "DriveWith",
    role: "Frontend Developer",
    blurb:
      "A ride-hailing and delivery app prototype inspired by inDrive and Bykea, where riders propose their own fare and drivers accept or counter in real time. Features rider and driver modes, live map tracking, and a driver earnings dashboard.",
    tags: ["React", "Vite", "JavaScript"],
    year: "2026",
    image: "/drivewith.jpg", // take a screenshot of the running app and save it as public/drivewith.jpg
    live: "https://drivewith.vercel.app/", // paste your Vercel live URL here once deployed
    code: "https://github.com/techbuildhub01-gif/drivewith",
    featured: true,
  },
  {
    name: "Library Management System",
    role: "Developer",
    blurb:
      "A desktop Library Management System built in C# with Windows Forms and a MySQL database. Features secure login, a dashboard, and full management of books, authors, genres, members, and book circulation (issue and return).",
    tags: ["C#", "Windows Forms", "MySQL"],
    year: "2025",
    image: "/library.png", // add a screenshot of the app and save it as public/library.png
    live: "#", // desktop app — no live demo
    code: "https://github.com/techbuildhub01-gif/Library-Management-System", // <-- apne account ka ASLI repo URL daalna (jo naam push karte waqt diya tha)
    featured: true,
  },
];

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];