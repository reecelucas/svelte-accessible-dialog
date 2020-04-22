<script>
  import DialogPortal from "./DialogPortal.svelte";
  import DialogOverlayInner from "./DialogOverlayInner.svelte";

  // Props
  export let isOpen;
  export let onDismiss;
  export let initialFocusElement = null;
  export let returnFocusElement = null;
  export let ariaModalLegacy = false;
</script>

{#if isOpen}
  <DialogPortal>
    <DialogOverlayInner
      {...$$restProps}
      {onDismiss}
      {initialFocusElement}
      {returnFocusElement}
      {ariaModalLegacy}
    >
      <slot />
    </DialogOverlayInner>
  </DialogPortal>
{/if}
