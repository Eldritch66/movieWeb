import logo1 from "../assets/logo1.png";
import { RiMovie2Fill } from "react-icons/ri";
import { RxBookmark } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  return (
    <nav className="w-48 h-dvh bg-[#FEF3E2]">
      <div className="w-32 mx-auto">
        <img className="box-border object-contain" src={logo1} alt="" />
      </div>
      <ul className="w-full flex flex-col gap-40 mt-8 text-black">
        <li className="pl-6">
          <RiMovie2Fill className="text-xl inline-block" />
          <span className="pl-2 inline-block">Now Showing</span>
        </li>
        <li className="pl-6">
          <RxBookmark className="text-xl inline-block" />
          <span className="pl-2 inline-block">Watch List</span>
        </li>
        <li className="pl-6">
          <CgProfile className="inline-block text-xl" />

          <span className="pl-2 inline-block">Profile</span>
        </li>
      </ul>
    </nav>
  );
}
