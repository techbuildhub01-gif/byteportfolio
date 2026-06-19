// ───────────────────────────────────────────────────────────────
//  Edit everything about your portfolio from this one file.
// ───────────────────────────────────────────────────────────────

export const profile = {
  name: "Sheikh Farjad Ahmed",
  brand: "farjad", // shown as <brand/> in the navbar & footer logo
  photo: "/profile.jpeg", // save your photo at public/profile.jpg (or change ext). Empty/missing → shows your initials instead.
  // hero headline — one line per array item (the LAST line gets the gradient)
  headline: ["I build web apps", "and software —", "from idea to deployment."],
  role: "Web Developer",
  tagline:
    "A developer who enjoys turning ideas into clean, working products — from the first interface to the final deploy.",
  location: "Karachi, PK",
  status: "Available for work",
  email: "techbuildhub01@gmail.com",
  resumeUrl: "/Resume.pdf", // link your résumé PDF here to make the Résumé button appear
  socials: {
    github: "https://github.com/techbuildhub01-gif",
    linkedin: "#", // paste your LinkedIn URL (icon stays hidden until you do)
    twitter: "#", // paste your X / Twitter URL (icon stays hidden until you do)
  },
};

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
];

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];
