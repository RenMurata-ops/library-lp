import { motion } from 'framer-motion';
import BookButton from './BookButton';
import { useConfig } from '../context/ConfigContext';

const Hero = () => {
    const { config } = useConfig();

    return (
        <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0f0a08]">
            {/* Hero Background - User Uploaded Image */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                >
                    <img
                        src={config.heroImage || "/hero-bg.png"}
                        alt="Cozy Library Hideout"
                        className="w-full h-full object-cover opacity-60"
                    />
                </motion.div>

                {/* Warm Vignette & Atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0f0a08]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_50%,#0f0a08_100%)]"></div>

                {/* Floating Dust Particles */}
                <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse"></div>
            </div>

            <div className="relative z-20 text-center max-w-4xl px-6 mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                >
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-library-ink mb-8 leading-tight italic drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                        {config.heroTitle}
                    </h1>

                    <p className="text-lg md:text-2xl text-library-ink/80 font-serif italic mb-12 max-w-2xl mx-auto drop-shadow-lg leading-relaxed tracking-wide">
                        {config.heroSubtitle}
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
                        <BookButton
                            label={config.button1.label}
                            to={config.button1.link}
                            color={config.button1.color}
                        />
                        <BookButton
                            label={config.button2.label}
                            to={config.button2.link}
                            color={config.button2.color}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
