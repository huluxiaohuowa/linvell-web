# Website design and verification

The concept in `site-concept.png` was generated with the built-in image-generation tool before implementation. It establishes a single-page editorial composition, a pale `#f5f5ef` background, dark `#192822` type, forest-green actions, open whitespace and a compact footer. Major interface text remains HTML/CSS.

Intentional updates after concepting:

- Added the requested jade gourd mark to the wordmark and favicon.
- Replaced the concept's imagined editor picture with an actual Linvell settings screenshot showing the four requested themes. The Mac locked before a final workspace screenshot could be saved. No generated mockup is presented as a shipping feature.
- The secondary call to action links to preview releases, reflecting the requested GitHub-only distribution.
- Added a concise development-status page to keep implemented and open features explicit.

Comparison ledger:

| Point | Result |
| --- | --- |
| Header/navigation | Preserved wordmark at left and three compact controls at right; gourd added as requested. |
| Copy/hierarchy | Preserved the two-line headline and supporting copy; preview-release CTA updated intentionally. No extra hero badges. |
| Palette | Pale background, dark ink and forest actions match the concept tokens. |
| Typography/spacing | Large tight headline, generous section whitespace, separate availability line and aligned action row. |
| Product asset | Actual native screenshot, visible caption and full-size image link; no fictional release claims. |
| Footer | Simple horizontal rule, wordmark and closing line, without added cards or unrelated sections. |
| Responsive | Desktop viewport 1440×1100 and mobile 390×844 inspected through the in-app browser; images loaded and no horizontal overflow was reported. |
| Interaction | Chinese switch updated the full visible copy; development CTA navigated to the live local development page. |

The concept and rendered desktop screenshot were both inspected with `view_image`. The layout and styling were checked against the concept with the above intentional product updates. Screenshot files used for QA stay outside the deployed root except the retained design reference and published app image.
