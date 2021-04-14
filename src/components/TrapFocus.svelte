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

  onMount(() => {
    returnFocusElem = returnFocusElement || document.activeElement;
    tabbableChildren = [...ref.querySelectorAll("*")].filter((node) => node.tabIndex >= 0);
    firstTabbableChild = tabbableChildren[0];
    lastTabbableChild = tabbableChildren[tabbableChildren.length - 1];

    // Wait for children to mount before trying to focus `initialFocusElement`
    tick().then(() => {
      if (initialFocusElement) {
        initialFocusElement.focus();
      } else {
        const initialFocusElem =
          ref.querySelector("[autofocus]") ||
          firstTabbableChild ||
          ref.querySelector("[data-svelte-dialog-content]");

        initialFocusElem.focus();
      }
    });
  });

  onDestroy(() => {
    if (returnFocusElem) {
      returnFocusElem.focus();
    }
  });

  // We can't test keyboard semantics in `jsdom`, so it doesn't
  // make sense to include this function in the coverage report.
  // istanbul ignore next
  const handleKeydown = (event) => {
    if (event.key !== "Tab") {
      return;
    }

    if (tabbableChildren.length === 0) {
      event.preventDefault();
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
