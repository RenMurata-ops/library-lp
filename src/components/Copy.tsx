import { motion } from 'framer-motion';

const Copy = () => {
    const text = `
  In the hushed corridors of the grand archive, every shelf whispers stories of ages past, and each tome holds a world waiting to be discovered. As you wander through the marble aisles, the scent of aged paper mingles with the soft glow of amber lamps, inviting you to lose yourself in the timeless pursuit of knowledge.

  The Archive is more than a collection; it is a sanctuary where curiosity is nurtured, and imagination is set free. Here, the rustle of pages becomes a symphony, and the gentle creak of wooden shelves echoes the footsteps of scholars who have walked these halls before you.

  Whether you seek the wisdom of ancient philosophers, the daring adventures of modern storytellers, or the quiet comfort of poetry, the Archive offers a curated journey through the realms of human thought. Each book is meticulously placed, its spine adorned with subtle gold leaf, inviting you to run your fingers along its texture and feel the weight of centuries.

  As you explore, notice the subtle interplay of light and shadow, the delicate dust particles dancing in the air, and the warm tones of walnut and cream that envelop you in a sense of timeless elegance. This is a place where the past meets the present, where the tactile pleasure of holding a physical book merges with the seamless flow of digital discovery.

  Let the Archive be your guide, your refuge, and your inspiration. Open a book, turn a page, and embark on a voyage that transcends time.
  `;
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
                        About the Archive
                    </h2>
                    <p className="whitespace-pre-line leading-relaxed text-lg text-library-ink/80">
                        {text}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Copy;
