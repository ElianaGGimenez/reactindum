// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f5f5f7",
        primary: "#d97706",
        secondary: "#6366f1",
        text: "#1f2937",
        muted: "#6b7280"
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        soft: "0 15px 35px rgba(31,41,55,0.08)",
      },
    },
  },
  plugins: [],
};
