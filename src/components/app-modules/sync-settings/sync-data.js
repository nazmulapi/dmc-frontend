"use client";

import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { syncManual } from "../../../lib/submit";
import { formatDate } from "../../../lib/helper";

const Manage = () => {
  const initialHistory = JSON.parse(localStorage.getItem("history")) || {
    log: {},
    mis: {},
    devices: [],
  };

  const [history, setHistory] = useState(initialHistory);

  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem("history");
    // Do something with storedLastSyncDateTime, e.g., update state
    setLastSync({
      log: storedHistory?.log?.lastSuccessfulSync,
      mis: storedHistory?.mis?.lastSuccessfulSync,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // Sync log data
  const [logState, setLogState] = useState({
    selectedOption: "1",
    inputValue: "",
    isLoading: false,
    success: "",
  });

  const logApiUrl = `/log/${
    logState?.selectedOption === "1"
      ? logState.inputValue
      : logState.inputValue * 60
  }`;

  const handleSyncLog = async (e) => {
    e.preventDefault();
    setLogState((prev) => ({ ...prev, success: "", isLoading: true }));

    const response = await syncManual(logApiUrl);

    console.log(response);

    if (response?.["Sync Status"]) {
      const lastSyncDateTime = new Date().toISOString();

      setHistory((prev) => ({
        ...prev,
        log: {
          status: true,
          timestamp: lastSyncDateTime,
          lastSuccessfulSync: lastSyncDateTime,
        },
      }));

      setLastSync((prev) => ({
        ...prev,
        log: lastSyncDateTime,
      }));

      setTimeout(() => {
        setLogState((prev) => ({
          ...prev,
          success: "Sync successfull",
          isLoading: false,
        }));
      }, 1000);

      setTimeout(() => {
        setLogState((prev) => ({
          ...prev,
          success: "",
        }));
      }, 3000);
    }
  };

  const handleSyncMis = async (e) => {
    e.preventDefault();
    setMisState((prev) => ({ ...prev, success: "", isLoading: true }));

    const response = await syncManual(logApiUrl);

    console.log(response);

    if (response?.["Sync Status"]) {
      const lastSyncDateTime = new Date().toISOString();

      setHistory((prev) => ({
        ...prev,
        mis: {
          status: true,
          timestamp: lastSyncDateTime,
          lastSuccessfulSync: lastSyncDateTime,
        },
      }));

      setLastSync((prev) => ({
        ...prev,
        mis: lastSyncDateTime,
      }));

      setTimeout(() => {
        setMisState((prev) => ({
          ...prev,
          success: "Sync successfull",
          isLoading: false,
        }));
      }, 1000);

      setTimeout(() => {
        setMisState((prev) => ({
          ...prev,
          success: "",
        }));
      }, 3000);
    }
  };

  const [misState, setMisState] = useState({
    selectedOption: "1",
    inputValue: "",
    isLoading: false,
    success: "",
  });

  return (
    <>
      <form onSubmit={handleSyncLog}>
        <Row>
          <Col lg={4}>
            <div className="mb-3">
              <label htmlFor="timeOption" className="form-label">
                Enter option
              </label>
              <select
                className="form-select form_border_focus rounded-1"
                aria-label="Default select example"
                id="timeOption"
                value={logState.selectedOption}
                onChange={(e) =>
                  setLogState((prev) => ({
                    ...prev,
                    selectedOption: e.target.value,
                  }))
                }
              >
                <option value="1">Minutes</option>
                <option value="2">Hours</option>
              </select>
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <label htmlFor="timeValue" className="form-label">
                Enter value
              </label>
              <input
                type="number"
                className="form-control form_border_focus rounded-1"
                id="timeValue"
                placeholder="value"
                required
                value={logState.inputValue}
                onChange={(e) =>
                  setLogState((prev) => ({
                    ...prev,
                    inputValue: e.target.value,
                  }))
                }
              />
            </div>
          </Col>
          <Col lg={4} className="mb-3 d-flex align-items-end">
            <div className=" d-flex align-items-end">
              <button
                type="submit"
                className={classEase(
                  "btn btn-primary rounded-1 text-capitalize d-flex justify-content-center align-items-center",
                  logState?.isLoading ? "loading" : ""
                )}
                // onClick={handleSyncLog}
                // className="text-capitalize px-4 py-2 bg-primary text-white border-0 mt-1 float-end rounded-1"
                disabled={logState?.isLoading}
              >
                Get log Data
                {logState?.isLoading && (
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
          </Col>

          {lastSync?.log && (
            <h4 className="text-capitalize text-center pt-4">
              Last Synchronized {formatDate(lastSync?.log)}
            </h4>
          )}

          {logState?.success && logState?.success !== "" && (
            <div className="success-feedback mb-3 text-center">
              {logState?.success}
            </div>
          )}
        </Row>
      </form>

      {/*  */}
      <form className="mt-5" onSubmit={handleSyncMis}>
        <Row>
          <Col lg={4}>
            <div className="mb-3">
              <label htmlFor="misTimeOption" className="form-label">
                Enter option
              </label>
              <select
                className="form-select form_border_focus rounded-1"
                aria-label="Default select example"
                id="misTimeOption"
                value={misState.selectedOption}
                onChange={(e) =>
                  setMisState((prev) => ({
                    ...prev,
                    selectedOption: e.target.value,
                  }))
                }
              >
                {/* <option value="">select menu</option> */}
                <option value="1">Minutes</option>
                <option value="2">Hours</option>
              </select>
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <label htmlFor="misTimeValue" className="form-label">
                Enter value
              </label>
              <input
                type="number"
                className="form-control form_border_focus rounded-1"
                id="misTimeValue"
                placeholder="value"
                required
                value={misState.inputValue}
                onChange={(e) =>
                  setMisState((prev) => ({
                    ...prev,
                    inputValue: e.target.value,
                  }))
                }
              />
            </div>
          </Col>

          <Col lg={4} className="mb-3 d-flex align-items-end">
            <div className=" d-flex align-items-end">
              <button
                type="submit"
                className={classEase(
                  "btn btn-primary rounded-1 text-capitalize d-flex justify-content-center align-items-center",
                  misState?.isLoading ? "loading" : ""
                )}
                // onClick={handleSyncMis}
                // className="text-capitalize px-4 py-2 bg-primary text-white border-0 mt-1 float-end rounded-1"
                disabled={misState?.isLoading}
              >
                Sync with MIS
                {misState?.isLoading && (
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
          </Col>

          {/* <Col lg={4}>
            <div className="mb-3">
              <div className="mb-3">
                <button className="text-capitalize px-4 py-2 bg-primary text-white border-0 mt-1 float-end rounded-1">

                </button>
              </div>
            </div>
          </Col> */}

          {lastSync?.mis && (
            <h4 className="text-capitalize text-center pt-4">
              Last Synchronized {formatDate(lastSync?.mis)}
            </h4>
          )}

          {/* <h4 className="text-capitalize text-center pt-4">
            Last Synchronized 12:00PM at 00-00-2023
          </h4> */}
        </Row>
      </form>
    </>
  );
};

export default Manage;
