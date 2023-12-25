"use client";

import React, { useState } from "react";
import useSWR from "swr";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import classEase from "classease";
import { fetcher } from "../../../lib/fetcher";
import { deleteItem } from "../../../lib/submit";

const AssignScreen = () => {
  const [selectFormValues, setSelectFormValues] = useState({
    device_id: "",
    group_id: "",
  });

  const [formValues, setFormValues] = useState({
    device_id: "",
    group_id: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: devicesData,
    error: devicesFetchError,
    isLoading: devicesFetchIsLoading,
  } = useSWR(`/devices/`, fetcher, {
    errorRetryCount: 2,
  });

  const devices = devicesData?.map((item) => ({
    name: "device_id",
    label: item.device_name,
    value: item.device_id,
  }));

  const {
    data: groupsData,
    error: groupsFetchError,
    isLoading: groupsFetchIsLoading,
  } = useSWR(`/empgrp/`, fetcher, {
    errorRetryCount: 2,
  });

  const groups = groupsData?.map((item) => ({
    name: "group_id",
    label: item.group_name,
    value: item.group_id,
  }));

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formValues.device_id.trim()) {
      newErrors.device_id = "Device is required";
      valid = false;
    }

    if (!formValues.group_id.trim()) {
      newErrors.group_id = "Group is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSelectChange = async (selectedOption, key) => {
    setSuccess("");

    // when cleared
    if (!selectedOption || !selectedOption.value) {
      setErrors({
        ...errors,
        [key]: "",
      });

      setFormValues((prev) => ({
        ...prev,
        [key]: "",
      }));

      setSelectFormValues((prev) => ({
        ...prev,
        [key]: "",
      }));
      return;
    }

    const { name, value } = selectedOption;

    setErrors({
      ...errors,
      [name]: "",
    });

    setFormValues((prev) => ({
      ...prev,
      [name]: String(value),
    }));

    setSelectFormValues((prev) => ({
      ...prev,
      [name]: selectedOption,
    }));

    return;
  };

  const [data, setData] = useState(null);

  const { error, loading } = useSWR(`/grpdev/`, fetcher, {
    errorRetryCount: 2,
    onSuccess: (fetchedData) => {
      // Update local state when data is successfully fetched
      setData(fetchedData);
    },
  });

  return (
    <>
      <div>
        <div>
          <h2 className="border-bottom pb-2 mb-4 text-capitalize">
            Assign screen
          </h2>
        </div>
        <form>
          <Row>
            <Col lg={4} className="px-2">
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Select screen<span className="text-danger"> *</span>
                </label>

                <Select
                  className={classEase(
                    "rounded-1 form_border_focus",
                    errors.device_id && "is-invalid"
                  )}
                  classNamePrefix="select"
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isSearchable={true}
                  value={selectFormValues.device_id}
                  options={devices}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "device_id")
                  }
                />

                {/*
                <select
                  className="form-select rounded-1 py-2 form_border_focus"
                  aria-label="Default select example"
                >
                  <option>select screen</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select> */}
              </div>
            </Col>
            <Col lg={4} className="px-2">
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Select group<span className="text-danger"> *</span>
                </label>

                <Select
                  className={classEase(
                    "rounded-1 form_border_focus",
                    errors.shift_id && "is-invalid"
                  )}
                  classNamePrefix="select"
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isSearchable={true}
                  value={selectFormValues.group_id}
                  options={groups}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "group_id")
                  }
                />

                {/* <select
                  className="form-select rounded-1 py-2 form_border_focus"
                  aria-label="Default select example"
                >
                  <option>select group</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select> */}
              </div>
            </Col>

            <div className="button-section">
              <button
                className="dynami_button submit ms-2 rounded-1"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Row>
        </form>

        <div className="employee_table table-responsive mt-5">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">SL</th>
                <th scope="col">Device ID</th>
                <th scope="col">Group</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.length ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.device_id}</td>
                    <td>{item.group_id}</td>
                    <td>
                      <button className="border-0 rounded-1 bg-danger">
                        <RiDeleteBin6Line color="#fff" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No data found!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AssignScreen;
