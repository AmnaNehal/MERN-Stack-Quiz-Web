
import React, { useState ,useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navbarStyles } from "../assets/dummyStyle";
import { Award, LogIn, LogOut, Menu, X } from "lucide-react";


const Navbar = ({ logoSrc }) => {
  const navigate = useNavigate();

  // const [loggedIn, setLoggedIn] = useState(false);

  const [loggedIn, setLoggedIn] = useState(() => {
  const u = localStorage.getItem("authToken");
  return !!u;
});

  const [menuOpen, setMenuOpen] = useState(false);

  // useEffect hook to show login state change
    useEffect(() => {
//     try {
//       const u = localStorage.getItem("authToken");
//       setLoggedIn(!!u);
//     } 
//     // catch (e) {
//     //   setLoggedIn(false);
//     // }
//     catch (e) {
//       console.error("Auth token error:", e);
//       setLoggedIn(false);
// }


    const handler = (ev) => {
      const detailUser = ev?.detail?.user ?? null;
      setLoggedIn(!!detailUser);
    };
    window.addEventListener("authChanged", handler);

    return () => window.removeEventListener("authChanged", handler);
  }, []);



  // Logout function
  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.clear();
    } catch {
      // ignore errors
    }

    window.dispatchEvent(
      new CustomEvent("authChanged", { detail: { user: null } }),
    );

    setMenuOpen(false);
    setLoggedIn(false);

    try {
      navigate("/login");
    } catch {
      window.location.href = "/login";
    }
  };

  return (
    <nav className={navbarStyles.nav}>
      {/* Decorative background */}
      <div
        style={{ backgroundImage: navbarStyles.decorativePatternBackground }}
        className={navbarStyles.decorativePattern}
      ></div>
      <div className={navbarStyles.bubble1}></div>
      <div className={navbarStyles.bubble2}></div>
      <div className={navbarStyles.bubble3}></div>

      {/* Navbar main container */}
      <div
        className={
          navbarStyles.container +
          " flex justify-between items-center w-full max-w-full overflow-x-hidden px-0 py-0"
        }
      />

      {/* Logo left */}
      <div className={navbarStyles.logoContainer}>
        <Link to="/" className={navbarStyles.loginButton}>
          <div className={navbarStyles.logoInner}>
            <img
              src={
                logoSrc ||
                "https://yt3.googleusercontent.com/eD5QJD-9uS--ekQcA-kDTCu1ZO4d7d7BTKLIVH-EySZtDVw3JZcc-bHHDOMvxys92F7rD8Kgfg=s900-c-k-c0x00ffffff-no-rj"
              }
              alt="QuizMaster logo"
              className={navbarStyles.logoImage}
            />
          </div>
        </Link>
      </div>

      {/* Title center */}
      <div className={navbarStyles.titleContainer + " -mt-14"}>
        <div className={navbarStyles.titleBackground}>
          <h1 className={navbarStyles.titleText}>Quiz Application</h1>
        </div>
      </div>

      {/* Buttons + toggle right */}
      <div
        className={
          navbarStyles.rightButtons +
          " hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 space-x-3"
        }
      >
        <div className="flex items-center ml-auto space-x-3">
          {/* Desktop buttons */}
          <div className="hidden md:flex items-center space-x-3"></div>

          {/* My Result button */}
          <NavLink to="/result" className={navbarStyles.resultsButton}>
            <Award className={navbarStyles.buttonIcon} />
            My Result
          </NavLink>

          {/* Login / Logout button */}
          {!loggedIn && (
            <>
            <NavLink to="/login" className={navbarStyles.loginButton}>
            <LogIn className={navbarStyles.buttonIcon} /> Login
            </NavLink>
            <NavLink to="/signup" className={navbarStyles.loginButton}>
            <LogIn className={navbarStyles.buttonIcon} /> Signup
            </NavLink>
            </>
          )}
{loggedIn && (
  <button onClick={handleLogout} className={navbarStyles.logoButton}>
    <LogOut className={navbarStyles.buttonIcon} />
    Logout
  </button>
)}

        </div>

        <div className={navbarStyles.mobileMenuContainer}>
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className={navbarStyles.menuToggleButton}
          >
            {menuOpen ? (
              <X className={navbarStyles.menuIcon} />
            ) : (
              <Menu className={navbarStyles.menuIcon} />
            )}
          </button>
          {menuOpen && (
            <div className={navbarStyles.mobileMenuPanel}>
              <ul className={navbarStyles.mobileMenuList}>
                <li>
                  <NavLink
                    to="/result"
                    className={navbarStyles.mobileMenuItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Award className={navbarStyles.mobileMenuIcon} />
                    My Result
                  </NavLink>
                </li>

                {loggedIn ? (
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className={navbarStyles.mobileMenuItem}
                    >
                      <LogOut className={navbarStyles.mobileMenuIcon} />
                      LogOut
                    </button>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/login"
                      className={navbarStyles.mobileMenuItem}
                      onClick={() => setMenuOpen(false)}
                    >
                      <LogIn className={navbarStyles.mobileMenuIcon} />
                      Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* <style> {navbarStyles.animations} </style> */}
    </nav>
  );
};

export default Navbar;
