"use client";

import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Link from "next/link";
import useSWR from "swr";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import classEase from "classease";
import { toast } from "react-toastify";
import { deleteItem } from "../../../lib/submit";
import { fetcher } from "../../../lib/fetch";
import { formatDate } from "../../../lib/helper";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSuccess("");

    setIsLoading(true);
    // console.log(formData);
    // return;
    const response = await deleteItem("/archive_log/");
    // console.log(response);
    // return;
    if (!response?.error) {
      // After successful sync operation
      // const lastSyncDateTime = new Date().toISOString();
      // localStorage.setItem("lastSyncDateTime", lastSyncDateTime);
      // setLastSyncDateTime(lastSyncDateTime);
      // setSuccess(response?.message || "Log data successfully archived");
      setIsLoading(false);
      toast.success(response?.message || "Log data successfully archived");
    } else {
      setIsLoading(false);
      toast.error(response?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div>
        <h2 className="text-capitalize text-center">clean raw data </h2>
        <div className="d-flex justify-content-center mt-3">
          <button
            type="submit"
            className={classEase(
              "btn btn-primary mb-3 rounded-1 text-capitalize d-flex justify-content-center align-items-center",
              isLoading ? "loading" : ""
            )}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            clean now
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
        {/* <p className="text-center font_18">
          last clean data date: 10-10-2023 at 00:00:00 pm
        </p> */}

        {/* {success && success !== "" && (
          <div className="success-feedback mb-3 text-center">{success}</div>
        )} */}
      </div>
    </>
  );
};

export default Page;
