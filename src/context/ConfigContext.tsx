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
                    setConfig(supabaseConfig.data);
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
