import { reading } from '@/website.config';

export function ReadingList() {
  if (!reading?.length) return null;

  return (
    <div>
      {reading.map((book, index) => (
        <article key={`${book.title}-${index}`} className="book reveal">
          <div className="book-main">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            {book.note && <p className="book-note">{book.note}</p>}
          </div>

          {book.quote && (
            <blockquote className="book-quote">
              <p>{book.quote}</p>
              <cite>{book.author}</cite>
            </blockquote>
          )}
        </article>
      ))}
    </div>
  );
}
