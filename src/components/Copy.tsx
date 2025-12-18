import { motion } from 'framer-motion';
import { useConfig } from '../context/ConfigContext';

const Copy = () => {
    const { config } = useConfig();
    const { aboutTitle, aboutText } = config;

    return (
        <section id="about" className="py-24 bg-[#0f0a08] text-library-ink relative">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-library-gold mb-8 text-center italic drop-shadow-md">
                        {aboutTitle}
                    </h2>
                    <p className="whitespace-pre-line leading-relaxed text-lg text-library-ink/80">
                        {aboutText}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Copy;
