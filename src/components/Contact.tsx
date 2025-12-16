import { motion } from 'framer-motion';
import { Feather, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-32 bg-[#050505] relative">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="card-paper p-12 md:p-16 relative overflow-hidden bg-[#120a08] border border-library-gold/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                    {/* Decorative Corner */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-library-gold/20 rounded-tl-lg m-4"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-library-gold/20 rounded-br-lg m-4"></div>

                    <div className="text-center mb-12">
                        <div className="inline-block p-3 bg-library-gold/10 rounded-full mb-4">
                            <Feather className="w-6 h-6 text-library-gold" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-library-gold mb-4 italic">The Librarian's Desk</h2>
                        <p className="text-library-ink/60 font-serif italic">Inquire about our collection or request a viewing.</p>
                    </div>

                    <form className="space-y-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-library-gold/80 uppercase tracking-widest mb-2">Name</label>
                                <input type="text" className="w-full bg-[#0a0a0a] text-library-ink border-b-2 border-library-gold/20 px-0 py-2 focus:outline-none focus:border-library-gold transition-colors font-serif text-lg placeholder-library-ink/20" placeholder="E.g. John Doe" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-library-gold/80 uppercase tracking-widest mb-2">Email</label>
                                <input type="email" className="w-full bg-[#0a0a0a] text-library-ink border-b-2 border-library-gold/20 px-0 py-2 focus:outline-none focus:border-library-gold transition-colors font-serif text-lg placeholder-library-ink/20" placeholder="john@example.com" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-library-gold/80 uppercase tracking-widest mb-2">Inquiry</label>
                            <textarea rows={3} className="w-full bg-[#0a0a0a] text-library-ink border-b-2 border-library-gold/20 px-0 py-2 focus:outline-none focus:border-library-gold transition-colors font-serif text-lg resize-none placeholder-library-ink/20" placeholder="How may we assist you?"></textarea>
                        </div>

                        <div className="pt-6 text-center">
                            <button type="submit" className="btn-primary inline-flex mx-auto bg-library-gold/10 border-library-gold/40 text-library-gold hover:bg-library-gold/20">
                                <Send className="w-4 h-4" />
                                Send Correspondence
                            </button>
                        </div>
                    </form>
                </motion.div>

                <footer className="mt-16 text-center text-library-ink/30 font-serif italic text-sm">
                    <p>© 2024 The Archive. Preserving knowledge for eternity.</p>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
