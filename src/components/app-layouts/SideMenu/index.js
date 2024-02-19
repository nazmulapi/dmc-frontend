"use client";

import React from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { BiTargetLock } from "react-icons/bi";
import { MdDeviceHub } from "react-icons/md";
import { LuNewspaper } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import Accordion from "react-bootstrap/Accordion";
import Image from "next/image";
import Logo from "../../../../public/logo.png";

const Page = () => {
  return (
    <div id="navigation_part" className="h-100 side_nav_bg ">
      <div className="p-3">
        {/* <div className="">
          <h3 className="text-white">
            <Link
              href="/dashboard"
              className="main_logo text-decoration-none d-flex justify-content-start align-items-center"
            >
              <Image src={Logo} className="me-2" alt="logo" />
              <span className="logo_text">Dhaka Medical College Hospital</span>
            </Link>
          </h3>
        </div> */}
        <div className="accordion_part">
          <div className="pb-2">
            <Accordion>
              {/* manu item 1 */}

              <Accordion.Item eventKey="0" className="pt-0">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <FaUser className="text-light sidenav-icon" />
                  <span className="text-white text-capitalize side_font">
                    employee
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="text-decoration-none mb-0 sidenav_submenu">
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/add-employee"
                        className="text-decoration-none text-white side_font"
                      >
                        add employee
                      </Link>
                    </li>
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/manage-info"
                        className="text-decoration-none text-white side_font"
                      >
                        manage employee
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              {/* manu item 2 */}
              <Accordion.Item eventKey="1" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <BiTargetLock className="text-light sidenav-icon" />
                  <span className="text-white text-capitalize side_font">
                    Designation
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="text-decoration-none mb-0 sidenav_submenu">
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/add-designation"
                        className="text-decoration-none text-white side_font"
                      >
                        add Designation
                      </Link>
                    </li>
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/designation-info"
                        className="text-decoration-none text-white side_font"
                      >
                        Manage Designation
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              {/* manu item 2 */}
              <Accordion.Item eventKey="2" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <MdDeviceHub className="text-light sidenav-icon" />
                  <span className="text-white text-capitalize side_font">
                    Departments
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="text-decoration-none mb-0 sidenav_submenu">
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/add-department"
                        className="text-decoration-none text-white side_font"
                      >
                        add Department
                      </Link>
                    </li>
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/departments-info"
                        className="text-decoration-none text-white side_font"
                      >
                        Manage Departments
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="8" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <BiTargetLock className="text-light sidenav-icon" />
                  <span className="text-white text-capitalize side_font">
                    Group
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="text-decoration-none mb-0 sidenav_submenu">
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/add-group"
                        className="text-decoration-none text-white side_font"
                      >
                        add Group
                      </Link>
                    </li>
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/group-info"
                        className="text-decoration-none text-white side_font"
                      >
                        Manage Group
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <MdDeviceHub className="text-light sidenav-icon" />
                  <span className="text-white text-capitalize side_font">
                    employee Shift
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="text-decoration-none mb-0 sidenav_submenu">
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/employee-shift"
                        className="text-decoration-none text-white side_font"
                      >
                        Create Shift
                      </Link>
                    </li>
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/shift-info"
                        className="text-decoration-none text-white side_font"
                      >
                        Manage Shift
                      </Link>
                    </li>
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/assign-shift"
                        className="text-decoration-none text-white side_font"
                      >
                        Assign Shift
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              {/* Attendance item 2 */}
              <Accordion.Item eventKey="4" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <LuNewspaper className="text-light sidenav-icon" />
                  <span className="text-white text-capitalize side_font">
                    Attendance
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="text-decoration-none mb-0 sidenav_submenu">
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/attendance-report"
                        className="text-decoration-none text-white side_font"
                      >
                        Attendance Report
                      </Link>
                    </li>
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/raw-employee"
                        className="text-decoration-none text-white side_font"
                      >
                        Raw Data
                      </Link>
                    </li>
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/attendance"
                        className="text-decoration-none text-white side_font"
                      >
                        Structured Data
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              {/* Screen item 2 */}

              <Accordion.Item eventKey="5" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <LuNewspaper className="text-light sidenav-icon" />
                  <span className="text-white text-capitalize side_font">
                    manage Device
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="text-decoration-none mb-0 sidenav_submenu">
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/add-device"
                        className="text-decoration-none text-white side_font"
                      >
                        add Device
                      </Link>
                    </li>
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/device-info"
                        className="text-decoration-none text-white side_font"
                      >
                        Manage Device
                      </Link>
                    </li>
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/assign-screen"
                        className="text-decoration-none text-white side_font"
                      >
                        assign device
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              {/* Settings item 2 */}
              <Accordion.Item eventKey="6" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <FiSettings className="text-light sidenav-icon" />
                  <span className="text-white text-capitalize side_font">
                    Settings
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="text-decoration-none mb-0 sidenav_submenu">
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/clean-raw-data"
                        className="text-decoration-none text-white side_font"
                      >
                        Clean Raw Data
                      </Link>
                    </li>
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/settings"
                        className="text-decoration-none text-white side_font"
                      >
                        Manage
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              {/* Settings item 2 */}
              <Accordion.Item eventKey="7" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <FiSettings className="text-light sidenav-icon" />
                  <span className="text-white text-capitalize side_font">
                    Sync log Settings
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="text-decoration-none mb-0 sidenav_submenu">
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/sync-settings"
                        className="text-decoration-none text-white side_font"
                      >
                        Sync Log Data
                      </Link>
                    </li>
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/sync-now"
                        className="text-decoration-none text-white side_font"
                      >
                        Sync Now
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
