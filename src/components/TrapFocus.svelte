<script>
  import { onMount, onDestroy, beforeUpdate, tick } from "svelte";
  import { FOCUSABLE_ELEMENTS } from "../constants";

  // Props
  export let initialFocusElement = null;
  export let returnFocusElement = null;

  let ref;
  let focusableChildren;
  let firstFocusableChild;
  let lastFocusableChild;
  let returnFocusElem;

  beforeUpdate(() => {
    // `beforeUpdate` runs before `onMount`, so it's the safest place to set the
    // previously focused element (i.e. the element that invoked the dialog). This is
    // especially important when an element in the dialog content contains an `autofocus`
    // attribute. In this scenario, the browser sets `document.activeElement` to the
    // `autofocus` element as soon as the dialog mounts to the DOM, before we can capture
    // the previously focused element.
    returnFocusElem = returnFocusElement || document.activeElement;
  });

  onMount(async () => {
    focusableChildren = ref.querySelectorAll(FOCUSABLE_ELEMENTS);
    firstFocusableChild = focusableChildren[0];
    lastFocusableChild = focusableChildren[focusableChildren.length - 1];
  
    // Wait for children to mount before trying to focus `initialFocusElement`
    await tick();

    if (initialFocusElement) {
      initialFocusElement.focus();
    } else {
      const initialFocusElem = ref.querySelector('[autofocus]') || firstFocusableChild;
      initialFocusElem.focus();
    }
  });

  onDestroy(() => {
    if (returnFocusElem) {
      returnFocusElem.focus();
    }
  });

  const handleKeydown = event => {
    if (event.key !== "Tab") {
      return;
    }

    const focusedElement = document.activeElement;

    if (event.shiftKey) {
      // Handle tab + shift
      if (focusedElement === firstFocusableChild) {
        event.preventDefault();
        lastFocusableChild.focus();
      }
    } else {
      if (focusedElement === lastFocusableChild) {
        event.preventDefault();
        firstFocusableChild.focus();
      }
    }
  };
</script>

<svelte:window on:keydown={handleKeydown}/>

<div bind:this={ref}>
  <slot />
</div>
