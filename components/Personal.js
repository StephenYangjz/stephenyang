import { reading, notes } from '@/website.config';

export function ReadingList() {
  if (!reading?.length) return null;

  return (
    <div>
      {reading.map((book, index) => (
        <article key={`${book.title}-${index}`} className="book reveal">
          <div className="book-meta">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
          </div>
          {book.note && <p className="book-note">{book.note}</p>}
        </article>
      ))}
    </div>
  );
}

export function NotesList() {
  if (!notes?.length) return null;

  return (
    <div className="note-grid">
      {notes.map((note, index) => (
        <blockquote key={index} className="note reveal">
          <p className="note-text">{note.text}</p>
          {note.date && <cite className="note-date tabular">{note.date}</cite>}
        </blockquote>
      ))}
    </div>
  );
}
