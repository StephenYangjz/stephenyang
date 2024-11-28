import React from "react";
import CVSection from "@/components/CVSection";

export const metadata = {
  title: "CV",
};

export default function Page() {
  return (
    <main className="md:w-[40rem] w-full m-auto px-8 mt-32 flex flex-col gap-10 mb-20">
      <CVSection />
    </main>
  );
}
