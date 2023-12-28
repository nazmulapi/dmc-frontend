"use client";

import React, { useState } from "react";
import useSWR from "swr";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { fetcher } from "../../../lib/fetcher";
import { submit } from "../../../lib/submit";
import GetDataMis from "./GetDataMis";

const initialValues = {
  employee_id: "",
  is_superuser: false,
  is_staff: true,
  is_active: true,
  // date_joined: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  phone_number: "",
  shift_id: "",
  image: "",
  group_id: "",
  department: "",
  designation: "",
};

const AddEmployee = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [selectFormValues, setSelectFormValues] = useState({
    department: "",
    designation: "",
    shift_id: "",
    group_id: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: departmentsData,
    error: departmentsFetchError,
    isLoading: departmentsFetchIsLoading,
  } = useSWR(`/department/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const departments = departmentsData?.map((item) => ({
    name: "department",
    label: item.department,
    value: item.id,
  }));

  const {
    data: designationsData,
    error: designationsFetchError,
    isLoading: designationsFetchIsLoading,
  } = useSWR(`/designation/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const designations = designationsData?.map((item) => ({
    name: "designation",
    label: item.designation,
    value: item.id,
  }));

  const {
    data: shiftsData,
    error: shiftsFetchError,
    isLoading: shiftsFetchIsLoading,
  } = useSWR(`/shift/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const shifts = shiftsData?.map((item) => ({
    name: "shift_id",
    label: item.shift_name,
    value: item.shift_id,
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

    if (!formValues.employee_id.trim()) {
      newErrors.employee_id = "Employee ID is required";
      valid = false;
    }

    if (!formValues.username.trim()) {
      newErrors.username = "Employee Name is required";
      valid = false;
    }

    // if (!formValues.email.trim()) {
    //   newErrors.email = "Email is required";
    //   valid = false;
    // } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
    //   newErrors.email = "Email is invalid";
    //   valid = false;
    // }

    if (formValues.is_superuser) {
      if (!formValues.password.trim()) {
        newErrors.password = "Password is required";
        valid = false;
      } else if (formValues.password.length < 5) {
        newErrors.password = "Password must be at least 5 characters long";
        valid = false;
      } else if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(formValues.password)) {
        newErrors.password = "Password must contain both letters and numbers";
        valid = false;
      }

      if (formValues.password !== formValues.confirm_password) {
        newErrors.confirm_password = "Passwords do not match";
        valid = false;
      }
    }

    // const phoneNumberRegex = /^(?:\+88|01)?\d{11}$/;

    // if (!formValues.phone_number.trim()) {
    //   newErrors.phone_number = "Phone Number is required";
    //   valid = false;
    // } else if (!phoneNumberRegex.test(formValues.phone_number)) {
    //   newErrors.phone_number = "Invalid Phone Number format";
    //   valid = false;
    // }

    if (!formValues.shift_id.trim()) {
      newErrors.shift_id = "Shift ID is required";
      valid = false;
    }

    // Image validation (assuming it's a file upload)
    // if (!formValues.image) {
    //   newErrors.image = "Image is required";
    //   valid = false;
    // } else {
    //   const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    //   const maxFileSize = 300 * 1024; // 300 KB

    //   if (!allowedTypes.includes(formValues.image.type)) {
    //     newErrors.image = "Invalid image type. Supported types: png, jpg, jpeg";
    //     valid = false;
    //   }

    //   if (formValues.image.size > maxFileSize) {
    //     newErrors.image = "Image size exceeds the maximum allowed (300 KB)";
    //     valid = false;
    //   }
    // }

    // Image validation
    if (!formValues.image) {
      newErrors.image = "Image is required";
      valid = false;
    } else {
      // const allowedExtensions = ["png", "jpg", "jpeg"];
      const allowedExtensions = ["jpg"];
      const maxFileSize = 300 * 1024; // 300 KB

      const fileName = formValues.image.name.toLowerCase();
      const fileExtension = fileName.split(".").pop();

      if (!allowedExtensions.includes(fileExtension)) {
        newErrors.image = "Invalid image type. Supported types: jpg";
        valid = false;
      }

      if (formValues.image.size > maxFileSize) {
        newErrors.image = "Image size exceeds the maximum allowed (300 KB)";
        valid = false;
      }
    }

    // Group ID validation
    if (!formValues.group_id.trim()) {
      newErrors.group_id = "Group ID is required";
      valid = false;
    }

    // Department validation
    if (!formValues.department.trim()) {
      newErrors.department = "Department is required";
      valid = false;
    }

    // Designation validation
    if (!formValues.designation.trim()) {
      newErrors.designation = "Designation is required";
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

  const handleInputChange = (e) => {
    // e.preventDefault();
    setSuccess("");

    // const { name, value } = e.target;
    const { name, value, type, files } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    if (type === "checkbox") {
      setFormValues((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
    } else if (type === "file") {
      setFormValues((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // const handleSelectChange = (name, value) => {
  //   setFormValues((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    const valid = validateForm();

    if (valid) {
      setIsLoading(true);

      const formData = new FormData();

      // Append form data
      Object.entries(formValues).forEach(([key, value]) => {
        if (key !== "image") {
          formData.append(key, value);
        }
      });

      // Append image file
      formData.append("image", formValues.image);
      console.log("Form data", formData);

      const response = await submit("/employee/", formData, true);

      console.log(response);

      if (response?.employee_id) {
        setTimeout(() => {
          setSuccess("Employee created successfully");
          setIsLoading(false);
          // setErrors({});
          setFormValues(initialValues);
        }, 1000);
      } else {
        setTimeout(() => {
          setSuccess("Something went wrong!");
          setIsLoading(false);
          // setErrors({});
          // setFormValues(initialValues);
        }, 1000);
      }
    }
  };

  const [isDataFetched, setIsDataFetched] = useState(false);

  // const handleGetDataMis = async () => {
  //   try {
  //     // Call the GetDataMis modal and get the employee data
  //     const employeeData = await getDataMisModal();

  //     // Update form values with the fetched data
  //     setFormValues(employeeData.formValues);
  //     setSelectFormValues(employeeData.selectFormValues);
  //     // Update other state variables as needed

  //     // Mark the data as fetched
  //     setIsDataFetched(true);
  //   } catch (error) {
  //     // Handle errors
  //     console.error("Error fetching or updating employee data:", error);
  //   }
  // };

  // const getDataMisModal = () => {
  //   // Implement logic to show the GetDataMis modal
  //   // Return a Promise that resolves with the received employee data
  //   return new Promise((resolve, reject) => {
  //     // For simplicity, simulate an asynchronous API call
  //     setTimeout(() => {
  //       resolve({
  //         formValues: {},
  //         selectFormValues: {},
  //       });
  //     }, 1000);
  //   });
  // };

  return (
    <div className="add_employ">
      <div className="border-bottom d-flex justify-content-between align-items-center">
        <div className=" text-capitalize font_20 fw-bold pb-2">
          add employee
        </div>
        <div>
          <GetDataMis
            // onDataReceived={(data) => handleGetDataMis(data)}
            onDataReceived={setFormValues}
            data={{
              designations: designationsData,
              departments: departmentsData,
              shifts: shiftsData,
            }}
          />
        </div>
      </div>

      <div className="mt-4">
        <form onSubmit={(e) => handleSubmit(e)} method="POST">
          <Row>
            <Col lg={6}>
              <div className="mb-2">
                <div className="mb-2">
                  Employee ID <span className="text-danger"> *</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  name="employee_id"
                  value={formValues.employee_id}
                  onChange={(e) => handleInputChange(e)}
                  className={classEase(
                    "rounded-1 form_border_focus form-control",
                    errors.employee_id && "is-invalid"
                  )}
                />
                {errors.employee_id && (
                  <div className="invalid-feedback">{errors.employee_id}</div>
                )}
              </div>

              <div className="mb-2">
                <div className="mb-2">
                  Employee Name <span className="text-danger"> *</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  autoComplete="off"
                  name="username"
                  value={formValues.username}
                  onChange={(e) => handleInputChange(e)}
                  className={classEase(
                    "rounded-1 form_border_focus form-control",
                    errors.username && "is-invalid"
                  )}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>

              <div className="mb-2">
                <div className="mb-2">
                  Email address <span className="text-danger"> *</span>
                </div>
                <input
                  type="email"
                  placeholder=""
                  autoComplete="off"
                  name="email"
                  value={formValues.email}
                  onChange={(e) => handleInputChange(e)}
                  className={classEase(
                    "rounded-1 form_border_focus form-control",
                    errors.email && "is-invalid"
                  )}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-2">
                <div className="mb-2">
                  Designation <span className="text-danger"> *</span>
                </div>
                <Select
                  className={classEase(
                    "rounded-1 form_border_focus",
                    errors.designation && "is-invalid"
                  )}
                  classNamePrefix="select"
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isSearchable={true}
                  value={selectFormValues.designation}
                  options={designations}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "designation")
                  }
                />
                {/* <select
                  className={classEase(
                    "form-select form-control rounded-1 form_border_focus",
                    errors.designation && "is-invalid"
                  )}
                  aria-label="Default select example"
                  name="designation"
                  value={formValues.designation}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Select Designation</option>
                  {designations &&
                    designations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.designation}
                      </option>
                    ))}
                </select> */}
                {errors.designation && (
                  <div className="invalid-feedback">{errors.designation}</div>
                )}
              </div>

              <div className="mb-2">
                <div className="mb-2">
                  Department <span className="text-danger"> *</span>
                </div>
                <Select
                  className={classEase(
                    "rounded-1 form_border_focus",
                    errors.department && "is-invalid"
                  )}
                  classNamePrefix="select"
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isSearchable={true}
                  value={selectFormValues.department}
                  options={departments}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "department")
                  }
                />
                {/* <select
                  className={classEase(
                    "form-select form-control rounded-1 form_border_focus",
                    errors.department && "is-invalid"
                  )}
                  aria-label="Default select example"
                  name="department"
                  value={formValues.department}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Select Department</option>
                  {departments &&
                    departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.department}
                      </option>
                    ))}
                </select> */}
                {errors.department && (
                  <div className="invalid-feedback">{errors.department}</div>
                )}
              </div>

              <div className="mb-2">
                <div className="mb-2">
                  Phone Number <span className="text-danger"> *</span>
                </div>
                <input
                  type="number"
                  placeholder=""
                  name="phone_number"
                  value={formValues.phone_number}
                  onChange={(e) => handleInputChange(e)}
                  className={classEase(
                    "rounded-1 form_border_focus form-control",
                    errors.phone_number && "is-invalid"
                  )}
                />
                {errors.phone_number && (
                  <div className="invalid-feedback">{errors.phone_number}</div>
                )}
              </div>
            </Col>

            <Col lg={6}>
              <div className="mb-2">
                <input
                  id="employeeStatus"
                  type="checkbox"
                  name="is_active"
                  checked={formValues.is_active}
                  // value={formValues.is_active}
                  onChange={(e) => handleInputChange(e)}
                  className="form-check-input"
                />
                <label className="mb-2 ms-2" htmlFor="employeeStatus">
                  Active
                </label>
              </div>

              <div className="mb-2">
                <div className="mb-2">
                  Shift <span className="text-danger"> *</span>
                </div>
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
                  value={selectFormValues.shift_id}
                  options={shifts}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "shift_id")
                  }
                />
                {/* <select
                  className={classEase(
                    "form-select form-control rounded-1 form_border_focus",
                    errors.shift_id && "is-invalid"
                  )}
                  aria-label="Default select example"
                  name="shift_id"
                  value={formValues.shift_id}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Select Shift</option>

                  {shifts &&
                    shifts.map((s) => (
                      <option key={s.shift_id} value={s.shift_id}>
                        {s.shift_beginning} - {s.shift_end}
                      </option>
                    ))}
                </select> */}
                {errors.shift_id && (
                  <div className="invalid-feedback">{errors.shift_id}</div>
                )}
              </div>

              <div className="mb-2">
                <div className="mb-2">
                  Group <span className="text-danger"> *</span>
                </div>
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
                  className={classEase(
                    "form-select form-control rounded-1 form_border_focus",
                    errors.group_id && "is-invalid"
                  )}
                  name="group_id"
                  aria-label="Default select example"
                  value={formValues.group_id}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Select Group</option>

                  {groups &&
                    groups.map((g) => (
                      <option key={g.group_id} value={g.group_id}>
                        {g.group_name}
                      </option>
                    ))}
                </select> */}
                {errors.group_id && (
                  <div className="invalid-feedback">{errors.group_id}</div>
                )}
              </div>

              <div className="mb-2">
                <div className="mb-2">
                  Upload Photo <span className="text-danger"> *</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) => handleInputChange(e)}
                  className={classEase(
                    "rounded-1 form_border_focus form-control",
                    errors.image && "is-invalid"
                  )}
                />
                {errors.image && (
                  <div className="invalid-feedback">{errors.image}</div>
                )}
              </div>

              <div className="mb-2">
                <div className="mb-2">Employee Role</div>
                <div>
                  <div className="d-flex">
                    <div className="form-check me-2">
                      <input
                        id="employee_role_admin"
                        type="checkbox"
                        name="is_superuser"
                        checked={formValues.is_superuser}
                        onChange={(e) => {
                          handleInputChange(e);
                          if (!e.target.checked) {
                            setFormValues((prev) => ({
                              ...prev,
                              password: "",
                              confirm_password: "",
                            }));
                          }
                        }}
                        className="form-check-input"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="employee_role_admin"
                      >
                        Is Admin
                      </label>
                    </div>
                    <div>
                      <div className="form-check">
                        <input
                          id="employee_role_staff"
                          type="checkbox"
                          name="is_staff"
                          checked={formValues.is_staff}
                          onChange={(e) => handleInputChange(e)}
                          className="form-check-input"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="employee_role_staff"
                        >
                          Is staff
                        </label>
                      </div>
                    </div>
                  </div>

                  {formValues?.is_superuser && (
                    <div className="">
                      <div className="mb-2">
                        <label className="mb-2">
                          Password<span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          placeholder=""
                          name="password"
                          value={formValues.password}
                          onChange={(e) => handleInputChange(e)}
                          className={classEase(
                            "rounded-1 form_border_focus form-control",
                            errors.password && "is-invalid"
                          )}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        )}
                        <div className="text-danger"></div>
                      </div>

                      <div className="mb-2">
                        <label className="mb-2">
                          Confirm Password
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          placeholder=""
                          name="confirm_password"
                          value={formValues.confirm_password}
                          onChange={(e) => handleInputChange(e)}
                          className={classEase(
                            "rounded-1 form_border_focus form-control",
                            errors.confirm_password && "is-invalid"
                          )}
                        />
                        {errors.confirm_password && (
                          <div className="invalid-feedback">
                            {errors.confirm_password}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          {success && success !== "" && (
            <div className="success-feedback mb-3">{success}</div>
          )}

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
    </div>
  );
};

export default AddEmployee;
