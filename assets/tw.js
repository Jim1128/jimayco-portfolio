/* Apply saved theme ASAP (runs in <head>, prevents flash) */
(function () {
    try {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    } catch (e) { }
})();

/* Shared Tailwind CDN config — white & blue design system */
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                },
                navy: {
                    900: '#0b1220',
                    800: '#0f172a',
                    700: '#1e293b',
                },
            },
            boxShadow: {
                soft: '0 1px 3px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.12)',
                lift: '0 10px 30px -12px rgba(37,99,235,0.25)',
            },
        },
    },
};
