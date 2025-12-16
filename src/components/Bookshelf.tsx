import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';

// Fallback books if config is empty
const defaultBooks = [
    { id: 1, title: "Design Systems", author: "A. Rossi", color: "bg-[#3e2723]", height: "h-72", link: "" },
    { id: 2, title: "User Experience", author: "J. Nielsen", color: "bg-[#2d1b18]", height: "h-64", link: "" },
    { id: 3, title: "Typography", author: "R. Bringhurst", color: "bg-[#4e342e]", height: "h-68", link: "" },
    { id: 4, title: "Color Theory", author: "J. Itten", color: "bg-[#5d4037]", height: "h-70", link: "" },
    { id: 5, title: "Grid Systems", author: "J. Müller", color: "bg-[#1a0f0a]", height: "h-60", link: "" },
    { id: 6, title: "Interaction", author: "D. Norman", color: "bg-[#3e2723]", height: "h-66", link: "" },
];

const Bookshelf = () => {
    const navigate = useNavigate();
    const { config } = useConfig();

    // Use configured articles or fallback
    const books = config.articles && config.articles.length > 0
        ? config.articles.map((article: any, index: number) => ({
            id: index + 1,
            title: article.title,
            author: article.author,
            color: article.color || "bg-[#3e2723]",
            height: ["h-72", "h-64", "h-68", "h-70", "h-60", "h-66"][index % 6],
            link: article.link
        }))
        : defaultBooks;

    // Group books into shelves of 6
    const shelves = [];
    for (let i = 0; i < books.length; i += 6) {
        shelves.push(books.slice(i, i + 6));
    }

    return (
        <section id="collection" className="py-32 bg-[#0f0a08] relative overflow-hidden">
            {/* Subtle Wood Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>

            {/* Subtle Ambient Light - Fixed Position */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-library-light/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-library-ink mb-4 italic drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">The Collection</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-library-gold/60 to-transparent mx-auto rounded-full shadow-[0_0_15px_rgba(255,202,40,0.4)]"></div>
                </motion.div>

                <div className="space-y-32">
                    {shelves.map((shelfBooks, shelfIndex) => (
                        <motion.div
                            key={shelfIndex}
                            className="relative"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: shelfIndex * 0.2 }}
                        >
                            {/* Shelf Structure - Solid Dark Wood */}
                            <div className="relative border-b-[24px] border-[#2d1b13] shadow-[0_20px_40px_rgba(0,0,0,0.8)] px-12 pb-0 flex items-end justify-center gap-2 md:gap-6 h-96 bg-[#1a0f0a] rounded-sm mx-auto max-w-5xl">
                                {/* Shelf Wood Texture */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                                <div className="absolute inset-x-0 bottom-[-24px] h-[24px] bg-[#1a0f0a] shadow-[inset_0_2px_10px_rgba(0,0,0,0.7)]"></div>
                                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.6)] pointer-events-none"></div>

                                {/* Subtle Ambient Light on Shelf */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-library-light/3 to-transparent pointer-events-none"></div>

                                {shelfBooks.map((book, index) => (
                                    <motion.div
                                        key={book.id}
                                        className={`relative ${book.height} w-16 md:w-20 rounded-l-sm rounded-r-md shadow-[5px_0_15px_rgba(0,0,0,0.7)] cursor-pointer group transform-style-3d`}
                                        onClick={() => book.link ? window.open(book.link, '_blank') : navigate(`/book/${book.id}`)}
                                        whileHover={{
                                            y: -30,
                                            scale: 1.05,
                                            zIndex: 50,
                                            boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
                                        }}
                                        initial={{ y: 100, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25,
                                            delay: index * 0.1
                                        }}
                                    >
                                        {/* Book Spine - Realistic Leather Texture */}
                                        <div className={`absolute inset-0 ${book.color} rounded-l-sm rounded-r-md flex flex-col items-center justify-between py-4 border-l border-white/5 border-r border-black/50 shadow-[inset_2px_0_5px_rgba(255,255,255,0.05),inset_-2px_0_10px_rgba(0,0,0,0.5)] overflow-hidden`}>
                                            {/* Leather Texture */}
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-40 mix-blend-overlay pointer-events-none"></div>

                                            {/* Top Gold Detail - Embossed */}
                                            <div className="w-full px-2 space-y-1 relative z-10 opacity-90">
                                                <div className="h-[2px] bg-gradient-to-r from-[#c5a059] via-[#e6c485] to-[#c5a059] w-full shadow-[0_1px_2px_rgba(0,0,0,0.8)]"></div>
                                                <div className="h-[1px] bg-[#c5a059] w-full opacity-50"></div>
                                            </div>

                                            {/* Title - Gold Foil */}
                                            <span className="relative z-10 [writing-mode:vertical-rl] text-transparent bg-clip-text bg-gradient-to-b from-[#e6c485] to-[#c5a059] font-serif font-bold tracking-widest text-xs md:text-sm uppercase py-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                                {book.title}
                                            </span>

                                            {/* Bottom Gold Detail & Author */}
                                            <div className="flex flex-col items-center gap-4 w-full px-2 relative z-10">
                                                <span className="text-[10px] text-[#c5a059]/80 font-serif italic drop-shadow-sm">{book.author.split(' ')[1]}</span>
                                                <div className="space-y-1 w-full opacity-90">
                                                    <div className="h-[1px] bg-[#c5a059] w-full opacity-50"></div>
                                                    <div className="h-[2px] bg-gradient-to-r from-[#c5a059] via-[#e6c485] to-[#c5a059] w-full shadow-[0_1px_2px_rgba(0,0,0,0.8)]"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Shelf Shadow on Wall */}
                            <div className="h-24 bg-black/60 blur-2xl mx-12 rounded-full mt-[-10px] transform scale-x-90 relative z-[-1]"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default Bookshelf;
