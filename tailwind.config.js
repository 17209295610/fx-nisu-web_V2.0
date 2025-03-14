/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#8B4513',  // 泥土棕色
          'light': '#A0522D',  // 浅泥土色
          'dark': '#654321',   // 深泥土色
        },
        'secondary': '#DEB887',  // 实木色
        'accent': '#CD853F',    // 秋麦色
        'bg': {
          'primary': '#FDF5E6',   // 浅米色背景
          'secondary': '#FAF0E6',  // 亚麻色背景
        },
        'text': {
          'primary': '#5C4033',   // 深棕色文字
          'secondary': '#8B7355',  // 中棕色文字
          'light': '#D2B48C',     // 浅棕色文字
        },
        'border': {
          DEFAULT: '#D2B48C',     // 浅棕色边框
          'light': '#DEB887',     // 更浅的边框色
        },
      },
      boxShadow: {
        'clay': '0 4px 6px -1px rgba(139, 69, 19, 0.1), 0 2px 4px -1px rgba(139, 69, 19, 0.06)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}

