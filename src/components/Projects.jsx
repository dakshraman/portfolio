import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Sewa Foundation',
    description: 'Online Courses application for android and ios with live streaming and recorded lectures.',
    tags: ['Flutter', 'Android', 'iOS']
  },
  {
    title: 'Apnademand',
    description: 'e-commerce website and application. Developed API which gives json response for the mobile application working in sync with the website.',
    tags: ['API Development', 'E-commerce']
  },
  {
    title: 'Medzzi - Mobile Application',
    description: 'Doctor and Patient Application, to book appointments online as well as offline. Backend Developer.',
    tags: ['Laravel', 'Backend']
  },
  {
    title: 'Real Estate Application',
    description: 'Backend Developer for Real Estate Application.',
    tags: ['Laravel', 'Backend']
  },
  {
    title: 'Messager - Android Application',
    description: 'A basic chatting application to chat with any user on the application, you can share images as well.',
    tags: ['Flutter', 'Firebase']
  },
  {
    title: 'Weather Web Application',
    description: 'Simple weather web applications to view weather details using openweather api.',
    tags: ['Web', 'API']
  },
  {
    title: 'Gogoa',
    description: 'Reverse ecommerce application for ios and android. Full Stack Developer.',
    tags: ['Flutter', 'Firebase', 'Laravel']
  },
  {
    title: 'School ERP',
    description: 'Complex school ERP customizable for any type of school with messaging, online payments, payroll, and academics.',
    tags: ['ERP', 'Full Stack']
  }
];

const Projects = () => {
  return (
    <section id="projects">
      <h2>Featured Projects</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent)' }}>{project.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.6' }}>
              {project.description}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.tags.map((tag, i) => (
                <span key={i} style={{ fontSize: '0.85rem', padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
