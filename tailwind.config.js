/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}"
    
	],
	theme: {
		extend: {
			colors: {
				  'theme-pruple':'#7f52f5',
				  'purple-bg':'392A48',
				  'popup-bg':"rgb(0,0,0,0.8)"
				}
		},
	},
	plugins: [],
};
