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

  <div aria-hidden="true">
    Should always be hidden from screen readers
  </div>

  <div inert="true">
    Should always be inert
  </div>

  <DialogOverlay {isOpen} onDismiss={closeDialog} ariaModalLegacy={true}>
    <DialogContent>
      <button on:click={closeDialog}>close modal</button>
      <h2>I am a dialog</h2>
    </DialogContent>
  </DialogOverlay>
</ScrollWrapper>
