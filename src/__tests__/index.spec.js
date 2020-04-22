import { render, cleanup, fireEvent, act } from "@testing-library/svelte";

import DialogBasic from "./views/DialogBasic.svelte";
import DialogPortal from "./views/DialogPortal.svelte";
import DialogLabel from "./views/DialogLabel.svelte";
import DialogLabelledBy from "./views/DialogLabelledBy.svelte";
import DialogAutoFocus from "./views/DialogAutoFocus.svelte";
import DialogInitialFocus from "./views/DialogInitialFocus.svelte";
import DialogReturnFocus from "./views/DialogReturnFocus.svelte";
import DialogEventPropagation from "./views/DialogEventPropagation.svelte";

const renderAndWaitForTick = async (component, options) => {
  let renderResult;

  // https://testing-library.com/docs/svelte-testing-library/api#act-async
  await act(() => {
    renderResult = render(component, options);
  });

  return renderResult;
};

afterEach(cleanup);

describe("DialogOverlay", () => {
  test("does not render children when `isOpen` is false", async () => {
    const { queryByRole } = await renderAndWaitForTick(DialogBasic);

    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("renders children when `isOpen` is true", async () => {
    const { getByRole } = await renderAndWaitForTick(DialogBasic, {
      isOpen: true,
    });

    expect(getByRole("dialog")).toBeInTheDocument();
  });

  test("renders inside a portal", async () => {
    const { getByTestId, container } = await renderAndWaitForTick(
      DialogPortal,
      {
        isOpen: true,
      }
    );

    const overlay = getByTestId("overlay");
    const parent = getByTestId("parent");
    const portal = container.querySelector("[data-svelte-dialog-portal]");

    // Renders outside of the DOM hierarchy of the parent component
    expect(parent.contains(overlay)).toBe(false);
    expect(portal.contains(overlay)).toBe(true);
  });

  test("portal is appended to the body", async () => {
    const { container } = await renderAndWaitForTick(DialogPortal, {
      isOpen: true,
    });

    const portal = container.querySelector("[data-svelte-dialog-portal]");

    // Portal is appended to `document.body`
    expect(document.body.lastChild).toBe(portal);
  });

  test("portal is removed from the DOM", async () => {
    const { getByTestId, container } = await renderAndWaitForTick(
      DialogPortal,
      {
        isOpen: true,
      }
    );

    const portal = container.querySelector("[data-svelte-dialog-portal]");

    expect(portal).toBeInTheDocument();

    // Close Dialog
    await fireEvent.click(getByTestId("overlay"));

    expect(portal).not.toBeInTheDocument();
  });

  test("calls `onDismiss` when clicked", async () => {
    const spy = jest.fn();

    const { getByTestId } = await renderAndWaitForTick(DialogBasic, {
      isOpen: true,
      onDismiss: spy,
    });

    const overlay = getByTestId("overlay");

    await fireEvent.click(overlay);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("calls `onDismiss` when `Escape` key is pressed", async () => {
    const spy = jest.fn();

    await renderAndWaitForTick(DialogBasic, {
      isOpen: true,
      onDismiss: spy,
    });

    await fireEvent.keyDown(window, { key: "Enter" });

    expect(spy).toHaveBeenCalledTimes(0);

    await fireEvent.keyDown(window, { key: "Escape" });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("assigns focus to the first focusable element", async () => {
    await renderAndWaitForTick(DialogBasic, { isOpen: true });

    // Focus moved to close button
    expect(document.activeElement.textContent.trim()).toBe("Close Dialog");
  });

  test("assigns focus to the first `autofocus` element", async () => {
    await renderAndWaitForTick(DialogAutoFocus);

    expect(document.activeElement.value.trim()).toBe("Useless input one");
  });

  test("assigns focus to `initialFocusElement`", async () => {
    await renderAndWaitForTick(DialogInitialFocus);

    expect(document.activeElement.textContent.trim()).toBe("Useless Button");
  });

  test("returns focus correctly when closed", async () => {
    const { getByText, getByTestId } = await renderAndWaitForTick(DialogBasic);

    // Show dialog
    await fireEvent.click(getByText("Show Dialog"));

    expect(document.activeElement.textContent.trim()).toBe("Close Dialog");

    // Close Dialog
    await fireEvent.click(getByTestId("overlay"));

    // Focus returned to dialog trigger
    expect(document.activeElement.textContent.trim()).toBe("Show Dialog");
  });

  test("returns focus to `returnFocusElement` when closed", async () => {
    const { getByText, getByTestId } = await renderAndWaitForTick(
      DialogReturnFocus
    );

    // Show dialog
    await fireEvent.click(getByText("Show Dialog"));

    expect(document.activeElement.textContent.trim()).toBe("Close Dialog");

    // Close Dialog
    await fireEvent.click(getByTestId("overlay"));

    expect(document.activeElement.textContent.trim()).toBe("I focus on close");
  });

  test("adds `aria-hidden` and `inert` attributes to siblings when `ariaModalLegacy` is true", async () => {
    const { getByText, container } = await renderAndWaitForTick(DialogBasic, {
      ariaModalLegacy: true,
    });

    // Open dialog
    await fireEvent.click(getByText("Show Dialog"));

    const portal = document.querySelector("[data-svelte-dialog-portal]");

    // The `render` method wraps all component content in `div`, so `body` has
    // two child elements when the dialog is open; a div and the dialog portal.
    const sibling = container.firstElementChild;

    expect(portal.hasAttribute("aria-hidden")).toBe(false);
    expect(portal.hasAttribute("inert")).toBe(false);

    expect(sibling.getAttribute("aria-hidden")).toBe("true");
    expect(sibling.getAttribute("inert")).toBe("true");

    // Close dialog
    await fireEvent.click(getByText("Close Dialog"));

    expect(sibling.hasAttribute("aria-hidden")).toBe(false);
    expect(sibling.hasAttribute("inert")).toBe(false);
  });

  test("respects existing `aria-hidden` and `inert` attributes on siblings when `ariaModalLegacy` is true", async () => {
    const { getByText, container } = await renderAndWaitForTick(DialogBasic, {
      ariaModalLegacy: true,
    });

    const sibling = container.firstElementChild;

    sibling.setAttribute("aria-hidden", "true");
    sibling.setAttribute("inert", "true");

    // Open dialog
    await fireEvent.click(getByText("Show Dialog"));

    expect(sibling.getAttribute("aria-hidden")).toBe("true");
    expect(sibling.getAttribute("inert")).toBe("true");
    expect(sibling.getAttribute("data-keep-hidden")).toBe("true");
    expect(sibling.getAttribute("data-keep-inert")).toBe("");

    // Close dialog
    await fireEvent.click(getByText("Close Dialog"));

    expect(sibling.getAttribute("aria-hidden")).toBe("true");
    expect(sibling.getAttribute("inert")).toBe("true");
    expect(sibling.hasAttribute("data-keep-hidden")).toBe(false);
    expect(sibling.hasAttribute("data-keep-inert")).toBe(false);
  });

  test("does not add `aria-hidden` and `inert` attributes to siblings when `ariaModalLegacy` is false", async () => {
    const { getByText, container } = await renderAndWaitForTick(DialogBasic, {
      ariaModalLegacy: false,
    });

    const sibling = container.firstElementChild;

    expect(sibling.hasAttribute("aria-hidden")).toBe(false);
    expect(sibling.hasAttribute("inert")).toBe(false);

    // Open dialog
    await fireEvent.click(getByText("Show Dialog"));

    // No attributes should have been added
    expect(sibling.hasAttribute("aria-hidden")).toBe(false);
    expect(sibling.hasAttribute("inert")).toBe(false);
  });

  test("click events do not propagate", async () => {
    const spy = jest.fn();

    const { getByTestId } = await renderAndWaitForTick(DialogEventPropagation, {
      windowClickSpy: spy,
    });

    // Close dialog
    await fireEvent.click(getByTestId("overlay"));

    expect(spy).not.toHaveBeenCalled();
  });

  test("spreads element props onto underlying `div` element", async () => {
    const { getByTestId } = await renderAndWaitForTick(DialogBasic, {
      isOpen: true,
      "data-custom-attribute": true,
    });

    const overlay = getByTestId("overlay");

    expect(overlay.getAttribute("data-custom-attribute")).toBe("true");
  });
});

describe("DialogContent", () => {
  test("renders children", async () => {
    const { getByText, getByTestId } = await renderAndWaitForTick(DialogBasic, {
      isOpen: true,
    });

    expect(getByText("Close Dialog")).toBeInTheDocument();
    expect(getByTestId("input")).toBeInTheDocument();
  });

  test("has the required accessibility attributes", async () => {
    const { getByRole } = await renderAndWaitForTick(DialogBasic, {
      isOpen: true,
    });

    // Has `role="dialog"`
    const dialog = getByRole("dialog");

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("tab-index", "-1");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("can be labelled by another element", async () => {
    const { getByRole } = await renderAndWaitForTick(DialogLabelledBy);

    const dialog = getByRole("dialog");
    const dialogLabelId = dialog.getAttribute("aria-labelledby");

    expect(dialogLabelId).toBe("dialog-title");
    expect(document.getElementById(dialogLabelId)).toHaveTextContent(
      "I am a dialog title"
    );
  });

  test("click events do not close dialog", async () => {
    const { getByRole } = await renderAndWaitForTick(DialogBasic, {
      isOpen: true,
    });

    const dialog = getByRole("dialog");

    await fireEvent.click(dialog);

    expect(dialog).toBeInTheDocument();
  });

  test("spreads element props onto underlying `div` element", async () => {
    const { getByLabelText } = await renderAndWaitForTick(DialogLabel);

    // `aria-label` attribute should be present in the DOM
    expect(getByLabelText("dialog-title")).toBeInTheDocument();
  });
});
