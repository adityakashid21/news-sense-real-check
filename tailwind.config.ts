import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				danger: {
					DEFAULT: 'hsl(var(--danger))',
					foreground: 'hsl(var(--danger-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'float-gentle': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'25%': { transform: 'translateY(-10px) rotate(1deg)' },
					'50%': { transform: 'translateY(-5px) rotate(0deg)' },
					'75%': { transform: 'translateY(-15px) rotate(-1deg)' }
				},
				'float-medium': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg) scale(1)' },
					'25%': { transform: 'translateY(-15px) rotate(2deg) scale(1.02)' },
					'50%': { transform: 'translateY(-10px) rotate(0deg) scale(1.01)' },
					'75%': { transform: 'translateY(-20px) rotate(-2deg) scale(1.03)' }
				},
				'float-intense': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg) scale(1)' },
					'33%': { transform: 'translateY(-25px) rotate(3deg) scale(1.05)' },
					'66%': { transform: 'translateY(-15px) rotate(-3deg) scale(1.03)' }
				},
				'magical-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 0 1px hsl(var(--primary) / 0.1), 0 8px 32px hsl(var(--primary) / 0.2)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 0 1px hsl(var(--primary) / 0.1), 0 8px 32px hsl(var(--primary) / 0.2), 0 0 40px hsl(var(--primary) / 0.3)',
						transform: 'scale(1.02)'
					}
				},
				'aurora-shift': {
					'0%, 100%': { filter: 'hue-rotate(0deg)' },
					'50%': { filter: 'hue-rotate(90deg)' }
				},
				'particle-sweep': {
					'0%': { left: '-100%' },
					'100%': { left: '100%' }
				},
				'cyber-glitch': {
					'0%, 100%': { transform: 'translateX(0)' },
					'20%': { transform: 'translateX(-2px)' },
					'40%': { transform: 'translateX(2px)' },
					'60%': { transform: 'translateX(-1px)' },
					'80%': { transform: 'translateX(1px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'float-gentle': 'float-gentle 6s ease-in-out infinite',
				'float-medium': 'float-medium 4s ease-in-out infinite',
				'float-intense': 'float-intense 3s ease-in-out infinite',
				'magical-pulse': 'magical-pulse 2s ease-in-out infinite',
				'aurora-shift': 'aurora-shift 3s ease-in-out infinite',
				'particle-sweep': 'particle-sweep 2s infinite',
				'cyber-glitch': 'cyber-glitch 0.3s ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
