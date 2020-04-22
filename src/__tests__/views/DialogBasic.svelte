<script>
  import { DialogOverlay, DialogContent } from '../../';

  export let isOpen = false;
  export let onDismiss = null;

  const showDialog = () => {
    isOpen = true;
  };

  const hideDialog = () => {
    isOpen = false;
  };

  const handleDismiss = () => {
    if (typeof onDismiss === 'function') {
      onDismiss();
    }

    hideDialog();
  }
</script>

<button on:click={showDialog}>Show Dialog</button>

<DialogOverlay
  {...$$restProps}
  {isOpen}
  onDismiss={handleDismiss}
  data-testid="overlay"
>
  <DialogContent>
    <button on:click={hideDialog}>Close Dialog</button>
    <input type="text" data-testid="input" />
  </DialogContent>
</DialogOverlay>
