const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generateResume(outputPath) {
  // Standard Letter / A4 size with 36pt (0.5 inch) margins for high density
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 32, bottom: 32, left: 36, right: 36 },
    info: {
      Title: 'Raman Daksh - Senior Software Engineer & System Architect Resume',
      Author: 'Raman Daksh',
      Subject: 'Software Engineer Resume - Laravel, Flutter, Go, Cloud',
      Keywords: 'Laravel, Flutter, Dart, PHP, Go, PostgreSQL, Redis, REST API, Full Stack, DevOps',
    }
  });

  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  const primaryColor = '#111827'; // Dark charcoal
  const secondaryColor = '#374151'; // Medium charcoal
  const accentColor = '#2563eb'; // Royal blue
  const mutedColor = '#6b7280'; // Slate grey
  const ruleColor = '#e5e7eb'; // Light hairline

  const pageWidth = 595.28;
  const marginX = 36;
  const contentWidth = pageWidth - marginX * 2; // 523.28pt

  function drawSectionHeader(title) {
    doc.moveDown(0.4);
    const y = doc.y;
    doc.fillColor(primaryColor)
       .font('Helvetica-Bold')
       .fontSize(10.5)
       .text(title.toUpperCase(), marginX, y, { characterSpacing: 1 });

    doc.moveTo(marginX, y + 13)
       .lineTo(marginX + contentWidth, y + 13)
       .lineWidth(0.75)
       .strokeColor(accentColor)
       .stroke();

    doc.y = y + 18;
  }

  // ==========================================
  // HEADER
  // ==========================================
  doc.fillColor(primaryColor)
     .font('Helvetica-Bold')
     .fontSize(22)
     .text('RAMAN DAKSH', { align: 'center', characterSpacing: 0.5 });

  doc.moveDown(0.15);
  doc.fillColor(accentColor)
     .font('Helvetica-Bold')
     .fontSize(10.5)
     .text('Senior Full-Stack Engineer & Mobile Architect', { align: 'center' });

  doc.moveDown(0.2);
  doc.fillColor(secondaryColor)
     .font('Helvetica')
     .fontSize(8.5);

  const contactLine = [
    { text: 'ramandaksh6161@gmail.com', link: 'mailto:ramandaksh6161@gmail.com' },
    { text: '+91 8958224019', link: 'tel:+918958224019' },
    { text: 'dakshraman.in', link: 'https://dakshraman.in' },
    { text: 'github.com/dakshraman', link: 'https://github.com/dakshraman' },
    { text: 'linkedin.com/in/dakshraman', link: 'https://linkedin.com/in/dakshraman' },
    { text: 'Dehradun, India' }
  ];

  let contactStr = '';
  contactLine.forEach((c, idx) => {
    contactStr += c.text + (idx < contactLine.length - 1 ? '  •  ' : '');
  });
  doc.text(contactStr, { align: 'center' });

  // ==========================================
  // PROFESSIONAL SUMMARY
  // ==========================================
  drawSectionHeader('Professional Summary');
  doc.fillColor(secondaryColor)
     .font('Helvetica')
     .fontSize(8.5)
     .lineGap(1.5)
     .text(
       'Senior Full-Stack Software Engineer with 4+ years of production experience architecting high-concurrency Laravel REST APIs, cross-platform Flutter applications, and lightweight Linux cloud infrastructure. Creator of CloudDeck (open-source cloud hosting control panel idling under 50MB RAM). Proven track record delivering 20+ production systems with 100% full-stack ownership across database design, real-time messaging, and App Store deployments.',
       { align: 'justify' }
     );

  // ==========================================
  // CORE TECHNICAL SKILLS (From GitHub & Production Stack)
  // ==========================================
  drawSectionHeader('Technical Skills');
  const skillsList = [
    { label: 'Languages & Core:', val: 'PHP 8.1–8.4, Dart, TypeScript, JavaScript (ES6+), Go (Golang), Python, Swift (Basics), C++, HTML5/CSS3' },
    { label: 'Frameworks & Libs:', val: 'Laravel 11, Flutter 3.x, Next.js, React, Vue.js, Inertia.js, Tailwind CSS, BLoC State Architecture' },
    { label: 'Databases & Cache:', val: 'PostgreSQL, PostGIS (Spatial), MySQL, MariaDB, Redis 7.2 (Cache & Pub/Sub), SQLite, Firebase' },
    { label: 'Architecture & APIs:', val: 'RESTful API Design, Microservices, WebSockets / Reverb, Sanctum & JWT Auth, Queue Workers (Horizon)' },
    { label: 'DevOps & Tooling:', val: 'Docker, Linux (Ubuntu/Debian), Nginx, Let\'s Encrypt TLS, PowerDNS, Git/GitHub, App Store Connect, Play Console' }
  ];

  skillsList.forEach(s => {
    const y = doc.y;
    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(8.5).text(s.label, marginX, y, { width: 110 });
    doc.fillColor(secondaryColor).font('Helvetica').fontSize(8.5).text(s.val, marginX + 115, y, { width: contentWidth - 115 });
    doc.y += 1.5;
  });

  // ==========================================
  // WORK EXPERIENCE (From LinkedIn & Production History)
  // ==========================================
  drawSectionHeader('Work Experience');

  const experiences = [
    {
      role: 'Laravel Developer / Full-Stack Engineer',
      company: 'InsideSoftwares',
      period: '2025 – Present',
      location: 'Remote',
      bullets: [
        'Architect and ship production Laravel applications from concept to deployment, ensuring sub-50ms P99 API response latencies.',
        'Engineer scalable relational schemas in PostgreSQL/MySQL with eager-loaded Eloquent queries, Redis caching, and automated queue jobs.',
        'Collaborate directly with cross-functional teams to integrate secure authentication (Sanctum/JWT), payment gateways, and third-party APIs.'
      ]
    },
    {
      role: 'Full Stack Laravel Developer',
      company: 'AK Software Solutions',
      period: '2025 – 2025',
      location: 'Dehradun, India',
      bullets: [
        'Led end-to-end full-stack delivery for commercial web applications, database schema modeling, and production cloud deployments.',
        'Engineered responsive user interfaces using Vue.js and Tailwind CSS integrated seamlessly with high-throughput Laravel backends.',
        'Configured hardened Linux VPS server environments with Nginx reverse proxy, automated Let\'s Encrypt SSL, and scheduled backups.'
      ]
    },
    {
      role: 'API Developer (Laravel & Flutter) / Technology Executive',
      company: 'Pearl Organisation',
      period: '2024 – 2025',
      location: 'Dehradun, India',
      bullets: [
        'Architected and maintained RESTful APIs powering cross-platform Flutter applications serving 5,000+ daily active international users.',
        'Engineered real-time chat, push notification pipelines via Firebase Cloud Messaging, and optimized spatial queries for location services.',
        'Collaborated with mobile engineers to enforce strict OpenAPI payload contracts, offline-first SQLite caching, and zero jank rendering.'
      ]
    },
    {
      role: 'Reputation & Technical Data Operations',
      company: 'Zenvista Meditech Pvt. Ltd.',
      period: '2022 – 2022',
      location: 'Rudrapur, India',
      bullets: [
        'Drove digital presence, analytics tracking, and online reputation strategy — increasing client organic engagement by 40% across campaigns.'
      ]
    }
  ];

  experiences.forEach((exp, idx) => {
    const y = doc.y;
    // Line 1: Role (Bold) & Period (Right-aligned)
    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9).text(exp.role, marginX, y);
    doc.fillColor(mutedColor).font('Helvetica-Bold').fontSize(8.5).text(exp.period, marginX, y, { align: 'right' });

    // Line 2: Company (Italic/Accent) & Location (Right-aligned)
    const y2 = doc.y + 0.5;
    doc.fillColor(accentColor).font('Helvetica-Oblique').fontSize(8.5).text(exp.company, marginX, y2);
    doc.fillColor(mutedColor).font('Helvetica').fontSize(8).text(exp.location, marginX, y2, { align: 'right' });

    doc.moveDown(0.2);

    // Bullets
    exp.bullets.forEach(b => {
      const by = doc.y;
      doc.fillColor(accentColor).font('Helvetica-Bold').fontSize(8.5).text('•', marginX + 4, by);
      doc.fillColor(secondaryColor).font('Helvetica').fontSize(8).lineGap(1).text(b, marginX + 14, by, { width: contentWidth - 14 });
      doc.y += 0.5;
    });

    if (idx < experiences.length - 1) doc.moveDown(0.25);
  });

  // ==========================================
  // FEATURED OPEN-SOURCE & FLAGSHIP PROJECTS (From GitHub)
  // ==========================================
  drawSectionHeader('Featured Flagships & GitHub Projects');

  const projects = [
    {
      name: 'CloudDeck — Self-Hosted Linux Cloud Hosting Control Panel',
      stack: 'Go (Golang), Next.js, TypeScript, Linux Daemons, Docker, PowerDNS, MariaDB',
      link: 'clouddeck.dakshraman.in | github.com/dakshraman/clouddeck',
      desc: 'Architected an open-source cPanel alternative featuring a lightweight Go background daemon idling under 50MB RAM. Manages multi-PHP (8.1–8.4) FPM sockets, automated Let\'s Encrypt TLS certificates, MariaDB databases, Postfix/Dovecot email, and PowerDNS.'
    },
    {
      name: 'Borrow Nearby — Hyperlocal Peer-to-Peer Mobile Marketplace',
      stack: 'Flutter, Dart, Laravel, PostgreSQL, PostGIS, WebSockets, Firebase',
      link: 'borrownearby.in (iOS & Android)',
      desc: 'Live cross-platform mobile community lending platform. Implemented sub-50ms PostGIS spatial queries for equipment discovery within custom radiuses, real-time WebSocket chat, and secure peer-to-peer escrow mechanisms.'
    },
    {
      name: 'Devkit — Zero-Dependency TypeScript Utility Runtime SDK',
      stack: 'TypeScript, ECMAScript Modules, Web Crypto API, Bun/Node',
      link: 'devkit.dakshraman.in | github.com/dakshraman/devkit',
      desc: 'Engineered a battle-tested, zero-external-dependency TypeScript toolkit (1.4KB gzipped) for token generation, payload validation, and HTTP contract generation with 100% strict type safety and zero CVE vulnerability risks.'
    },
    {
      name: 'Advanced School ERP / EduAI — Enterprise Campus SaaS Platform',
      stack: 'Laravel 11, PostgreSQL, Inertia.js, React, Tailwind CSS, RBAC',
      link: 'erp-web-lctn.onrender.com | github.com/dakshraman/eduai',
      desc: 'Comprehensive multi-tenant campus management ERP managing admissions, online payment gateway reconciliation, automated gradebook generation, and payroll for 500+ active campus members across 5-role RBAC permissions.'
    }
  ];

  projects.forEach((proj, idx) => {
    const y = doc.y;
    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(8.5).text(proj.name, marginX, y);
    doc.fillColor(accentColor).font('Helvetica-Oblique').fontSize(7.5).text(proj.link, marginX, y, { align: 'right' });

    const y2 = doc.y + 0.5;
    doc.fillColor(mutedColor).font('Helvetica').fontSize(7.5).text(`Tech Stack: ${proj.stack}`, marginX, y2);

    doc.moveDown(0.15);
    doc.fillColor(secondaryColor).font('Helvetica').fontSize(8).lineGap(1).text(proj.desc, marginX + 8, doc.y, { width: contentWidth - 8 });

    if (idx < projects.length - 1) doc.moveDown(0.2);
  });

  // ==========================================
  // EDUCATION & CREDENTIALS
  // ==========================================
  drawSectionHeader('Education & Certifications');

  const eduY = doc.y;
  doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(8.5).text('Master of Computer Applications (MCA)', marginX, eduY);
  doc.fillColor(mutedColor).font('Helvetica').fontSize(8).text('2022 – 2024  •  Dehradun, India', marginX, eduY, { align: 'right' });
  doc.fillColor(secondaryColor).font('Helvetica-Oblique').fontSize(8).text('Uttaranchal University (IT Software Development Utsav Awardee)', marginX, doc.y);

  doc.moveDown(0.2);
  const edu2Y = doc.y;
  doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(8.5).text('Bachelor of Computer Applications (BCA)', marginX, edu2Y);
  doc.fillColor(mutedColor).font('Helvetica').fontSize(8).text('2019 – 2022  •  Rudrapur, India', marginX, edu2Y, { align: 'right' });
  doc.fillColor(secondaryColor).font('Helvetica-Oblique').fontSize(8).text('Kumaun University', marginX, doc.y);

  doc.moveDown(0.3);
  doc.fillColor(mutedColor).font('Helvetica').fontSize(7.5).text(
    'Certifications: Flutter & Dart Mobile Architecture  •  Python Specialization (Google)  •  ServiceNow Certified Associate',
    marginX,
    doc.y,
    { align: 'center' }
  );

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
}

const targetPath = path.join(__dirname, '../public/Raman-Daksh.pdf');
generateResume(targetPath)
  .then(() => {
    console.log('Successfully generated resume PDF at:', targetPath);
  })
  .catch(err => {
    console.error('Failed to generate resume:', err);
    process.exit(1);
  });
