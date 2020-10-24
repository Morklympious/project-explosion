const { preprocess, processor } = require("@modular-css/svelte")();

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

        // ES2015 -> ES5
        require("@rollup/plugin-buble")({
            // Pretty sure Svelte is outputting for of, so we need this transform.
            transforms : {
                dangerousForOf : true,
            }
        }),

        require("./build/generate-html.js")(),
    ],
};
