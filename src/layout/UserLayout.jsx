import { useState } from "react";
import MobileSidbarUser from "../components/User/MobileSidbarUser";
import DesktopSidebar from "../components/User/DesktopSidebarUser";
import Header from "../components/User/HeaderUser";
import { Outlet } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  return (
    <>
      <div className="lg:flex lg:h-screen ">
        <MobileSidbarUser
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <DesktopSidebar
          desktopSidebarOpen={desktopSidebarOpen}
          setDesktopSidebarOpen={setDesktopSidebarOpen}
        />

        <div
          className={classNames(
            "lg:flex-1 lg:relative lg:overflow-hidden lg:overflow-y-auto",
            desktopSidebarOpen ? "lg:w-4/5" : "lg:w-full"
          )}
        >
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            desktopSidebarOpen={desktopSidebarOpen}
            setDesktopSidebarOpen={setDesktopSidebarOpen}
          />

          <div>
            <main>
              <div>
                <div className="w-full min-h-[90vh] bg-white rounded-2xl lg:p-4">
                  <Outlet />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
