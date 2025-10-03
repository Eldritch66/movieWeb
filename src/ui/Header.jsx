import { Outlet, useNavigation } from "react-router";

export default function Header() {
  return (
    <>
      <nav>
        <h1>hello world</h1>
      </nav>
      <Outlet />
    </>
  );
}
