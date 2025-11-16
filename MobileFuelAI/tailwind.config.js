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
                dark: {
                    100: '#422ad5',
                    200: '#bca8df',
                },
                light: {
                    100: '#f88f07',
                    200: '#e1b69a',
                },
                // Accent color requested by the boyyyy.
                accent: '#491ebb'
            }
        },
    },
    plugins: [],
};
