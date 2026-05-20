
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				mosaic: {
					'primary': 'hsl(274 47% 22%)',     // Deep aubergine purple
					'secondary': 'hsl(39 65% 52%)',    // Warm gold
					'accent': 'hsl(39 65% 62%)',       // Light gold accent
					'light': 'hsl(40 33% 97%)',        // Cream
					'dark': 'hsl(274 47% 10%)',        // Deep aubergine ink
					'cream': 'hsl(40 33% 94%)',
					'ink': 'hsl(274 35% 12%)',
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
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				},
				'zoom-in': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'float-slow': {
					'0%, 100%': {
						transform: 'translateY(0) scale(1)',
						opacity: '0.6'
					},
					'50%': {
						transform: 'translateY(-20px) scale(1.05)',
						opacity: '0.8'
					}
				},
				'bounce-slow': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-15px)'
					}
				},
				'gradient-x': {
					'0%, 100%': {
						'background-position': '0% 50%'
					},
					'50%': {
						'background-position': '100% 50%'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						'text-shadow': '0 0 5px hsl(40 80% 50% / 0.5), 0 0 10px hsl(40 80% 50% / 0.3), 0 0 15px hsl(40 80% 50% / 0.2)'
					},
					'50%': {
						'text-shadow': '0 0 10px hsl(40 80% 50% / 0.8), 0 0 20px hsl(40 80% 50% / 0.5), 0 0 30px hsl(40 80% 50% / 0.3)'
					}
				},
				'fade-out-up': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(-20px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'scale-in': 'scale-in 0.7s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'zoom-in': 'zoom-in 0.6s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'float-slow': 'float-slow 8s ease-in-out infinite',
				'fade-out-up': 'fade-out-up 0.5s ease-out forwards'
			},
			fontFamily: {
				'display': ['Fraunces', '"Playfair Display"', 'Georgia', 'serif'],
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'playfair': ['"Playfair Display"', 'serif'],
				'raleway': ['Raleway', 'sans-serif'],
				'montserrat': ['Montserrat', 'sans-serif'],
				'fraunces': ['Fraunces', 'serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
