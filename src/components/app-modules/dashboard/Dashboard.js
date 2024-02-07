"use client";

import React, { useEffect } from "react";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import { MdGroups } from "react-icons/md";
import Spinner from "react-bootstrap/Spinner";
import AOS from "aos";
import classEase from "classease";
import { fetcher } from "../../../lib/fetch";

const Page = () => {
  useEffect(() => {
    AOS.init();
  });

  const {
    data: dashboardData,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR(`/dashboard/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const dataObj = dashboardData ? dashboardData.data[0] : {};
  const data = dataObj
    ? {
        Employees: dataObj.total_employee,
        Departments: dataObj.total_departments,
        Devices: dataObj.total_device,
        "Active Devices": dataObj.total_active_devices,
        "Inactive Devices": dataObj.total_device - dataObj.total_active_devices,
        // "Checkable Devices": dataObj.total_chekable_devices,
        Groups: dataObj.total_group,
        // Shifts: dataObj.total_shift,
      }
    : {};

  return (
    <Row>
      {data &&
        Object.keys(data)?.length &&
        Object.keys(data).map((key, index) => (
          <Col lg={3} key={index}>
            {/* <Link href="#" className="text-decoration-none"> */}
            <div className="screen_one rounded-1 p-4 text-center mb-4">
              <div data-aos="fade-up" data-aos-duration="700">
                <MdGroups size={"60px"} color="#fff" />
                {/* <img src="/face.png" alt="" className="screen_img" /> */}
                <p className="m-0 text-capitalize font_20">{key}</p>
                <div className="mt-1 m-0 fw-bold">
                  {isLoading ? (
                    <div className="spinner">
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    data[key]
                  )}
                </div>
              </div>
            </div>
            {/* </Link> */}
          </Col>
        ))}
    </Row>
  );
};

export default Page;
