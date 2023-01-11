/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "plus-jakarta-sans": ["Plus Jakarta Sans"],
    },
    colors: {
      "kanban-main-purple": "#635FC7",
      "kanban-main-purple-hover": "#A8A4FF",
      "kanban-black": "#000112",
      "kanban-dark-grey": "#2B2C37",
      "kanban-lines-dark": "#3E3F4E",
      "kanban-lines-light": "#343BFA",
      "kanban-medium-grey": "#828FA3",
      "kanban-dark-gray": "#F4F7FD",
      "kanban-white": "#FFFFFF",
      "kanban-light-grey-bg": "#F4F7FD",
      "kanban-red": "#EA5555",
      "kanban-red-hover": "#FF9898",
    },
    extend: {},
  },
  plugins: [],
};
