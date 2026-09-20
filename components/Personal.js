import Image from 'next/image';
import {
  photography,
  photographyLink,
  reading,
  notes,
} from '@/website.config';
import { RiArrowRightUpLine } from '@remixicon/react';

/**
 * Mosaic gallery. Tile sizes come from grid spans rather than per-image
 * aspect ratios, so the rows stay flush no matter what shape the source
 * photos are — you can drop in anything and the grid holds.
 *
 * Each frame is over-tall and pans inside itself on its own view-timeline,
 * so the images drift at slightly different moments as the grid passes.
 */
export function PhotographyGrid() {
  if (!photography?.length) return null;

  return (
    <div>
      <div className="photo-grid">
        {photography.map((photo, index) => (
          <figure
            key={photo.src}
            className={`photo photo-${(index % 6) + 1} reveal`}
          >
            <div className="photo-frame">
              <Image
                src={photo.src}
                alt={photo.caption || ''}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1180px) 33vw, 380px"
                className="photo-img"
              />
            </div>
            {(photo.place || photo.year) && (
              <figcaption className="photo-cap">
                {photo.place}
                {photo.place && photo.year ? ' · ' : ''}
                {photo.year}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {photographyLink && (
        <a
          href={photographyLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn mt-6"
        >
          <RiArrowRightUpLine size={14} />
          {photographyLink.label}
        </a>
      )}
    </div>
  );
}

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
