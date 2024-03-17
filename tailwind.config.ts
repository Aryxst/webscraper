import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
export default {
 darkMode: 'class',
 content: ['./src/views/**/*.html'],
 theme: {
  extend: {
   backgroundImage: {
    'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
   },
  },
 },
 plugins: [
  require('autoprefixer'),
  require('flowbite/plugin'),
  plugin(function ({ addBase, theme }) {
   addBase({
    h1: { fontSize: '32px', lineHeight: '44.8px' },
    h2: { fontSize: '20px' },
    h3: { fontSize: '18px' },
   });
  }),
 ],
} as Config;
