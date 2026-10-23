---
name: Thirana Embuldeniya Portfolio
description: A quiet personal notebook on warm paper - one column, pill headings, a cap-wearing mascot beside a lowercase name
colors:
  rust: "#a45740"
  rust-deep: "#8a4532"
  paper: "#faf9f7"
  paper-white: "#ffffff"
  paper-shade: "#f3f1ed"
  ink: "#17150f"
  ink-hover: "#36322a"
  ink-muted: "#6b6862"
  ink-faint: "#767268"
  hairline: "#e6e3dd"
  hairline-strong: "#cdc8bf"
  hairline-input: "#d9d5ce"
  stamp-cream: "#efe6d8"
  selection-blush: "#f1dcd2"
  swatch-moss: "#33805a"
  swatch-indigo: "#5258ad"
  swatch-plum: "#9a5574"
  swatch-ochre: "#95691a"
  swatch-brick: "#b2553a"
  swatch-teal: "#257a91"
  success: "#23683c"
  danger: "#a2412e"
  contribution-0: "#ebe8e2"
  contribution-1: "#c5e1c9"
  contribution-2: "#8fc59a"
  contribution-3: "#4f9e64"
  contribution-4: "#2a7341"
typography:
  display:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "60px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Erode, ui-serif, Georgia, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  body-compact:
    fontFamily: "Erode, ui-serif, Georgia, serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.625
rounded:
  inline-code: "6px"
  tag: "8px"
  inset: "10px"
  card: "14px"
  pill: "999px"
spacing:
  gutter: "24px"
  card-pad: "20px"
  card-pad-lg: "24px"
  section-inner: "28px"
  section-inner-lg: "36px"
  section-gap: "40px"
  section-gap-lg: "48px"
  column: "672px"
components:
  pill-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "7px 13px"
  pill-ink-hover:
    backgroundColor: "{colors.ink-hover}"
  pill:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "7px 13px 7px 11px"
  pill-hover:
    backgroundColor: "{colors.paper-white}"
  chip-heading:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "5px 12px 6px"
  link-arrow:
    textColor: "{colors.rust}"
    typography: "{typography.label}"
  link-arrow-hover:
    textColor: "{colors.rust-deep}"
  card:
    backgroundColor: "{colors.paper-white}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  tag:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    padding: "3px 8px"
  status-badge:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  stamp:
    backgroundColor: "{colors.stamp-cream}"
    padding: "4px"
    size: "64px"
---

# Design System: Thirana Embuldeniya Portfolio

## Overview

**Creative North Star: "The Paper Notebook"**

The site reads like a personal notebook left open on a desk: warm off-white paper, near-black warm ink, one narrow column, and a small cap-wearing mascot that follows the cursor beside a lowercase handwritten-feeling name. Nothing glows, nothing is dark, nothing competes. Sections are opened by small outlined pill labels and separated by dashed seams, the way a notebook is ruled and tabbed rather than boxed. The few raised things - white cards - sit on the paper with a soft, low shadow, like index cards laid on top.

Density is calm and editorial. Interface text (headings, labels, nav, meta) is set in Satoshi; anything meant to be read at length is set in Erode, a warm serif; code alone uses JetBrains Mono. Color is almost entirely ink-on-paper. The single chromatic voice is a rust link color, and the single solid fill is the black ink pill that carries the one primary action, "Work with me". Small swatch dots and monogram tiles add quiet categorical color without ever becoming decoration.

The world is light only, by the owner's decision. It deliberately retires the dark terminal-dashboard portfolio this site used to be: no near-black grounds, no neon accents, no monospace-as-personality.

**Key Characteristics:**
- Warm paper ground with white soft-shadow cards; light only.
- One 42rem (672px) column on every page, header included.
- Pill-shaped section headings (13px Satoshi, hairline outline) and dashed seams between sections.
- Satoshi for UI and headings, Erode for reading, JetBrains Mono for code only.
- Rust is the only accent and it is never a fill; black ink is the only solid button.
- A cursor-following "cap" mascot is the identity image; a stamp-framed static frame of it closes every page.

## Colors

Ink on warm paper, with one rust voice for links and a muted set of categorical swatches for data.

### Primary
- **Workshop Rust** (rust): every inline link in prose, the arrowed "All projects" / "Read the overview" links, capability evidence text, and the focus ring. Hover deepens to **Kiln Rust** (rust-deep). Rust is text and outline only.

