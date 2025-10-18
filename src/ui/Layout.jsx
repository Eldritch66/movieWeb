import { Outlet } from "react-router";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <aside className="w-5 sm:w-[40px] shrink-0 z-50">
        <Header />
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
