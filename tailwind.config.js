/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'input-blue': '0 0 0 1px rgba(5,145,255,.1)',
        'input-red': '0 0 0 1px rgba(255,38,5,.08)',
        'as-card': '0px 1px 1px #091e4240, 0px 0px 1px #091e424f'
      },
      animation: {
        'head-section-bg-fade-in': 'fade-in 2s ease-in-out'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' }
        }
      }
    }
  },
  variants: {
    extend: { opacity: ['disabled'] }
  },
  plugins: ['@tailwindcss/forms'],
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the antd's preflight instead (reset.css).
    preflight: false
  }
};
