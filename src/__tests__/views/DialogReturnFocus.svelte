<script>
  import { DialogOverlay, DialogContent } from '../../';

  let isOpen = false;
  let returnFocusElement;

  const showDialog = () => {
    isOpen = true;
  };

  const hideDialog = () => {
    isOpen = false;
  };
</script>

<button on:click={showDialog}>Show Dialog</button>
<button bind:this={returnFocusElement}>I focus on close</button>

<DialogOverlay
  {isOpen}
  {returnFocusElement}
  onDismiss={hideDialog}
  data-testid="overlay"
>
  <DialogContent>
    <button on:click={hideDialog}>Close Dialog</button>
    <h2>I am a dialog</h2>
  </DialogContent>
</DialogOverlay>
