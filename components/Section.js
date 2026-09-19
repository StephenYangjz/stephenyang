/**
 * Editorial two-column section: a sticky label rail on the left, content on
 * the right. The rail carries a hairline that scrubs 0 → 100% across the
 * section, driven by the section's own view-timeline — so it is a real
 * readout of position within the section rather than a decoration.
 */
export default function Section({ id, label, count, children, className = '' }) {
  return (
    <section id={id} className={`section-tracked ${className}`}>
      <div className="section-grid">
        <div className="section-rail">
          <span className="rail-label">{label}</span>
          <div className="rail-progress" aria-hidden="true" />
          {count != null && <div className="rail-count">{count}</div>}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
