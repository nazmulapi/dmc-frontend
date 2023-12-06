"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Dropdown from "react-bootstrap/Dropdown";
import { logout } from "../../../lib/auth";

const Navbar = () => {
  // const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async (e) => {
    try {
      const res = await logout();

      if (res) {
        localStorage.setItem("user", JSON.stringify({}));
        Cookies.remove(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY);
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
          <img src="/images.png" alt="" className="profile_img" />
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
