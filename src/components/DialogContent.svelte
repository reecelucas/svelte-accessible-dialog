<style>
  div {
    background-color: #fff;
    margin: 15vh auto;
    outline: none;
    padding: 2rem;
    width: 50vw; 
  }
</style>

<div
  {...$$restProps}
  data-svelte-dialog-content
  aria-modal="true"
  role="dialog"
  tabindex="-1"
>
  <slot />
</div>
