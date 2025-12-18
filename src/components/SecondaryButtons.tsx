import BookButton from './BookButton';
import { motion } from 'framer-motion';
import { useConfig } from '../context/ConfigContext';

const SecondaryButtons = () => {
    const { config } = useConfig();
    const { secondaryButtons } = config;

    return (
        <div className="flex justify-center gap-6 py-12 bg-[#0f0a08]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-6"
            >
                {secondaryButtons?.map((button, index) => (
                    <BookButton
                        key={index}
                        label={button.label}
                        to={button.link}
                        color={button.color}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default SecondaryButtons;
