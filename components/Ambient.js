/**
 * The ground the glass refracts.
 *
 * Deliberately monochrome — a single hue family at low opacity. Multi-hue
 * washes fight the content and make the glass read as a novelty; this is
 * meant to behave like lighting in the room, not like decoration.
 */
export default function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}
