/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "plus-jakarta-sans": ["Plus Jakarta Sans"],
    },
    extend: {
      colors: {
        "kanban-main-purple": "#635FC7",
        "kanban-main-purple-hover": "#A8A4FF",
        "kanban-black": "#000112",
        "kanban-dark-grey": "#2B2C37",
        "kanban-lines-dark": "#3E3F4E",
        "kanban-lines-light": "#E4EBFA",
        "kanban-medium-grey": "#828FA3",
        "kanban-dark-gray": "#F4F7FD",
        "kanban-very-dark-gray": "#20212C",
        "kanban-white": "#FFFFFF",
        "kanban-light-grey-bg": "#F4F7FD",
        "kanban-red": "#EA5555",
        "kanban-red-hover": "#FF9898",
      },
    },
  },
  plugins: [],
};
