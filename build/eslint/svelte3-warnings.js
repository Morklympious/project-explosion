"use strict";

/**
 * Since this project uses modular CSS, and modular CSS injects
 * a css variable when processing, we need to tell eslint `css` is
 * global
 */
const GLOBALS = [
    "css",
];

const IGNORED_SVELTE3_WARNINGS = new Map([
    [
        "missing-declaration",
        GLOBALS.map((flag) => ({
            message : `'${flag}' is not defined`,
        })),
    ],
]);

// All the fields must match
const compare = (config, warning) => Object.entries(config).every(([ key, value ]) => warning[key].startsWith(value));

module.exports = (warning) => {
    const { code } = warning;
    
    // Unknown warning, let it through
    if(!IGNORED_SVELTE3_WARNINGS.has(code)) {
        return false;
    }
    
    const details = IGNORED_SVELTE3_WARNINGS.get(code);

    // Don't care about the details, always ignored
    if(typeof details === "boolean") {
        return true;
    }

    if(Array.isArray(details)) {
        return details.some((config) => compare(config, warning));
    }

    return compare(details, warning);
};
