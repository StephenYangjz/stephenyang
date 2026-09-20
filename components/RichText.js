import { Fragment } from 'react';

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Renders `[text](url)` inside a plain config string as real anchors.
 *
 * This exists so the bio can live in website.config.js next to everything
 * else that gets edited. Prose with a dozen links is the reason it was in
 * MDX; keeping the markdown link syntax means it is no harder to write now
 * that it is a JavaScript string.
 *
 * Builds React elements rather than setting innerHTML, so a stray angle
 * bracket in the copy stays text.
 */
export default function RichText({ text }) {
  const nodes = [];
  // A fresh regex per call: /g instances carry lastIndex between uses.
  const re = new RegExp(LINK.source, 'g');
  let last = 0;
  let match;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));

    const [, label, href] = match;
    const external = /^https?:/i.test(href);
    nodes.push(
      <a
        key={`${href}-${match.index}`}
        href={href}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {label}
      </a>
    );
    last = match.index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));

  return (
    <>
      {nodes.map((node, i) => (
        <Fragment key={i}>{node}</Fragment>
      ))}
    </>
  );
}
