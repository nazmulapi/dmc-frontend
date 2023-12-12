"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { fetcher } from "../../../lib/fetcher";
import { submit } from "../../../lib/submit";

const initialValues = {
  employee_id: "",
  is_superuser: false,
  is_staff: true,
  is_active: true,
  // date_joined: "",
  username: "",
  email: "",
  password: "",
  phone_number: "",
  shift_id: "",
  image: "",
  group_id: "",
  department: "",
  designation: "",
};

const Page = () => {
  const [key, setKey] = useState("home");
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const {
    data: departments,
    error: departmentsFetchError,
    isLoading: departmentsFetchIsLoading,
  } = useSWR(`/department/`, fetcher, {
    errorRetryCount: 2,
  });

  const {
    data: designations,
    error: designationsFetchError,
    isLoading: designationsFetchIsLoading,
  } = useSWR(`/designation/`, fetcher, {
    errorRetryCount: 2,
  });

  const {
    data: shifts,
    error: shiftsFetchError,
    isLoading: shiftsFetchIsLoading,
  } = useSWR(`/shift/`, fetcher, {
    errorRetryCount: 2,
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Add your validation logic here
    if (!formValues.employee_id.trim()) {
      newErrors.employee_id = "Employee ID is required";
      valid = false;
    }

    if (!formValues.username.trim()) {
      newErrors.username = "Employee Name is required";
      valid = false;
    }

    if (!formValues.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formValues.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    // Phone Number validation
    const phoneNumberRegex = /^(?:\+88|01)?\d{11}$/;
    if (!formValues.phone_number.trim()) {
      newErrors.phone_number = "Phone Number is required";
      valid = false;
    } else if (!phoneNumberRegex.test(formValues.phone_number)) {
      newErrors.phone_number = "Invalid Phone Number format";
      valid = false;
    }

    // Shift ID validation
    if (!formValues.shift_id.trim()) {
      newErrors.shift_id = "Shift ID is required";
      valid = false;
    }

    // Group ID validation
    if (!formValues.group_id.trim()) {
      newErrors.group_id = "Group ID is required";
      valid = false;
    }

    // // Date Joined validation (assuming it's a date format)
    // if (!formValues.date_joined.trim()) {
    //   newErrors.date_joined = "Date Joined is required";
    //   valid = false;
    // } else if (!isValidDate(formValues.date_joined)) {
    //   newErrors.date_joined = "Invalid date format";
    //   valid = false;
    // }

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
      const allowedExtensions = ["png", "jpg", "jpeg"];
      const maxFileSize = 300 * 1024; // 300 KB

      const fileName = formValues.image.name.toLowerCase();
      const fileExtension = fileName.split(".").pop();

      if (!allowedExtensions.includes(fileExtension)) {
        newErrors.image = "Invalid image type. Supported types: png, jpg, jpeg";
        valid = false;
      }

      if (formValues.image.size > maxFileSize) {
        newErrors.image = "Image size exceeds the maximum allowed (300 KB)";
        valid = false;
      }
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

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    const { name, value, type, files } = e.target;

    // setFormValues((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));

    // For regular inputs
    if (type !== "file") {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      // For file inputs (e.g., image upload)
      setFormValues((prev) => ({
        ...prev,
        [name]: files[0], // Use the first file if multiple files are selected
      }));
    }
  };

  // const handleSelectChange = (name, value) => {
  //   setFormValues((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const isShown = formValues.is_superuser;

  // const handleClick = () => {
  //   setIsShown((current) => !current);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = validateForm();

    console.log("submit data", formValues, errors);

    if (valid) {
      const formData = new FormData();

      // Append form data
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append image file
      formData.append("image", formValues.image);
      console.log("submit data", formData);

      // return;

      const response = await submit("/employee/", formData, true);
      console.log(response);
      // if (response) {
      //   setTimeout(() => {
      //     setSuccess("Employee created successfully");
      //     // setIsLoading(false);
      //     // setFormValues(initialValues);
      //   }, 1000);
      // }

      return;

      // You can now submit formData to your server or perform further actions
      try {
        const response = await fetch("your_upload_endpoint", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Image uploaded successfully");
          setFormValues(initialValues);
          setErrors({});
        } else {
          console.error("Image upload failed");
          // Handle error logic here
        }
      } catch (error) {
        console.error("Error uploading image", error);
        // Handle error logic here
      }
    }
  };

  return (
    <div className="add_employ">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-2"
      >
        <Tab eventKey="home" title="Home">
          <form onSubmit={(e) => handleSubmit(e)} method="POST">
            <Row>
              <Col lg={6}>
                <div className="mb-2">
                  <div className="mb-2">Employee ID</div>
                  <input
                    type="text"
                    placeholder=""
                    name="employee_id"
                    value={formValues.employee_id}
                    onChange={(e) => handleInputChange(e)}
                    className="rounded-1 form_border_focus form-control"
                  />
                </div>
                <div className="mb-2">
                  <div className="mb-2">Employee Name</div>
                  <input
                    type="text"
                    placeholder=""
                    name="username"
                    value={formValues.username}
                    onChange={(e) => handleInputChange(e)}
                    className="rounded-1 form_border_focus form-control"
                  />
                </div>
                <div className="mb-2">
                  <div className="mb-2">Email</div>
                  <input
                    type="email"
                    placeholder=""
                    name="email"
                    value={formValues.email}
                    onChange={(e) => handleInputChange(e)}
                    className="rounded-1 form_border_focus form-control"
                  />
                </div>

                <div className="mb-2">
                  <div className="mb-2">Designation</div>
                  <select
                    className="form-select form-control rounded-1 form_border_focus"
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
                  </select>
                </div>

                <div className="mb-2">
                  <div className="mb-2">Department</div>
                  <select
                    className="form-select form-control rounded-1 form_border_focus"
                    aria-label="Default select example"
                    name="department"
                    value={formValues.department}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="">Select Designation</option>
                    {departments &&
                      departments.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.department}
                        </option>
                      ))}
                    <option value="3">Nazmul</option>
                  </select>
                </div>

                <div className="mb-2">
                  <div className="mb-2">Phone Number</div>
                  <input
                    type="number"
                    placeholder=""
                    name="phone_number"
                    value={formValues.phone_number}
                    onChange={(e) => handleInputChange(e)}
                    className="rounded-1 form_border_focus form-control"
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-2">
                  <input
                    id="employeeStatus"
                    type="checkbox"
                    name="is_active"
                    // value={formValues.is_active}
                    // onChange={(e) => handleInputChange(e)}
                    // className="rounded-1 form_border_focus form-control"
                  />
                  <label className="mb-2 ms-2" htmlFor="employeeStatus">
                    Active
                  </label>
                  {/* <select
                    className="form-select form-control rounded-1 form_border_focus"
                    aria-label="Default select example"
                    name="is_active"
                    value={formValues.is_active}
                    onChange={(e) =>
                      handleSelectChange("status", e.target.value)
                    }
                  >
                    <option>Select Status</option>
                    <option value="1">Active</option>
                    <option value="2">Inactive</option>
                  </select> */}
                </div>

                <div className="mb-2">
                  <div className="mb-2">Shift</div>
                  <select
                    className="form-select form-control rounded-1 form_border_focus"
                    aria-label="Default select example"
                    name="shift_id"
                    value={formValues.shift_id}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="">Select Shift</option>

                    {shifts &&
                      shifts.map((s) => (
                        <option key={s.shift_id} value={s.shift_id}>
                          {s.shift_beginning}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-2">
                  <div className="mb-2">Group</div>
                  <select
                    className="form-select form-control rounded-1 form_border_focus"
                    name="group_id"
                    aria-label="Default select example"
                    value={formValues.group_id}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="">Select Group</option>
                    <option value="2">Doctor</option>
                    <option value="3">Nurse</option>
                  </select>
                </div>
                <div className="mb-2">
                  <div className="mb-2">Upload Photo</div>
                  {/* <input
                    type="file"
                    placeholder=""
                    name="image"
                    value={formValues.image}
                    onChange={(e) => handleInputChange(e)}
                    className="rounded-1 form_border_focus form-control"
                  /> */}

                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={(e) => handleInputChange(e)}
                    className="rounded-1 form_border_focus form-control"
                  />
                </div>
                <div className="mb-2">
                  <div className="mb-2">Employee Role</div>
                  <div>
                    <div className="d-flex">
                      <div className="form-check me-2">
                        <input
                          className="form-check-input"
                          // onClick={handleClick}
                          type="checkbox"
                          value=""
                          name="employee_role"
                          id="employee_role_admin"
                          onChange={(e) =>
                            setFormValues((prev) => ({
                              ...prev,
                              is_superuser: e.target.checked,
                            }))
                          }
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
                            className="form-check-input"
                            type="checkbox"
                            id="employee_role_staff"
                            onChange={(e) =>
                              setFormValues((prev) => ({
                                ...prev,
                                is_staff: e.target.checked,
                              }))
                            }
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

                    {isShown && (
                      <div className="">
                        <div className="mb-2">
                          <label className="mb-2">
                            Password<span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            placeholder=""
                            className="form-control rounded-1 form_border_focus"
                            name="password"
                            value={formValues.password}
                            onChange={(e) => handleInputChange(e)}
                          />
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
                            className="form-control rounded-1 form_border_focus"
                            name="confirm_password"
                          />
                          <div className="text-danger">
                            {" "}
                            {/* Provide appropriate error message logic */}
                            {/* Error message for confirm_password */}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            </Row>

            <Button
              type="submit"
              className="rounded-1 mt-2 px-4 add_btn_color border-0"
            >
              + Add
            </Button>
          </form>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Page;
