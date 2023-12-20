"use client";

import React, { useState } from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { submit } from "../../../lib/submit";

const CreateShift = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    shift_beginning: "",
    shift_end: "",
  });

  const [errors, setErrors] = useState({
    shift_beginning: "",
    shift_end: "",
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

    if (validationErrors.shift_beginning || validationErrors.shift_end) {
      setErrors(validationErrors);
    } else {
      setIsLoading(true);
      console.log(formData);
      // return;
      const response = await submit("/shift/", formData);
      console.log(response);
      if (response?.shift_id) {
        setTimeout(() => {
          setSuccess("Shift created successfully");
          setIsLoading(false);
          setFormData({
            shift_beginning: "",
            shift_end: "",
          });
        }, 1000);
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.shift_beginning) {
      errors.shift_beginning = "Shift beginning time is required";
    }
    if (!data.shift_end) {
      errors.shift_end = "Shift end time is required";
    }
    return errors;
  };

  return (
    <>
      <section>
        <div>
          <h2 className="border-bottom pb-2">Create Shift</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <Row>
            <div className="col-lg-6">
              <div className="mb-3">
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
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Enter Shift Name<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control rounded-1 form_border_focus"
                  id=""
                  placeholder="Enter shift name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Start Time
                </label>
                <input
                  type="number"
                  className={`form-control rounded-1 form_border_focus ${
                    errors.shift_beginning ? "is-invalid" : ""
                  }`}
                  name="shift_beginning"
                  id=""
                  placeholder="Enter Start Time"
                  value={formData.shift_beginning}
                  onChange={handleChange}
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
                  type="number"
                  className={`form-control rounded-1 form_border_focus ${
                    errors.shift_end ? "is-invalid" : ""
                  }`}
                  name="shift_end"
                  id=""
                  placeholder="Enter Start Time"
                  value={formData.shift_end}
                  onChange={handleChange}
                />
                {errors.shift_end && (
                  <div className="invalid-feedback">{errors.shift_end}</div>
                )}
              </div>
            </div>
          </Row>
          {/* <button className="button-16 fw-semibold" role="button">
            <span class="text">Create</span>
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
