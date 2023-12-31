"use client";

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { toast } from "react-toastify";
import { submit } from "../../../lib/submit";

const AddGroup = () => {
  const [formData, setFormData] = useState({
    group_name: "",
    Remaks: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData?.group_name?.trim()) {
      newErrors.group_name = "Group name is required";
      valid = false;
    }

    // if (!formData?.Remaks?.trim()) {
    //   newErrors.Remaks = "Remarks is required";
    //   valid = false;
    // }

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

    const valid = validateForm();

    if (valid) {
      setIsLoading(true);

      const response = await submit("/empgrp/", formData);

      console.log(response);

      // return;

      if (response?.group_id) {
        toast.success("Group created successfully"); // success, info, warning, error
        setSuccess("Group created successfully");
        setIsLoading(false);
        // setErrors({});
        setFormData({
          group_name: "",
          Remaks: "",
        });
      } else {
        // setSuccess("Something went wrong!");
        toast.error(response?.message || "Something went wrong!");
        setSuccess(response?.message || "Something went wrong!");
        setIsLoading(false);
        // setErrors({});
        // setFormData({
        //   group_name: "",
        //   // Remaks: "",
        // });
      }
    }
  };

  return (
    <>
      <section>
        <div>
          <h2 className="border-bottom pb-2">Create Group</h2>
        </div>
        <div className="col-lg-6">
          <form onSubmit={(e) => handleSubmit(e)} method="POST">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Group name<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                placeholder="Enter group name"
                name="group_name"
                value={formData.group_name}
                onChange={(e) => handleChange(e)}
                className={classEase(
                  "rounded-1 form_border_focus form-control",
                  errors.group_name && "is-invalid"
                )}
              />
              {errors.group_name && (
                <div className="invalid-feedback">{errors.group_name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Group Details
              </label>
              <textarea
                name="Remaks"
                value={formData.Remaks}
                className={classEase(
                  "rounded-1 form_border_focus form-control",
                  errors.Remaks && "is-invalid"
                )}
                onChange={(e) => handleChange(e)}
                rows="3"
              ></textarea>
              {errors.Remaks && (
                <div className="invalid-feedback">{errors.Remaks}</div>
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

export default AddGroup;
