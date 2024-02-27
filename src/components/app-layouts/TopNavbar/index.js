"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "next/image";
import Logo from "../../../../public/logo.png";
import { logout } from "../../../lib/auth";
import { getLoggedInUser } from "../../../lib/getter";
import { getStoragePath } from "../../../lib/helper";
import { authTokenKey, authUserKey } from "../../../lib/config";

const Navbar = () => {
  // const { logout } = useAuth();
  const router = useRouter();

  const [userImagePath, setUserImagePath] = useState("");

  useEffect(() => {
    const userData = getLoggedInUser();
    const imagePath =
      userData?.image && userData?.image !== ""
        ? getStoragePath(userData?.image)
        : "/images.png";
    setUserImagePath(imagePath);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res = await logout();

      if (res) {
        // localStorage.setItem("user", JSON.stringify({}));
        localStorage.removeItem("user");
        Cookies.remove(authUserKey);
        Cookies.remove(authTokenKey);
      }

      // Redirect to the login page or any other desired page
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="topbar d-flex justify-content-between align-items-center">
      <div className="header-left d-flex justify-content-center align-items-center">
        <div className="header-logo">
          <Link
            href="/dashboard"
            className="main_logo text-decoration-none d-flex justify-content-start align-items-center"
          >
            <Image src={Logo} className="" alt="logo" />
          </Link>
        </div>

        <div className="header-text">
          <span className="bar-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="logo_text">Dhaka Medical College Hospital</span>
        </div>
      </div>
      <Dropdown>
        <Dropdown.Toggle className="border-0 pro_img_bg">
          {userImagePath && userImagePath !== "" && (
            <img src={userImagePath} alt="" className="profile_img" />
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu className="profile_item rounded-1">
          <Dropdown.Item href="#" onClick={(e) => handleLogout(e)}>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Navbar;
