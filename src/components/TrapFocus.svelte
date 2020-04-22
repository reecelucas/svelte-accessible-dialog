<script>
import { onMount, onDestroy, beforeUpdate, tick } from "svelte";

  // Props
  export let initialFocusElement;
  export let returnFocusElement;

  let ref;
  let focusableChildren;
  let firstFocusableChild;
  let lastFocusableChild;
  let returnFocusElem;

  const FOCUSABLE_ELEMENTS =
    'button:not([hidden]):not([disabled]), [href]:not([hidden]), input:not([hidden]):not([type="hidden"]):not([disabled]), select:not([hidden]):not([disabled]), textarea:not([hidden]):not([disabled]), [tabindex="0"]:not([hidden]):not([disabled]), summary:not([hidden]), [contenteditable]:not([hidden]), audio[controls]:not([hidden]), video[controls]:not([hidden])';

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
      const initialFocusElem = ref.querySelector("[autofocus]") || firstFocusableChild;
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
      if (document.activeElement === firstFocusableChild) {
        event.preventDefault();
        lastFocusableChild.focus();
      }
    } else {
      if (document.activeElement === lastFocusableChild) {
        event.preventDefault();
        firstFocusableChild.focus();
      }
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<div bind:this={ref}>
  <slot />
</div>
