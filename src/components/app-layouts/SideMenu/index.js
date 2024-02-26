"use client";

import React from "react";
import Link from "next/link";
import { LuCamera } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { RiGraduationCapLine } from "react-icons/ri";
import { RiGroupLine } from "react-icons/ri";
import { AiOutlineBranches } from "react-icons/ai";
import { MdOutlineSchedule } from "react-icons/md";
import { IoSettingsOutline, IoSyncOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Accordion from "react-bootstrap/Accordion";
// import Image from "next/image";
// import Logo from "../../../../public/logo.png";

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
                  <GoPerson className="text-light sidenav-icon" />
                  <span className="text-capitalize side_font">Employees</span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="text-decoration-none mb-0 sidenav_submenu">
                    <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/employees"
                        className="text-decoration-none text-white side_font"
                      >
                        All Employees
                      </Link>
                    </li>
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
                        href="/upload-csv"
                        className="text-decoration-none text-white side_font"
                      >
                        Upload CSV
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              {/* manu item 2 */}
              <Accordion.Item eventKey="1" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <RiGraduationCapLine className="text-light sidenav-icon" />
                  <span className="text-capitalize side_font">
                    Designations
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
                        All Designations
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              {/* manu item 2 */}
              <Accordion.Item eventKey="2" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <AiOutlineBranches className="text-light sidenav-icon" />
                  <span className="text-capitalize side_font">Departments</span>
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
                        All Departments
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="8" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <RiGroupLine className="text-light sidenav-icon" />
                  <span className="text-capitalize side_font">Groups</span>
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
                        All Groups
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <MdOutlineSchedule className="text-light sidenav-icon" />
                  <span className="text-capitalize side_font">Shifts</span>
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
                        All Shifts
                      </Link>
                    </li>
                    {/* <li className="text-capitalize text-white text-decoration-none sidenav_sub_item">
                      <Link
                        href="/assign-shift"
                        className="text-decoration-none text-white side_font"
                      >
                        Assign Shift
                      </Link>
                    </li> */}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              {/* Attendance item 2 */}
              <Accordion.Item eventKey="4" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <IoMdCheckmarkCircleOutline className="text-light sidenav-icon" />
                  <span className="text-capitalize side_font">Attendance</span>
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
                  <LuCamera className="text-light sidenav-icon" />
                  <span className="text-capitalize side_font">Devices</span>
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
                        All Devices
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

              <Accordion.Item eventKey="7" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <IoSyncOutline className="text-light sidenav-icon" />
                  <span className="text-capitalize side_font">Sync log</span>
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

              {/* Settings item 2 */}
              <Accordion.Item eventKey="6" className="">
                <Accordion.Header className="p-0 m-0 text-capitalize">
                  <IoSettingsOutline className="text-light sidenav-icon" />
                  <span className="text-capitalize side_font">Settings</span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="text-decoration-none mb-0 sidenav_submenu">
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
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
