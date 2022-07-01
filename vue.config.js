// const plugins = [];

// if (process.env.NODE_ENV === 'production') {
// 	// Only import when needed
//     const { join } = require('path');
// 	const PrerenderPlugin = require('prerender-spa-plugin');
// 	const renderer = PrerenderPlugin.PuppeteerRenderer;

//     //Add the prerender plugin to the plugins array
// 	plugins.unshift(
// 		new PrerenderPlugin({
// 			staticDir: join(__dirname, 'dist'), //Vue's build folder
// 			routes: ['/provoles'], //Only render the homepage
// 		})
// 	);
// }

// module.exports = {
// 	transpileDependencies: ['vuetify'],
// 	configureWebpack(config) {
// 		config.plugins = [...config.plugins, ...plugins];
// 	},
// };