import { personalInfo } from '@/website.config';

function range(start, end) {
  if (!end) return `${start} — Present`;
  return start === end ? start : `${start} — ${end}`;
}

/**
 * These lists are short-text and many-rowed — the worst possible shape for a
 * full-width row, which leaves a long column of mostly empty space. Two
 * columns roughly halve the height and let the wide measure do some work.
 */
export function ExperienceList() {
  return (
    <div className="entry-grid">
      {personalInfo.experience.map((job, index) => (
        <div key={`${job.company}-${index}`} className="entry reveal">
          <span className="entry-when tabular">
            {range(job.startDate, job.endDate)}
          </span>
          <h3 className="entry-title">{job.position}</h3>
          <p className="entry-meta">
            {job.company}
            {job.location ? ` · ${job.location}` : ''}
          </p>
          {job.responsibilities?.length > 0 && (
            <p className="entry-detail">{job.responsibilities.join(' ')}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function EducationList() {
  return (
    <div className="entry-grid">
      {personalInfo.education.map((school, index) => (
        <div key={`${school.institution}-${index}`} className="entry reveal">
          <span className="entry-when tabular">
            {range(school.startYear, school.endYear)}
          </span>
          <h3 className="entry-title">
            {school.degree} in {school.field}
          </h3>
          <p className="entry-meta">
            <a
              href={school.institutionWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              {school.institution}
            </a>
          </p>
          {school.note && <p className="entry-detail">{school.note}</p>}
        </div>
      ))}
    </div>
  );
}

/**
 * Honors are one-liners, so they get one line each — year, title, institution
 * on a single row, two across. Six of them collapse from a screenful to three
 * rows.
 */
export function HonorsList() {
  return (
    <div className="honor-grid">
      {personalInfo.honors.map((honor, index) => (
        <div key={`${honor.title}-${index}`} className="honor reveal">
          <span className="honor-year tabular">{honor.year}</span>
          <span className="honor-title">{honor.title}</span>
          <span className="honor-where">{honor.institution}</span>
        </div>
      ))}
    </div>
  );
}
