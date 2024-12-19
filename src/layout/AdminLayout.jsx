import { useEffect, useState } from "react";
import MobileSidebar from "../components/MobileSidbar";
import DesktopSidebar from "../components/DesktopSidebar";
import Header from "../components/Admin/HeaderAdmin";
import { Navigate, Outlet } from "react-router-dom";
import { userProfile } from "../stores/store";
import { useAtomValue, useSetAtom } from 'jotai'
import { checkAuth } from "../utils/auth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const profile = useAtomValue(userProfile)
  const setUser = useSetAtom(userProfile);

  useEffect(() => {
    const fetchAuth = async () => {
      console.log("second")
     if(!profile) await checkAuth(setUser); // Call the checkAuth function
    };
    fetchAuth();
  }, [profile]);

  if (!profile || profile?.role !== "admin") {
    console.log("Redirecting to login...");
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <div className="lg:flex lg:h-screen ">
        <MobileSidebar
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
              <div className="px-2">
                <div className="w-full min-h-[90vh] bg-white rounded-2xl p-4">
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

export default AdminLayout;
