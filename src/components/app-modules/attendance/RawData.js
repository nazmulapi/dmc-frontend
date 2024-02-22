"use client";

import React, { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
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

const PAGE_SIZES = [10, 20, 30, 40];

const ManageInfo = () => {
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
    `/log/raw_log/?date=${formValues.year}-${formValues.month}&employee_id=${formValues.employee_id}&group_id=${formValues.group_id}&department_id=${formValues.department_id}&designation_id=${formValues.designation_id}&page=${currentPage}&page_size=${pageSize}&column_accessor=${sortStatus.columnAccessor}&direction=${sortStatus.direction}`,
    fetcher,
    {
      errorRetryCount: 2,
      keepPreviousData: true,
    }
  );

  const handleSortStatusChange = (status) => {
    console.log(status);
    setCurrentPage(1);
    setSortStatus(status);
  };

  // const totalPages = Math.ceil(apiData?.count / Number(pageSize));
  // const startIndex = (currentPage - 1) * Number(pageSize);
  // const endIndex = startIndex + Number(pageSize);

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
    setSuccess("");
    console.log(formValues);
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
      "Device",
      "Date",
      "Time",
      "Type",
    ];

    const data = employeeData.map((item) => ({
      ID: item.employee_id,
      username: item.CardName,
      Device: item.device_id,
      Date: getDate(item.InTime),
      Time: getTime(item.InTime),
      Type: item.Type,
    }));

    exportToPDF(headers, data, "attendance-raw-data");
  };

  const handleExportToCSV = () => {
    const data = employeeData.map((item) => ({
      "Employee ID": item.employee_id,
      "Employee Name": item.CardName,
      Device: item.device_id,
      Date: getDate(item.InTime),
      Time: getTime(item.InTime),
      Type: item.Type,
    }));

    exportToCSV(data, "attendance-raw-data");
  };

  const handleExportToExcel = () => {
    const data = employeeData.map((item) => ({
      "Employee ID": item.employee_id,
      "Employee Name": item.CardName,
      Device: item.device_id,
      Date: getDate(item.InTime),
      Time: getTime(item.InTime),
      Type: item.Type,
    }));

    exportToExcel(data, "attendance-raw-data");
  };

  return (
    <>
      <section>
        <div>
          <h2 className="border-bottom pb-2 mb-4 text-capitalize">
            Attendance raw data
          </h2>
        </div>
        <div className="form_part mb-3">
          <form onSubmit={handleFormSubmit}>
            <Row>
              <Col lg={4}>
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
              <Col lg={4}>
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
              <Col lg={4}>
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
              <Col lg={4}>
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
              <Col lg={4}>
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
              <Col lg={4}>
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
            </Row>
            <div className="d-flex justify-content-center">
              <button
                className="rounded-1 theme_color text-white px-3 py-2 border-0"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
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
                accessor: "CardName",
                title: "Employee Name",
                noWrap: true,
                sortable: true,
                // visibleMediaQuery: aboveXs,
                render: ({ CardName }) => CardName,
              },
              {
                accessor: "device_id",
                title: "Device",
                sortable: true,
                // visibleMediaQuery: aboveXs,
              },
              {
                accessor: "InTime",
                title: "Date",
                noWrap: true,
                // visibleMediaQuery: aboveXs,
                render: ({ InTime }) => getDate(InTime),
              },
              {
                accessor: "InTime",
                title: "Time",
                // visibleMediaQuery: aboveXs,
                render: ({ InTime }) => getTime(InTime),
              },
              {
                accessor: "Type",
                title: "Type",
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
          <table className="table table-bordered table-striped font_14">
            <thead>
              <tr>
                <th scope="col">SL</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Device</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            {formSubmitted && (
              <tbody>
                {employeeData?.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{startIndex + index + 1}</th>
                    <td>{item?.employee_id}</td>
                    <td>{item?.CardName}</td>
                    <td>{item?.device_id}</td>
                    <td>{getDate(item?.InTime)}</td>
                    <td>{getTime(item?.InTime)}</td>
                    <td>{item?.Type}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div> */}
        {/* <Row>
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
        </Row> */}
      </section>
    </>
  );
};

export default ManageInfo;
