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

Almost everything you'd want to change is in **`website.config.js`**. It opens
with a map of where each piece lives.

| What | Where |
| --- | --- |
| Name, role, tagline, location, social links | `website.config.js` → `personalInfo` |
| Experience, education, honors | `website.config.js` → `personalInfo` |
| Every page heading and section label | `website.config.js` → `pages` |
| Order of the "keep scrolling" links | `website.config.js` → `readingOrder` |
| The four "At a glance" facts | `website.config.js` → `glanceFacts` |
| Photography, reading list, notes | `website.config.js` |
| Bio prose | `data/home/About.mdx` |
| News list | `data/home/News.mdx` |
| Personal bullet points | `data/home/Miscellaneous.mdx` |
| Papers and patents | `data/bib/Publications.bib` |
| Images, photos, CV PDF | `public/` |
| Design tokens (colour, radius, spacing) | `:root` / `.dark` in `app/globals.css` |

No user-facing text lives in the components.

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
