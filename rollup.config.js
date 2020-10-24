const path = require("path");
const { preprocess, processor } = require("@modular-css/svelte")();

const watching = process.env.ROLLUP_WATCH;

module.exports = {
    input : "./src/application.js",

    output : {
        file      : "./dist/bundle.js",
        format    : "es",
        name      : "explosion",
        sourcemap : "inline",
    },

    plugins : [
        // Play nice with the Node.js ecosystem
        require("@rollup/plugin-node-resolve").nodeResolve(),

        // Modules -> CommonJS
        require("@rollup/plugin-commonjs")(),

        // Alias magic strings to common folders
        require("@rollup/plugin-alias")({
            entries : {
                components : path.resolve(__dirname, "./src/components"),
                shared     : path.resolve(__dirname, "./src/shared"),
            },
        }),

        // Svelte 3 -> JS
        require("rollup-plugin-svelte")({
            preprocess,
            dev        : true,
            extensions : [ ".svelte" ],
            css        : false,
        }),

        // Support <link> tags in svelte components
        require("@modular-css/rollup")({
            processor,
        }),

        // Dynamic imported components -> Lazyload their CSS
        require("@modular-css/rollup-rewriter")({
            loader : `import lazyLoadCSS from "./build/lazyload-css.js";`,
            loadfn : "lazyLoadCSS",
        }),

        // ES2015 -> ,ES5
        require("rollup-plugin-babel")({
            exclude : "node_modules/**",
        }),

        require("./build/generate-html.js")(),

        watching && require("rollup-plugin-serve")("dist"),
    ],
};
