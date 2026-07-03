import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass"
        style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
      >
        <h2>About Me</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          To become a highly productive and successful professional, I aspire to build a rewarding career in a dynamic and
          progressive organization and contribute to the organizational goals, and continually advance in my career through
          learning and unwavering commitment.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginTop: '1rem' }}>
          Based in Rudrapur, Uttarakhand, I have completed my Masters in Computer Applications from Uttaranchal University.
          I specialize in full-stack web development using Laravel, as well as cross-platform mobile application development with Flutter.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
