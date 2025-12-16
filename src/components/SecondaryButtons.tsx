import BookButton from './BookButton';
import { motion } from 'framer-motion';

const SecondaryButtons = () => {
    return (
        <div className="flex justify-center gap-6 py-12 bg-[#0f0a08]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex gap-6"
            >
                <BookButton label="Explore Archives" to="/book/1" color="bg-[#3e2723]" />
                <BookButton label="Read More" to="/book/2" color="bg-[#5d4037]" />
            </motion.div>
        </div>
    );
};

export default SecondaryButtons;
