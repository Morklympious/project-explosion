import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import mcsssvelte from "@modular-css/svelte";
import mcssrollup from "@modular-css/rollup";
import svelte from "rollup-plugin-svelte";
 
const { preprocess, processor } = mcsssvelte({ verbose : true });

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

            // // Write out JSON representation of selectors in test mode
            // json : ISTEST,

            // Don't need this, I don't think
            // meta : false,

            // Don't write out empty files, our GT implementation won't load 'em anyways
            // empties : false,

            // We never use named exports, so avoid all the "this name isn't a valid JS identifier" warnings
            // by just disabling them
            // namedExports : false,
        }),

        // Turns es2015 into ES5
        babel({
            exclude : "node_modules/**",
        }),
    ],
};
