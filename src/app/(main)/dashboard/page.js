"use client";

import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { MdGroups } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  useEffect(() => {
    AOS.init();
  });
  const [data, setData] = useState([1, 2]);

  return (
    <>
      <Row>
        {data &&
          data.map((d, index) => (
            <Col lg={3} key={index}>
              {/* <Link href="#" className="text-decoration-none"> */}
              <div className="screen_one rounded-1 p-4 text-center mb-4">
                <div data-aos="fade-up" data-aos-duration="700">
                  <MdGroups size={"60px"} color="#fff" />
                  {/* <img src="/face.png" alt="" className="screen_img" /> */}
                  <p className="m-0 text-capitalize text-white font_20">
                    Number of employee
                  </p>
                  <h1 className="mt-1 m-0 fw-bold text-white">10</h1>
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
