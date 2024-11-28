import { personalInfo } from '@/website.config';
import { RiBriefcaseLine, RiAwardLine, RiBookLine } from '@remixicon/react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function CVSection() {
  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
        Curriculum Vitae
      </h1>

      {/* Education Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
          <RiBookLine size={20} className="text-green-500" /> Education
        </h2>
        <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-400 space-y-2">
          {personalInfo.education.map((edu, index) => (
            <li key={index}>
              <strong className="text-neutral-900 dark:text-neutral-100">
                {edu.degree}
              </strong>{' '}
              in {edu.field} at{' '}
              <a
                href={edu.institutionWebsite}
                target="_blank"
                className="text-indigo-500 hover:underline"
              >
                {edu.institution}
              </a>{' '}
              ({edu.startYear} - {edu.endYear})
            </li>
          ))}
        </ul>
      </div>

      {/* Professional Experience Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
          <RiBriefcaseLine size={20} className="text-indigo-500" /> Professional Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalInfo.experience.map((job, index) => (
            <div
              key={index}
              className="flex flex-col bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow space-y-2"
            >
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {job.position}
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-400">
                {job.company}
                {job.location && ` • ${job.location}`}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {job.startDate} - {job.endDate || 'Present'}
              </p>
              <ul className="list-disc pl-5 text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
                {job.responsibilities.map((task, taskIndex) => (
                  <li key={taskIndex}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Honors and Awards Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
          <RiAwardLine size={20} className="text-yellow-500" /> Honors and Awards
        </h2>
        <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-400 space-y-2">
          {personalInfo.honors.map((honor, index) => (
            <li key={index}>
              <strong className="text-neutral-900 dark:text-neutral-100">
                {honor.title}
              </strong>{' '}
              ({honor.year}) —{' '}
              <span className="text-neutral-600 dark:text-neutral-400">
                {honor.institution}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Download CV Button */}
      <div className="flex gap-3">
        <Button asChild variant="outline" size="sm" className="hover:bg-indigo-50 hover:text-indigo-600">
          <Link href={personalInfo.cvUrl} target="_blank">
            Download Full CV
          </Link>
        </Button>
      </div>
    </section>
  );
}
