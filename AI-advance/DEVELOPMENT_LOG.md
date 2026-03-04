# Portfolio Development Log — Best Practices Study Guide

This document records the most significant improvements made to my portfolio
during the `portfolio-sprint1` branch, as part of an AI-assisted code review.
Each section explains **what changed**, **why it matters**, and shows a
**before/after comparison**. It is written as a personal study reference.

---

## Table of Contents

1. [Security Enhancements](#1-security-enhancements)
2. [SEO & Discoverability](#2-seo--discoverability)
3. [Accessibility](#3-accessibility)
4. [JavaScript Code Quality](#4-javascript-code-quality)
5. [CSS Architecture](#5-css-architecture)
6. [Project Structure](#6-project-structure)

---

## 1. Security Enhancements

### 1.1 Content Security Policy (CSP)

My previous version had no security headers, leaving the site vulnerable to
Cross-Site Scripting (XSS) attacks, where a malicious script could be injected
and run in a visitor's browser. I added a `Content-Security-Policy` via a
`<meta>` tag to strictly define which content sources the browser is allowed
to load.

```html
<!-- Before: no policy, browser accepts anything -->
<head>
  <link rel="stylesheet" href="styles.css" />
</head>

<!-- After: explicit policy for every resource type -->
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self';
           style-src 'self' https://fonts.googleapis.com;
           font-src https://fonts.gstatic.com;
           script-src 'self';
           img-src 'self';" />
```

**Directive breakdown:**

| Directive     | Value                         | Effect                                                |
| ------------- | ----------------------------- | ----------------------------------------------------- |
| `default-src` | `'self'`                      | Block everything by default unless explicitly allowed |
| `style-src`   | `'self' fonts.googleapis.com` | CSS from local files + Google Fonts API only          |
| `font-src`    | `fonts.gstatic.com`           | Font files from Google CDN only                       |
| `script-src`  | `'self'`                      | No inline scripts, no third-party scripts             |
| `img-src`     | `'self'`                      | Images only from the same origin                      |

---

### 1.2 Secure External Links

My previous external links used `target="_blank"` without any additional
attributes. This exposes the site to **tab-napping**: the destination page
can access `window.opener` and redirect the original tab to a malicious URL.

```html
<!-- Before: vulnerable to tab-napping -->
<a href="https://github.com/Paloma-Cardozo" target="_blank">GitHub</a>

<!-- After: isolated and private -->
<a
  href="https://github.com/Paloma-Cardozo"
  target="_blank"
  rel="noopener noreferrer"
  referrerpolicy="no-referrer"
  >GitHub</a
>
```

- `rel="noopener"` — severs the `window.opener` reference, blocking tab-napping
- `rel="noreferrer"` — also prevents the `Referer` header from being sent
- `referrerpolicy="no-referrer"` — reinforces the same at the fetch level

---

### 1.3 Email Obfuscation

Displaying an email address as plain text in HTML makes it trivially easy for
spam bots to scrape it. I replaced the `@` and `.` characters with their HTML
entity equivalents. The browser renders them identically to a human, but a
simple pattern-matching scraper will not recognize the address.

```html
<!-- Before: readable by bots -->
<a href="mailto:palomacardozo88@gmail.com">palomacardozo88@gmail.com</a>

<!-- After: obfuscated with HTML entities -->
<a href="mailto:palomacardozo88&#64;gmail&#46;com"
  >palomacardozo88&#64;gmail&#46;com</a
>
```

| Entity  | Character | Meaning |
| ------- | --------- | ------- |
| `&#64;` | `@`       | At sign |
| `&#46;` | `.`       | Period  |

---

## 2. SEO & Discoverability

### 2.1 Meta Description

The `<meta name="description">` tag provides the summary text shown by search
engines under a page title in results. Without it, search engines generate an
arbitrary excerpt, often unhelpful or misleading.

```html
<!-- Before: missing -->

<!-- After -->
<meta
  name="description"
  content="Paloma Cardozo — Lawyer & Tech Specialist. Legal professional
           transitioning into legal technology, data analytics, and
           web development." />
```

This tag does not affect ranking directly, but it influences Click-Through
Rate (CTR) by giving users a reason to click.

---

## 3. Accessibility

### 3.1 Respecting Motion Preferences

Some users have vestibular disorders or motion sensitivities that make
animations physically uncomfortable. The `prefers-reduced-motion` CSS media
query detects a system-level setting and disables animations accordingly.
This is a WCAG (Web Content Accessibility Guidelines) requirement.

```css
/* Without this, animations run for everyone regardless of health needs */
@media (prefers-reduced-motion: reduce) {
  section,
  figure {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

---

### 3.2 Image Dimensions and Layout Stability

Adding explicit `width` and `height` attributes to images allows the browser
to calculate the aspect ratio and reserve space _before_ the image downloads.
Without them, the page layout shifts when images load. It is a problem measured by
Google as **Cumulative Layout Shift (CLS)**, one of the Core Web Vitals.

```html
<!-- Before: browser doesn't know the size, causes layout shift -->
<img
  class="image"
  src="Image.jpg"
  alt="Professional profile picture of Paloma Cardozo" />

<!-- After: browser reserves space immediately -->
<img
  class="image"
  src="paloma-cardozo-profile.jpg"
  alt="Professional profile picture of Paloma Cardozo"
  width="220"
  height="220" />
```

Also note the file rename: `Image.jpg` → `paloma-cardozo-profile.jpg`.
Descriptive filenames improve accessibility for screen readers and help
search engines index images correctly.

---

## 4. JavaScript Code Quality

### 4.1 IIFE and Strict Mode

My original JavaScript ran in the global scope, meaning every variable
(`palette`, `button`) was accessible from the browser console or any other
script. I refactored it into an **Immediately Invoked Function Expression
(IIFE)** with `"use strict"`.

```js
// Before: global scope — any script can read or overwrite `palette`
const button = document.getElementById("colorBtn");
const palette = ["#f7f4ff", "#ede7f6"];
button.addEventListener("click", () => { ... });

// After: IIFE — everything is private
(function () {
  "use strict";
  const button = document.getElementById("colorBtn");
  if (button) {
    const palette = ["#f7f4ff", "#ede7f6", "#e3def9", "#f2e9ff",
                     "#f9f6ff", "#e9ebff", "#f0eafc"];
    button.addEventListener("click", () => {
      const randomColor = palette[Math.floor(Math.random() * palette.length)];
      document.documentElement.style.setProperty("--background-color", randomColor);
    });
  }
})();
```

- **IIFE** — the function executes immediately and its variables never reach
  the global `window` object
- **`"use strict"`** — activates stricter parsing: catches silent errors,
  forbids undeclared variables, prevents use of deprecated features
- **`if (button)`** — null guard: if the element doesn't exist in the DOM,
  the code skips safely instead of throwing a TypeError

---

### 4.2 Updating Styles via CSS Variables

My original code manipulated `body.style.backgroundColor` directly from
JavaScript. This tightly couples JS to a specific HTML element and a specific
CSS property. I replaced it with a CSS Custom Property update.

```js
// Before: JS knows about body and background-color — hard to maintain
document.body.style.backgroundColor = randomColor;

// After: JS only sets a variable — CSS decides what to do with it
document.documentElement.style.setProperty("--background-color", randomColor);
```

**Why this matters (Separation of Concerns):**

| Concern                      | Responsible layer                                         |
| ---------------------------- | --------------------------------------------------------- |
| Which element uses the color | CSS                                                       |
| What the color value is      | JS (reads from palette)                                   |
| How the transition animates  | CSS (`body { transition: background-color 400ms ease; }`) |

This means I could change the design completely in CSS without touching JS.

---

## 5. CSS Architecture

### 5.1 Specific Transitions Instead of `all`

Using `transition: all` tells the browser to watch _every_ CSS property for
changes on every frame. This is expensive and can cause janky animations.

```css
/* Before: monitors every property — slow */
--transition: all 0.3s ease;

/* After: only the properties that actually change */
--transition: color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
```

For elements that animate _additional_ properties, those are added explicitly:

```css
/* The image also transitions filter (grayscale on hover) */
.image {
  transition:
    var(--transition),
    filter 0.25s ease;
}

/* The button also transitions background-color */
.color-button {
  transition:
    var(--transition),
    background-color 0.25s ease;
}
```
