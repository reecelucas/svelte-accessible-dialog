<script>
  import { DialogOverlay, DialogContent } from '../../';

  let initialFocusElement;

  const onDismiss = () => ({});
</script>

<DialogOverlay isOpen={true} {onDismiss} {initialFocusElement}>
  <DialogContent>
    <button>Close Dialog</button>
    <h2>I am a dialog</h2>
    <button bind:this={initialFocusElement}>
      Useless Button
    </button>
  </DialogContent>
</DialogOverlay>
