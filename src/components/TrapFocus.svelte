<script>
  import { onMount, onDestroy, tick } from "svelte";

  // Props
  export let initialFocusElement;
  export let returnFocusElement;

  let ref;
  let tabbableChildren;
  let firstTabbableChild;
  let lastTabbableChild;
  let returnFocusElem;

  onMount(async () => {
    returnFocusElem = returnFocusElement || document.activeElement;
    tabbableChildren = [...ref.querySelectorAll("*")].filter(node => node.tabIndex >= 0);
    firstTabbableChild = tabbableChildren[0];
    lastTabbableChild = tabbableChildren[tabbableChildren.length - 1];

    // Wait for children to mount before trying to focus `initialFocusElement`
    await tick();

    if (initialFocusElement) {
      initialFocusElement.focus();
    } else {
      const initialFocusElem = ref.querySelector("[autofocus]") || firstTabbableChild;
      initialFocusElem.focus();
    }
  });

  onDestroy(() => {
    if (returnFocusElem) {
      returnFocusElem.focus();
    }
  });

  const handleKeydown = (event) => {
    if (event.key !== "Tab") {
      return;
    }

    if (event.shiftKey) {
      // Handle shift + tab
      if (document.activeElement === firstTabbableChild) {
        event.preventDefault();
        lastTabbableChild.focus();
      }
    } else {
      if (document.activeElement === lastTabbableChild) {
        event.preventDefault();
        firstTabbableChild.focus();
      }
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<div bind:this={ref}>
  <slot />
</div>
