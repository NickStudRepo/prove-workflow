# Plan: Glassmorphism Background

## Goal

Replace the flat `#1a1a2e` body background with a glassmorphism design: a vibrant gradient backdrop with floating color blobs, and a frosted-glass calculator card.

## File to Change

`public/style.css` — all changes are CSS-only; no HTML or JS changes needed.

## Changes

### 1. Body background — vibrant gradient + color blobs

Replace the current flat `background: #1a1a2e` with:

- A dark base gradient (`#0f0c29` → `#302b63` → `#24243e`, diagonal).
- Two pseudo-element color blobs (via `body::before` and `body::after`) — one warm (pink/purple), one cool (teal/blue) — that sit behind the calculator and create the "colored light" effect glassmorphism relies on.
- Blobs are large (`300–400px`), blurred (`blur(100px)`), positioned off-center, `border-radius: 50%`, low opacity, and `z-index: -1`.
- Add `overflow: hidden` on body to prevent blobs from causing scrollbars.

### 2. Calculator card — frosted glass

Update `.calculator` to:

- `background: rgba(255, 255, 255, 0.05)` — near-transparent white tint.
- `backdrop-filter: blur(20px)` and `-webkit-backdrop-filter: blur(20px)` for Safari.
- `border: 1px solid rgba(255, 255, 255, 0.1)` — subtle light border for the glass edge.
- Keep existing `border-radius: 16px`, `padding`, `width`, and `box-shadow`.

### 3. Display area — subtle glass effect

Update `.display` to:

- `background: rgba(15, 52, 96, 0.4)` (same hue as current `#0f3460` but semi-transparent).
- `backdrop-filter: blur(10px)`.
- `border: 1px solid rgba(255, 255, 255, 0.05)`.

### 4. Digit buttons — glass tint

Update `button` (default digit buttons) to:

- `background: rgba(255, 255, 255, 0.05)`.
- Hover: `background: rgba(255, 255, 255, 0.1)`.
- Keep operator/equals/clear button colors unchanged (they're accent colors).

## What NOT to change

- HTML structure — no new elements needed (blobs use pseudo-elements).
- JavaScript — no logic changes.
- Operator, equals, and clear button colors — keep the existing red/green accents.
- Typography, sizing, spacing — keep as-is.

## Acceptance Criteria

- Page has a visible multi-color gradient with soft color blobs behind the calculator.
- Calculator card has a frosted-glass look (semi-transparent, blurred backdrop).
- All buttons remain readable and functional.
- No horizontal scrollbar from blobs.
