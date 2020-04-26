<script>
  import { DialogOverlay, DialogContent } from '../../';

  export let includeTabbableChildren = true;

  let initialFocusElement;

  const onDismiss = () => ({});
</script>

<DialogOverlay isOpen={true} {onDismiss} {initialFocusElement}>
  <DialogContent>
    {#if includeTabbableChildren}
      <button>Close Dialog</button>
      <h2>I am a dialog</h2>
      <button bind:this={initialFocusElement}>
        Useless Button
      </button>
    {:else}
      <h2>I am a dialog</h2>
    {/if}
  </DialogContent>
</DialogOverlay>
