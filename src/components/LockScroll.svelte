<script>
  import { onMount } from "svelte";

  onMount(() => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // 1. Fixes a bug in iOS and desktop Safari whereby setting `overflow: hidden` on
    //    the html/body does not prevent scrolling.
    // 2. Fixes a bug in desktop Safari where `overflowY` does not prevent scroll if an
    //   `overflow-x` style is also applied to the body.
    document.documentElement.style.position = "relative"; // [1]
    document.documentElement.style.overflow = "hidden"; // [2]
    document.body.style.position = "relative"; // [1]
    document.body.style.overflow = "hidden"; // [2]
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.documentElement.style.position = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  });
</script>

<slot />
