"use client";
import { personalInfo } from "../../website.config";
import { RiMenuLine, RiCloseLine, RiSunLine } from "@remixicon/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { name: "Projects", href: "/projects" },
  { name: "Publications", href: "/publications" },
  { name: "CV", href: "/cv" },
];

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div
      className={`flex flex-col fixed top-0 w-full bg-neutral-50/30 backdrop-blur-lg content-start `}
    >
      <nav className="flex justify-between m-auto md:w-[36rem] w-full py-4 text-lg px-4 h-auto">
        <Button asChild variant="ghost">
          <Link href={"/"} className="font-semibold">
            {personalInfo.name}
          </Link>
        </Button>
        <div className="flex">
          <div className="md:block hidden text-neutral-600 ">
            <Button asChild variant="ghost">
              <Link href={"/projects"} className=" font-normal">
                Projects
              </Link>
            </Button>
            <Button asChild variant="ghost" className=" font-normal">
              <Link href={"/pulications"}>Pulications</Link>
            </Button>
            <Button asChild variant="ghost" className=" font-normal">
              <Link href={"/cv"}>CV</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => {
              setMenuIsOpen(!menuIsOpen);
            }}
          >
            {menuIsOpen ? (
              <RiCloseLine className="w-5 h-5" />
            ) : (
              <RiMenuLine className="w-5 h-5" />
            )}
          </Button>

          <Button variant="ghost" size="icon">
            <RiSunLine className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      <div
        className={`h-lvh flex flex-col w-3/4 m-auto mt-8 gap-4 md:hidden ${
          menuIsOpen ? "block" : " hidden"
        }`}
      >
        <Button asChild variant="ghost">
          <Link href={"/projects"}>Projects</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href={"/pulications"}>pulications</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href={"/cv"}>CV</Link>
        </Button>
      </div>
    </div>
  );
}