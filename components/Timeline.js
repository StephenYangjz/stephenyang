import { personalInfo } from '@/website.config';

function range(start, end) {
  if (!end) return `${start} — Present`;
  return start === end ? start : `${start} — ${end}`;
}

export function ExperienceList() {
  return (
    <div>
      {personalInfo.experience.map((job, index) => (
        <div key={`${job.company}-${index}`} className="timeline-row">
          <div className="timeline-when tabular reveal-lag">
            {range(job.startDate, job.endDate)}
          </div>
          <div className="min-w-0 reveal">
            <h3 className="text-[15.5px] font-medium tracking-[-0.014em]">
              {job.position}
              <span style={{ color: 'var(--muted)' }}> · {job.company}</span>
            </h3>
            {job.location && (
              <p className="mt-0.5 text-[13px]" style={{ color: 'var(--muted)' }}>
                {job.location}
              </p>
            )}
            {job.responsibilities?.length > 0 && (
              <ul className="mt-2 space-y-1">
                {job.responsibilities.map((line) => (
                  <li
                    key={line}
                    className="text-[13.5px] leading-relaxed"
                    style={{ color: 'var(--text-soft)' }}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function EducationList() {
  return (
    <div>
      {personalInfo.education.map((school, index) => (
        <div key={`${school.institution}-${index}`} className="timeline-row">
          <div className="timeline-when tabular reveal-lag">
            {range(school.startYear, school.endYear)}
          </div>
          <div className="min-w-0 reveal">
            <h3 className="text-[15.5px] font-medium tracking-[-0.014em]">
              {school.degree} in {school.field}
            </h3>
            <p className="mt-0.5 text-[13.5px]" style={{ color: 'var(--muted)' }}>
              <a
                href={school.institutionWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                {school.institution}
              </a>
              {school.note ? ` · ${school.note}` : ''}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HonorsList() {
  return (
    <div>
      {personalInfo.honors.map((honor, index) => (
        <div key={`${honor.title}-${index}`} className="timeline-row">
          <div className="timeline-when tabular reveal-lag">{honor.year}</div>
          <div className="min-w-0 reveal">
            <h3 className="text-[15px] font-medium tracking-[-0.012em]">
              {honor.title}
            </h3>
            <p className="mt-0.5 text-[13px]" style={{ color: 'var(--muted)' }}>
              {honor.institution}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ServiceAndTalks() {
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      <div className="reveal">
        <h3 className="rail-label">Service</h3>
        <ul className="mt-4 space-y-2">
          {personalInfo.academicService.map((entry) => (
            <li
              key={entry}
              className="text-[14px]"
              style={{ color: 'var(--text-soft)' }}
            >
              {entry}
            </li>
          ))}
        </ul>
      </div>

      <div className="reveal">
        <h3 className="rail-label">Talks</h3>
        <ul className="mt-4 space-y-3">
          {personalInfo.talks.map((talk) => (
            <li key={talk.title}>
              <p
                className="text-[14px] leading-snug"
                style={{ color: 'var(--text-soft)' }}
              >
                {talk.title}
              </p>
              <p className="mt-0.5 text-[12.5px]" style={{ color: 'var(--muted)' }}>
                {talk.venue} · {talk.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
