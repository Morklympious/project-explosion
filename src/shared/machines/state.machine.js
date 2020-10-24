import { Machine as m } from "xstate";

import c from "shared/component.js";
import Component from "components/component.svelte";

const machine = m({
    id      : "statechart",
    initial : "home",

    states : {
        home : c(Component),
    },
});

export default machine;
