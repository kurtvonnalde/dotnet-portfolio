import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f5f5ef]">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)]">
          <Sidebar />

          <main className="min-w-0 p-6 lg:p-8">
            <div className="mx-auto w-full min-w-0 max-w-6xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
