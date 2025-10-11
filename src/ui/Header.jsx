import logo1 from "../assets/logo1.png";
import { RiMovie2Fill } from "react-icons/ri";
import { RxBookmark } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { TfiArrowCircleLeft } from "react-icons/tfi";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav
      className={`${
        navOpen ? "w-44" : "w-28"
      } h-dvh bg-[#1E1F2B] fixed text-white border-r-1 border-r-gray-600`}
    >
      <div className={`${navOpen ? "w-32" : "W-20"} mx-auto`}>
        <img className="box-border object-contain" src={logo1} alt="" />
      </div>
      <ul className="w-full flex flex-col gap-40 mt-8  text-white">
        <li className="pl-6">
          <RiMovie2Fill
            className={`inline-block ${
              navOpen ? "text-2xl" : "text-4xl"
            } text-white`}
          />
          {navOpen ? <span className="pl-2 inline-block">Browse</span> : ""}
        </li>
        <li className="pl-6">
          <RxBookmark
            className={`inline-block ${navOpen ? "text-2xl" : "text-4xl"}`}
          />
          {navOpen ? <span className="pl-2 inline-block">Watch List</span> : ""}
        </li>
        <li className="pl-6">
          <CgProfile
            className={`inline-block ${navOpen ? "text-2xl" : "text-4xl"}`}
          />
          {navOpen ? <span className="pl-2 inline-block">Profile</span> : ""}
        </li>
      </ul>

      <div className="absolute top-1/2 -right-5 z-50 cursor-pointer">
        {navOpen ? (
          <TfiArrowCircleLeft
            onClick={() => setNavOpen(!navOpen)}
            className="text-3xl"
          />
        ) : (
          <TfiArrowCircleRight
            onClick={() => setNavOpen(!navOpen)}
            className="text-3xl"
          />
        )}
      </div>
    </nav>
  );
}
