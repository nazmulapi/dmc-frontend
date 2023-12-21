"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { Col, Row } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { fetcher } from "../../../lib/fetcher";
import { submit } from "../../../lib/submit";
import { MdGroups } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Page = () => {
  const { data, error, isLoading } = useSWR(`/devices/`, fetcher, {
    errorRetryCount: 2,
  });

  const [optionsUpdated, setOptionsUpdated] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);

  useEffect(() => {
    if (data?.length) {
      const options = data.map((d) => ({
        key: d.device_id,
        label: d.device_name,
      }));
      setDevices(options);
      setOptionsUpdated(true);
    }
  }, [data]);

  // Reset the optionsUpdated state once the dropdown is rendered
  useEffect(() => {
    if (optionsUpdated) {
      setOptionsUpdated(false);
    }
  }, [optionsUpdated]);

  const handleChange = (selected) => {
    setSelectedDevices(selected);
    console.log("Selected devices:", selected);
  };

  const handleSync = async (e) => {
    const response = await submit("/log/", selectedDevices);
    console.log(response);
  };
  useEffect(()=>{
    AOS.init();
  })

  return (
    <>
      <Row>
        {/* <div className="d-flex">
          <Col lg={4}>
            <div className="mb-4 rounded-1 multi_select">
              <DropdownMultiselect
                options={devices}
                name="device"
                placeholder="Select screen"
                selectDeselectLabel="Select / Deselect ALL"
                handleOnChange={(selected) => {
                  handleChange(selected);
                }}
                key={optionsUpdated}
              />
            </div>
          </Col>

          {console.log(devices)}

          <div>
            <button
              type="submit"
              className="sync_btn btn btn-primary"
              onClick={(e) => handleSync(e)}
            >
              Sync
            </button>
          </div>
        </div> */}

        {data &&
          data.map((d) => (
            <Col lg={3} key={d.device_id}>
              {/* <Link href="#" className="text-decoration-none"> */}
              <div className="screen_one rounded-1 p-4 text-center mb-4">
                <div data-aos="fade-up" data-aos-duration="700">
                  <MdGroups size={"60px"} color="#fff"/>
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
