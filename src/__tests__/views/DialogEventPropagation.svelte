<script>
  import { DialogOverlay, DialogContent } from '../../';

  export let windowClickSpy;

  let isOpen = true;

  const hideDialog = () => {
    isOpen = false;
  };
</script>

<svelte:window on:click={windowClickSpy} />

<DialogOverlay
  {...$$restProps}
  isOpen={isOpen}
  onDismiss={hideDialog}
  data-testid="overlay"
>
  <DialogContent>
    <button on:click={hideDialog}>Close Dialog</button>
  </DialogContent>
</DialogOverlay>
