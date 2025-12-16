import { motion } from 'framer-motion';
import { useConfig } from '../context/ConfigContext';
import BookButton from './BookButton';

const Body2 = () => {
    const { config } = useConfig();
    const { body2 } = config;

    return (
        <section id="body2" className="py-32 bg-[#0f0a08] relative">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="card-paper p-12 md:p-16 relative overflow-hidden bg-gradient-to-br from-[#2d1b13]/80 to-[#3e2723]/60 backdrop-blur-sm border border-library-gold/20 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_60px_rgba(212,175,55,0.1)]"
                >
                    {/* Decorative Corner */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-library-gold/20 rounded-tl-lg m-4"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-library-gold/20 rounded-br-lg m-4"></div>

                    {/* Heading (Optional) */}
                    {body2.showHeading && (
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-library-gold mb-4 italic">
                                {body2.heading}
                            </h2>
                        </div>
                    )}

                    {/* Body Text */}
                    <div className="text-center mb-12 relative z-10">
                        <p className="text-library-ink/80 font-serif text-lg leading-relaxed whitespace-pre-wrap">
                            {body2.bodyText}
                        </p>
                    </div>

                    {/* Buttons */}
                    {body2.buttons && body2.buttons.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-6 relative z-10">
                            {body2.buttons.map((button, index) => (
                                <BookButton
                                    key={index}
                                    label={button.label}
                                    to={button.link}
                                    color={button.color}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>

                <footer className="mt-16 text-center text-library-ink/30 font-serif italic text-sm">
                    <p>© 2024 The Archive. Preserving knowledge for eternity.</p>
                </footer>
            </div>
        </section>
    );
};

export default Body2;
