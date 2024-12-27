import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: 'var(--primary-red)',
          yellow: 'var(--primary-yellow)',
          green: 'var(--primary-green)',
        },
        secondary: {
          blue: 'var(--secondary-blue)',
          gray: 'var(--secondary-gray)',
          cream: 'var(--secondary-cream)',
        },
        accent: {
          orange: 'var(--accent-orange)',
          blue: 'var(--accent-blue)',
        },
        feedback: {
          error: 'var(--error-color)',
          warning: 'var(--warning-color)',
          success: 'var(--success-color)',
          info: 'var(--info-color)',
        },
        foreground: {
          primary: 'var(--foreground)',
          secondary: 'var(--foreground-secondary)',
        },
        background: {
          primary: 'var(--background)',
          section: 'var(--background-section)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
