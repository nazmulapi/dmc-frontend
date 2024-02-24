"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { DataTable } from "mantine-datatable";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import classEase from "classease";
import { toast } from "react-toastify";
import { fetcher } from "../../../lib/fetch";
import { deleteItem, submit } from "../../../lib/submit";
import { sortBy } from "../../../lib/helper";
import EditAssign from "./EditAssign";

const AssignDevice = () => {
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "device_name",
    direction: "asc",
  });

  const [data, setData] = useState([]);

  const { error, loading } = useSWR(`/grpdev/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    onSuccess: (fetchedData) => {
      // Update local state when data is successfully fetched
      // console.log(fetchedData);
      setData(sortBy(fetchedData, "device_name"));
    },
  });

  useEffect(() => {
    const sorted = sortBy(data, sortStatus.columnAccessor);
    setData(sortStatus.direction === "desc" ? sorted.reverse() : sorted);
  }, [sortStatus]);

  const [selectFormValues, setSelectFormValues] = useState({
    device_id: "",
    group_id: "",
  });

  const [formValues, setFormValues] = useState({
    device_id: "",
    group_id: "",
  });

  const [errors, setErrors] = useState({});
  // const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: devicesData,
    error: devicesFetchError,
    isLoading: devicesFetchIsLoading,
  } = useSWR(`/devices/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
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
    keepPreviousData: true,
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
    // setSuccess("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSuccess("");

    const valid = validateForm();

    if (valid) {
      setIsLoading(true);

      const response = await submit("/grpdev/", formValues);

      console.log(response);

      if (response?.id) {
        // setSuccess("Assigned Device successfully");
        setIsLoading(false);
        setData((prevData) => [response, ...prevData]);
        // setErrors({});
        setFormValues({
          device_id: "",
          group_id: "",
        });
        setSelectFormValues({
          device_id: "",
          group_id: "",
        });
        toast.success(response?.message || "Assigned device successfully");
      } else {
        // setSuccess(response?.message || "Something went wrong!");
        setIsLoading(false);
        // setErrors({});
        // setFormValues(initialValues);
        toast.error(response?.message || "Something went wrong!");
      }
    }
  };

  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  // Function to handle delete button click
  const handleDelete = async (assigned) => {
    setDeleting(true);
    try {
      // Perform delete action using API or other methods
      // For example, by making a DELETE request
      const res = await deleteItem(`/grpdev/${assigned.id}/`);
      console.log(res);
      if (res?.message && res?.message === "Deletion successful!!") {
        setData((prevData) =>
          prevData.filter((item) => item.id !== assigned.id)
        );
        setShow(false);
        setDeleting(false);
        toast.success(res?.message || "Deletion successful!!");
      } else if (res) {
        // setSuccess(res?.message || "Something went wrong!");
        setDeleting(false);
        setShow(false);
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Delete failed", error);
      setDeleting(false);
      setShow(false);
      toast.error(res?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="page-top">
        <h3 className="page-title text-capitalize">Assign Device</h3>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">Assign Device</li>
        </ul>
      </div>

      <section className="mb-4">
        <div className="form_part">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Row>
              <Col xs={12} md={6} lg={3} xl={3}>
                <div className="mb-3">
                  <label htmlFor="deviceSelect" className="form-label">
                    Select Device<span className="text-danger"> *</span>
                  </label>

                  <Select
                    id="deviceSelect"
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
                  <option>Select Device</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select> */}
                  {errors.device_id && (
                    <div className="invalid-feedback">{errors.device_id}</div>
                  )}
                </div>
              </Col>
              <Col xs={12} md={6} lg={3} xl={3}>
                <div className="mb-3">
                  <label htmlFor="groupSelect" className="form-label">
                    Select group<span className="text-danger"> *</span>
                  </label>

                  <Select
                    id="groupSelect"
                    className={classEase(
                      "rounded-1 form_border_focus",
                      errors.group_id && "is-invalid"
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
                  {errors.group_id && (
                    <div className="invalid-feedback">{errors.group_id}</div>
                  )}
                </div>
              </Col>

              {/* {success && success !== "" && (
              <div className="success-feedback mb-3">{success}</div>
            )} */}

              <Col xs={12} md={6} lg={3} xl={3}>
                <div className="d-flex justify-content-center pt-4">
                  <button
                    // className="dynami_button submit ms-2 rounded-1 d-flex"
                    type="submit"
                    className={classEase(
                      "dynami_button submit rounded-1 mt-2 px-0 d-flex justify-content-center align-items-center app-button filter_button",
                      isLoading ? "loading" : ""
                    )}
                    disabled={isLoading}
                  >
                    Submit
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
              </Col>
            </Row>
          </form>
        </div>
      </section>

      <section>
        <div className="datatable-wrapper">
          <DataTable
            style={{ height: data.length === 0 ? "300px" : "auto" }}
            className="datatable"
            withTableBorder
            withColumnBorders
            striped
            highlightOnHover
            horizontalSpacing="sm"
            verticalSpacing="sm"
            fz="sm"
            verticalAlign="center"
            columns={[
              {
                accessor: "",
                title: "SL",
                render: (_, index) => index + 1,
              },
              {
                accessor: "device_name",
                title: "Device",
                sortable: true,
                // width: 150
              },
              {
                accessor: "group_name",
                title: "Group",
                sortable: true,
                // width: 150,
              },
              {
                accessor: "actions",
                title: "Actions",
                // width: "0%",
                render: (item) => (
                  <button
                    className="border-0 rounded-1"
                    onClick={() => {
                      setSelected(item);
                      setShow(true);
                    }}
                  >
                    <RiDeleteBin6Line color="#DB3545" />
                  </button>
                ),
              },
            ]}
            fetching={devicesFetchIsLoading}
            records={data}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
          />
        </div>
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="pt-2">Are you sure want to delete?</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            onClick={() => {
              setSelected(null);
              setShow(false);
            }}
            variant="success"
            className={classEase(
              "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button"
            )}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(selected);
            }}
            variant="success"
            className={classEase(
              "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button",
              deleting ? "loading" : ""
            )}
            disabled={deleting}
          >
            Delete
            {deleting && (
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
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssignDevice;
