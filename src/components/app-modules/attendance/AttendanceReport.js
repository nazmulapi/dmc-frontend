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
import { getDate, getTime } from "../../../lib/helper";
import { exportToPDF, exportToExcel, exportToCSV } from "../../../lib/export";

const AttendanceManage = () => {
  const [formValues, setFormValues] = useState({
    group_id: "",
    year: "",
    month: "",
    employee_id: "",
  });

  const [selectFormValues, setSelectFormValues] = useState({
    group_id: "",
    year: "",
    month: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    data: apiData,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR(
    formSubmitted
      ? `/attendance_log/?date=${formValues.year}-${formValues.month}&employee_id=${formValues.employee_id}&group_id=${formValues.group_id}&page=${currentPage}&page_size=${pageSize}`
      : null,
    fetcher,
    {
      errorRetryCount: 2,
      keepPreviousData: true,
    }
  );

  const totalPages = Math.ceil(apiData?.count / Number(pageSize));
  const startIndex = (currentPage - 1) * Number(pageSize);
  const endIndex = startIndex + Number(pageSize);

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

  // const years = [2015, 2016, 2017]?.map((item) => ({
  //   name: "year",
  //   label: item,
  //   value: item,
  // }));

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2015;
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
      years.push({
        name: "year",
        label: year.toString(),
        value: year,
      });
    }

    return years;
  };

  const years = generateYears();

  const months = [
    { name: "month", label: "Select Month", value: null },
    { name: "month", label: "January", value: "01" },
    { name: "month", label: "February", value: "02" },
    { name: "month", label: "March", value: "03" },
    { name: "month", label: "April", value: "04" },
    { name: "month", label: "May", value: "05" },
    { name: "month", label: "June", value: "06" },
    { name: "month", label: "July", value: "07" },
    { name: "month", label: "August", value: "08" },
    { name: "month", label: "September", value: "09" },
    { name: "month", label: "October", value: "10" },
    { name: "month", label: "November", value: "11" },
    { name: "month", label: "December", value: "12" },
  ];

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
    console.log(formValues);
    setIsSubmitLoading(true);
    setFormSubmitted(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    mutate();
  };

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) {
      console.log(apiData?.results);
      setEmployeeData(apiData?.results || []);
      console.log(apiData?.results);
    }
  }, [isLoading, isValidating]);

  const handleExportToPDF = async () => {
    // console.log(employeeData);
    // return;
    const headers = [
      "Employee ID",
      "Employee Name",
      "In Time",
      "Out Time",
      "Date",
    ];

    const data = employeeData.map((item) => ({
      ID: item.employee_id,
      username: item.username,
      InTime: getTime(item.InTime),
      OutTime: getTime(item.OutTime),
      Date: getDate(item.InTime),
    }));

    exportToPDF(headers, data, "attendance-report");
  };

  const handleExportToCSV = () => {
    const data = employeeData.map((item) => ({
      "Employee ID": item.employee_id,
      "Employee Name": item.username,
      "In Time": getTime(item.InTime),
      "Out Time": getTime(item.OutTime),
      Date: getDate(item.InTime),
    }));

    exportToCSV(data, "attendance-report");
  };

  const handleExportToExcel = () => {
    const data = employeeData.map((item) => ({
      "Employee ID": item.employee_id,
      "Employee Name": item.username,
      "In Time": getTime(item.InTime),
      "Out Time": getTime(item.OutTime),
      Date: getDate(item.InTime),
    }));

    exportToExcel(data, "attendance-report");
  };

  return (
    <>
      <section>
        <div>
          <h2 className="border-bottom pb-2 mb-4">Attendance Report</h2>
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
                    className="form-select rounded-1 mb-3 form_border_focus"
                    aria-label="Default select example "
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
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        employee_id: e.target.value,
                      }))
                    }
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <Select
                    className={classEase("rounded-1 form_border_focus mb-3")}
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isSearchable={true}
                    value={selectFormValues.year}
                    options={years}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "year")
                    }
                    placeholder="Select year..."
                  />

                  {/* <select
                    className="form-select rounded-1 mb-3 form_border_focus"
                    aria-label="Default select example "
                  >
                    <option>Select Year</option>
                    <option value="1">2023</option>
                    <option value="2">2022</option>
                    <option value="2">2021</option>
                    <option value="2">2020</option>
                  </select> */}
                </div>
                <div>
                  <Select
                    className={classEase("rounded-1 form_border_focus mb-3")}
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isSearchable={true}
                    value={selectFormValues.month}
                    options={months}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "month")
                    }
                    placeholder="Select month..."
                  />

                  {/* <select
                    className="form-select rounded-1 mb-3 form_border_focus"
                    aria-label="Default select example "
                  >
                    <option>Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="11">December</option>
                  </select> */}
                </div>
              </Col>

              <div className="d-flex justify-content-center">
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
        <div className="search_part border mb-3">
          <div className="d-flex justify-content-end p-2">
            <div className="d-flex justify-content-between">
              <div className="me-2">
                <Button
                  type="button"
                  className="rounded-1 px-4 add_btn_color border-0"
                  onClick={() => handleExportToPDF()}
                >
                  PDF
                </Button>
              </div>
              <div className="me-2">
                <Button
                  type="submit"
                  className="rounded-1 px-4 add_btn_color border-0"
                  onClick={() => handleExportToCSV()}
                >
                  CSV
                </Button>
              </div>
              <div>
                <Button
                  type="submit"
                  className="rounded-1 px-4 add_btn_color border-0"
                  onClick={() => handleExportToExcel()}
                >
                  Excel
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="employee_table table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                {/* <th scope="row">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                  </div>
                </th> */}
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
                {employeeData?.map((item, index) => (
                  <tr key={index}>
                    {/* <th scope="row">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id=""
                        />
                      </div>
                    </th> */}
                    <th scope="row">{startIndex + index + 1}</th>
                    <td>{item?.employee_id}</td>
                    <td>{item?.username}</td>
                    <td className={item?.delay_minutes && "text-danger"}>
                      {getTime(item?.InTime)}
                    </td>
                    <td>{getTime(item?.OutTime)}</td>
                    <td>{getDate(item?.InTime)}</td>
                    {/*<td>00:00:00</td>
                 <td>00:00:00</td>
                <td>00:00:00</td>
                <td>
                  <button className="add_btn_color border-0 rounded-1 me-2">
                    <FaRegEdit color="white" />
                  </button>
                  <button className="bg-danger border-0 rounded-1">
                    <RiDeleteBin6Line color="white" />
                  </button>
                </td> */}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {/* {isLoading && (
            <div className="loading-overlay">
              <p>Loading...</p>
            </div>
          )} */}
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
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default AttendanceManage;
