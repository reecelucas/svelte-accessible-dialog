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

<style>
  :global([data-svelte-dialog-overlay].overlay) {
    background-color: pink;
  }

  :global(.container [data-svelte-dialog-content]) {
    background-color: green;
  }
</style>

<ScrollWrapper class="container">
  <button on:click={openDialog}>Open Dialog</button>

  <DialogOverlay {isOpen} onDismiss={closeDialog} class="overlay">
    <DialogContent style="border: 4px solid black">
      <button on:click={closeDialog}>close modal</button>
      <h2>I am a dialog</h2>
    </DialogContent>
  </DialogOverlay>
</ScrollWrapper>