### Neutral
- **Warm Paper** (paper): the page ground and the text color on the ink pill.
- **Card White** (paper-white): cards, tags, inline code chips, hovered pills and post rows - anything that sits on the paper.
- **Paper Shade** (paper-shade): rare inset fills (code-toggle hover, loading skeletons).
- **Warm Ink** (ink): headings, body text, and the solid fill of the primary pill. Hover lifts to **Ink Hover** (ink-hover).
- **Muted Ink** (ink-muted): ledes, summaries, secondary nav links, card body copy.
- **Faint Ink** (ink-faint): dates, years, meta lines, icon tints. Still passes AA on paper; do not go lighter.
- **Hairline** (hairline): chip and pill outlines, card-adjacent dividers, post-list rules, seams, tag borders.
- **Strong Hairline** (hairline-strong): hovered pill outlines, the dotted experience timeline rail, list bullets, table header rules.
- **Input Hairline** (hairline-input): form control borders.
- **Stamp Cream** (stamp-cream): the perforated stamp frame around the mascot only.
- **Selection Blush** (selection-blush): text selection highlight.

### Categorical swatches
- **Moss, Indigo, Plum, Ochre, Brick, Teal** (swatch-moss ... swatch-teal): assigned deterministically by name hash. Used as 6px dots inside tags, as status-dot colors, and as the fill of company monogram tiles (white initials). Never as text color on paper, never as backgrounds of large areas.
- **Contribution scale** (contribution-0 through contribution-4): a GitHub-green ramp used only by the contributions heatmap; level 0 is a warm paper-grey so empty days sit in the paper rather than on it.
- **Success** (success) and **Danger** (danger): the "Live" status dot and error text respectively.

### Named Rules
**The Rust Is Ink Rule.** Rust appears only as text, underline, or focus outline. It never fills a button, badge, or surface. If something needs to be a solid call to action, it is the black ink pill.

**The One Ink Pill Rule.** Each view carries exactly one solid ink action in its header ("Work with me") and one in the closing Work-with-me card ("Send me a note"). Every other action is an outlined pill or a rust arrow link.

**The Light Only Rule.** There is no dark theme. Do not add `dark:` variants, a theme toggle, or a prefers-color-scheme branch.

## Typography

**Display Font:** Satoshi (variable 300-900, self-hosted) with ui-sans-serif, system-ui fallback
**Body Font:** Erode (variable 300-700 plus italic, self-hosted) with ui-serif, Georgia fallback
**Label/Mono Font:** JetBrains Mono, for code only

**Character:** A clean geometric-humanist sans for everything you scan, paired with a warm, slightly bookish serif for everything you read. The body element defaults to Erode; headings, buttons, nav, labels and form controls switch to Satoshi in the base layer.

### Hierarchy
- **Display** (Satoshi 600, 60px desktop / 48px mobile, line-height 1, -0.03em): the lowercase "thirana" wordmark on home only. Index page titles (PageIntro) use the same treatment one step down at 52px / 40px.
- **Headline** (Satoshi 600, 44px desktop / 34px mobile, line-height 1.1, -0.03em): article and project detail titles.
- **Title** (Satoshi 600, 22px, line-height 1.2, -0.025em): project and blog card titles. Prose h2 is 22px at weight 600, h3 18px; experience company names (17px) and post titles (15px) are also weight 600. Titles are semibold, never medium - the reference world reads through firm Satoshi titles over soft Erode text.
- **Body** (Erode 400, 17px, line-height 1.7): long-form prose and page ledes (home and index ledes at 18px, line-height 1.625, max-width 34rem). **Body Compact** (Erode 400, 15px, line-height 1.6-1.7) carries card summaries, post-list summaries, and experience bullets.
- **Rendering:** text uses the browser default font smoothing and text-rendering. Never set `-webkit-font-smoothing: antialiased` or `optimizeLegibility`: on macOS antialiased thins Satoshi and Erode and loses the reference's full, warm text color.
- **Label** (Satoshi 500, 13px, line-height 1.2, no tracking): chips, pills, the ink pill (weight 600), arrow links, meta lines, dates, footer links. Tags are 12.5px, status badges 12px.
- **Code** (JetBrains Mono 400, 13px, line-height 1.625): fenced code blocks, highlighted with the github-light theme; inline code is 0.8125em in a white hairline chip.

### Named Rules
**The Two Voices Rule.** Satoshi is for what you scan, Erode is for what you read. Never set a paragraph of reading text in Satoshi or a label in Erode.

