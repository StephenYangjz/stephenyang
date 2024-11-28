import React from "react";
import MiscellaneousMd from "@/data/home/Miscellaneous.mdx"; // Path to your MDX file
import { personalInfo } from "@/website.config";

export default function MiscellaneousSection() {
  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-3xl font-semibold">Miscellaneous</h1>
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MiscellaneousMd personalInfo={personalInfo} />
      </article>
    </section>
  );
}
