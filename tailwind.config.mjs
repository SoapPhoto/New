/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/.{js,ts,jsx,tsx,mdx}',
    './src/components//*.{js,ts,jsx,tsx,mdx}',
    './src/context//*.{js,ts,jsx,tsx,mdx}',
  ],
  // Explicitly defining layer order to ensure utilities override base
  layers: {
    theme: {},
    base: {},
    components: {},
    utilities: {},
  },
  theme: {
    extend: {
    },
    plugins: [],
  },
}
