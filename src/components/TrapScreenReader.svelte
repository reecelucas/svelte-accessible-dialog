<script>
  import { onMount } from "svelte";

  // Props
  export let enabled;

  let originalAttributes = [];

  const hideFromScreenReader = (node) => {
    originalAttributes.push({
      ariaHidden: node.getAttribute("aria-hidden"),
      inert: node.getAttribute("inert"),
    });

    node.setAttribute("aria-hidden", "true");
    node.setAttribute("inert", "true");
  };

  const exposeToScreenReader = (node, i) => {
    const { ariaHidden, inert } = originalAttributes[i];

    if (!ariaHidden) {
      node.removeAttribute("aria-hidden");
    } else {
      node.setAttribute("aria-hidden", ariaHidden);
    }

    if (!inert) {
      node.removeAttribute("inert");
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
