/**
 * Every page gets a real masthead instead of opening on a bare rail label.
 *
 * `rule` draws the hairline that separates the masthead from the content
 * below. Pages that follow the masthead with their own element — a button,
 * a photograph — should turn it off, since the rule then divides the
 * heading from something that belongs to it rather than from the content.
 */
export default function Masthead({ kicker, title, note, rule = true }) {
  return (
    <header className="masthead">
      {kicker && <p className="masthead-kicker">{kicker}</p>}
      <h1 className="masthead-title">{title}</h1>
      {note && <p className="masthead-note">{note}</p>}
      {rule && <div className="masthead-rule" />}
    </header>
  );
}
