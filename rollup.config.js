import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import mcsssvelte from "@modular-css/svelte";
import mcssrollup from "@modular-css/rollup";
import svelte from "rollup-plugin-svelte";
 
const { preprocess, processor } = mcsssvelte();

const watching = process.env.ROLLUP_WATCH;

export default {
    input : "./src/application.js",

    output : {
        file      : "./dist/bundle.js",
        format    : "iife",
        name      : "explosion",
        sourcemap : "inline",
    },

    plugins : [
        // Play nice with the Node.js ecosystem
        resolve({
            browser : true
        }),

        commonjs(),

        // Process svelte3 components into JS
        svelte({
            preprocess,

            extensions : [ ".svelte" ],
            css        : false,
        }),

        // Wire up modular-css to rollup build lifecycle
        mcssrollup({
            processor,
        }),

        // Turns es2015 into ES5
        babel({
            exclude : "node_modules/**",
            babelHelpers: "bundled", 
        }),
    ],
};
