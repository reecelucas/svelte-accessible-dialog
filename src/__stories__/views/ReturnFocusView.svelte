<script>
  import { DialogOverlay, DialogContent } from "../../";
  import ScrollWrapper from "../helpers/ScrollWrapper.svelte";

  let isOpen = false;
  let returnFocusElement;

  const closeDialog = () => {
    isOpen = false;
  };

  const openDialog = () => {
    isOpen = true;
  };
</script>

<ScrollWrapper>
  <button on:click={openDialog}>Open Dialog</button>
  <button bind:this={returnFocusElement}>I will focus</button>

  <DialogOverlay
    {isOpen}
    {returnFocusElement}
    onDismiss={closeDialog}
  >
    <DialogContent>
      <button on:click={closeDialog}>close modal</button>
      <h2>I am a dialog</h2>
    </DialogContent>
  </DialogOverlay>
</ScrollWrapper>
