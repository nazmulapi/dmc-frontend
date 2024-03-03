"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { submit } from "../../../lib/submit";
import { toast } from "react-toastify";

const CreateShift = () => {
  const [formData, setFormData] = useState({
    shift_name: "",
    shift_beginning: "",
    shift_end: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData?.shift_name?.trim()) {
      newErrors.shift_name = "Name is required";
      valid = false;
    }

    if (!formData?.shift_beginning?.trim()) {
      newErrors.shift_beginning = "Shift beginning time is required";
      valid = false;
    }

    if (!formData?.shift_end?.trim()) {
      newErrors.shift_end = "Shift end time is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleChange = (e) => {
    setSuccess("");

    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    console.log(formData);

    const valid = validateForm();

    if (valid) {
      setIsLoading(true);
      const response = await submit("/shift/", formData);
      console.log(response);

      if (response?.shift_id) {
        toast.success("Shift created successfully");
        // setSuccess("Shift created successfully");
        setIsLoading(false);
        setFormData({
          shift_name: "",
          shift_beginning: "",
          shift_end: "",
        });
      } else {
        toast.success(response?.message || "Something went wrong!");
        // setSuccess(response?.message || "Something went wrong!");
        setIsLoading(false);
        // setErrors({});
        setFormData({
          shift_name: "",
          shift_beginning: "",
          shift_end: "",
        });
      }
    }
  };

  return (
    <>
      <div className="page-top">
        <h3 className="page-title text-capitalize">Create Shift</h3>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">Create Shift</li>
        </ul>
      </div>

      <section className="app_box">
        <form onSubmit={handleSubmit}>
          <Row>
            <div className="col-lg-6">
              {/* <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Shift ID
                </label>
                <input
                  type="text"
                  className="form-control rounded-1 form_border_focus"
                  id=""
                  placeholder=""
                  onChange={handleChange}
                />
              </div> */}
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Enter Shift Name<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className={`form-control rounded-1 form_border_focus ${
                    errors.shift_name ? "is-invalid" : ""
                  }`}
                  placeholder="Enter shift name"
                  name="shift_name"
                  value={formData.shift_name}
                  onChange={handleChange}
                />
                {errors.shift_name && (
                  <div className="invalid-feedback">{errors.shift_name}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Start Time <span className="text-danger"> *</span>
                </label>
                <input
                  type="time"
                  className={`form-control rounded-1 form_border_focus ${
                    errors.shift_beginning ? "is-invalid" : ""
                  }`}
                  name="shift_beginning"
                  id=""
                  placeholder="Enter Start Time"
                  value={formData.shift_beginning}
                  onChange={handleChange}
                  // step="1"
                />
                {errors.shift_beginning && (
                  <div className="invalid-feedback">
                    {errors.shift_beginning}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  End Time<span className="text-danger"> *</span>
                </label>
                <input
                  type="time"
                  className={`form-control rounded-1 form_border_focus ${
                    errors.shift_end ? "is-invalid" : ""
                  }`}
                  name="shift_end"
                  id=""
                  placeholder="Enter Start Time"
                  value={formData.shift_end}
                  onChange={handleChange}
                  // step="1"
                />
                {errors.shift_end && (
                  <div className="invalid-feedback">{errors.shift_end}</div>
                )}
              </div>
            </div>
          </Row>
          {/* <button className="button-16 fw-semibold" role="button">
            <span className="text">Create</span>
          </button> */}

          <Button
            type="submit"
            className={classEase(
              "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button",
              isLoading ? "loading" : ""
            )}
          >
            + Create
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
          </Button>
        </form>
      </section>
    </>
  );
};

export default CreateShift;
