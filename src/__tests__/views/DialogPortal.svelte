<script>
  import { DialogOverlay, DialogContent } from '../../';

  export let isOpen = false;

  const hideDialog = () => {
    isOpen = false;
  };
</script>

<div data-testid="parent">
  <DialogOverlay {isOpen} onDismiss={hideDialog} data-testid="overlay">
    <DialogContent>
      <button on:click={hideDialog}>Close Dialog</button>
    </DialogContent>
  </DialogOverlay>
</div>
