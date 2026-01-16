/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        // Primary
        'paros-white': '#FFFFFF',
        // Secondary
        'paros-blue': '#0B95BC',
        'paros-teal': '#79A3A1',
        // Accent
        'paros-black': '#000000',
        // Supporting colors (derived from brand)
        'paros-cream': '#F8F8F8',
        'paros-light-blue': '#4DB8D4',
        'paros-dark-blue': '#087A9A',
        'paros-gray': '#6B6B6B',
        'paros-light-gray': '#EBEBEB',
      },
      backgroundImage: {
        'paros-gradient': 'linear-gradient(135deg, #79A3A1 0%, #0B95BC 100%)',
        'paros-gradient-subtle': 'linear-gradient(135deg, rgba(121,163,161,0.1) 0%, rgba(11,149,188,0.15) 100%)',
        'paros-gradient-dark': 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(11,149,188,0.3) 100%)',
      },
    },
  },
  plugins: [],
}
