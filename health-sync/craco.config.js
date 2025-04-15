const purgecss = require('@fullhuman/postcss-purgecss').default;
const autoprefixer = require('autoprefixer');

const purgecssPlugin = purgecss({
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  safelist: ['safe-class'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  style: {
    postcss: {
      plugins: [
        autoprefixer,
        ...(process.env.NODE_ENV === 'production' ? [purgecssPlugin] : []),
      ],
    },
  },
};



