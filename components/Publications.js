import React from "react";
import { personalInfo } from "@/website.config";
import { CustomMDX } from "@/components/mdx";
import bibtexParse from "bibtex-parse-js";
import { RiGlobeLine, RiFilePdfLine, RiCodeLine } from "react-icons/ri";
import { BiBookAlt } from "react-icons/bi"; // Corrected arXiv icon

function authorProcess(authorsStr, personalInfo) {
  const authors = authorsStr.split("and");

  const boldedAuthors = authors.map((author) => {
    author = author.trim().split(", ").reverse().join(" ").trim();

    if (author === personalInfo) {
      return `**${personalInfo}**`;
    }

    return author;
  });

  return boldedAuthors.join(", ");
}

function PublicationCard({ title, authors, journal, year, award, links }) {
  return (
    // <div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 hover:shadow-sm p-6 gap-2 overflow-hidden overflow-x-hidden">
    //   {/* Title Section */}
    //   <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
    //     {links.project ? (
    //       <a href={links.project} className="underline hover:text-blue-500">
    //         {title}
    //       </a>
    //     ) : (
    //       title
    //     )}
    //   </h2>

    //   {/* Authors Section */}
    //   <div className="text-neutral-600 dark:text-neutral-300 font-light">
    //     <CustomMDX source={authors} />
    //   </div>

    //   {/* Details Section */}
    //   <div className="text-sm text-neutral-600 dark:text-neutral-300">
    //     <span className="mr-2 italic">{journal}</span>
    //     <span className="mr-2">{year}</span>
    //     {award && <span className="font-bold">{award}</span>}
    //   </div>

    //   {/* Action Buttons Section */}
    //   <div className="flex flex-wrap gap-2">
    //     {links.project && (
    //       <a
    //         href={links.project}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600"
    //       >
    //         <RiGlobeLine size={16} /> Project Page
    //       </a>
    //     )}
    //     {links.pdf && (
    //       <a
    //         href={links.pdf}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600"
    //       >
    //         <RiFilePdfLine size={16} /> PDF
    //       </a>
    //     )}
    //     {links.arxiv && (
    //       <a
    //         href={links.arxiv}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600"
    //       >
    //         <BiBookAlt size={16} /> arXiv
    //       </a>
    //     )}
    //     {links.code && (
    //       <a
    //         href={links.code}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600"
    //       >
    //         <RiCodeLine size={16} /> Code
    //       </a>
    //     )}
    //   </div>
    // </div>

    <div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 hover:shadow-sm p-6 gap-3 overflow-hidden overflow-x-hidden hover:shadow-lg transition-shadow">
  {/* Title Section */}
  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
    {links.project ? (
      <a href={links.project} className="underline hover:text-blue-500">
        {title}
      </a>
    ) : (
      title
    )}
  </h2>

  {/* Authors Section */}
  <div className="text-sm text-neutral-600 dark:text-neutral-300 font-light">
    <CustomMDX source={authors} />
  </div>

  {/* Details Section */}
  <div className="text-sm text-neutral-600 dark:text-neutral-300">
    <span className="mr-2 italic">{journal}</span>
    <span className="mr-2">{year}</span>
    {award && <span className="font-bold">{award}</span>}
  </div>

  {/* Action Buttons Section */}
  <div className="flex flex-wrap gap-2">
    {links.project && (
      <a
        href={links.project}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-shadow"
      >
        <RiGlobeLine size={16} /> Project Page
      </a>
    )}
    {links.pdf && (
      <a
        href={links.pdf}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-shadow"
      >
        <RiFilePdfLine size={16} /> PDF
      </a>
    )}
    {links.arxiv && (
      <a
        href={links.arxiv}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-shadow"
      >
        <BiBookAlt size={16} /> arXiv
      </a>
    )}
    {links.code && (
      <a
        href={links.code}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-shadow"
      >
        <RiCodeLine size={16} /> Code
      </a>
    )}
  </div>
</div>


  );
}


export default function Publications({ bibtex }) {
  const parsed = bibtexParse.toJSON(bibtex);

  return (
    <section className="grid gap-5 transition-all h-auto">
      {parsed.map((item, index) => {
        const processedAuthors = authorProcess(
          item.entryTags?.author || "",
          personalInfo.name
        );

        // Generate links from bibtex fields
        const links = {
          project: item.entryTags?.project || null,
          pdf: item.entryTags?.pdf || null,
          arxiv: item.entryTags?.arxiv || null,
          code: item.entryTags?.code || null,
        };

        return (
          <PublicationCard
            key={index} // Using index as fallback if title is not unique
            title={(item.entryTags?.title || "").replace(/{|}/g, "")}
            authors={processedAuthors}
            journal={
              item.entryTags?.journal?.replace(/{|}/g, "") ||
              item.entryTags?.booktitle?.replace(/{|}/g, "") ||
              "N/A"
            }
            year={item.entryTags?.year || "N/A"}
            award={item.entryTags?.award || null}
            links={links}
          />
        );
      })}
    </section>
  );
}
