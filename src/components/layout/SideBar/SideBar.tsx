import { useRef, useState } from "react";
import { NavLink } from "react-router";

import { useThemeContext } from "@/hooks/useThemeContext";
import { useLogout } from "@/features/authentication/hooks/useLogout";

import CustomButton from "@ui/CustomButton/CustomButton";

import { Menu, LogOut, Moon, Sunny, Home, Grid, Heart, Person } from "@/assets/icons";

import "./sidebar.css";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import useFocusTrap from "@/hooks/useFocusTrap";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import Separator from "@/components/ui/Separator/Separator";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";

const SideBar = () => {
  const { user } = useAuthContext();

  const { theme, toggleTheme } = useThemeContext();

  const { mutate: logout } = useLogout();

  const [isSideBarOpen, setSideBarOpen] = useState<boolean>(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  useFocusTrap(sidebarRef, isSideBarOpen, { initialFocus: "first" });
  useEscapeKey({ callback: closeSideBar });
  useLockBodyScroll(isSideBarOpen);

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
        ariaHasPopup="true"
      />

      <nav
        className={`sidebar ${isSideBarOpen ? "open" : ""}`}
        ref={sidebarRef}
        id="sidebar-menu"
        aria-label="Main navigation"
      >
        <div className="sidebar-header">
          <h1 id="sidebar-label">Habit Tracker</h1>
        </div>
        <ul className="sidebar-links" role="menubar">
          {navItems.map((item) => (
            <li key={item.id} className="sidebar-link-item">
              <NavLink to={item.to} className="sidebar-link" onClick={closeSideBar} role="menuitem">
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

        <section className="sidebar-user-container" aria-label="User information">
          <div className="sidebar-user">
            <img
              src="/user-img.png"
              className="sidebar-user-img"
              alt={`Profile photo of ${user?.user_metadata.firstname} ${user?.user_metadata.lastname}`}
            />
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">
                {`${user?.user_metadata.firstname}  ${user?.user_metadata.lastname}`}{" "}
              </p>
              <p className="sidebar-user-mail">{user?.email}</p>
            </div>
          </div>
        </section>
      </nav>
      <div className={`sidebar-overlay ${isSideBarOpen ? "open" : ""}`} onClick={closeSideBar}></div>
    </div>
  );
};

export default SideBar;
