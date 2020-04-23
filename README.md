# svelte-accessible-dialog

An accessible dialog component for Svelte apps. [Demo](https://svelte.dev/repl/6c6729de07b04cba8ea3fd413c013137).

[![Coverage Status](https://coveralls.io/repos/github/reecelucas/svelte-accessible-dialog/badge.svg?branch=master)](https://coveralls.io/github/reecelucas/svelte-accessible-dialog?branch=master)
[![Build Status](https://travis-ci.org/reecelucas/svelte-accessible-dialog.svg?branch=master)](https://travis-ci.org/reecelucas/svelte-accessible-dialog)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/svelte-accessible-dialog.svg)
![npm](https://img.shields.io/npm/v/svelte-accessible-dialog.svg)
![GitHub](https://img.shields.io/github/license/reecelucas/svelte-accessible-dialog.svg)

* [Installation](#installation)
* [Usage](#usage)
* [Styling](#styling)
* [Props](#props)
* [Accessibility](#accessibility)
* [Configuring webpack](#configuring-webpack)
* [Tests](#tests)
* [LICENSE](#license)

## Installation

```bash
npm install svelte-accessible-dialog
```

## Usage

### Basic

```html
<script>
  import { DialogOverlay, DialogContent } from 'svelte-accessible-dialog';

  let isOpen;

  const open = () => {
    isOpen = true;
  };

  const close = () => {
    isOpen = false;
  };
</script>

<button on:click={open}>Open Dialog</button>

<DialogOverlay {isOpen} onDismiss={close}>
  <DialogContent aria-label="Announcement">
    <button on:click={close}>Close</button>
    <p>I am a dialog</p>
  </DialogContent>
</DialogOverlay>
```

### Setting Initial Focus

By default, the first focusable element will receive focus when the dialog opens, but you can provide an element to focus instead.

```html
<script>
  import { DialogOverlay, DialogContent } from 'svelte-accessible-dialog';

  let isOpen;
  let initialFocusElement;

  const open = () => {
    isOpen = true;
  };

  const close = () => {
    isOpen = false;
  };
</script>

<button on:click={open}>Open Dialog</button>

<DialogOverlay {isOpen} {initialFocusElement} onDismiss={close}>
  <DialogContent aria-label="Announcement">
    <button on:click={close}>Close</button>
    <label>
      Name: <input type="text" bind:this={initialFocusElement} />
    </label>
    <p>I am a dialog</p>
  </DialogContent>
</DialogOverlay>
```

### Setting Return Focus

By default, the element that invoked the dialog will receive focus when the dialog closes, but you can provide an element to focus instead.

See the [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.2#keyboard-interaction-7) for more detail about when you might want to do this.

```html
<script>
  import { DialogOverlay, DialogContent } from 'svelte-accessible-dialog';

  let isOpen;
  let returnFocusElement;

  const open = () => {
    isOpen = true;
  };

  const close = () => {
    isOpen = false;
  };
</script>

<button on:click={open}>Open Dialog</button>
<button bind:this={returnFocusElement}>I focus on close</button>

<DialogOverlay {isOpen} {returnFocusElement} onDismiss={close}>
  <DialogContent aria-label="Announcement">
    <button on:click={close}>Close</button>
    <p>I am a dialog</p>
  </DialogContent>
</DialogOverlay>
```

### Legacy Support for aria-modal

`DialogContent` has the `aria-modal` attribute. This indicates to screen readers that only content contained within the dialog should be accessible to the user. Modern screen readers respect this attribute, but you can enable a [legacy workaround](#hiding-page-content-from-screen-readers) if you require deeper support.

See the [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.2#dialog_roles_states_props) for more detail.

```html
<script>
  import { DialogOverlay, DialogContent } from 'svelte-accessible-dialog';

  let isOpen;

  const open = () => {
    isOpen = true;
  };

  const close = () => {
    isOpen = false;
  };
</script>

<button on:click={open}>Open Dialog</button>

<DialogOverlay {isOpen} ariaModalLegacy={true} onDismiss={close}>
  <DialogContent aria-label="Announcement">
    <button on:click={close}>Close</button>
    <p>I am a dialog</p>
  </DialogContent>
</DialogOverlay>
```

## Styling

### :global

```html
<style>
  :global([data-svelte-dialog-overlay].overlay) {
    z-index: 10;
  }

  :global([data-svelte-dialog-content].content) {
    border: 2px solid #000;
  }
</style>

<DialogOverlay class="overlay">
  <DialogContent class="content">
    <p>I am a dialog</p>
  </DialogContent>
</DialogOverlay>
```

### Inline Styles

```html
<DialogOverlay style="z-index: 10">
  <DialogContent style="border: 2px solid #000">
    <p>I am a dialog</p>
  </DialogContent>
</DialogOverlay>
```

## Props

### DialogOverlay

Must render `DialogContent`. Any props not listed below will be spread onto the underlying `div`.

| Prop                  | Type        | Required | Description |
|-----------------------|-------------|----------|-------------|
| `isOpen`              | Boolean     | Yes      |   Controls whether the dialog is open or not. |
| `onDismiss`           | () => void  | Yes      |   This function is called whenever the user hits "Escape" or clicks outside the dialog. The dialog must be closed on `onDismiss`.            |
| `initialFocusElement` | HTMLElement | No       |    The element that will receive focus when the dialog is open. Defaults to the first focusable element.             |
| `returnFocusElement`  | HTMLElement | No       |  The element that will receive focus when the dialog closes. Defaults to the element that invoked the dialog.            |
| `ariaModalLegacy`     | Boolean     | No       |  Enables a fallback for the `aria-modal` attribute. When `true`, all content outside of the active dialog will have the `aria-hidden` and `inert` attributes set to `"true"`.        |

### DialogContent

Must be a child of `DialogOverlay`. Element props will be spread onto the underlying `div`.

## Accessibility

WAI-ARIA: <https://www.w3.org/TR/wai-aria-practices-1.2/#dialog_modal>

### Keyboard Accessibility

| key       | action               |
|-----------|----------------------|
| `Escape`  | Dismisses the dialog |

### Tabbable Elements

It's recommended to have at least one tabbable element in the `DialogContent`. Ideally, the first element in the dialog should be a close button. If no tabbable elements are found, the dialog content element itself will receive focus.

### Hiding Page Content from Screen Readers

Until fairly recently, keeping a screen reader within an active dialog was difficult. A focus trap prevents focus from leaving a dialog, but does nothing to stop a wandering virtual cursor. A common solution to this problem was to set the `aria-hidden` and `inert` attributes on all elements outside of the active dialog.

[ARIA 1.1](https://www.w3.org/TR/wai-aria-1.1/) introduced the `aria-modal` attribute. `aria-modal` indicates to screen readers that only content contained within a dialog with `aria-modal="true"` should be accessible to the user. Modern screen readers respect this attribute, so `svelte-accessible-dialog` does not implement the legacy workaround by default.

If support for `aria-modal` is inadequate for your app, you can pass `ariaModalLegacy={true}` to `DialogOverlay` to enable the legacy workaround.

### Labelling

A dialog needs to be properly labelled to provide context for users that rely on assistive technology. If a dialog is announced to the user without a label, it can be confusing and difficult to navigate.

There are two general approaches to labelling: `aria-label` and `aria-labelledby`. If the text is visible on the screen, you should provide the label's HTML element with a unique `id` attribute. That `id` is then given to an `aria-labelledby` attribute on the `DialogContent`. With this context, the screen reader will announce whatever text is nested inside that ID'd markup as the title for the Dialog.

If a design doesn't include a visible label on the screen, you need to provide an `aria-label` prop on the `DialogContent` instead.

#### aria-label

```html
<DialogContent aria-label="Cookie notice">
  <p>We use cookies to improve your website experience</p>
  <button>Not interested</button>
  <button>Ok, thanks</button>
</DialogContent>
```

#### aria-labelledby

```html
<DialogContent aria-labelledby="cookie-dialog-title">
  <h2 id="cookie-dialog-title">Cookie Notice</h2>
  <p>We use cookies to improve your website experience</p>
  <button>Not interested</button>
  <button>Ok, thanks</button>
</DialogContent>
```

## Z-index

`DialogOverlay` does not set a `z-index`. It depends on DOM order to be on top of the page content (it's inserted at the end of the document when it's opened). If you're fighting `z-index` wars, make sure to add a `z-index` to `DialogOverlay`.

## Configuring webpack

If you're using webpack with [svelte-loader](https://github.com/sveltejs/svelte-loader), make sure to add `"svelte"` to `resolve.mainFields` in your webpack config. This ensures that webpack imports the uncompiled components (`src/index.js`) rather than the compiled version (`dist/index.mjs`), which is more efficient.

If you're using Rollup with [rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte), this will happen automatically.

## Tests

Tests use [Jest](https://jestjs.io/) and [svelte-testing-library](https://testing-library.com/docs/svelte-testing-library/intro).

```bash
git clone git@github.com:reecelucas/svelte-accessible-dialog.git
cd svelte-accessible-dialog
yarn
yarn test
```

## LICENSE

[MIT](./LICENSE)
