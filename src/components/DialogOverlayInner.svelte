<script>
  import TrapScreenReader from "./TrapScreenReader.svelte";
  import TrapFocus from "./TrapFocus.svelte";
  import LockScroll from "./LockScroll.svelte";

  // Props
  export let onDismiss;
  export let initialFocusElement;
  export let returnFocusElement;
  export let ariaModalLegacy;

  const handleClick = () => {
    onDismiss();
  }

  const handleKeydown = (event) => {
    if (event.key === "Escape") {
      onDismiss();
    }
  }
</script>

<style>
  div {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<TrapScreenReader enabled={ariaModalLegacy}>
  <TrapFocus {initialFocusElement} {returnFocusElement}>
    <LockScroll>
      <div
        {...$$restProps}
        data-svelte-dialog-overlay
        on:click|self|stopPropagation={handleClick}
      >
        <slot />
      </div>
    </LockScroll>
  </TrapFocus>
</TrapScreenReader>
