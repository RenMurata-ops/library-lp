import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create client if credentials are provided
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export interface SupabaseConfig {
    id: string;
    data: any;
    created_at: string;
    updated_at: string;
}

export const getConfig = async () => {
    if (!supabase) {
        console.warn('Supabase not configured, using localStorage fallback');
        return null;
    }

    const { data, error } = await supabase
        .from('config')
        .select('*')
        .single();

    if (error) {
        console.error('Error fetching config:', error);
        return null;
    }

    return data;
};

export const updateConfigData = async (configData: any) => {
    if (!supabase) {
        console.warn('Supabase not configured, changes will only be saved to localStorage');
        return null;
    }

    const { data, error } = await supabase
        .from('config')
        .update({
            data: configData,
            updated_at: new Date().toISOString()
        })
        .eq('id', (await getConfig())?.id)
        .select()
        .single();

    if (error) {
        console.error('Error updating config:', error);
        return null;
    }

    return data;
};
