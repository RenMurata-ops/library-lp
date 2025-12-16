import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useConfig, type ContentBlock } from '../context/ConfigContext';

const ArticlePage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { config } = useConfig();
    const navigate = useNavigate();

    // Find article by slug or fallback to link matching
    const article = config.articles.find(
        a => a.slug === slug || a.link === `/article/${slug}`
    );

    if (!article) {
        return (
            <div className="min-h-screen bg-[#0f0a08] flex items-center justify-center p-6">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-library-ink mb-4">記事が見つかりません</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="text-library-gold hover:text-library-light transition-colors"
                    >
                        ホームに戻る
                    </button>
                </div>
            </div>
        );
    }

    const renderBlock = (block: ContentBlock) => {
        switch (block.type) {
            case 'heading':
                const level = block.level || 2;
                const headingClass = `font-serif font-bold text-library-ink mb-6 ${level === 1 ? 'text-4xl md:text-5xl' :
                        level === 2 ? 'text-3xl md:text-4xl' :
                            'text-2xl md:text-3xl'
                    }`;

                if (level === 1) {
                    return <h1 key={block.id} className={headingClass}>{block.content}</h1>;
                } else if (level === 2) {
                    return <h2 key={block.id} className={headingClass}>{block.content}</h2>;
                } else {
                    return <h3 key={block.id} className={headingClass}>{block.content}</h3>;
                }
            case 'paragraph':
                return (
                    <p
                        key={block.id}
                        className="text-library-ink/80 font-serif text-lg leading-relaxed mb-6 whitespace-pre-wrap"
                    >
                        {block.content}
                    </p>
                );
            case 'image':
                return (
                    <div key={block.id} className="my-8">
                        <img
                            src={block.content}
                            alt={block.metadata?.alt || ''}
                            className="w-full rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                        />
                        {block.metadata?.caption && (
                            <p className="text-library-ink/50 text-sm font-serif italic mt-2 text-center">
                                {block.metadata.caption}
                            </p>
                        )}
                    </div>
                );
            case 'quote':
                return (
                    <blockquote
                        key={block.id}
                        className="border-l-4 border-library-gold/50 pl-6 py-2 my-6 italic text-library-ink/70 font-serif text-xl"
                    >
                        {block.content}
                    </blockquote>
                );
            case 'divider':
                return (
                    <hr
                        key={block.id}
                        className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-library-gold/30 to-transparent"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0a08] relative">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>

            {/* Subtle Ambient Light */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-library-light/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
                {/* Header */}
                <header className="border-b border-library-walnut/20 bg-[#0f0a08]/80 backdrop-blur-sm sticky top-0 z-50">
                    <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                        <button
                            onClick={() => navigate('/')}
                            className="text-library-gold hover:text-library-light transition-colors font-serif"
                        >
                            ← 戻る
                        </button>
                        <div className="text-xs text-library-ink/40 font-sans">
                            {article.publishedAt || article.author}
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <article className="max-w-4xl mx-auto px-6 py-16">
                    {/* Cover Image */}
                    {article.coverImage && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-12"
                        >
                            <img
                                src={article.coverImage}
                                alt={article.title}
                                className="w-full h-[400px] object-cover rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
                            />
                        </motion.div>
                    )}

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-12"
                    >
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-library-ink mb-4">
                            {article.title}
                        </h1>
                        <div className="flex items-center gap-4 text-library-ink/60 font-sans text-sm">
                            <span>{article.author}</span>
                            {article.publishedAt && (
                                <>
                                    <span>•</span>
                                    <span>{new Date(article.publishedAt).toLocaleDateString('ja-JP')}</span>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Content Blocks */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="prose prose-invert max-w-none"
                    >
                        {article.content && article.content.length > 0 ? (
                            article.content.map(renderBlock)
                        ) : (
                            <p className="text-library-ink/60 font-serif text-lg italic">
                                この記事にはまだコンテンツがありません。管理画面から編集してください。
                            </p>
                        )}
                    </motion.div>
                </article>

                {/* Footer */}
                <footer className="border-t border-library-walnut/20 mt-24 py-12">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-library-gold hover:text-library-light transition-colors font-serif"
                        >
                            ← ホームに戻る
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ArticlePage;
