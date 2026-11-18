const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generateResume(outputPath) {
  // A4 size: 595.28 x 841.89 points
  // 36pt (0.5 in) margins leaves 523.28pt content width, 769.89pt content height
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 32, bottom: 32, left: 36, right: 36 },
    info: {
      Title: 'Raman Daksh - Resume',
      Author: 'Raman Daksh',
      Subject: 'Software Engineer Resume',
      Keywords: 'Software Engineer, Laravel, Flutter, Dart, PHP, Go, PostgreSQL, Redis, REST APIs, Full Stack',
    }
  });

  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  const black = '#000000';
  const textDark = '#1a1a1a';
  const textMuted = '#333333';
  const ruleColor = '#000000';

  const marginX = 36;
  const contentWidth = 595.28 - marginX * 2; // 523.28pt

  function drawSectionHeader(title) {
    doc.moveDown(0.35);
    const y = doc.y;
    doc.fillColor(black)
       .font('Helvetica-Bold')
       .fontSize(10.5)
       .text(title.toUpperCase(), marginX, y, { characterSpacing: 0.8 });

    // Solid black horizontal line spanning full width (Jake's Resume / LaTeX style)
    doc.moveTo(marginX, y + 12.5)
       .lineTo(marginX + contentWidth, y + 12.5)
       .lineWidth(0.6)
       .strokeColor(ruleColor)
       .stroke();

    doc.y = y + 16.5;
  }

  // ==========================================
  // HEADER (Classic Centered Minimal LaTeX Style)
  // ==========================================
  doc.fillColor(black)
     .font('Helvetica-Bold')
     .fontSize(22)
     .text('RAMAN DAKSH', { align: 'center', characterSpacing: 1 });

  doc.moveDown(0.15);
  doc.fillColor(textDark)
     .font('Helvetica')
     .fontSize(8.5);

  const contactText = '+91 8958224019   |   ramandaksh6161@gmail.com   |   linkedin.com/in/dakshraman   |   github.com/dakshraman   |   dakshraman.in';
  doc.text(contactText, { align: 'center' });

  // ==========================================
  // TECHNICAL SKILLS (NO versions, cleanly categorized)
  // ==========================================
  drawSectionHeader('Technical Skills');

  const skillsData = [
    { cat: 'Languages:', items: 'PHP, Dart, TypeScript, JavaScript, Go, Python, C++, SQL, HTML/CSS' },
    { cat: 'Frameworks & Libraries:', items: 'Laravel, Flutter, Next.js, React, Vue.js, Inertia.js, Tailwind CSS, BLoC' },
    { cat: 'Databases & Storage:', items: 'PostgreSQL, MySQL, MariaDB, PostGIS, Redis, SQLite, Firebase' },
    { cat: 'DevOps & Infrastructure:', items: 'Docker, Linux, Nginx, Git, GitHub Actions, CI/CD, PowerDNS, Let\'s Encrypt' },
    { cat: 'Architecture & Design:', items: 'RESTful APIs, WebSockets, Microservices, Authentication (JWT/Sanctum), Queue Workers' },
  ];

  skillsData.forEach(s => {
    const y = doc.y;
    doc.fillColor(black).font('Helvetica-Bold').fontSize(8.5).text(s.cat, marginX, y, { width: 130 });
    doc.fillColor(textDark).font('Helvetica').fontSize(8.5).text(s.items, marginX + 132, y, { width: contentWidth - 132 });
    doc.y += 1.2;
  });

  // ==========================================
  // WORK EXPERIENCE (LinkedIn Synchronized, Google XYZ Format)
  // ==========================================
  drawSectionHeader('Experience');

  const experiences = [
    {
      company: 'InsideSoftwares',
      location: 'Remote',
      role: 'Laravel Developer / Full-Stack Engineer',
      period: 'June 2025 – Present',
      bullets: [
        'Architect and deploy high-concurrency Laravel backend APIs and microservices, ensuring sub-50ms P99 API response latencies.',
        'Engineer scalable relational database schemas in PostgreSQL with eager-loaded Eloquent queries, Redis caching, and automated queue jobs.',
        'Integrate secure Sanctum/JWT token authentication, automated webhooks, payment gateways, and third-party partner APIs.'
      ]
    },
    {
      company: 'AK Software Solutions',
      location: 'Dehradun, India',
      role: 'Full Stack Laravel Developer',
      period: 'Jan 2025 – June 2025',
      bullets: [
        'Led end-to-end full-stack development for client web applications using Laravel, MySQL, and Vue.js with 99.9% production uptime.',
        'Designed modular database migrations, optimized indexing on relational tables, and implemented role-based access control (RBAC).',
        'Configured hardened Linux VPS server environments with Nginx reverse proxy, automated Let\'s Encrypt SSL, and scheduled cron jobs.'
      ]
    },
    {
      company: 'Pearl Organisation',
      location: 'Dehradun, India',
      role: 'API Developer (Laravel & Flutter) / Technology Executive',
      period: 'May 2024 – May 2025',
      bullets: [
        'Architected and maintained RESTful APIs powering cross-platform Flutter applications serving 5,000+ daily active international users.',
        'Engineered real-time chat infrastructure, push notification pipelines via Firebase Cloud Messaging, and optimized spatial queries for geolocation.',
        'Collaborated closely with mobile engineers to enforce strict OpenAPI payload contracts, offline-first SQLite caching, and fluid 60 FPS UI.'
      ]
    },
    {
      company: 'Zenvista Meditech Pvt. Ltd.',
      location: 'Rudrapur, India',
      role: 'Technical Operations & Reputation Specialist',
      period: 'May 2022 – Oct 2022',
      bullets: [
        'Managed digital presence analytics, technical data tracking, and search visibility — increasing client organic engagement by 40%.'
      ]
    }
  ];

  experiences.forEach((exp, idx) => {
    const y1 = doc.y;
    // Line 1: Company (Bold) on left, Location on right
    doc.fillColor(black).font('Helvetica-Bold').fontSize(9).text(exp.company, marginX, y1);
    doc.fillColor(textMuted).font('Helvetica').fontSize(8.5).text(exp.location, marginX, y1, { align: 'right' });

    // Line 2: Role (Italic) on left, Period on right
    const y2 = doc.y + 0.5;
    doc.fillColor(textDark).font('Helvetica-Oblique').fontSize(8.5).text(exp.role, marginX, y2);
    doc.fillColor(textMuted).font('Helvetica-Oblique').fontSize(8).text(exp.period, marginX, y2, { align: 'right' });

    doc.moveDown(0.18);

    // Bullet points with tight, professional indentation
    exp.bullets.forEach(b => {
      const by = doc.y;
      doc.fillColor(black).font('Helvetica').fontSize(8.5).text('•', marginX + 6, by);
      doc.fillColor(textDark).font('Helvetica').fontSize(8).lineGap(1).text(b, marginX + 16, by, { width: contentWidth - 16 });
      doc.y += 0.8;
    });

    if (idx < experiences.length - 1) doc.moveDown(0.2);
  });

  // ==========================================
  // PROJECTS (GitHub & Flagships, NO versions)
  // ==========================================
  drawSectionHeader('Projects');

  const projects = [
    {
      name: 'CloudDeck — Linux Hosting Control Panel',
      tools: 'Go, Next.js, TypeScript, Linux Daemons, Docker, MariaDB, PowerDNS',
      linkText: 'clouddeck.dakshraman.in | github.com/dakshraman/clouddeck',
      linkUrl: 'https://clouddeck.dakshraman.in',
      bullets: [
        'Architected an open-source cPanel alternative featuring a compiled Go background daemon idling under 50MB RAM vs. 1GB+ standard.',
        'Engineered daemon managing multi-PHP FPM sockets, automated Let\'s Encrypt TLS issuance, MariaDB, Postfix/Dovecot email, and PowerDNS.'
      ]
    },
    {
      name: 'Borrow Nearby — Peer-to-Peer Mobile Marketplace',
      tools: 'Flutter, Dart, Laravel, PostgreSQL, PostGIS, WebSockets, Firebase',
      linkText: 'borrownearby.in (iOS & Android)',
      linkUrl: 'https://borrownearby.in',
      bullets: [
        'Developed a cross-platform mobile community sharing platform deployed to production on iOS and Android.',
        'Implemented sub-50ms PostGIS spatial indexing for equipment discovery within custom radiuses, real-time WebSocket chat, and escrow protections.'
      ]
    },
    {
      name: 'Devkit — Zero-Dependency TypeScript Runtime SDK',
      tools: 'TypeScript, ECMAScript Modules, Web Crypto API, Bun/Node',
      linkText: 'devkit.dakshraman.in | github.com/dakshraman/devkit',
      linkUrl: 'https://devkit.dakshraman.in',
      bullets: [
        'Engineered a zero-external-dependency TypeScript toolkit (1.4KB gzipped) for token generation, payload validation, and HTTP contracts.',
        'Guaranteed zero CVE dependency vulnerabilities with 100% strict type safety across Node, Bun, and Cloudflare Workers runtimes.'
      ]
    },
    {
      name: 'Advanced School ERP — Enterprise Campus Management Platform',
      tools: 'Laravel, PostgreSQL, Inertia.js, React, Tailwind CSS, RBAC',
      linkText: 'erp-web-lctn.onrender.com | github.com/dakshraman/eduai',
      linkUrl: 'https://erp-web-lctn.onrender.com/',
      bullets: [
        'Built comprehensive campus management SaaS managing student admissions, automated gradebooks, and staff payroll for 500+ active users.',
        'Integrated automated online fee gateway reconciliation and granular 5-role RBAC permissions for administration, teachers, and parents.'
      ]
    }
  ];

  projects.forEach((proj, idx) => {
    const py = doc.y;
    // Project title (Bold) | Tech (Italic) on left, links on right
    doc.fillColor(black).font('Helvetica-Bold').fontSize(8.5).text(proj.name, marginX, py, { continued: true });
    doc.fillColor(textMuted).font('Helvetica').fontSize(8).text(`  |  ${proj.tools}`);
    doc.fillColor(textMuted).font('Helvetica-Oblique').fontSize(7.5).text(proj.linkText, marginX, py, { align: 'right' });

    doc.moveDown(0.12);

    proj.bullets.forEach(b => {
      const by = doc.y;
      doc.fillColor(black).font('Helvetica').fontSize(8.5).text('•', marginX + 6, by);
      doc.fillColor(textDark).font('Helvetica').fontSize(8).lineGap(1).text(b, marginX + 16, by, { width: contentWidth - 16 });
      doc.y += 0.6;
    });

    if (idx < projects.length - 1) doc.moveDown(0.15);
  });

  // ==========================================
  // EDUCATION
  // ==========================================
  drawSectionHeader('Education');

  const eduItems = [
    {
      school: 'Uttaranchal University',
      location: 'Dehradun, India',
      degree: 'Master of Computer Applications (MCA) — Computer Science & Software Engineering',
      period: '2022 – 2024'
    },
    {
      school: 'Kumaun University',
      location: 'Rudrapur, India',
      degree: 'Bachelor of Computer Applications (BCA)',
      period: '2019 – 2022'
    }
  ];

  eduItems.forEach((edu, idx) => {
    const ey = doc.y;
    doc.fillColor(black).font('Helvetica-Bold').fontSize(8.5).text(edu.school, marginX, ey);
    doc.fillColor(textMuted).font('Helvetica').fontSize(8).text(edu.location, marginX, ey, { align: 'right' });

    const ey2 = doc.y + 0.5;
    doc.fillColor(textDark).font('Helvetica-Oblique').fontSize(8).text(edu.degree, marginX, ey2);
    doc.fillColor(textMuted).font('Helvetica-Oblique').fontSize(8).text(edu.period, marginX, ey2, { align: 'right' });

    if (idx < eduItems.length - 1) doc.moveDown(0.2);
  });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
}

const targetPath = path.join(__dirname, '../public/Raman-Daksh.pdf');
generateResume(targetPath)
  .then(() => {
    console.log('Successfully generated professional Jake\'s Resume standard PDF at:', targetPath);
  })
  .catch(err => {
    console.error('Failed to generate resume:', err);
    process.exit(1);
  });
