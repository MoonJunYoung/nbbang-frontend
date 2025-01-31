export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontSize: {
                xxs: ['0.625rem', '0.75rem'],
                s: ['0.8125rem', '1rem'],
                m: ['0.9375rem', '1.25rem'],
                l: ['1.0625rem', '1.375rem'],
                ll: ['1.1875rem', '1.5rem'],
                '1xl': ['1.375rem', '1.625rem'],
            },
            colors: {
                main: {
                    blue: '#0066FF',
                },
                borderRadius: {
                    lg: 'var(--radius)',
                    md: 'calc(var(--radius) - 2px)',
                    sm: 'calc(var(--radius) - 4px)',
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
