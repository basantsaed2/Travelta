/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        TextFontLight: ["Light"],
        TextFontRegular: ["Regular"],
        TextFontMedium: ["Medium"],
        TextFontSemiBold: ["SemiBold"],
        TextFontBold: ["Bold"],
      },
      colors: {
        mainColor: "#0D47A1",
        secoundColor: "#888888",
        thirdColor: "#6B6A6A",
        AddText: "#5E5E5E",
      },
      boxShadow: {
        '4xl': '0 10px 30px rgba(0, 0, 0, 0.5)', // Customize this as needed
      },
      backgroundColor: {
        mainBgColor: "#E5ECF6",
        secoundBgColor: "#F5F5F5",
        thirdBgColor: "#9D9D9D",
        fourthColor:'#E7F1F8',
        AddButton: "#ffffff",
      },
      screens: {
        sm: "320px",
        md: "640px",
        lg: "740px",
        xl: "1280px",
        // "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
