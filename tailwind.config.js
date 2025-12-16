/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                library: {
                    bg: 'var(--color-library-paper)',
                    wood: 'var(--color-library-walnut)',
                    gold: 'var(--color-library-gold)',
                    light: 'var(--color-library-light)',
                    text: 'var(--color-library-ink)',
                    accent: 'var(--color-library-leather)',
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            backgroundImage: {
                'paper-texture': "url('/paper-texture.png')", // Placeholder, will use CSS pattern or color
            },
            boxShadow: {
                'glow': '0 0 20px rgba(255, 202, 40, 0.15)', // Warm Amber Glow
                'glow-strong': '0 0 30px rgba(255, 202, 40, 0.3)',
            }
        },
    },
    plugins: [],
}
