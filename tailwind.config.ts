import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
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
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					blue: 'var(--secondary-blue)',
					gray: 'var(--secondary-gray)',
					cream: 'var(--secondary-cream)',
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					orange: 'var(--accent-orange)',
					blue: 'var(--accent-blue)',
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				feedback: {
					error: 'var(--error-color)',
					warning: 'var(--warning-color)',
					success: 'var(--success-color)',
					info: 'var(--info-color)'
				},
				foreground: 'hsl(var(--foreground))',
				background: 'hsl(var(--background))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				'crimson-red': 'hsl(356, 75%, 53%)',
				'golden-yellow': 'hsl(45, 100%, 50%)',
				'forest-green': 'hsl(168, 47%, 42%)',
				'slate-blue': 'hsl(210, 29%, 28%)',
				'warm-gray': 'hsl(0, 0%, 90%)',
				'cream-white': 'hsl(10, 50%, 94%)',
				'amber-orange': 'hsl(30, 95%, 55%)',
				'sky-blue': 'hsl(217, 91%, 60%)',
				'dark-gray': 'hsl(0, 0%, 20%)',
				'light-gray': 'hsl(0, 0%, 40%)',
				'softer-red': 'hsl(356, 75%, 60%)',
				'darker-blue': 'hsl(210, 29%, 18%)',
				'charcoal-black': 'hsl(240, 10%, 10%)',
				'lighter-blue': 'hsl(217, 91%, 70%)',
				'medium-gray': 'hsl(0, 0%, 40%)',
				'subtle-white': 'hsl(0, 0%, 90%)',
				'subtle-secondary': 'hsl(0, 0%, 70%)',
				'light-charcoal-black': 'hsl(240, 10%, 15%)',
				'dark-teal-blue': 'hsl(196, 38%, 24%)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
