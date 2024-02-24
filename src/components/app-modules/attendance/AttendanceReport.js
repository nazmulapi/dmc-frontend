"use client";

import React, { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Select from "react-select";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import classEase from "classease";
import { DataTable } from "mantine-datatable";
// import Pagination from "../../utils/Pagination";
import { fetcher } from "../../../lib/fetch";
import { getDate, getTime } from "../../../lib/helper";
import { exportToPDF, exportToExcel, exportToCSV } from "../../../lib/export";
import { constants } from "../../../lib/config";

const AttendanceManage = () => {
  const { PAGE_SIZES } = constants;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "InTime",
    direction: "desc", // desc
  });

  const [formValues, setFormValues] = useState({
    group_id: "",
    department_id: "",
    designation_id: "",
    year: "",
    month: "",
    employee_id: "",
  });

  const [formData, setFormData] = useState({
    group_id: "",
    department_id: "",
    designation_id: "",
    year: "2024",
    month: "",
    employee_id: "",
  });

  const [selectFormValues, setSelectFormValues] = useState({
    group_id: "",
    department_id: "",
    designation_id: "",
    year: "",
    month: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    data: apiData,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR(
    `/attendance_log/?date=${formData.year}-${formData.month}&employee_id=${formData.employee_id}&group_id=${formData.group_id}&department_id=${formData.department_id}&designation_id=${formData.designation_id}&page=${currentPage}&page_size=${pageSize}&column_accessor=${sortStatus.columnAccessor}&direction=${sortStatus.direction}`,
    fetcher,
    {
      errorRetryCount: 2,
      keepPreviousData: true,
    }
  );

  console.log(apiData);

  // const totalPages = Math.ceil(apiData?.count / Number(pageSize));
  // const startIndex = (currentPage - 1) * Number(pageSize);
  // const endIndex = startIndex + Number(pageSize);

  const handleSortStatusChange = (status) => {
    console.log(status);
    setCurrentPage(1);
    setSortStatus(status);
  };

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

  const {
    data: departmentData,
    error: departmentFetchError,
    isLoading: departmentFetchIsLoading,
  } = useSWR(`/department/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const departments = departmentData?.map((item) => ({
    name: "department_id",
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
    name: "designation_id",
    label: item.designation,
    value: item.id,
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
    const isFormEmpty = Object.values(formValues).every(
      (value) => value === ""
    );
    if (isFormEmpty) return;
    setCurrentPage(1);

    setSuccess("");
    console.log(formValues);
    setFormData(formValues);
    setIsSubmitLoading(true);
    setFormSubmitted(true);
  };

  // const handlePageChange = (newPage) => {
  //   if (newPage >= 1) {
  //     setCurrentPage(newPage);
  //   }
  // };

  // const handlePageSizeChange = (newPageSize) => {
  //   setPageSize(newPageSize);
  //   setCurrentPage(1);
  //   mutate();
  // };

  const [employeeData, setEmployeeData] = useState([]);

  // useEffect(() => {
  //   if (!isLoading && !error) {
  //     console.log(apiData?.results);
  //     setEmployeeData(apiData?.results || []);
  //     console.log(apiData?.results);
  //   }
  // }, [isLoading, isValidating]);

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
      <div className="page-top">
        <h3 className="page-title text-capitalize">Attendance Report</h3>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">Attendance Report</li>
        </ul>
      </div>

      <section className="mb-4">
        <div className="form_part">
          <form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={6} lg={3} xl={3}>
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
                </div>
              </Col>
              <Col xs={12} md={6} lg={3} xl={3}>
                <div>
                  <Select
                    className={classEase("rounded-1 form_border_focus mb-3")}
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isSearchable={true}
                    value={selectFormValues.department_id}
                    options={departments}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "department_id")
                    }
                    placeholder="Select department..."
                  />
                </div>
              </Col>
              <Col xs={12} md={6} lg={3} xl={3}>
                <div>
                  <Select
                    className={classEase("rounded-1 form_border_focus mb-3")}
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isSearchable={true}
                    value={selectFormValues.designation_id}
                    options={designations}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "designation_id")
                    }
                    placeholder="Select designation..."
                  />
                </div>
              </Col>
              <Col xs={12} md={6} lg={3} xl={3}>
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
                </div>
              </Col>
              <Col xs={12} md={6} lg={3} xl={3}>
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
                </div>
              </Col>
              <Col xs={12} md={6} lg={3} xl={3}>
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

              <Col xs={12} md={6} lg={3} xl={3}>
                <div className="d-flex justify-content-center">
                  <button
                    className="rounded-1 theme_color text-white px-3 border-0 filter_button"
                    type="submit"
                  >
                    Apply Filter
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </div>
      </section>

      <div className="search_part mb-3">
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
      <section>
        <div className="datatable-wrapper">
          <DataTable
            style={{
              height: apiData?.results?.length === 0 ? "300px" : "auto",
            }}
            className="datatable"
            withTableBorder
            withColumnBorders
            striped
            highlightOnHover
            horizontalSpacing="sm"
            verticalSpacing="sm"
            fz="sm"
            verticalAlign="center"
            columns={[
              {
                title: "SL",
                accessor: "na",
                noWrap: true,
                sortable: false,
                render: (_, index) => (currentPage - 1) * pageSize + index + 1,
              },
              {
                accessor: "employee_id",
                title: "Employee ID",
                sortable: true,
              },
              {
                accessor: "username",
                title: "Employee Name",
                noWrap: true,
                sortable: true,
                // visibleMediaQuery: aboveXs,
                // render: ({ username }) => username,
              },
              {
                accessor: "InTime",
                title: "In Time",
                noWrap: true,
                // visibleMediaQuery: aboveXs,
                render: ({ InTime }) => getTime(InTime),
              },
              {
                accessor: "InTime",
                title: "Out Time",
                // visibleMediaQuery: aboveXs,
                render: ({ OutTime }) => getTime(OutTime),
              },
              {
                accessor: "Type",
                title: "Date",
                // visibleMediaQuery: aboveXs,
                render: ({ Type }) => Type,
              },
            ]}
            fetching={isLoading}
            records={apiData?.results || []}
            page={currentPage}
            onPageChange={setCurrentPage}
            totalRecords={apiData?.count}
            recordsPerPage={pageSize}
            sortStatus={sortStatus}
            onSortStatusChange={handleSortStatusChange}
            // selectedRecords={selectedRecords}
            // onSelectedRecordsChange={setSelectedRecords}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}
            // rowExpansion={rowExpansion}
            // onRowContextMenu={handleContextMenu}
            // onScroll={hideContextMenu}
          />
        </div>

        {/* <div className="employee_table table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">SL</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">In Time</th>
                <th scope="col">Out Time</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            {formSubmitted && (
              <tbody>
                {employeeData?.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{startIndex + index + 1}</th>
                    <td>{item?.employee_id}</td>
                    <td>{item?.username}</td>
                    <td className={item?.delay_minutes && "text-danger"}>
                      {getTime(item?.InTime)}
                    </td>
                    <td>{getTime(item?.OutTime)}</td>
                    <td>{getDate(item?.InTime)}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div> */}
      </section>
    </>
  );
};

export default AttendanceManage;
