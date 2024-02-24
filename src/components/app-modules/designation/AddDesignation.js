"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { toast } from "react-toastify";
import { submit } from "../../../lib/submit";

const AddDesignation = () => {
  const [formData, setFormData] = useState({
    designation: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  // const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData?.designation?.trim()) {
      newErrors.designation = "Designation is required";
      valid = false;
    }

    if (!formData?.description?.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleChange = (e) => {
    // setSuccess("");

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
    // setSuccess("");

    const valid = validateForm();

    if (valid) {
      setIsLoading(true);

      const response = await submit("/designation/", formData);

      console.log(response);

      // return;

      if (response?.id) {
        // setSuccess("Designation created successfully");
        setIsLoading(false);
        // setErrors({});
        setFormData({
          designation: "",
          description: "",
        });
        toast.success("Designation created successfully"); // success, info, warning, error
      } else {
        // setSuccess("Something went wrong!");
        // setSuccess(response?.message || "Something went wrong!");
        setIsLoading(false);
        // setErrors({});
        // setFormData({
        //   designation: "",
        //   description: "",
        // });
        toast.error(response?.message || "Something went wrong!");
      }
    }
  };

  return (
    <>
      <div className="page-top">
        <h3 className="page-title text-capitalize">Create Designation</h3>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">Create Designation</li>
        </ul>
      </div>

      <section>
        <div className="col-lg-6">
          <form onSubmit={(e) => handleSubmit(e)} method="POST">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Designation <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                placeholder="Enter designation"
                name="designation"
                value={formData.designation}
                onChange={(e) => handleChange(e)}
                className={classEase(
                  "rounded-1 form_border_focus form-control",
                  errors.designation && "is-invalid"
                )}
              />
              {errors.designation && (
                <div className="invalid-feedback">{errors.designation}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Designation Details <span className="text-danger"> *</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                className={classEase(
                  "rounded-1 form_border_focus form-control",
                  errors.description && "is-invalid"
                )}
                onChange={(e) => handleChange(e)}
                rows="3"
              ></textarea>
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>

            {/* {success && success !== "" && (
              <div className="success-feedback mb-3">{success}</div>
            )} */}

            <Button
              type="submit"
              // className="rounded-1 mt-2 px-4 add_btn_color border-0"
              className={classEase(
                "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button",
                isLoading ? "loading" : ""
              )}
              disabled={isLoading}
            >
              + Add
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
        </div>
      </section>
    </>
  );
};

export default AddDesignation;
