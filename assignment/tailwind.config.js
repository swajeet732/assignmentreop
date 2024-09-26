/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bodyGradientStart: '#081221',
        bodyGradientEnd: '#03080f',
        cardBackground: '#0e1a2b',
        headingText: '#ffffff',
        bodyText: '#c1d1e8',
        inputBackground: '#182c47',
        buttonBlue: '#5692e8',
      },
      backgroundImage: {
        'body-gradient': 'linear-gradient(to bottom, #081221, #03080f)', // Custom gradient
      },
    },
  },
  plugins: [],
};
