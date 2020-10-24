{#each hierarchy as { component, children, props }}
    <svelte:component this={component} {children} {...props}/>
{/each}

<script>
    import Xct from "xstate-component-tree";
    import state from "shared/stores/state.js";

    let hierarchy = [];

    new Xct(state.service, (tree) => {
        hierarchy = tree;
    });
</script>
