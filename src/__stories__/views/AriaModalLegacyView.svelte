<script>
  import { onMount } from "svelte";
  import { DialogOverlay, DialogContent } from "../../";
  import ScrollWrapper from "../helpers/ScrollWrapper.svelte";

  let isOpen = false;

  const closeDialog = () => {
    isOpen = false;
  };

  const openDialog = () => {
    isOpen = true;
  };

  onMount(() => {
    const rootNode = document.getElementById("root");

    rootNode.setAttribute("aria-hidden", "true")
    rootNode.setAttribute("inert", "true")
  });
</script>

<ScrollWrapper >
  <button on:click={openDialog}>Open Dialog</button>

  <DialogOverlay {isOpen} onDismiss={closeDialog} ariaModalLegacy={true}>
    <DialogContent>
      <button on:click={closeDialog}>close modal</button>
      <h2>I am a dialog</h2>
    </DialogContent>
  </DialogOverlay>
</ScrollWrapper>
