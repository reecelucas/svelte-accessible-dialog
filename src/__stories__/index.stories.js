import DefaultView from "./views/DefaultView.svelte";
import InitialFocusView from "./views/InitialFocusView.svelte";
import ReturnFocusView from "./views/ReturnFocusView.svelte";
import AutoFocusElementView from "./views/AutoFocusElementView.svelte";
import AriaModalLegacyView from "./views/AriaModalLegacyView.svelte";
import StylingView from "./views/StylingView.svelte";
import LabelledByView from "./views/LabelledByView.svelte";
import SpreadPropsView from "./views/SpreadPropsView.svelte";

export default { title: "Dialog" };

export const Default = () => ({
  Component: DefaultView,
});

export const InitialFocusElement = () => ({
  Component: InitialFocusView,
});

export const ReturnFocusElement = () => ({
  Component: ReturnFocusView,
});

export const AutoFocusElement = () => ({
  Component: AutoFocusElementView,
});

export const AriaModalLegacy = () => ({
  Component: AriaModalLegacyView,
});

export const Styling = () => ({
  Component: StylingView,
});

export const LabelledBy = () => ({
  Component: LabelledByView,
});

export const SpreadElementProps = () => ({
  Component: SpreadPropsView,
});
