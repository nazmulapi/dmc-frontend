"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Select from "react-select";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import classEase from "classease";
import Pagination from "../../utils/Pagination";
import { fetcher } from "../../../lib/fetcher";
import { submit } from "../../../lib/submit";
import { formatDate } from "../../../lib/helper";

const AttendanceManage = () => {
  const [formValues, setFormValues] = useState({
    date: "",
    group_id: "",
  });
  const [selectFormValues, setSelectFormValues] = useState({
    group_id: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isInitialLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    data: apiData,
    error,
    isValidating,
    isLoading,
  } = useSWR(
    formSubmitted
      ? `/attendance_log/?page=${currentPage}&page_size=${pageSize}`
      : null,
    fetcher,
    {
      errorRetryCount: 2,
    }
  );

  const totalPages = Math.ceil(apiData?.count / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const {
    data: groupsData,
    error: groupsFetchError,
    isLoading: groupsFetchIsLoading,
  } = useSWR(`/empgrp/`, fetcher, {
    errorRetryCount: 2,
  });

  const groups = groupsData?.map((item) => ({
    name: "group_id",
    label: item.group_name,
    value: item.group_id,
  }));

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

    console.log(name, value);

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

    console.log(formValues);
    return;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    setIsLoading(true);
    setFormSubmitted(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) {
      setEmployeeData(apiData?.results || []);
      console.log(apiData?.results);
    }
  }, [isLoading, isValidating]);

  return (
    <>
      <section>
        <div>
          <h2 className="border-bottom pb-2 mb-4 text-capitalize">
            attendance structured data
          </h2>
        </div>
        <div className="form_part mb-3">
          <form onSubmit={handleFormSubmit}>
            <Row>
              <Col lg={6}>
                <div>
                  <Select
                    className={classEase("rounded-1 form_border_focus mb-3")}
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
                    placeholder="Select group..."
                  />

                  {/* <select


                  >
                    <option>Select Department</option>
                    <option value="1">Doctor</option>
                    <option value="2">Staff</option>
                  </select> */}
                </div>

                <div className="col-auto">
                  <input
                    type="search"
                    id=""
                    placeholder="Employee ID"
                    className="form-control form_border_focus rounded-1"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <input
                    type="date"
                    className="form-control rounded-1 mb-3 form_border_focus"
                  />
                </div>
                {/* <div>
                  <input
                    type="date"
                    className="form-control rounded-1 mb-3 form_border_focus"
                  />
                </div> */}
              </Col>
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="rounded-1 theme_color text-white px-3 py-2 border-0"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </Row>
          </form>
        </div>
        {/* <div className="search_part border mb-3">
          <div className="d-flex justify-content-end p-2">
            <div className="d-flex justify-content-between">
              <div className="me-2">
                <Button
                  type="submit"
                  className="rounded-1 px-4 add_btn_color border-0"
                >
                  PDF
                </Button>
              </div>
              <div className="me-2">
                <Button
                  type="submit"
                  className="rounded-1 px-4 add_btn_color border-0"
                >
                  CSV
                </Button>
              </div>
              <div>
                <Button
                  type="submit"
                  className="rounded-1 px-4 add_btn_color border-0"
                >
                  Excel
                </Button>
              </div>
            </div>
          </div>
        </div> */}

        <div className="employee_table table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="row">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                  </div>
                </th>
                <th scope="col">SL</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">In Time</th>
                <th scope="col">Out Time</th>
                <th scope="col">Date</th>
                {/*<th scope="col">Tardiness</th>
                <th scope="col">Minutes</th>
                <th scope="col">Cumulative</th>
                <th scope="col">Action</th> */}
              </tr>
            </thead>
            {formSubmitted && (
              <tbody>
                {employeeData?.map((employee, index) => (
                  <tr>
                    <th scope="row">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id=""
                        />
                      </div>
                    </th>
                    <th scope="row">{startIndex + index + 1}</th>
                    <td>{employee.employee_id}</td>
                    <td>{employee.username}</td>
                    <td>{formatDate(employee.InTime)}</td>
                    <td>{formatDate(employee.OutTime)}</td>
                    <td>NA</td>
                  </tr>
                ))}

                {/* <tr>
                  <th scope="row">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                    </div>
                  </th>
                  <th scope="row">2</th>
                  <td>API00000</td>
                  <td>Md Azad </td>
                  <td>00:00:00</td>
                  <td>00:00:00</td>
                  <td>00-00-0000</td>
                  <td>00:00:00</td>
                  <td>00:00:00</td>
                  <td>00:00:00</td>
                  <td>
                    <button className="add_btn_color border-0 rounded-1 me-2">
                      <FaRegEdit color="white" />
                    </button>
                    <button className="bg-danger border-0 rounded-1">
                      <RiDeleteBin6Line color="white" />
                    </button>
                  </td>
                </tr> */}
              </tbody>
            )}
          </table>

          {isLoading && (
            <div className="loading-overlay">
              <p>Loading...</p>
            </div>
          )}
        </div>
        <Row>
          <Col xs lg="9">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Col>
          <Col xs lg="3">
            <div className="w-100 d-flex align-items-center justify-content-end mb-3">
              <label>Page Size</label>
              <select
                className="rounded-1 form_border_focus form-control w-50 ms-2"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(e.target.value)}
              >
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default AttendanceManage;
