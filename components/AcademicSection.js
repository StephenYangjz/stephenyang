import { personalInfo } from "@/website.config";
import { RiBookOpenLine, RiCalendarEventLine, RiBuildingLine } from "@remixicon/react";

export default function AcademicSection() {
  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
        Academics
      </h1>

      {/* Academic Service Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
          <RiBuildingLine size={20} className="text-blue-500" /> Academic Service
        </h2>
        <ul className="list-disc pl-5 text-neutral-600 dark:text-neutral-300 space-y-1">
          {personalInfo.academicService.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

{/* Talks Section */}
<div className="flex flex-col gap-4">
  <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
    <RiCalendarEventLine size={20} className="text-red-500" /> Talks
  </h2>
  <ul className="space-y-4">
    {personalInfo.talks.map((talk, index) => (
      <li key={index} className="flex flex-col space-y-2">
        <span className="text-base font-medium text-neutral-900 dark:text-neutral-100">
          {talk.title}
        </span>
        <span className="text-sm text-neutral-700 dark:text-neutral-400">
          <span className="font-medium">{talk.venue}</span>{' '}
          <span className="text-neutral-500 dark:text-neutral-500">{talk.date}</span>
        </span>
      </li>
    ))}
  </ul>
</div>



      {/* Teaching Section with Horizontal Placement */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
          <RiBookOpenLine size={20} className="text-green-500" /> Teaching
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {personalInfo.teaching.map((course, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {course.title}
                </h3>
                <p className="text-xs text-neutral-700 dark:text-neutral-400">
                  {course.term} <span>{course.year}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coursework Section with Horizontal Placement */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
          <RiBookOpenLine size={20} className="text-purple-500" /> Coursework
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {personalInfo.coursework.map((course, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {course.title}
                </h3>
                <p className="text-xs text-neutral-700 dark:text-neutral-400">
                  {course.number}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
