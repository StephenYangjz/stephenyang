import { personalInfo } from '@/website.config';
import VisitorMap from '@/components/VisitorMap';

export default function Footer() {
  return (
    <footer className="relative z-10 pb-16">
      <div className="shell">
        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-8 text-[12.5px]"
          style={{ borderTop: '1px solid var(--rule)', color: 'var(--muted)' }}
        >
          <span>
            © {new Date().getFullYear()} {personalInfo.fullName}
          </span>
          <span className="flex items-center gap-2.5">
            <VisitorMap />
            <span>{personalInfo.location} · Built with Next.js</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
