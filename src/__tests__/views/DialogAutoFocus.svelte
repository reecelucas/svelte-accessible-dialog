<script>
  import { DialogOverlay, DialogContent } from '../../';

  const onDismiss = () => ({});
</script>

<DialogOverlay isOpen={true} {onDismiss}>
  <DialogContent>
    <button>Close Dialog</button>
    <h2>I am a dialog</h2>

    <!-- svelte-ignore a11y-autofocus -->
    <input type="text" value="Useless input one"  autofocus />

    <!-- svelte-ignore a11y-autofocus -->
    <input type="text" value="Useless input two"  autofocus />
  </DialogContent>
</DialogOverlay>
