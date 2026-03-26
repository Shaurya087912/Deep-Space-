/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
      fontFamily: {
        orbitron: ['var(--font-orbitron)'],
        inter: ['var(--font-inter)'],
        poppins: ['var(--font-poppins)'],
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
        neon: {
          purple: 'hsl(var(--neon-purple))',
          blue: 'hsl(var(--neon-blue))',
          pink: 'hsl(var(--neon-pink))',
          cyan: 'hsl(var(--neon-cyan))',
        },
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  safelist: [
    'from-neon-purple/20',
    'from-neon-blue/20',
    'from-neon-pink/20',
    'from-neon-cyan/20',
    'to-transparent',
    'border-neon-purple/30',
    'border-neon-blue/30',
    'border-neon-pink/30',
    'border-neon-cyan/30',
    'text-neon-purple',
    'text-neon-blue',
    'text-neon-pink',
    'text-neon-cyan',
    'shadow-neon-purple/20',
    'shadow-neon-blue/20',
    'shadow-neon-pink/20',
    'shadow-neon-cyan/20',
    'shadow-neon-purple/30',
    'shadow-neon-blue/30',
    'shadow-neon-pink/30',
    'shadow-neon-cyan/30',
    'hover:shadow-neon-purple/40',
    'hover:shadow-neon-blue/40',
    'hover:shadow-neon-pink/40',
    'hover:shadow-neon-cyan/40',
    'hover:border-neon-purple/50',
    'hover:border-neon-blue/50',
    'hover:border-neon-pink/50',
    'hover:border-neon-cyan/50',
    'bg-neon-purple/10',
    'bg-neon-blue/10',
    'bg-neon-pink/10',
    'bg-neon-cyan/10',
    'bg-neon-purple',
    'bg-neon-blue',
    'bg-neon-pink',
    'bg-neon-cyan',
  ],
  plugins: [require("tailwindcss-animate")],
}
