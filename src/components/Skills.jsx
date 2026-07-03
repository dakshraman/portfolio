import { motion } from 'framer-motion';

const skills = [
  'Laravel', 'Flutter', 'React.Js', 'Python', 'Dart', 'Php', 'Firebase',
  'Java', 'C++', 'SQl', 'Linux', 'Cyber Security', 'Shopify', 'Wordpress',
  'Prompt Engineering', 'X Code', 'Apple App Store', 'Google play console'
];

const Skills = () => {
  return (
    <section id="skills">
      <h2>Technical Skills</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(99, 102, 241, 0.2)', borderColor: 'var(--accent)' }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="glass"
            style={{ padding: '10px 20px', fontSize: '1.1rem', cursor: 'default' }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
