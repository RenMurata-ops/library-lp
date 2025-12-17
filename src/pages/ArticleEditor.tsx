import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useConfig, type Article, type ContentBlock } from '../context/ConfigContext';
import { motion } from 'framer-motion';

const ArticleEditor = () => {
    const { slug: paramSlug } = useParams<{ slug: string }>();
    const location = useLocation();
    // If accessing /new route directly, paramSlug is undefined, so we manually set it to 'new'
    const slug = paramSlug || (location.pathname.endsWith('/new') ? 'new' : undefined);
    const { config, updateConfig } = useConfig();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        console.log('ArticleEditor useEffect:', { slug, configArticles: config.articles?.length });
        if (slug === 'new') {
            console.log('Creating new article...');
            // Create new article
            const newArticle: Article = {
                title: '新しい記事',
                author: '著者名',
                link: '',
                color: 'bg-[#3e2723]',
                slug: `article-${Date.now()}`,
                content: [
                    {
                        id: `block-${Date.now()}`,
                        type: 'paragraph',
                        content: 'ここに記事の内容を書いてください...'
                    }
                ],
                publishedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            setArticle(newArticle);
        } else if (config.articles && config.articles.length > 0) {
            // Find existing article
            const existingArticle = config.articles.find(
                a => a.slug === slug || a.link === `/article/${slug}`
            );
            if (existingArticle) {
                // Ensure content array exists
                if (!existingArticle.content) {
                    existingArticle.content = [];
                }
                setArticle(existingArticle);
            }
        }
    }, [slug]);

    const handleSave = () => {
        if (!article) return;

        const updatedArticles = slug === 'new'
            ? [...config.articles, article]
            : config.articles.map(a =>
                (a.slug === slug || a.link === `/article/${slug}`) ? article : a
            );

        updateConfig({
            ...config,
            articles: updatedArticles
        });

        setSaved(true);
        setTimeout(() => setSaved(false), 2000);

        // Navigate to article page after save
        if (slug === 'new' && article.slug) {
            setTimeout(() => navigate(`/article/${article.slug}`), 1000);
        }
    };

    const addBlock = (type: ContentBlock['type']) => {
        if (!article) return;

        const newBlock: ContentBlock = {
            id: `block-${Date.now()}`,
            type,
            content: type === 'divider' ? '' : type === 'heading' ? '見出し' : '内容を入力...',
            level: type === 'heading' ? 2 : undefined
        };

        setArticle({
            ...article,
            content: [...(article.content || []), newBlock],
            updatedAt: new Date().toISOString()
        });
    };

    const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
        if (!article) return;

        setArticle({
            ...article,
            content: article.content?.map(block =>
                block.id === blockId ? { ...block, ...updates } : block
            ),
            updatedAt: new Date().toISOString()
        });
    };

    const deleteBlock = (blockId: string) => {
        if (!article) return;

        setArticle({
            ...article,
            content: article.content?.filter(block => block.id !== blockId),
            updatedAt: new Date().toISOString()
        });
    };

    const moveBlock = (blockId: string, direction: 'up' | 'down') => {
        if (!article || !article.content) return;

        const index = article.content.findIndex(b => b.id === blockId);
        if (index === -1) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= article.content.length) return;

        const newContent = [...article.content];
        [newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]];

        setArticle({
            ...article,
            content: newContent,
            updatedAt: new Date().toISOString()
        });
    };

    if (!article) {
        return (
            <div className="min-h-screen bg-[#f5e6d3] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-[#1a0f0a] font-serif text-lg">読み込み中...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5e6d3] text-[#1a0f0a]">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#f5e6d3]/95 backdrop-blur-sm border-b border-[#1a0f0a]/10 px-6 py-4">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin-panel')}
                            className="text-[#8b4513] hover:text-[#1a0f0a] transition-colors"
                        >
                            ← 管理画面
                        </button>
                        <span className="text-[#1a0f0a]/40">|</span>
                        <h1 className="text-xl font-serif font-bold">記事エディタ</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => article.slug && navigate(`/article/${article.slug}`)}
                            className="text-sm text-[#1a0f0a]/60 hover:text-[#1a0f0a] transition-colors"
                        >
                            プレビュー
                        </button>
                        <button
                            onClick={handleSave}
                            className={`px-6 py-2 text-sm font-serif italic rounded-sm transition-all duration-300 ${saved
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : 'bg-[#3e2723] text-[#d4af37] hover:bg-[#2d1b13] border border-[#d4af37]/30'
                                }`}
                        >
                            {saved ? '保存しました' : '保存'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Editor */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Article Metadata */}
                <div className="mb-12 space-y-6 pb-12 border-b border-[#1a0f0a]/10">
                    <div>
                        <label className="block text-xs text-[#1a0f0a]/40 font-sans mb-2">タイトル</label>
                        <input
                            type="text"
                            value={article.title}
                            onChange={(e) => setArticle({ ...article, title: e.target.value })}
                            className="w-full text-5xl font-serif font-bold bg-transparent border-none outline-none text-[#1a0f0a] placeholder-[#1a0f0a]/20"
                            placeholder="記事のタイトル"
                        />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs text-[#1a0f0a]/40 font-sans mb-2">著者</label>
                            <input
                                type="text"
                                value={article.author}
                                onChange={(e) => setArticle({ ...article, author: e.target.value })}
                                className="w-full bg-transparent border-b border-[#1a0f0a]/10 focus:border-[#d4af37] text-[#1a0f0a] py-2 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-[#1a0f0a]/40 font-sans mb-2">スラッグ (URL)</label>
                            <input
                                type="text"
                                value={article.slug || ''}
                                onChange={(e) => setArticle({ ...article, slug: e.target.value })}
                                className="w-full bg-transparent border-b border-[#1a0f0a]/10 focus:border-[#d4af37] text-[#1a0f0a] py-2 outline-none"
                                placeholder="article-slug"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-[#1a0f0a]/40 font-sans mb-2">カバー画像URL</label>
                            <input
                                type="text"
                                value={article.coverImage || ''}
                                onChange={(e) => setArticle({ ...article, coverImage: e.target.value })}
                                className="w-full bg-transparent border-b border-[#1a0f0a]/10 focus:border-[#d4af37] text-[#1a0f0a] py-2 outline-none"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>

                {/* Content Blocks */}
                <div className="space-y-4 mb-8">
                    {article.content?.map((block, index) => (
                        <motion.div
                            key={block.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group relative bg-white/30 rounded-lg p-6 border border-[#1a0f0a]/10 hover:border-[#d4af37]/30 transition-colors"
                        >
                            {/* Block Controls */}
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => moveBlock(block.id, 'up')}
                                    disabled={index === 0}
                                    className="p-1 text-[#1a0f0a]/40 hover:text-[#1a0f0a] disabled:opacity-20"
                                >
                                    ↑
                                </button>
                                <button
                                    onClick={() => moveBlock(block.id, 'down')}
                                    disabled={index === (article.content?.length || 0) - 1}
                                    className="p-1 text-[#1a0f0a]/40 hover:text-[#1a0f0a] disabled:opacity-20"
                                >
                                    ↓
                                </button>
                                <button
                                    onClick={() => deleteBlock(block.id)}
                                    className="p-1 text-red-600 hover:text-red-700"
                                >
                                    削除
                                </button>
                            </div>

                            {/* Block Type Selector */}
                            <div className="mb-4">
                                <select
                                    value={block.type}
                                    onChange={(e) => updateBlock(block.id, { type: e.target.value as ContentBlock['type'] })}
                                    className="text-xs bg-transparent border border-[#1a0f0a]/20 rounded px-2 py-1 text-[#1a0f0a]/60"
                                >
                                    <option value="heading">見出し</option>
                                    <option value="paragraph">段落</option>
                                    <option value="image">画像</option>
                                    <option value="quote">引用</option>
                                    <option value="divider">区切り線</option>
                                </select>
                                {block.type === 'heading' && (
                                    <select
                                        value={block.level || 2}
                                        onChange={(e) => updateBlock(block.id, { level: parseInt(e.target.value) })}
                                        className="ml-2 text-xs bg-transparent border border-[#1a0f0a]/20 rounded px-2 py-1 text-[#1a0f0a]/60"
                                    >
                                        <option value={1}>H1</option>
                                        <option value={2}>H2</option>
                                        <option value={3}>H3</option>
                                    </select>
                                )}
                            </div>

                            {/* Block Content */}
                            {block.type !== 'divider' && (
                                <textarea
                                    value={block.content}
                                    onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                                    rows={block.type === 'paragraph' ? 4 : 2}
                                    className="w-full bg-transparent border-none outline-none text-[#1a0f0a] font-serif text-lg resize-none"
                                    placeholder={
                                        block.type === 'heading' ? '見出しを入力...' :
                                            block.type === 'image' ? '画像URLを入力...' :
                                                block.type === 'quote' ? '引用文を入力...' :
                                                    '内容を入力...'
                                    }
                                />
                            )}
                            {block.type === 'divider' && (
                                <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"></div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Add Block Buttons */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => addBlock('heading')}
                        className="px-4 py-2 text-sm bg-white/50 hover:bg-white/70 border border-[#1a0f0a]/20 rounded transition-colors"
                    >
                        + 見出し
                    </button>
                    <button
                        onClick={() => addBlock('paragraph')}
                        className="px-4 py-2 text-sm bg-white/50 hover:bg-white/70 border border-[#1a0f0a]/20 rounded transition-colors"
                    >
                        + 段落
                    </button>
                    <button
                        onClick={() => addBlock('image')}
                        className="px-4 py-2 text-sm bg-white/50 hover:bg-white/70 border border-[#1a0f0a]/20 rounded transition-colors"
                    >
                        + 画像
                    </button>
                    <button
                        onClick={() => addBlock('quote')}
                        className="px-4 py-2 text-sm bg-white/50 hover:bg-white/70 border border-[#1a0f0a]/20 rounded transition-colors"
                    >
                        + 引用
                    </button>
                    <button
                        onClick={() => addBlock('divider')}
                        className="px-4 py-2 text-sm bg-white/50 hover:bg-white/70 border border-[#1a0f0a]/20 rounded transition-colors"
                    >
                        + 区切り線
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArticleEditor;
