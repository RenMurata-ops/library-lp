import React, { useState, useEffect } from 'react';
import { useConfig, type AppConfig } from '../context/ConfigContext';

const AdminPage = () => {
    const { config, updateConfig, resetConfig } = useConfig();
    const [localConfig, setLocalConfig] = useState<AppConfig>(config);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setLocalConfig(config);
    }, [config]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('button1.')) {
            const field = name.split('.')[1];
            setLocalConfig(prev => ({
                ...prev,
                button1: { ...prev.button1, [field]: value }
            }));
        } else if (name.startsWith('button2.')) {
            const field = name.split('.')[1];
            setLocalConfig(prev => ({
                ...prev,
                button2: { ...prev.button2, [field]: value }
            }));
        } else if (name.startsWith('theme.')) {
            const field = name.split('.')[1];
            setLocalConfig(prev => ({
                ...prev,
                theme: { ...prev.theme, [field]: value }
            }));
        } else if (name.startsWith('articles.')) {
            const [_, indexStr, field] = name.split('.');
            const index = parseInt(indexStr);
            setLocalConfig(prev => {
                const newArticles = [...(prev.articles || [])];
                newArticles[index] = { ...newArticles[index], [field]: value };
                return { ...prev, articles: newArticles };
            });
        } else if (name.startsWith('body2.buttons.')) {
            const [_, __, indexStr, field] = name.split('.');
            const index = parseInt(indexStr);
            setLocalConfig(prev => {
                const newButtons = [...(prev.body2.buttons || [])];
                newButtons[index] = { ...newButtons[index], [field]: value };
                return { ...prev, body2: { ...prev.body2, buttons: newButtons } };
            });
        } else if (name.startsWith('body2.')) {
            const field = name.split('.')[1];
            if (field === 'showHeading') {
                setLocalConfig(prev => ({
                    ...prev,
                    body2: { ...prev.body2, showHeading: value === 'true' }
                }));
            } else {
                setLocalConfig(prev => ({
                    ...prev,
                    body2: { ...prev.body2, [field]: value }
                }));
            }
        } else {
            setLocalConfig(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = () => {
        updateConfig(localConfig);
        setSaved(true);
    };

    // Simple input component
    const NotionInput = ({ label, name, value, placeholder, type = "text" }: { label: string, name: string, value: string, placeholder?: string, type?: string }) => (
        <div className="group mb-6">
            <label className="block text-xs text-[#1a0f0a]/40 font-sans mb-1 transition-colors group-hover:text-[#1a0f0a]/60">
                {label}
            </label>
            <input
                type={type}
                name={name}
                defaultValue={value}
                onBlur={handleChange}
                placeholder={placeholder}
                className="w-full bg-transparent border-b border-library-walnut/10 focus:border-library-gold/50 text-[#1a0f0a] font-serif text-lg py-1 outline-none transition-colors placeholder-library-ink/20"
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f5e6d3] text-[#1a0f0a] p-8 md:p-16 font-sans">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-end mb-16 pb-4 border-b border-library-walnut/20">
                    <div>
                        <div className="text-xs text-[#8b4513] font-sans tracking-widest uppercase mb-2">Configuration</div>
                        <h1 className="text-4xl font-serif font-bold text-[#1a0f0a]">管理画面</h1>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={resetConfig}
                            className="px-4 py-2 text-xs text-[#1a0f0a]/60 hover:text-red-600 transition-colors"
                        >
                            初期設定に戻す
                        </button>
                        <button
                            onClick={handleSave}
                            className={`px-6 py-2 text-sm font-serif italic rounded-sm transition-all duration-300 ${saved
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-[#3e2723] text-[#d4af37] hover:bg-[#2d1b13] border border-[#d4af37]/30"
                                }`}
                        >
                            {saved ? "保存しました" : "変更を保存"}
                        </button>
                    </div>
                </header>

                <div className="space-y-16">
                    {/* Hero Section */}
                    <section>
                        <h2 className="text-2xl font-serif text-[#1a0f0a] mb-8 flex items-center gap-4">
                            <span className="w-1 h-8 bg-library-gold/50 rounded-full"></span>
                            ヒーローセクション
                        </h2>
                        <div className="pl-5 space-y-2">
                            <NotionInput
                                label="タイトル"
                                name="heroTitle"
                                value={localConfig.heroTitle}
                                placeholder="例: The Hideout."
                            />
                            <NotionInput
                                label="サブタイトル"
                                name="heroSubtitle"
                                value={localConfig.heroSubtitle}
                                placeholder="例: A secret sanctuary..."
                            />
                            <NotionInput
                                label="背景画像URL"
                                name="heroImage"
                                value={localConfig.heroImage}
                                placeholder="/hero-bg.png または https://..."
                            />
                        </div>
                    </section>

                    {/* Articles Section */}
                    <section>
                        <h2 className="text-2xl font-serif text-[#1a0f0a] mb-8 flex items-center gap-4">
                            <span className="w-1 h-8 bg-library-gold/50 rounded-full"></span>
                            記事管理 (本棚)
                        </h2>
                        <div className="pl-5 space-y-6">
                            <div className="grid gap-4">
                                {localConfig.articles?.map((article, index) => (
                                    <div key={index} className="flex gap-4 items-start p-4 bg-white/5 rounded border border-white/10 group">
                                        <div className="flex-grow grid md:grid-cols-2 gap-4">
                                            <NotionInput
                                                label="タイトル"
                                                name={`articles.${index}.title`}
                                                value={article.title}
                                            />
                                            <NotionInput
                                                label="著者/日付"
                                                name={`articles.${index}.author`}
                                                value={article.author}
                                            />
                                            <NotionInput
                                                label="リンクURL"
                                                name={`articles.${index}.link`}
                                                value={article.link}
                                            />
                                            <NotionInput
                                                label="背表紙色 (Tailwind Class)"
                                                name={`articles.${index}.color`}
                                                value={article.color}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <a
                                                href={`/admin-panel/article/${article.slug || `article-${index}`}/edit`}
                                                className="px-3 py-1 text-xs bg-[#3e2723] text-[#d4af37] hover:bg-[#2d1b13] rounded transition-colors"
                                            >
                                                編集
                                            </a>
                                            <button
                                                onClick={() => {
                                                    const newArticles = [...(localConfig.articles || [])];
                                                    newArticles.splice(index, 1);
                                                    setLocalConfig(prev => ({ ...prev, articles: newArticles }));
                                                }}
                                                className="px-3 py-1 text-xs text-red-600 hover:text-red-700 transition-colors"
                                            >
                                                削除
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <a
                                href="/admin-panel/article/new"
                                className="block w-full py-4 border-2 border-dashed border-library-walnut/30 text-[#1a0f0a]/50 hover:border-library-gold/50 hover:text-library-gold transition-colors rounded-sm font-serif italic text-center"
                            >
                                + 新しい記事を作成
                            </a>
                        </div>
                    </section>

                    {/* Buttons Section */}
                    <section>
                        <h2 className="text-2xl font-serif text-[#1a0f0a] mb-8 flex items-center gap-4">
                            <span className="w-1 h-8 bg-library-gold/50 rounded-full"></span>
                            ボタン設定
                        </h2>
                        <div className="pl-5 grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-sm font-sans text-[#1a0f0a]/60 mb-6 uppercase tracking-wider border-b border-library-walnut/10 pb-2">ボタン 1 (メイン)</h3>
                                <NotionInput
                                    label="ラベル"
                                    name="button1.label"
                                    value={localConfig.button1.label}
                                />
                                <NotionInput
                                    label="リンク先"
                                    name="button1.link"
                                    value={localConfig.button1.link}
                                />
                                <NotionInput
                                    label="色 (Tailwind Class)"
                                    name="button1.color"
                                    value={localConfig.button1.color}
                                />
                            </div>

                            <div>
                                <h3 className="text-sm font-sans text-[#1a0f0a]/60 mb-6 uppercase tracking-wider border-b border-library-walnut/10 pb-2">ボタン 2 (サブ)</h3>
                                <NotionInput
                                    label="ラベル"
                                    name="button2.label"
                                    value={localConfig.button2.label}
                                />
                                <NotionInput
                                    label="リンク先"
                                    name="button2.link"
                                    value={localConfig.button2.link}
                                />
                                <NotionInput
                                    label="色 (Tailwind Class)"
                                    name="button2.color"
                                    value={localConfig.button2.color}
                                />
                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section>
                        <h2 className="text-2xl font-serif text-[#1a0f0a] mb-8 flex items-center gap-4">
                            <span className="w-1 h-8 bg-library-gold/50 rounded-full"></span>
                            アバウトセクション (About the Archive)
                        </h2>
                        <div className="pl-5 space-y-6">
                            <div className="group mb-6">
                                <label className="block text-xs text-[#1a0f0a]/40 font-sans mb-1">セクションの表示</label>
                                <select
                                    name="body2.showHeading"
                                    value={localConfig.body2.showHeading ? 'true' : 'false'}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-library-walnut/10 focus:border-library-gold/50 text-[#1a0f0a] font-serif text-lg py-1 outline-none transition-colors"
                                >
                                    <option value="true">表示する</option>
                                    <option value="false">非表示</option>
                                </select>
                            </div>
                            <NotionInput
                                label="見出し (タイトル)"
                                name="body2.heading"
                                value={localConfig.body2.heading}
                                placeholder="例: About the Archive"
                            />
                            <div className="group mb-6">
                                <label className="block text-xs text-[#1a0f0a]/40 font-sans mb-1">本文テキスト (Aboutの内容)</label>
                                <textarea
                                    name="body2.bodyText"
                                    value={localConfig.body2.bodyText}
                                    onChange={handleChange}
                                    onCompositionStart={() => { }}
                                    onCompositionEnd={handleChange as any}
                                    rows={8}
                                    className="w-full bg-transparent border border-library-walnut/10 focus:border-library-gold/50 text-[#1a0f0a] font-serif text-lg p-4 outline-none transition-colors placeholder-library-ink/20 resize-y rounded-sm"
                                    placeholder="ここに入力した内容が『About the Archive』セクションに表示されます。"
                                />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-sans text-[#1a0f0a]/60 uppercase tracking-wider">ボタン</h3>
                                {localConfig.body2.buttons?.map((button, index) => (
                                    <div key={index} className="flex gap-4 items-start p-4 bg-white/5 rounded border border-white/10 group">
                                        <div className="flex-grow grid md:grid-cols-3 gap-4">
                                            <NotionInput
                                                label="ラベル"
                                                name={`body2.buttons.${index}.label`}
                                                value={button.label}
                                            />
                                            <NotionInput
                                                label="リンク"
                                                name={`body2.buttons.${index}.link`}
                                                value={button.link}
                                            />
                                            <NotionInput
                                                label="色"
                                                name={`body2.buttons.${index}.color`}
                                                value={button.color}
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                const newButtons = [...(localConfig.body2.buttons || [])];
                                                newButtons.splice(index, 1);
                                                setLocalConfig(prev => ({ ...prev, body2: { ...prev.body2, buttons: newButtons } }));
                                            }}
                                            className="text-red-400 hover:text-red-300 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            削除
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setLocalConfig(prev => ({
                                        ...prev,
                                        body2: {
                                            ...prev.body2,
                                            buttons: [...(prev.body2.buttons || []), { label: "New Button", link: "#", color: "bg-[#3e2723]" }]
                                        }
                                    }))}
                                    className="w-full py-4 border-2 border-dashed border-library-walnut/30 text-[#1a0f0a]/50 hover:border-library-gold/50 hover:text-library-gold transition-colors rounded-sm font-serif italic"
                                >
                                    + ボタンを追加
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Font Selection */}
                    <section>
                        <h2 className="text-2xl font-serif text-[#1a0f0a] mb-8 flex items-center gap-4">
                            <span className="w-1 h-8 bg-library-gold/50 rounded-full"></span>
                            フォント設定
                        </h2>
                        <div className="pl-5">
                            <div className="group mb-6">
                                <label className="block text-xs text-[#1a0f0a]/40 font-sans mb-1">フォントファミリー</label>
                                <select
                                    name="fontFamily"
                                    value={localConfig.fontFamily}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-library-walnut/10 focus:border-library-gold/50 text-[#1a0f0a] font-serif text-lg py-1 outline-none transition-colors"
                                >
                                    <option value="Playfair Display">Playfair Display (英語セリフ)</option>
                                    <option value="Noto Serif JP">Noto Serif JP (日本語明朝)</option>
                                    <option value="Shippori Mincho">Shippori Mincho (しっぽり明朝)</option>
                                    <option value="Zen Kaku Gothic New">Zen Kaku Gothic New (ゴシック)</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Theme Section */}
                    <section>
                        <h2 className="text-2xl font-serif text-[#1a0f0a] mb-8 flex items-center gap-4">
                            <span className="w-1 h-8 bg-library-gold/50 rounded-full"></span>
                            テーマカラー
                        </h2>
                        <div className="pl-5 grid grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-full shadow-lg border border-white/10"
                                        style={{ backgroundColor: localConfig.theme.wood }}
                                    ></div>
                                    <span className="font-serif text-lg">Wood</span>
                                </div>
                                <NotionInput
                                    label="カラーコード"
                                    name="theme.wood"
                                    value={localConfig.theme.wood}
                                />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-full shadow-lg border border-white/10"
                                        style={{ backgroundColor: localConfig.theme.gold }}
                                    ></div>
                                    <span className="font-serif text-lg">Gold</span>
                                </div>
                                <NotionInput
                                    label="カラーコード"
                                    name="theme.gold"
                                    value={localConfig.theme.gold}
                                />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-full shadow-lg border border-white/10"
                                        style={{ backgroundColor: localConfig.theme.light }}
                                    ></div>
                                    <span className="font-serif text-lg">Light</span>
                                </div>
                                <NotionInput
                                    label="カラーコード"
                                    name="theme.light"
                                    value={localConfig.theme.light}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
