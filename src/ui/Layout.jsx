import { Outlet } from "react-router";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="flex">
      {/* wrapper sidebar */}
      <div className="w-48 shrink-0">
        <Header />
      </div>

      {/* konten utama */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
