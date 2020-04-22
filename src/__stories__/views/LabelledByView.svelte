<script>
  import { DialogOverlay, DialogContent } from "../../";
  import ScrollWrapper from "../helpers/ScrollWrapper.svelte";

  let isOpen = false;

  const closeDialog = () => {
    isOpen = false;
  };

  const openDialog = () => {
    isOpen = true;
  };
</script>

<ScrollWrapper>
  <button on:click={openDialog}>Open Dialog</button>

  <DialogOverlay {isOpen} onDismiss={closeDialog}>
    <DialogContent aria-labelledby="dialog-title">
      <button on:click={closeDialog}>close modal</button>
      <h2 id="dialog-title">I am a dialog</h2>
    </DialogContent>
  </DialogOverlay>
</ScrollWrapper>
