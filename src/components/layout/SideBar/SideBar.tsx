import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";

import { useThemeContext } from "@/hooks/useThemeContext";
import { useLogout } from "@/features/authentication/hooks/useLogout";

import CustomButton from "@ui/CustomButton/CustomButton";

import { Menu, LogOut, Moon, Sunny, Home, Grid, Heart, Person } from "@/assets/icons";

import "./sidebar.css";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import useFocusTrap from "@/hooks/useFocusTrap";
import Separator from "@/components/ui/Separator/Separator";
import UserInfo from "@/features/user/components/UserInfo/UserInfo";
import UserInfoError from "@/features/user/components/UserInfoError/UserInfoError";
import UserInfoSkeleton from "@/features/user/components/UserInfoSkeleton/UserInfoSkeleton";
import { useGetUser } from "@/features/user/hooks/useGetUser";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useMountTransition } from "@/hooks/useMountTransition";
import StateHandler from "@/components/ui/StateHandler/StateHandler";
import { User } from "@/types/User";

const SideBar = () => {
  const { data: userData, isError, isLoading, refetch } = useGetUser();

  const { theme, toggleTheme } = useThemeContext();

  const { mutate: logout } = useLogout();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isSideBarOpen, setSideBarOpen] = useState<boolean>(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hasSidebarTransitionedIn = useMountTransition({ isMounted: isSideBarOpen });

  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  useFocusTrap(sidebarRef, isSideBarOpen && !isDesktop, { initialFocus: "first" });
  useEscapeKey({ callback: closeSideBar, isActive: isSideBarOpen && !isDesktop });
  useLockBodyScroll(isSideBarOpen && !isDesktop);

  const navItems = [
    { id: "home", to: "/", label: "Home", icon: <Home size={20} /> },
    { id: "areas", to: "/areas", label: "Areas", icon: <Grid size={20} /> },
    { id: "habits", to: "/habits", label: "Habits", icon: <Heart size={20} /> },
    { id: "profile", to: "/profile", label: "My Profile", icon: <Person size={20} /> },
  ];

  return (
    <div className="sidebar-container">
      <CustomButton
        ref={buttonRef}
        icon={<Menu size={24} />}
        onClick={() => setSideBarOpen((prev) => !prev)}
        className="sidebar-open-menu-btn"
        variant="secondary"
        ariaLabel="Open sidebar menu"
        ariaExpanded={isSideBarOpen}
        ariaControls="sidebar-menu"
      />

      {(isDesktop || hasSidebarTransitionedIn || isSideBarOpen) && (
        <nav
          className={`sidebar ${isSideBarOpen || isDesktop ? "visible" : ""} ${
            hasSidebarTransitionedIn || isDesktop ? "in" : ""
          }`}
          ref={sidebarRef}
          id="sidebar-menu"
          aria-label="Main navigation"
        >
          <div className="sidebar-header">
            <span>Habit Tracker</span>
          </div>
          <ul className="sidebar-links">
            {navItems.map((item) => (
              <li key={item.id} className="sidebar-link-item">
                <NavLink to={item.to} className="sidebar-link" onClick={closeSideBar}>
                  <span className="sidebar-link-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="sidebar-options">
            <CustomButton
              icon={theme === "light" ? <Moon size={24} /> : <Sunny size={24} />}
              onClick={() => {
                toggleTheme();
                closeSideBar();
              }}
              variant="ghost"
              textAlign="left"
              ariaLabel={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            >
              {theme === "light" ? "Dark Theme" : "Light Theme"}
            </CustomButton>
            <CustomButton icon={<LogOut size={24} />} onClick={logout} textAlign="left" variant="ghost">
              Log Out
            </CustomButton>
          </div>

          <Separator />

          <div className="sidebar-user-container">
            <StateHandler<User>
              isLoading={isLoading}
              isError={isError}
              customError={<UserInfoError onRetry={refetch} />}
              customSkeleton={<UserInfoSkeleton />}
              data={userData}
            >
              <UserInfo
                avatarUrl={userData?.avatar_url}
                firstName={userData?.first_name}
                lastName={userData?.last_name}
                email={userData?.email}
              />
            </StateHandler>
          </div>
        </nav>
      )}
      {(isSideBarOpen || hasSidebarTransitionedIn) && !isDesktop && (
        <div
          className={`sidebar-overlay ${isSideBarOpen ? "visible" : ""} ${hasSidebarTransitionedIn ? "in" : ""}`}
          aria-hidden="true"
          onClick={closeSideBar}
        ></div>
      )}
    </div>
  );
};

export default SideBar;
