"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Dropdown from "react-bootstrap/Dropdown";
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
    <div className="topbar shadow d-flex justify-content-end align-items-center">
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
