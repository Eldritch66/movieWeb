import logo1 from "../assets/movies-green.png";
import { RiMovie2Line } from "react-icons/ri";
import { Link } from "react-router";

import { RiMovie2Fill } from "react-icons/ri";
import { RxBookmark } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearSearch } from "../features/movies/moviesSlice";

import { TfiArrowCircleRight } from "react-icons/tfi";
import { TfiArrowCircleLeft } from "react-icons/tfi";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClearParams = () => {
    dispatch(clearSearch());
  };
  return (
    <nav
      className={`fixed inset-y-0 left-0 bg-[#1E1F2B] text-white border-r border-gray-700
    transition-transform duration-300 ease-in-out
    ${
      navOpen
        ? "translate-x-0 w-44"
        : "-translate-x-[90%] md:-translate-x-[0%] w-25"
    } `}
    >
      <div className={`${navOpen ? "w-32" : "W-20"} mx-auto`}>
        <img className="box-border object-contain" src={logo1} alt="" />
      </div>
      <ul className="max-w-full min-w-10 flex flex-col gap-40 mt-8  text-white">
        <li className="pl-6">
          <Link to="/" onClick={handleClearParams}>
            <RiMovie2Line
              className={`inline-block ${
                navOpen ? "text-2xl" : "text-4xl"
              } text-white cursor-pointer`}
            />
            {navOpen && <span className="pl-2 inline-block">Browse</span>}
          </Link>
        </li>
        <li className="pl-6">
          <Link to="/saveMovies/">
            <RxBookmark
              className={`inline-block ${navOpen ? "text-2xl" : "text-4xl"}`}
            />
            {navOpen ? (
              <span className="pl-2 inline-block">Watchlist</span>
            ) : (
              ""
            )}
          </Link>
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
            className="text-3xl text-green-400"
          />
        ) : (
          <TfiArrowCircleRight
            onClick={() => setNavOpen(!navOpen)}
            className="text-3xl text-green-400"
          />
        )}
      </div>
    </nav>
  );
}
