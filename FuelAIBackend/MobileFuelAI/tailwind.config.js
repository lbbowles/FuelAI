/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                // Dark mode color
                primary: '#030014',
                // Light mode color
                secondary: '#e8e5e3',
                light: {
                    100: '#422ad5',
                    200: '#A8B5DF',
                    300: '#9CA4AB',
                },
                dark: {
                    100: '#221F3D',
                    200: '#0F0D23',
                },
                // Accent color requested by the boyyyy.
                accent: '#491ebb'
            }
        },
    },
    plugins: [],
};
