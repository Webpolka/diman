/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/html/**/*.html", "./src/js/*.js", "./src/js/**/*.js"],
	theme: {
		extend: {
			colors: {
				white: "white",
				black: "black",
				transparent: "transparent",
				accent: "#e30000",
			},
		},
		fontFamily: {
			title: ["Montserrat", "sans-serif"],
			main: ["Roboto", "sans-serif"],
		},
	},
	plugins: [],
};
