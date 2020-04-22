<script>
  import { DialogOverlay, DialogContent } from '../../';

  const onDismiss = () => ({});
</script>

<DialogOverlay isOpen={true} {onDismiss}>
  <DialogContent aria-labelledby="dialog-title">
    <button>Close Dialog</button>
    <h2 id="dialog-title">I am a dialog title</h2>
  </DialogContent>
</DialogOverlay>
