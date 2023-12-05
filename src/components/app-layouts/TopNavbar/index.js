"use client";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const page = () => {
  return (
    <div className="topbar shadow d-flex justify-content-end align-items-center">
      <Dropdown>
        <Dropdown.Toggle className="border-0 pro_img_bg">
          <img src="/images.png" alt="" className="profile_img" />
        </Dropdown.Toggle>

        <Dropdown.Menu className="profile_item rounded-1">
          <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default page;
