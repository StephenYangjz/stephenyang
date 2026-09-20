import Link from 'next/link';
import { RiArrowRightLine } from '@remixicon/react';

const LINKS = [
  {
    kicker: 'Research',
    title: 'Publications',
    note: 'Every paper, plus patents and other work.',
    href: '/publications',
  },
  {
    kicker: 'Background',
    title: 'CV',
    note: 'Experience, education, and honors.',
    href: '/cv',
  },
  {
    kicker: 'Off the clock',
    title: 'Personal',
    note: 'Photography, reading, and half-formed thoughts.',
    href: '/personal',
  },
];

export default function PageLinks() {
  return (
    <div className="page-links">
      {LINKS.map((link) => (
        <Link key={link.href} href={link.href} className="page-link reveal">
          <div>
            <p className="page-link-kicker">{link.kicker}</p>
            <h3 className="page-link-title">{link.title}</h3>
            <p className="page-link-note">{link.note}</p>
          </div>
          <span className="page-link-go">
            Open <RiArrowRightLine size={14} />
          </span>
        </Link>
      ))}
    </div>
  );
}
