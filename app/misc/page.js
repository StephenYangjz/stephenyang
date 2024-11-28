import React from "react";
import MiscellaneousSection from "@/components/MiscellaneousSection";

export const metadata = {
  title: "News",
};

export default function Page() {
  return (
    <main className="md:w-[40rem] w-full m-auto px-8 mt-32 flex flex-col gap-10 mb-20">
      <MiscellaneousSection />
    </main>
  );
}
