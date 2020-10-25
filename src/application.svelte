{#each hierarchy as { component, children, props }}
    <svelte:component this={component} {children} {...props}/>
{/each}

<script>
    import Xct from "xstate-component-tree";
    import state from "shared/stores/state.js";

    let hierarchy = [];

    // Let's just instantiate a tree here in this component
    // and let the structure cascade downward.
    new Xct(state.service, (tree) => {
        hierarchy = tree;
    });
</script>
