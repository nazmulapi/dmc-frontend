"use client";

import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetch";
import { update } from "../../../lib/submit";

function MyVerticallyCenteredModal({ show, onHide, employee, mutate }) {
  // console.log(employee);
  const [empId, setEmpId] = useState(employee.employee_id);

  const [formValues, setFormValues] = useState({
    // shift_id: employee.shift_id,
    group_id: employee.group_id,
    department: employee.department,
    designation: employee.designation,
    is_active: Boolean(employee.is_active),
    is_staff: Boolean(employee.is_staff),
  });

  const [selectFormValues, setSelectFormValues] = useState({
    department: "",
    designation: "",
    // shift_id: "",
    group_id: "",
  });

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      // shift_id: employee.shift_id,
      group_id: employee.group_id,
      department: employee.department,
      designation: employee.designation,
      is_active: Boolean(employee.is_active),
      is_staff: Boolean(employee.is_staff),
    }));

    setSelectFormValues((prev) => ({
      ...prev,
      department: {
        label: employee.department_name,
        name: employee.department,
        value: employee.department,
      },
      designation: {
        label: employee.designation_name,
        name: employee.designation,
        value: employee.designation,
      },
      // shift_id: {
      //   label: employee.shift_name,
      //   name: employee.shift_id,
      //   value: employee.shift_id,
      // },
      group_id: {
        label: employee.group_name,
        name: employee.group_id,
        value: employee.group_id,
      },
    }));
  }, [employee]);

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

  const departments = departmentsData
    ?.filter((item) => item.is_active)
    .map((item) => ({
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

  const designations = designationsData
    ?.filter((item) => item.is_active)
    .map((item) => ({
      name: "designation",
      label: item.designation,
      value: item.id,
    }));

  // const {
  //   data: shiftsData,
  //   error: shiftsFetchError,
  //   isLoading: shiftsFetchIsLoading,
  // } = useSWR(`/shift/`, fetcher, {
  //   errorRetryCount: 2,
  //   keepPreviousData: true,
  // });

  // const shifts = shiftsData?.map((item) => ({
  //   name: "shift_id",
  //   label: item.shift_name,
  //   value: item.shift_id,
  // }));

  const {
    data: groupsData,
    error: groupsFetchError,
    isLoading: groupsFetchIsLoading,
  } = useSWR(`/empgrp/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const groups = groupsData
    ?.filter((item) => item.is_active)
    .map((item) => ({
      name: "group_id",
      label: item.group_name,
      value: item.group_id,
    }));

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // console.log(formValues);

    // if (
    //   !formValues.shift_id ||
    //   (typeof formValues.shift_id === "string" && !formValues.shift_id.trim())
    // ) {
    //   newErrors.shift_id = "Shift ID is required";
    //   valid = false;
    // }

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

  const handleInputChange = async (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    const valid = validateForm();

    // console.log("Form Value: ", formValues, selectFormValues);
    // console.log("Error: ", errors);
    // return;

    // console.log(formValues);
    // return;

    if (valid) {
      setIsLoading(true);

      const formData = new FormData();

      // Append form data
      Object.entries(formValues).forEach(([key, value]) => {
        // Check if the value is not empty before appending
        if (value !== null && value !== undefined && value !== "") {
          if (key !== "image") {
            formData.append(key, value);
          } else if (key === "image" && value instanceof File) {
            formData.append("image", value);
          }
        }
      });

      // // Append form data
      // Object.entries(formValues).forEach(([key, value]) => {
      //   if (key !== "image") {
      //     formData.append(key, value);
      //   }
      // });

      // // Append image file
      // formData.append("image", formValues.image);
      // console.log("Form data", formData);
      // setIsLoading(false);
      // return;

      const response = await update(
        `/employee/${employee.employee_id}/`,
        formData,
        true
      );

      console.log(response);
      // setIsLoading(false);

      // return;

      if (response?.status === "success") {
        setTimeout(() => {
          // setData((prevData) => {
          //   const d = prevData.map((i) =>
          //     i.employee_id === response.employee_id
          //       ? {
          //           ...i,
          //           shift_id: response.shift_id,
          //           shift_name: selectFormValues.shift_id.label,
          //           is_active: response.is_active,
          //         }
          //       : i
          //   );
          //   return d;
          // });
          setSuccess("Employee updated successfully");
          setIsLoading(false);
          mutate();
          // setErrors({});
          // setFormValues(initialValues);
        }, 1000);
      } else {
        setTimeout(() => {
          setSuccess(response?.message || "Something went wrong!");
          setIsLoading(false);
          // setErrors({});
          // setFormValues(initialValues);
        }, 1000);
      }
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setSuccess("");
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-2">
            <div className="mb-2">
              Designation <span className="text-danger"> *</span>
            </div>
            <Select
              className={classEase(
                "rounded-1 form_border_focus"
                // errors.designation && "is-invalid"
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

            {/* {errors.designation && (
              <div className="invalid-feedback">{errors.designation}</div>
            )} */}
          </div>

          <div className="mb-2">
            <div className="mb-2">
              Department <span className="text-danger"> *</span>
            </div>
            <Select
              className={classEase(
                "rounded-1 form_border_focus"
                // errors.department && "is-invalid"
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

            {/* {errors.department && (
                  <div className="invalid-feedback">{errors.department}</div>
                )} */}
          </div>

          {/* <div className="mb-2">
            Shift <span className="text-danger"> *</span>
          </div> */}
          {/* <Select
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
          /> */}

          {/* {errors.shift_id && (
            <div className="invalid-feedback">{errors.shift_id}</div>
          )} */}

          <div className="mb-2">
            <div className="mb-2">
              Group <span className="text-danger"> *</span>
            </div>
            <Select
              className={classEase(
                "rounded-1 form_border_focus"
                // errors.group_id && "is-invalid"
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

            {/* {errors.group_id && (
                  <div className="invalid-feedback">{errors.group_id}</div>
                )} */}
          </div>

          <div className="mb-2">
            <div className="mb-2">
              Change Photo <span className="text-danger"> *</span>
            </div>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => handleInputChange(e)}
              className={classEase(
                "rounded-1 form_border_focus form-control"
                // errors.image && "is-invalid"
              )}
            />
            {/* {errors.image && (
                  <div className="invalid-feedback">{errors.image}</div>
                )} */}
          </div>

          {/* {console.log(formValues.is_active)} */}

          <div className="mb-2 mt-2 d-flex">
            <div className="form-check me-2">
              <input
                id="activeStatus"
                type="checkbox"
                name="is_active"
                checked={formValues.is_active}
                onChange={(e) => handleInputChange(e)}
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor="activeStatus">
                Active
              </label>
            </div>
            <div className="form-check">
              <input
                id="employee_role_staff"
                type="checkbox"
                name="is_staff"
                checked={formValues.is_staff}
                onChange={(e) => handleInputChange(e)}
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor="employee_role_staff">
                Is staff
              </label>
            </div>
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
          </Button>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button>Edit</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

function EditEmployee({ employee, mutate }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setModalShow(true);
        }}
        className="bg-transparent border-0 p-0 m-0"
      >
        <FaRegEdit color="#585858" />
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        employee={employee}
        mutate={mutate}
      />
    </>
  );
}

export default EditEmployee;
