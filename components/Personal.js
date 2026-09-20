import { reading, notes } from '@/website.config';

export function ReadingList() {
  if (!reading?.length) return null;

  return (
    <div className="entry-grid">
      {reading.map((book, index) => (
        <div key={`${book.title}-${index}`} className="entry reveal">
          <h3 className="entry-title">{book.title}</h3>
          <p className="entry-meta">{book.author}</p>
          {book.note && <p className="entry-detail">{book.note}</p>}
        </div>
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
