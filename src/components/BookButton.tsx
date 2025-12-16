import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BookButtonProps {
    label: string;
    to: string;
    color?: string;
}

/**
 * A button styled to look like a horizontal book (lying flat), matching the bookshelf book design.
 */
const BookButton: React.FC<BookButtonProps> = ({ label, to, color = "bg-[#3e2723]" }) => {
    // Determine if it's an external link or internal route
    const isExternal = to.startsWith('http');
    const Component = isExternal ? 'a' : Link;
    const props = isExternal ? { href: to, target: "_blank", rel: "noopener noreferrer" } : { to };

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ y: 1, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
            {/* @ts-ignore */}
            <Component
                {...props}
                className={`
                    relative group inline-flex items-center justify-center
                    w-64 h-20
                    ${color}
                    rounded-sm 
                    shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-4px_6px_rgba(0,0,0,0.4),0_10px_20px_rgba(0,0,0,0.6)]
                    border-t-2 border-white/10 border-b-2 border-black/60
                    overflow-hidden
                `}
            >
                {/* Leather Texture Overlay */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] mix-blend-overlay pointer-events-none"></div>

                {/* Book Cover Gradient (Depth effect) */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40 pointer-events-none"></div>

                {/* Left Gold Border (Book Spine Edge) */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#e6c485] via-[#c5a059] to-[#e6c485] shadow-[2px_0_4px_rgba(0,0,0,0.5)]"></div>

                {/* Right Gold Border */}
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#e6c485] via-[#c5a059] to-[#e6c485] shadow-[-2px_0_4px_rgba(0,0,0,0.5)]"></div>

                {/* Top and Bottom Gold Lines */}
                <div className="absolute top-2 left-4 right-4 space-y-1">
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent shadow-[0_1px_2px_rgba(0,0,0,0.8)]"></div>
                    <div className="h-[1px] bg-[#c5a059] opacity-50"></div>
                </div>
                <div className="absolute bottom-2 left-4 right-4 space-y-1">
                    <div className="h-[1px] bg-[#c5a059] opacity-50"></div>
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent shadow-[0_1px_2px_rgba(0,0,0,0.8)]"></div>
                </div>

                {/* Label with Gold Foil Effect (Horizontal) */}
                <span className="relative z-10 font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#e6c485] to-[#c5a059] text-xl tracking-widest uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    {label}
                </span>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></div>
            </Component>
        </motion.div>
    );
};

export default BookButton;
