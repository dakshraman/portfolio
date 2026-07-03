'use client';

const skills = [
  'Laravel', 'Flutter', 'React.js', 'Python', 'Dart', 'PHP', 'Firebase',
  'Java', 'C++', 'SQL', 'Linux', 'Cyber Security', 'Shopify', 'WordPress',
  'System Architecture', 'API Design'
];

export default function Skills() {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
          <div key={index} className="marquee-item">
            {skill} <span style={{ color: 'var(--text-secondary)' }}>•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
