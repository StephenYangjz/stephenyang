import bibtexParse from 'bibtex-parse-js';

/** Names that should render bold — the bib uses the legal name. */
const SELF = ['jiezhi yang', 'stephen yang', 'jiezhi stephen yang'];
const SELF_DISPLAY = 'Jiezhi (Stephen) Yang';

/** Trailing tokens that mark a suffix rather than a given name. */
const SUFFIXES = new Set(['inc.', 'inc', 'llc', 'ltd', 'ltd.', 'jr.', 'jr', 'sr.', 'sr', 'ii', 'iii', 'iv', 'phd', 'ph.d.']);

const clean = (value) => (value || '').replace(/[{}]/g, '').trim();

/** bibtex-parse-js preserves the source casing of field names. */
function tag(entry, name) {
  const tags = entry.entryTags || {};
  const key = Object.keys(tags).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  return key ? clean(tags[key]) : null;
}

function parseAuthors(raw) {
  return (raw || '')
    .split(/\s+and\s+/i)
    .map((author) => {
      const raw = clean(author);
      // A trailing asterisk marks joint first authorship. It has to come off
      // before anything else looks at the name, or "Jiezhi Yang*" fails to
      // match SELF and my own name stops rendering bold.
      const equal = /\*\s*$/.test(raw);
      const name = raw.replace(/\*/g, '').trim();
      // "Last, First" -> "First Last", but only for a genuine inversion.
      // A trailing suffix ("Qualcomm Technologies, Inc.") must not be flipped.
      const parts = name.split(',').map((p) => p.trim()).filter(Boolean);
      const normalised =
        parts.length === 2 && !SUFFIXES.has(parts[1].toLowerCase())
          ? `${parts[1]} ${parts[0]}`
          : name;
      const isSelf = SELF.includes(
        normalised.toLowerCase().replace(/[().]/g, '').replace(/\s+/g, ' ')
      );
      return { name: isSelf ? SELF_DISPLAY : normalised, isSelf, equal };
    })
    .filter((a) => a.name);
}

const LINK_ORDER = ['project', 'pdf', 'arxiv', 'code', 'patent'];
const LINK_LABEL = {
  project: 'Project',
  pdf: 'PDF',
  arxiv: 'arXiv',
  code: 'Code',
  patent: 'Patent',
};

function toRecord(entry) {
  const links = LINK_ORDER.map((key) => [key, tag(entry, key)]).filter(
    ([, url]) => url
  );

  return {
    key: entry.citationKey,
    title: clean(tag(entry, 'title')),
    authors: parseAuthors(tag(entry, 'author')),
    venue:
      tag(entry, 'venue') || tag(entry, 'journal') || tag(entry, 'booktitle'),
    year: tag(entry, 'year'),
    award: tag(entry, 'award'),
    kind: (tag(entry, 'kind') || 'paper').toLowerCase(),
    links,
  };
}

function PublicationRow({ item }) {
  const primary =
    item.links.find(([key]) => key === 'project') ||
    item.links.find(([key]) => key === 'arxiv') ||
    item.links.find(([key]) => key === 'pdf');

  return (
    <article className="pub-row">
      <div className="min-w-0 reveal">
        <h3 className="pub-title">
          {primary ? (
            <a href={primary[1]} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h3>

        {item.authors.length > 0 && (
          <p className="pub-authors mt-1.5">
            {item.authors.map((author, index) => (
              <span key={`${author.name}-${index}`}>
                {author.isSelf ? <strong>{author.name}</strong> : author.name}
                {author.equal && <sup className="pub-equal">*</sup>}
                {index < item.authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {item.venue && <span className="chip">{item.venue}</span>}
          {item.award && (
            <span className="chip chip-award">{item.award}</span>
          )}

          {item.links.length > 0 && (
            <span className="flex flex-wrap items-center gap-2 ml-1">
              {item.links.map(([key, url], index) => (
                <span key={key} className="flex items-center gap-2">
                  {index > 0 && (
                    <span style={{ color: 'var(--rule-strong)' }}>·</span>
                  )}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pub-link"
                  >
                    {LINK_LABEL[key]}
                  </a>
                </span>
              ))}
            </span>
          )}
        </div>
      </div>

      <div className="pub-year tabular reveal-lag">{item.year}</div>
    </article>
  );
}

export default function Publications({ bibtex }) {
  // One continuous list. Patents and other work are no longer split into a
  // trailing block — they carry their own venue chip ("US Patent App. …"),
  // which is enough to tell them apart inline.
  const entries = bibtexParse
    .toJSON(bibtex)
    .map(toRecord)
    .sort((a, b) => Number(b.year || 0) - Number(a.year || 0));

  // Only explain the asterisk if one is actually on the page.
  const hasEqual = entries.some((item) =>
    item.authors.some((author) => author.equal)
  );

  return (
    <div>
      {entries.map((item) => (
        <PublicationRow key={item.key} item={item} />
      ))}
      {hasEqual && (
        <p className="pub-legend">
          <span className="pub-equal">*</span> Equal contribution.
        </p>
      )}
    </div>
  );
}
