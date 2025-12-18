import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getConfig, updateConfigData } from '../lib/database';

export interface ButtonConfig {
    label: string;
    link: string;
    color: string;
}

export interface ThemeConfig {
    wood: string;
    gold: string;
    light: string;
}


export interface ContentBlock {
    id: string;
    type: 'heading' | 'paragraph' | 'image' | 'quote' | 'divider';
    content: string;
    level?: number; // For headings: 1, 2, 3
    metadata?: Record<string, any>;
}

export interface Article {
    title: string;
    author: string;
    link: string; // Deprecated: use slug instead
    color: string;
    slug?: string; // URL-friendly identifier
    content?: ContentBlock[]; // Block-based content
    coverImage?: string;
    publishedAt?: string;
    updatedAt?: string;
}

export interface Body2Button {
    label: string;
    link: string;
    color: string;
}

export interface Body2Config {
    showHeading: boolean;
    heading: string;
    bodyText: string;
    buttons: Body2Button[];
}

export interface AppConfig {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    button1: ButtonConfig;
    button2: ButtonConfig;
    theme: ThemeConfig;
    articles: Article[];
    body2: Body2Config;
    aboutTitle: string;
    aboutText: string;
    secondaryButtons: ButtonConfig[];
    fontFamily: string;
}

interface ConfigContextType {
    config: AppConfig;
    updateConfig: (newConfig: AppConfig) => void;
    resetConfig: () => void;
    loading: boolean;
}

const defaultButton1: ButtonConfig = { label: "Enter", link: "#collection", color: "bg-[#3e2723]" };
const defaultButton2: ButtonConfig = { label: "About", link: "#about", color: "bg-[#5d4037]" };

const defaultConfig: AppConfig = {
    heroTitle: "The Hideout.",
    heroSubtitle: "\"A secret sanctuary for the curious mind.\"",
    heroImage: "/hero-bg.png",
    button1: defaultButton1,
    button2: defaultButton2,
    theme: {
        wood: "#1a0f0a",
        gold: "#c5a059",
        light: "#ffb300",
    },
    articles: [],
    body2: {
        showHeading: true,
        heading: "The Librarian's Desk",
        bodyText: "Explore our collection of curated knowledge and timeless wisdom.",
        buttons: [
            { label: "Contact Us", link: "#contact", color: "bg-[#3e2723]" }
        ]
    },
    aboutTitle: "About the Archive",
    aboutText: `
  In the hushed corridors of the grand archive, every shelf whispers stories of ages past, and each tome holds a world waiting to be discovered. As you wander through the marble aisles, the scent of aged paper mingles with the soft glow of amber lamps, inviting you to lose yourself in the timeless pursuit of knowledge.

  The Archive is more than a collection; it is a sanctuary where curiosity is nurtured, and imagination is set free. Here, the rustle of pages becomes a symphony, and the gentle creak of wooden shelves echoes the footsteps of scholars who have walked these halls before you.

  Whether you seek the wisdom of ancient philosophers, the daring adventures of modern storytellers, or the quiet comfort of poetry, the Archive offers a curated journey through the realms of human thought. Each book is meticulously placed, its spine adorned with subtle gold leaf, inviting you to run your fingers along its texture and feel the weight of centuries.

  As you explore, notice the subtle interplay of light and shadow, the delicate dust particles dancing in the air, and the warm tones of walnut and cream that envelop you in a sense of timeless elegance. This is a place where the past meets the present, where the tactile pleasure of holding a physical book merges with the seamless flow of digital discovery.

  Let the Archive be your guide, your refuge, and your inspiration. Open a book, turn a page, and embark on a voyage that transcends time.
  `,
    secondaryButtons: [
        { label: "Explore Archives", link: "#collection", color: "bg-[#3e2723]" },
        { label: "Read More", link: "#about", color: "bg-[#5d4037]" }
    ],
    fontFamily: "Playfair Display"
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState<AppConfig>(defaultConfig);
    const [loading, setLoading] = useState(true);

    // Load config from Supabase on mount
    useEffect(() => {
        const loadConfig = async () => {
            try {
                // Try to load from Supabase
                const supabaseConfig = await getConfig();

                if (supabaseConfig && supabaseConfig.data) {
                    // Merge with default config to ensure all fields exist
                    setConfig({ ...defaultConfig, ...supabaseConfig.data });
                } else {
                    // Fallback to localStorage if Supabase fails
                    const saved = localStorage.getItem('library-config');
                    if (saved) {
                        setConfig(JSON.parse(saved));
                    }
                }
            } catch (error) {
                console.error('Error loading config:', error);
                // Fallback to localStorage
                const saved = localStorage.getItem('library-config');
                if (saved) {
                    setConfig(JSON.parse(saved));
                }
            } finally {
                setLoading(false);
            }
        };

        loadConfig();
    }, []);

    // Update CSS variables when config changes
    useEffect(() => {
        if (loading) return;

        // Save to localStorage as backup
        localStorage.setItem('library-config', JSON.stringify(config));

        // Update CSS variables for theme
        const root = document.documentElement;
        root.style.setProperty('--color-library-walnut', config.theme.wood);
        root.style.setProperty('--color-library-gold', config.theme.gold);
        root.style.setProperty('--color-library-light', config.theme.light);

        // Update font family
        root.style.setProperty('--font-serif', `"${config.fontFamily}", serif`);

    }, [config, loading]);

    const updateConfig = async (newConfig: AppConfig) => {
        setConfig(newConfig);

        try {
            // Save to Supabase
            await updateConfigData(newConfig);
        } catch (error) {
            console.error('Error saving to Supabase:', error);
            // Config is still saved to localStorage via useEffect
        }
    };

    const resetConfig = async () => {
        setConfig(defaultConfig);

        try {
            // Reset in Supabase
            await updateConfigData(defaultConfig);
        } catch (error) {
            console.error('Error resetting in Supabase:', error);
        }
    };

    return (
        <ConfigContext.Provider value={{ config, updateConfig, resetConfig, loading }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};
