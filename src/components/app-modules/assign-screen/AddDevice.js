"use client";

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { toast } from "react-toastify";
import { submit } from "../../../lib/submit";

const AddDevice = () => {
  const [formData, setFormData] = useState({
    device_id: "",
    device_ip: "",
    device_name: "",
    username: "",
    password: "",
    active_status: "inactive",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData?.device_id?.trim()) {
      newErrors.device_id = "Device name is required";
      valid = false;
    }

    if (!formData?.device_ip?.trim()) {
      newErrors.device_ip = "Device IP is required";
      valid = false;
    }

    if (!formData?.device_name?.trim()) {
      newErrors.device_name = "Device name is required";
      valid = false;
    }

    if (!formData?.username?.trim()) {
      newErrors.username = "Device username is required";
      valid = false;
    }

    if (!formData?.password?.trim()) {
      newErrors.password = "Device password is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleChange = (e) => {
    setSuccess("");

    const { name, type, value } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.checked ? "active" : "inactive",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    const valid = validateForm();

    if (valid) {
      setIsLoading(true);

      const response = await submit("/devices/", formData);

      console.log(response);

      // return;

      if (response?.device_id) {
        toast.success("Device created successfully"); // success, info, warning, error
        setSuccess("Device created successfully");
        setIsLoading(false);
        // setErrors({});
        setFormData({
          device_id: "",
          device_ip: "",
          device_name: "",
          username: "",
          password: "",
        });
      } else {
        // setSuccess("Something went wrong!");
        toast.error(response?.message || "Something went wrong!");
        setSuccess(response?.message || "Something went wrong!");
        setIsLoading(false);
        // setErrors({});
        // setFormData({
        //   device_id: "",
        //   device_ip: "",
        //   device_name: "",
        // });
      }
    }
  };

  return (
    <>
      <section>
        <div>
          <h2 className="border-bottom pb-2">Add Device</h2>
        </div>
        <div className="col-lg-6">
          <form onSubmit={(e) => handleSubmit(e)} method="POST">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Device ID <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                placeholder="Enter device name"
                name="device_id"
                value={formData.device_id}
                onChange={(e) => handleChange(e)}
                className={classEase(
                  "rounded-1 form_border_focus form-control",
                  errors.device_id && "is-invalid"
                )}
              />
              {errors.device_id && (
                <div className="invalid-feedback">{errors.device_id}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Device name <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                placeholder="Enter device name"
                name="device_name"
                value={formData.device_name}
                onChange={(e) => handleChange(e)}
                className={classEase(
                  "rounded-1 form_border_focus form-control",
                  errors.device_name && "is-invalid"
                )}
              />
              {errors.device_name && (
                <div className="invalid-feedback">{errors.device_name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Device IP <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                placeholder="Enter device IP"
                name="device_ip"
                value={formData.device_ip}
                onChange={(e) => handleChange(e)}
                className={classEase(
                  "rounded-1 form_border_focus form-control",
                  errors.device_ip && "is-invalid"
                )}
              />
              {errors.device_ip && (
                <div className="invalid-feedback">{errors.device_ip}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Username <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                placeholder="Enter device username"
                name="username"
                value={formData.username}
                onChange={(e) => handleChange(e)}
                className={classEase(
                  "rounded-1 form_border_focus form-control",
                  errors.username && "is-invalid"
                )}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Password <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                placeholder="Enter device password"
                name="password"
                value={formData.password}
                onChange={(e) => handleChange(e)}
                className={classEase(
                  "rounded-1 form_border_focus form-control",
                  errors.password && "is-invalid"
                )}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="mb-2">
              <input
                id="deviceStatus"
                type="checkbox"
                name="active_status"
                checked={formData.active_status === "active"}
                // value={formValues.is_active}
                onChange={(e) => handleChange(e)}
                className="form-check-input"
              />
              <label className="mb-2 ms-2" htmlFor="employeeStatus">
                Active
              </label>
            </div>

            {/* <div className="mb-3">
              <label htmlFor="" className="form-label">
                Device Details
              </label>
              <textarea
                name="device_ip"
                value={formData.device_ip}
                className={classEase(
                  "rounded-1 form_border_focus form-control",
                  errors.device_ip && "is-invalid"
                )}
                onChange={(e) => handleChange(e)}
                rows="3"
              ></textarea>
              {errors.device_ip && (
                <div className="invalid-feedback">{errors.device_ip}</div>
              )}
            </div> */}

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

export default AddDevice;
