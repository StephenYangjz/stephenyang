'use client';

import { useEffect, useRef } from 'react';

/**
 * Reveals text one *visual line* at a time.
 *
 * Earlier passes staggered whole paragraphs and called it line-by-line — a
 * paragraph is four or five lines, so it never looked like one. The only way
 * to address real lines is to measure them after layout, because where a line
 * breaks depends on the font, the width and the text itself.
 *
 * Approach: wrap every word in a span, then let each span carry its own
 * view() timeline. Words that share a visual line share a vertical position,
 * so they animate in lockstep for free; the next line sits one line-height
 * lower and therefore crosses the trigger window slightly later. The stagger
 * falls out of the layout rather than being hand-tuned, and it stays correct
 * when the text reflows at a different width.
 *
 * Only opacity is animated. Blurring a couple of hundred spans is a real
 * cost on the compositor, and the fade alone gives the effect.
 */
export default function LineReveal({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || root.dataset.split === 'done') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.textContent.trim()) textNodes.push(node);
    }

    textNodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      // Keep the whitespace as real text nodes so wrapping is unaffected.
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          return;
        }
        const span = document.createElement('span');
        span.className = 'lr-w';
        span.textContent = part;
        fragment.appendChild(span);
      });
      node.parentNode.replaceChild(fragment, node);
    });

    root.dataset.split = 'done';
    root.classList.add('lr-ready');
  }, []);

  return (
    <div ref={ref} className={`line-reveal ${className}`}>
      {children}
    </div>
  );
}
