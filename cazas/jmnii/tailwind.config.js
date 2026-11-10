/** Tailwind build for the JMNII site — run: npx tailwindcss@3.4.16 -i assets/tailwind.src.css -o assets/tailwind.css --minify */
module.exports = {
  content: ['./index.html', './privacy.html'],
  theme: {
    extend: {
      colors: {
        black: '#0B0B0B',     // deep black — primary background
        charcoal: '#141414',  // charcoal — alternate sections
        graphite: '#2B2B2B',  // graphite — surfaces, cards, rules
        ivory: '#FBF9F6',     // warm ivory — type
        silver: '#B9B8B4'     // brushed silver — accents
      },
      fontFamily: { jakarta: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] }
    }
  }
};
