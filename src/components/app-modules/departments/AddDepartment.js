"use client";

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { submit } from "../../../lib/submit";
import classEase from "classease";

const AddDesignation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    department: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    department: "",
    description: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    const validationErrors = validateForm(formData);
    if (validationErrors.department || validationErrors.description) {
      setErrors(validationErrors);
    } else {
      setIsLoading(true);
      console.log(formData);
      // return;
      const response = await submit("/department/", formData);
      console.log(response);
      if (response?.id) {
        setTimeout(() => {
          setSuccess("Department created successfully");
          setIsLoading(false);
          setFormData({
            department: "",
            description: "",
          });
        }, 1000);
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.department) {
      errors.department = "Department is required";
    }
    if (!data.description) {
      errors.description = "Description is required";
    }
    return errors;
  };

  return (
    <>
      <section>
        <div>
          <h2 className="border-bottom pb-2">Create Departments</h2>
        </div>
        <div className="col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                Departments
              </label>
              <input
                type="text"
                className={`form-control rounded-1 form_border_focus ${
                  errors.department ? "is-invalid" : ""
                }`}
                id="department"
                name="department"
                placeholder="Enter Departments"
                value={formData.department}
                onChange={handleChange}
              />
              {errors.department && (
                <div className="invalid-feedback">{errors.department}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Departments Details
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
            {success && success !== "" && (
              <div className="success-feedback mb-3">{success}</div>
            )}
            <Button
              type="submit"
              className={classEase(
                "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button",
                isLoading ? "loading" : ""
              )}
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
