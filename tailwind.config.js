/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "c-xs": "360px",
        "c-sm": "576px",
        "c-md": "768px",
        "c-lg": "992px",
        "c-xl": "1200px",
        "c-xxl": "1400px",
        "c-xxxl": "1600px",
      },
      colors: {
        "brand-blue": "#0146b3",
        "brand-blue-hovered": "#003488",
        "brand-accent": "#0146b3",
        "brand-deep": "#0146b3",
        "brand-dark": "#0146b3",
        "brand-light-cyan": "#4a8dd9",
        "brand-peach": "#F2C288",
        sage: {
          50: "#f4f7f5",
          100: "#e9f0eb",
          200: "#d3e1d7",
          300: "#b1c9b9",
          400: "#8fb39c",
          500: "#71987f",
          600: "#5a7a66",
          700: "#486151",
          800: "#3a4e41",
          900: "#314036",
        },
        aurora: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        cosmic: {
          900: "#0f172a",
          800: "#1e1b4b",
          700: "#312e81",
        },
        ice: {
          100: "#e0f2fe",
          200: "#bae6fd",
        },
        divine: {
          50: "#faf9f6",
          100: "#f0eee9",
          200: "#e5e1d8",
        },
        gold: {
          400: "#d4af37",
          500: "#c5a028",
          600: "#b8941f",
        },
        burgundy: {
          500: "#800020",
          600: "#6b001a",
          700: "#5a0016",
        },
        sapphire: {
          500: "#0f52ba",
          600: "#0c4194",
          700: "#093678",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shine: {
          "100%": { left: "125%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(168, 85, 247, 0.8)" },
        },
        "slide-in-up": {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "float-solo": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "gentle-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "fade-in-divine": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down .4s ease-out",
        "accordion-up": "accordion-up .4s ease-out",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        fadeIn: "fadeIn 0.3s ease-in-out",
        shine: "shine 1s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        "bounce-subtle": "bounce-subtle 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-in-up": "slide-in-up 0.8s ease-out forwards",
        "float-solo": "float-solo 6s ease-in-out infinite",
        "gentle-float": "gentle-float 8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "fade-in-divine": "fade-in-divine 1.5s ease-out forwards",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-poppins)", "sans-serif"],
        "great-vibes": ["var(--font-great-vibes)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
