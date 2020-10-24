import statechart from "shared/machines/state.machine.js";
import storify from "shared/utilities/statechart-as-store.js";

const machine = storify(statechart);

// Just start our basic statechart immediately after we create a store out of it.
machine.start();

export default machine;

