const POSTGREST_URL = import.meta.env.VITE_POSTGREST_URL || '';

export interface DatabaseConfig {
    id: string;
    data: any;
    created_at: string;
    updated_at: string;
}

export const getConfig = async (): Promise<any | null> => {
    if (!POSTGREST_URL) {
        console.warn('PostgREST not configured, using localStorage fallback');
        return null;
    }

    try {
        const response = await fetch(`${POSTGREST_URL}/config?limit=1`, {
            headers: {
                'Accept': 'application/json',
                'Prefer': 'return=representation'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: DatabaseConfig[] = await response.json();
        return data[0] || null;
    } catch (error) {
        console.error('Error fetching config:', error);
        return null;
    }
};

export const updateConfigData = async (configData: any): Promise<any | null> => {
    if (!POSTGREST_URL) {
        console.warn('PostgREST not configured, changes will only be saved to localStorage');
        return null;
    }

    try {
        // 既存のconfigを取得
        const existing = await getConfig();

        if (!existing) {
            // 新規作成
            const response = await fetch(`${POSTGREST_URL}/config`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({ data: configData })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: DatabaseConfig[] = await response.json();
            return data[0];
        } else {
            // 更新
            const response = await fetch(`${POSTGREST_URL}/config?id=eq.${existing.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({
                    data: configData,
                    updated_at: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: DatabaseConfig[] = await response.json();
            return data[0];
        }
    } catch (error) {
        console.error('Error updating config:', error);
        return null;
    }
};
