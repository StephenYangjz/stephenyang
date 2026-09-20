import bibtexParse from 'bibtex-parse-js';
import { featuredPublications } from '@/website.config';
import { RiArrowRightUpLine } from '@remixicon/react';

const SELF = ['jiezhi yang', 'stephen yang'];
const clean = (v) => (v || '').replace(/[{}]/g, '').trim();

function tag(entry, name) {
  const tags = entry.entryTags || {};
  const key = Object.keys(tags).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  return key ? clean(tags[key]) : null;
}

function authorLine(raw) {
  return (raw || '')
    .split(/\s+and\s+/i)
    .map(clean)
    .map((n) =>
      SELF.includes(n.toLowerCase()) ? 'Jiezhi (Stephen) Yang' : n
    )
    .join(', ');
}

/**
 * Three papers cross-fading inside a single pinned stage — the stage holds
 * while the page scrolls, and each panel owns a third of the track's range.
 * This is the "Apple product page" move: one screen, several beats.
 */
export default function SelectedWork({ bibtex }) {
  const entries = bibtexParse.toJSON(bibtex);
  const picked = (featuredPublications || [])
    .map((key) => entries.find((e) => e.citationKey === key))
    .filter(Boolean)
    .slice(0, 3);

  if (!picked.length) return null;

  return (
    <section className="pin-track" style={{ height: '300svh' }}>
      <div className="pin-stage">
        <div className="shell w-full">
          <div className="section-grid">
            <div>
              <span className="rail-label">Selected work</span>
            </div>

            <div className="panel-stack min-w-0">
              {picked.map((entry, index) => {
                const venue =
                  tag(entry, 'venue') ||
                  tag(entry, 'journal') ||
                  tag(entry, 'booktitle');
                const award = tag(entry, 'award');
                const title = clean(tag(entry, 'title'));
                const [shortTitle, ...rest] = title.split(': ');
                const project = tag(entry, 'project');
                const arxiv = tag(entry, 'arxiv');

                return (
                  <article key={entry.citationKey} className="panel-cycle">
                    <span className="panel-index">
                      {String(index + 1).padStart(2, '0')} /{' '}
                      {String(picked.length).padStart(2, '0')}
                    </span>

                    <div className="panel-venue">
                      {venue && <span className="chip">{venue}</span>}
                      {award && <span className="chip chip-award">{award}</span>}
                    </div>

                    <h2 className="panel-title">{shortTitle}</h2>

                    {rest.length > 0 && (
                      <p className="panel-sub">{rest.join(': ')}</p>
                    )}

                    <p className="panel-authors">
                      {authorLine(tag(entry, 'author'))}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {project && (
                        <a
                          href={project}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-btn"
                        >
                          <RiArrowRightUpLine size={14} />
                          Project page
                        </a>
                      )}
                      {arxiv && (
                        <a
                          href={arxiv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-btn"
                        >
                          <RiArrowRightUpLine size={14} />
                          arXiv
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}

              <div className="panel-dots" aria-hidden="true">
                {picked.map((entry) => (
                  <span key={entry.citationKey} className="panel-dot" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
