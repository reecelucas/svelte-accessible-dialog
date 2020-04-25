<script>
  import { onMount } from "svelte";

  // Props
  export let enabled;

  const hideFromScreenReader = (element) => {
    if (element.hasAttribute("aria-hidden")) {
      element.setAttribute("data-keep-hidden", element.getAttribute("aria-hidden"));
    }

    element.setAttribute("aria-hidden", "true");

    if (element.getAttribute("inert")) {
      element.setAttribute("data-keep-inert", "");
    }
    
    element.setAttribute("inert", "true");
  };

  const exposeToScreenReader = (element) => {
    if (!element.hasAttribute("data-keep-inert")) {
      element.removeAttribute("inert");
    }

    element.removeAttribute("data-keep-inert");

    if (element.getAttribute("data-keep-hidden")) {
      element.setAttribute("aria-hidden", element.getAttribute("data-keep-hidden"));
      element.removeAttribute("data-keep-hidden");
    } else {
      element.removeAttribute("aria-hidden");
    }
  };

  onMount(() => {
    if (!enabled) {
      // `DialogContent` has the `aria-modal` attribute. This indicates to screen readers
      // that only content contained within the dialog should be accessible to the user.
      // Modern screen readers respect this attribute. In cases where support is inadequate,
      // this legacy workaround can be enabled.
      return;
    }

    // Grab all children in the `body` except for the dialog portal
    const children = document.querySelectorAll("body > *:not([data-svelte-dialog-portal])");
    children.forEach(hideFromScreenReader);

    return () => {
      children.forEach(exposeToScreenReader);
    };
  });
</script>

<slot />
