"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { toast } from "react-toastify";
import { submit } from "../../../lib/submit";

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    department: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  // const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData?.department?.trim()) {
      newErrors.department = "Department is required";
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

      const response = await submit("/department/", formData);

      // console.log(response);

      // return;

      if (response?.id) {
        // setSuccess("Department created successfully");
        setIsLoading(false);
        // setErrors({});
        setFormData({
          department: "",
          description: "",
        });
        toast.success(response?.message || "Department created successfully");
      } else {
        setIsLoading(false);
        // setSuccess("Something went wrong!");
        //  setSuccess(response?.message || "Something went wrong!");
        // setErrors({});
        // setFormData({
        //   department: "",
        //   description: "",
        // });
        toast.error(response?.message || "Something went wrong!");
      }
    }
  };

  return (
    <>
      <div className="page-top">
        <h3 className="page-title text-capitalize">Create Department</h3>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">Create Department</li>
        </ul>
      </div>

      <section className="app_box">
        <div className="col-lg-6">
          <form onSubmit={(e) => handleSubmit(e)} method="POST">
            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                Department <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className={`form-control rounded-1 form_border_focus ${
                  errors.department ? "is-invalid" : ""
                }`}
                id="department"
                name="department"
                placeholder="Department name"
                value={formData.department}
                onChange={handleChange}
              />
              {errors.department && (
                <div className="invalid-feedback">{errors.department}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Department Details <span className="text-danger"> *</span>
              </label>
              <textarea
                className={`form-control form_border_focus rounded-1 ${
                  errors.description ? "is-invalid" : ""
                }`}
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
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

export default AddDepartment;
