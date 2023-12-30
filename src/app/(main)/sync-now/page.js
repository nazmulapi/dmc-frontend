"use client";

import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Link from "next/link";
import useSWR from "swr";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { toast } from "react-toastify";
import classEase from "classease";
import { getLoggedInUser } from "../../../lib/getter";
import { submit } from "../../../lib/submit";
import { fetcher } from "../../../lib/fetch";
import { formatDate } from "../../../lib/helper";

const Page = () => {
  const [lastSyncDateTime, setLastSyncDateTime] = useState(null);

  const [isLoading, setIsLoading] = useState({
    allSync: false,
    selectedSync: false,
  });

  const [success, setSuccess] = useState("");

  const userData = getLoggedInUser();
  const userId = userData?.employee_id || "";

  const {
    data,
    error,
    isLoading: isFetchLoading,
  } = useSWR(`/devices/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
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
  };

  const handleSync = async (e) => {
    e.preventDefault();
    setSelectedDevices([]);
    setIsLoading((prev) => ({ ...prev, selectedSync: true }));
    const response = await submit("/log/", selectedDevices);
    console.log(response);

    if (response?.["Sync Status"]) {
      // After successful sync operation
      const lastSyncDateTime = new Date().toISOString();
      // localStorage.setItem("lastSyncDateTime", lastSyncDateTime);
      setLastSyncDateTime(lastSyncDateTime);
      toast.success("Sync successfull"); // success, info, warning, error
      setIsLoading((prev) => ({ ...prev, selectedSync: false }));
    } else if (response?.error) {
      toast.error(response?.message || "Sync failed"); // success, info, warning, error
      setIsLoading((prev) => ({ ...prev, selectedSync: false }));
    } else {
      toast.error("Sync failed"); // success, info, warning, error
      setIsLoading((prev) => ({ ...prev, selectedSync: false }));
    }
  };

  const { error: securityError, isLoading: isSecurityFetchLoading } = useSWR(
    `/security/${userId}/`,
    fetcher,
    {
      errorRetryCount: 2,
      keepPreviousData: true,
      onSuccess: (fetchedData) => {
        // Update local state when data is successfully fetched
        setLastSyncDateTime(fetchedData?.data[0].last_sync);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSuccess("");
    setIsLoading((prev) => ({ ...prev, allSync: true }));
    // console.log(formData);
    // return;
    const response = await submit("/log/");
    // console.log(response);
    if (response?.["Sync Status"]) {
      // After successful sync operation
      const lastSyncDateTime = new Date().toISOString();
      // localStorage.setItem("lastSyncDateTime", lastSyncDateTime);
      setLastSyncDateTime(lastSyncDateTime);
      toast.success("Sync successfull"); // success, info, warning, error
      setIsLoading((prev) => ({ ...prev, allSync: false }));
    } else if (response?.error) {
      toast.error(response?.message || "Sync failed"); // success, info, warning, error
      setIsLoading((prev) => ({ ...prev, allSync: false }));
    } else {
      toast.error("Sync failed"); // success, info, warning, error
      setIsLoading((prev) => ({ ...prev, allSync: false }));
    }
  };

  return (
    <div>
      <h2 className="text-capitalize text-center">Sync employee data</h2>
      <div className="d-flex justify-content-center mt-3">
        <button
          type="submit"
          className={classEase(
            "btn btn-primary mb-3 rounded-1 text-capitalize d-flex justify-content-center align-items-center",
            isLoading?.allSync ? "loading" : ""
          )}
          onClick={handleSubmit}
          disabled={isLoading?.allSync}
        >
          Sync now
          {isLoading?.allSync && (
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

      <div className="d-flex justify-content-center">
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
            className={classEase(
              "btn btn-primary mb-3 ms-2 rounded-1 text-capitalize d-flex justify-content-center align-items-center",
              isLoading?.allSync ? "loading" : ""
            )}
            onClick={(e) => handleSync(e)}
            disabled={isLoading?.selectedSync}
          >
            Sync
            {isLoading?.selectedSync && (
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
      </div>

      <p className="text-center font_18">
        {lastSyncDateTime && (
          <>last data sync date: {formatDate(lastSyncDateTime)}</>
        )}
      </p>
    </div>
  );
};

export default Page;
