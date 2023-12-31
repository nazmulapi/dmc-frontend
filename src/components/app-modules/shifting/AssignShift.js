"use client";

import React, { useState } from "react";
import useSWR from "swr";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FaRegEdit } from "react-icons/fa";
import { Row } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import classEase from "classease";
import { toast } from "react-toastify";
import { fetcher } from "../../../lib/fetch";
import { submit } from "../../../lib/submit";

const AssignShift = () => {
  const [formValues, setFormValues] = useState({});

  const [selectFormValues, setSelectFormValues] = useState({
    shift_id: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formValues?.employee_id?.trim()) {
      newErrors.employee_id = "Employee ID is required";
      valid = false;
    }

    if (!formValues?.shift_id?.trim()) {
      newErrors.shift_id = "Shift ID is required";
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
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    setFormValues((prev) => ({
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
      console.log(formValues);
      // return;

      const response = await submit("/shift_assign/", formValues);

      console.log(response);

      if (response?.employee_id) {
        toast.success("Shift assigned successfully");
        // setSuccess("Employee created successfully");
        setIsLoading(false);
        // setErrors({});
        // setFormValues(initialValues);
      } else {
        toast.error(response?.message || "Something went wrong!");
        // setSuccess("");
        setIsLoading(false);
        // setErrors({});
        // setFormValues(initialValues);
      }
    }
  };

  return (
    <>
      <section>
        <div>
          <h2 className="border-bottom pb-2">Assign Shift</h2>
        </div>
        <div className="search_part mb-3">
          <div className=" p-2">
            <form onSubmit={(e) => handleSubmit(e)} method="POST">
              <Row>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Employee
                    </label>
                    {/* <input
                      type="text"
                      className="form-control rounded-1 form_border_focus"
                      id=""
                      placeholder="Enter Employee"
                      onChange={handleInputChange}
                    /> */}

                    <input
                      type="text"
                      placeholder="Employee ID"
                      name="employee_id"
                      value={formValues.employee_id}
                      onChange={(e) => handleInputChange(e)}
                      className={classEase(
                        "rounded-1 form_border_focus form-control",
                        errors.employee_id && "is-invalid"
                      )}
                    />
                    {errors.employee_id && (
                      <div className="invalid-feedback">
                        {errors.employee_id}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Shift<span className="text-danger"> *</span>
                    </label>

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
                      className="form-select form_border_focus rounded-1"
                      aria-label="Default select example"
                    >
                      <option>select shift</option>
                      <option value="1">Morning shift</option>
                      <option value="2">Evening shift</option>
                      <option value="3">Night shift</option>
                    </select> */}
                  </div>
                </div>
              </Row>
              <button className="button-16 fw-semibold" role="button">
                <span className="text">Assign</span>
              </button>
            </form>
          </div>
        </div>

        {/* <div className="employee_table table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">SL</th>
                <th scope="col">Departments</th>
                <th scope="col">Departments Details</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>API00000</td>
                <td>Md Azad </td>
                <td>
                  <button className="add_btn_color border-0 rounded-1 me-2">
                    <FaRegEdit color="white" />
                  </button>
                  <button className="bg-danger border-0 rounded-1">
                    <RiDeleteBin6Line color="white" />
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>API00000</td>
                <td>Md Azad </td>
                <td>
                  <button className="add_btn_color border-0 rounded-1 me-2">
                    <FaRegEdit color="white" />
                  </button>
                  <button className="bg-danger border-0 rounded-1">
                    <RiDeleteBin6Line color="white" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </section>
    </>
  );
};

export default AssignShift;
