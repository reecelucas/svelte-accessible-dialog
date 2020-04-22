<script>
  import { DialogOverlay, DialogContent } from '../../';

  const onDismiss = () => ({});
</script>

<DialogOverlay isOpen={true} {onDismiss}>
  <DialogContent aria-label="dialog-title">
    <button>Close Dialog</button>
    <h2>I am a dialog</h2>
  </DialogContent>
</DialogOverlay>
