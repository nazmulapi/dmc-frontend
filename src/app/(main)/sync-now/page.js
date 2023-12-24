"use client";

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { submit } from "../../../lib/submit";
import classEase from "classease";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

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
