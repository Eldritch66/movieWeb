import { Outlet } from "react-router";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#1E1F2B]">
      {/* wrapper sidebar */}
      <div className="w-30 shrink-0 z-50">
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
