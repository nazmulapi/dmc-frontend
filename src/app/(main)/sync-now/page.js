"use client";

import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Link from "next/link";
import useSWR from "swr";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { submit } from "../../../lib/submit";

import { fetcher } from "../../../lib/fetcher";
import classEase from "classease";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const {
    data,
    error,
    isLoading: isFetchLoading,
  } = useSWR(`/devices/`, fetcher, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    setIsLoading(true);
    // console.log(formData);
    // return;
    const response = await submit("/log/");
    console.log(response);
    if (response?.["Sync Status"]) {
      setTimeout(() => {
        setSuccess("Sync successfull");
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className="d-flex">
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
      </div>

      <div>
        <h2 className="text-capitalize text-center">Sync employee data</h2>
        <div className="d-flex justify-content-center mt-3">
          {/* <button
            type="submit"
            className="btn btn-primary mb-3 rounded-1 text-capitalize"
            onClick={handleSubmit}
          >
            Sync now
          </button> */}

          <button
            type="submit"
            className={classEase(
              "btn btn-primary mb-3 rounded-1 text-capitalize d-flex justify-content-center align-items-center",
              isLoading ? "loading" : ""
            )}
            onClick={handleSubmit}
          >
            Sync now
            {isLoading && (
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
            )}
          </button>
        </div>

        <p className="text-center font_18">
          last data sync date: 10-10-2023 at 00:00:00 pm
        </p>

        {success && success !== "" && (
          <div className="success-feedback mb-3 text-center">{success}</div>
        )}
      </div>
    </>
  );
};

export default Page;
