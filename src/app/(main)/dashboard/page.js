"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import { MdGroups } from "react-icons/md";
import Spinner from "react-bootstrap/Spinner";
import AOS from "aos";
import classEase from "classease";
import "aos/dist/aos.css";
import { fetcher } from "../../../lib/fetcher";

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
  });

  const dataObj = dashboardData ? dashboardData.data[0] : {};
  const data = dataObj
    ? {
        "Total Employee": dataObj.total_employee,
        "Total Departments": dataObj.total_departments,
        "Total Device": dataObj.total_device,
        "Total Active Devices": dataObj.total_active_devices,
        "Total Chekable Devices": dataObj.total_chekable_devices,
        "Total Group": dataObj.total_group,
        "Total Shift": dataObj.total_shift,
      }
    : {};

  return (
    <>
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
                  <p className="m-0 text-capitalize text-white font_20">
                    {key}
                  </p>
                  <h1 className="mt-1 m-0 fw-bold text-white">
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
                  </h1>
                </div>
              </div>
              {/* </Link> */}
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Page;
