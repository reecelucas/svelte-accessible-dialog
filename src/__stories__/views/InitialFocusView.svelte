<script>
  import { DialogOverlay, DialogContent } from "../../";
  import ScrollWrapper from "../helpers/ScrollWrapper.svelte";

  let isOpen = false;
  let initialFocusElement;

  const closeDialog = () => {
    isOpen = false;
  };

  const openDialog = () => {
    isOpen = true;
  };
</script>

<ScrollWrapper>
  <button on:click={openDialog}>Open Dialog</button>

  <DialogOverlay
    {isOpen}
    {initialFocusElement}
    onDismiss={closeDialog}
  >
    <DialogContent>
      <button on:click={closeDialog}>close modal</button>
      <h2>I am a dialog</h2>
      <label>
        Useless input <input type="text" bind:this={initialFocusElement} />
      </label>
    </DialogContent>
  </DialogOverlay>
</ScrollWrapper>