**The Lowercase Name Rule.** The identity is the lowercase Satoshi word "thirana" - in the hero at display size and in the sticky header at 17px weight 600, -0.03em. It is not replaced by an all-caps logotype or a monospace handle.

**The No Mono Personality Rule.** JetBrains Mono appears inside code and nowhere else - not in labels, dates, nav, or headings.

## Layout

A single centered column, 42rem (672px) max-width with 24px side gutters, used by the header, main content, and footer alike. There is no multi-column page grid; the only internal grids are small (the capability matrix's three columns from 640px up, post rows that put the date beside the title from 640px up).

Vertical rhythm is section-based: page sections stack 40px apart on mobile and 48px from 640px up, each separated by a dashed seam; inside a section the pill heading sits 28px (mobile) / 36px (desktop) above its content. Cards stack 16px apart. The page starts 32px below the header (48px from 640px up), and the footer sits 96px below the last section.

The one breakpoint that matters is 640px (`sm`). Below it: the hero mascot shrinks from 208px to 160px and stacks above the wordmark, the desktop nav hides behind a menu pill that opens a right-side sheet drawer (82vw, max 320px), post-list dates move above titles, and the Work-with-me card stacks its button under the text. Dense content uses progressive disclosure (collapsible experience entries, code toggles), never hidden content.

The sticky header is transparent at rest and, after 16px of scroll, becomes 90% paper with a backdrop blur and a 1px hairline underline. On home, the header wordmark stays invisible until scroll, because the hero already shows the name.

### Named Rules
**The One Column Rule.** Every page lives in the 672px column. Do not break out to full-bleed bands, sidebars, or two-up layouts.

## Elevation & Depth

Depth is a hybrid of ruled paper and lifted cards. Most structure is flat: hairlines, dashed seams and outlined pills on the paper. Cards, tables, images, diagrams, the active pill tab and the active mobile nav item are lifted by one soft, warm-tinted ambient shadow - an index card on a desk, never a floating panel. Shadows never respond to hover on cards; hover is expressed through outline and fill shifts on pills and rows.

### Shadow Vocabulary
- **Card rest** (`box-shadow: 0 1px 2px rgba(23, 21, 15, 0.05), 0 10px 28px -14px rgba(23, 21, 15, 0.14)`): cards, prose images, tables, code blocks, blockquotes, mermaid frames, active pill tabs.
- **Sheet** (`box-shadow: 0 1px 2px rgba(23, 21, 15, 0.06), 0 18px 40px -16px rgba(23, 21, 15, 0.2)`): the mobile nav drawer only.
- **Header rule** (`box-shadow: 0 1px 0 #e6e3dd`): the scrolled sticky header's hairline.

### Named Rules
**The Soft Card Rule.** One ambient shadow for every lifted surface. No hard offset shadows, no colored glows, no stacked elevation levels beyond card and sheet.

## Shapes

Two silhouettes dominate: the fully rounded pill (999px) for every small interactive or labeling element - chips, pills, the ink button, status badges, tabs - and the gently rounded card (14px) for every raised surface. Smaller radii step down for smaller objects: tags 8px, inset code panels and toggles 10px, inline code 6px. Company monograms are squircle-like tiles at 22% radius; the hero mascot sits in an 18px rounded frame.

Lines are either a solid 1px hairline or a dashed seam (5px dash, 4px gap). The experience timeline rail is a finer dotted line (3px dash, 3px gap) in the strong hairline. The stamp is the one decorative edge: a 4px cream frame with a perforated, postage-stamp mask around a 56px mascot frame.

## Components

### Buttons
Tactile and quiet: everything is a pill, and only one is solid.
- **Shape:** fully rounded (999px).
- **Primary (ink pill):** warm ink fill, paper text, Satoshi 13px weight 600, 7px 13px padding (10px 16px in the Work-with-me card, full-width 12px tall-padded in the mobile drawer). Hover lifts the fill to ink hover; press scales to 0.97 over 150ms.
- **Secondary (outlined pill):** transparent with a hairline outline, ink text, Satoshi 13px weight 500, a 14px leading icon. Hover strengthens the outline and fills it with card white (150ms). Used for social links, evidence links, the mermaid "Expand" control, and the mobile menu trigger (40px square).
- **Tertiary (arrow link):** rust Satoshi 13px weight 500 with a trailing arrow that nudges 2px right on hover (200ms, cubic-bezier(0.22, 1, 0.36, 1)) while the text deepens to kiln rust.
- **Focus:** a 2px rust outline offset 2px on every focusable element.

### Chips (section headings)
- **Style:** the h2 of every section is an outlined pill - hairline border, transparent fill, muted ink text, Satoshi 13px weight 500 at +0.01em, 5px 12px 6px padding, with an optional 14px muted icon.
- **State:** static; chips are labels, not controls.

### Tags and status badges
- **Tag:** card-white fill, hairline border, 8px radius, Satoshi 12.5px weight 500, with a 6px swatch dot chosen by name hash. Used for tech and domain lists on cards, heroes, and experience entries.
- **Status badge:** outlined pill, muted Satoshi 12px, with a 6px status dot (success for Live, ochre for WIP/Ongoing, teal for Completed, faint for Paused).

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** card white on paper.
- **Shadow Strategy:** card rest shadow (see Elevation & Depth); no border.
- **Border:** none; internal dividers are hairlines.
- **Internal Padding:** 20px mobile, 24px from 640px up (16px for compact cards like Work with me and diagrams).
- **Project card:** status badge and year on top, 22px title whose link stretches over the whole card, Erode summary, up to six tags, then a rust "Read the overview" arrow link plus muted Code / Live links.

### Lists
- **Post list:** hairline-ruled rows (top, bottom, and between). Title in Satoshi 15px weight 600, Erode 15px summary clamped to two lines, Satoshi 13px faint date right-aligned on desktop and above the title on mobile. Hover fills the row with card white at 14px radius.
- **Experience timeline:** monogram tile, company and role, date range with a chevron; entries collapse open (240ms, cubic-bezier(0.22, 1, 0.36, 1)) to reveal short-dash bullets and tags, connected by a dotted rail.

### Navigation
- **Desktop:** right-aligned Satoshi 14px links, muted at rest and ink when active or hovered, followed by the ink "Work with me" pill. The left slot holds the 17px lowercase wordmark.
- **Mobile:** a 40px outlined menu pill opens a right-side sheet drawer on paper with the sheet shadow; links are 16px rows at 14px radius, the active row lifted as a white card; the ink pill sits full-width at the bottom.
- **Tabs:** pill tabs - muted Satoshi 13px labels; the active tab becomes a white, hairline-outlined, card-shadowed pill.

### Mascot and stamp (signature)
The identity image is the "cap" mascot: a directional sprite sheet that turns its head toward the cursor, rendered at 208px (160px mobile) to the left of the wordmark. A static front-facing frame of the same sheet appears at 56px inside the perforated cream stamp in the Work-with-me card that closes every page. The mascot stands in for a portrait; do not add a photo beside it.

### Company monograms
Squircle tiles (22% radius) filled with the name's swatch color, white Satoshi bold initials, a faint inset ink ring. They stand in for logos at 30px in the hero row and 36px in the timeline.

### Prose
Erode 17px at line-height 1.7 with Satoshi semibold headings (h2 22px, h3 18px, tight negative tracking). Links are rust with a 35%-rust underline offset 3px that becomes solid on hover. Code blocks, tables, blockquotes, images and diagrams are all cards. Horizontal rules are dashed seams. Mermaid diagrams use the paper palette (white nodes, strong-hairline borders, ink text, Satoshi labels).

## Do's and Don'ts

### Do:
- **Do** open every section with a pill chip heading and separate sections with a dashed seam (5px dash, 4px gap, hairline color).
- **Do** keep every page inside the 672px column with 24px gutters.
- **Do** put reading text in Erode and every label, heading, button and meta line in Satoshi.
- **Do** lift surfaces only with the single soft card shadow on card white at 14px radius.
- **Do** use rust for links and focus only, and the black ink pill for the one primary action.
- **Do** pick categorical color through the name-hash swatch set so a tag or company always gets the same dot.
- **Do** use ASCII punctuation in copy; a hyphen, never an em or en dash.
- **Do** keep the mobile nav as a right-side sheet drawer.

### Don't:
- **Don't** add a dark theme, theme toggle, or `dark:` variants.
- **Don't** fill a button, badge or surface with rust.
- **Don't** add a second solid button style or a second accent hue.
- **Don't** use JetBrains Mono outside code, or uppercase letter-spaced labels anywhere in the UI.
- **Don't** use hard offset shadows, colored glows, or gradient color fills on surfaces.
- **Don't** break the column with full-bleed bands, sidebars, or multi-column page grids.
- **Don't** replace the mobile drawer with a full-screen takeover.
- **Don't** introduce colors outside the tokens in `src/app/globals.css`; extend the token set there first.
