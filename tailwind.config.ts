import type {Config} from "tailwindcss"

const config = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                'melon': {
                    DEFAULT: '#ffa69e',
                    100: '#530700',
                    200: '#a50e00',
                    300: '#f81500',
                    400: '#ff5a4b',
                    500: '#ffa69e',
                    600: '#ffb8b1',
                    700: '#ffcac5',
                    800: '#ffdbd8',
                    900: '#ffedec'
                },
                'eggshell': {
                    DEFAULT: '#faf3dd',
                    100: '#52410c',
                    200: '#a38318',
                    300: '#e1ba38',
                    400: '#edd68a',
                    500: '#faf3dd',
                    600: '#fbf5e3',
                    700: '#fcf8ea',
                    800: '#fdfaf1',
                    900: '#fefdf8'
                },
                'celeste': {
                    DEFAULT: '#b8f2e6',
                    100: '#0d483d',
                    200: '#1b9179',
                    300: '#29d8b5',
                    400: '#72e5ce',
                    500: '#b8f2e6',
                    600: '#c8f5ec',
                    700: '#d6f7f1',
                    800: '#e3faf5',
                    900: '#f1fcfa'
                },
                'light_blue': {
                    DEFAULT: '#aed9e0',
                    100: '#16353a',
                    200: '#2c6a73',
                    300: '#429fad',
                    400: '#74bfca',
                    500: '#aed9e0',
                    600: '#bee1e6',
                    700: '#cee8ec',
                    800: '#def0f3',
                    900: '#eff7f9'
                },
                'paynes_gray': {
                    DEFAULT: '#5e6472',
                    100: '#131417',
                    200: '#26282e',
                    300: '#383c45',
                    400: '#4b505c',
                    500: '#5e6472',
                    600: '#7b8293',
                    700: '#9ca1ae',
                    800: '#bdc0c9',
                    900: '#dee0e4'
                },
                'persian-blue': {
                    50: '#eaf4ff',
                    100: '#d9eaff',
                    200: '#bad6ff',
                    300: '#90baff',
                    400: '#6590ff',
                    500: '#4168ff',
                    600: '#203aff',
                    700: '#152aed',
                    800: '#162bca',
                    900: '#1a2b95',
                    950: '#101856',
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: {height: "0"},
                    to: {height: "var(--radix-accordion-content-height)"},
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: "0"},
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require('daisyui')],

    daisyui: {
        themes: ["dracula", "winter"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: "dracula", // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ":root", // The element that receives theme color CSS variables
    },
} satisfies Config

export default config
