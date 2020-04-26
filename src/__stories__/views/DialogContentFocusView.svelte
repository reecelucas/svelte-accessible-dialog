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
  :global([data-svelte-dialog-content].content):focus {
    background-color: pink;
  }
</style>

<ScrollWrapper>
  <button on:click={openDialog}>Open Dialog</button>

  <DialogOverlay {isOpen} onDismiss={closeDialog}>
    <DialogContent class="content">
      <h2>I am a dialog</h2>
      <p>I have no tabbable children</p>
    </DialogContent>
  </DialogOverlay>
</ScrollWrapper>
