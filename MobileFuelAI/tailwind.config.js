/** @type {import('tailwindcss').Config} */
module.exports = {
    // Allows for accessing colors we will be utilizing across the app anywhere within the application.
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
                accent: '#491ebb'
            }
        },
    },
    plugins: [],
};
