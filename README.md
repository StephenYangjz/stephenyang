# Stephen Yang — Homepage

Personal academic homepage. Next.js (App Router) + Tailwind, statically exported to GitHub Pages.

Live at [stephenjyang.com](https://stephenjyang.com).

## Design

A single wide editorial column with a sticky label rail, and a liquid-glass floating header.

**Scroll-driven motion.** Everything continuous is native CSS scroll-driven animation
(`animation-timeline: scroll()` / `view()`), which runs on the compositor and scrubs
backwards when you scroll up:

| Effect | Where | Timeline |
| --- | --- | --- |
| Hero recedes and hands off to the pill | `.hero-recede` | `scroll(root)`, `0 → 300px` |
| Section rail progress hairline | `.rail-progress` | named `--section` view-timeline |
| Row reveals, with the year lagging the row | `.reveal` / `.reveal-lag` | `view()` |
| Portrait parallax | `.portrait-drift` | `view()` |
| Ambient wash drift | `.ambient span` | `scroll(root)` |
| Photos panning inside their frames | `.photo-img` | `view()` |

`components/ScrollBoot.js` adds `.no-sda` where `animation-timeline` is unsupported
(Safari < 26, older Firefox) and swaps in an IntersectionObserver + transition fallback.
It also owns the one genuinely discrete bit of state — whether the page has been scrolled,
which drives the pill morph.

Both themes are tuned independently. Glass values in particular are not derived from the
light palette: opacity, border and highlight all need separate values on a dark ground.

## Editing content

| What | Where |
| --- | --- |
| Name, role, socials, experience, education, honors, talks, service | `website.config.js` |
| Bio, news, miscellaneous | `data/home/*.mdx` |
| Publications | `data/bib/Publications.bib` |
| Photography | `photography` in `website.config.js` + files in `public/photos/` |
| Reading list, notes | `reading` / `notes` in `website.config.js` |
| Images, CV PDF | `public/` |
| Design tokens | `:root` and `.dark` in `app/globals.css` |

### Publications

`data/bib/Publications.bib` is parsed at build time and rendered in file order.
Beyond standard BibTeX fields:

- `venue` — display string for the venue; wins over `journal`/`booktitle`. Once a preprint
  is accepted, set this to the conference and it supersedes the arXiv listing.
- `award` — rendered as a highlighted badge.
- `kind` — `patent` or `other` moves the entry into the "Patents & Other" block at the end.
- `project`, `pdf`, `arxiv`, `code`, `patent` — link buttons. The title links to the first
  of project / arXiv / PDF that is present.

Author names matching `SELF` in `components/Publications.js` render bold.

### Photography

Drop images in `public/photos/` and point the `photography` entries in
`website.config.js` at them. Tile shapes come from CSS grid spans rather than
the images' own aspect ratios, so any shape works and the rows stay flush —
the frames crop, and each image pans inside its frame on its own view-timeline.

The **first entry is the large tile** in the mosaic, so lead with your strongest
frame. Six entries fill the grid exactly; fewer is fine, more keeps tiling in
the same rhythm. Captions reveal on hover, and are always visible on touch.

The repo ships six labelled SVG placeholders — replace them and delete the
originals. `reading` and `notes` ship as placeholder text too; setting either
array to `[]` hides that section.

## Development

Requires Node 18+.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```

Deployment is handled by `.github/workflows/nextjs.yml` on push.

## Credits

Originally based on [academic-homepage-template](https://github.com/anxndsgn/academic-homepage-template);
the design has since been rewritten. MIT licensed — see `LICENSE`.
