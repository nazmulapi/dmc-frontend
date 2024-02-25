"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Spinner from "react-bootstrap/Spinner";
import { Row, Col } from "react-bootstrap";
import classEase from "classease";
import { toast } from "react-toastify";
import { DataTable } from "mantine-datatable";
import EditEmployee from "./EditEmployee";
import BulkShiftAssign from "./BulkShiftAssign";
import { submit } from "../../../lib/submit";
import { fetcher } from "../../../lib/fetch";
import { getStoragePath } from "../../../lib/helper";
import { exportToPDF, exportToExcel, exportToCSV } from "../../../lib/export";
import { constants } from "../../../lib/config";

const ManageInfo = () => {
  const { PAGE_SIZES } = constants;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "username",
    direction: "asc", // desc
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const {
    data: apiData,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR(
    `/employee/?page=${currentPage}&page_size=${pageSize}&column_accessor=${sortStatus.columnAccessor}&direction=${sortStatus.direction}`,
    fetcher,
    {
      errorRetryCount: 2,
      keepPreviousData: true,
    }
  );

  const modifiedData = apiData
    ? {
        ...apiData,
        results: apiData.results.map((record) => ({
          ...record,
          id: record.employee_id,
        })),
      }
    : null;

  const [selectedRecords, setSelectedRecords] = useState([]);

  const handleSortStatusChange = (status) => {
    console.log(status);
    setCurrentPage(1);
    setSortStatus(status);
    console.log(sortStatus);
  };

  const [formValues, setFormValues] = useState({
    group_id: "",
    department_id: "",
    designation_id: "",
    shift_id: "",
    employee_id: "",
  });

  const [selectFormValues, setSelectFormValues] = useState({
    group_id: "",
    department_id: "",
    designation_id: "",
    shift_id: "",
  });

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    // setIsSubmitLoading(true);
    // setFormSubmitted(true);
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

  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) {
      setDisplayedData(apiData?.results || []);
      console.log(apiData?.results);
    }
  }, [isLoading, isValidating]);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingSuccess, setUploadingSuccess] = useState("");
  const [validationError, setValidationError] = useState(null);

  const handleFileChange = (event) => {
    setValidationError(null);
    const files = event.target.files;
    // Convert files to an array
    const filesArray = Array.from(files);
    setUploadedFiles(filesArray);
  };

  const validateFiles = () => {
    let valid = true;
    const newErrors = {};

    // Basic validation: Check if exactly two files are selected
    if (uploadedFiles.length !== 2) {
      setValidationError(
        "Please select exactly two files: 'zip_file.zip' and 'csv_file.csv'."
      );
      valid = false;
      return valid;
    }

    // Validate file names
    const fileNames = uploadedFiles.map((file) => file.name);
    const requiredFileNames = ["zip_file.zip", "csv_file.csv"];

    for (const requiredFileName of requiredFileNames) {
      if (!fileNames.includes(requiredFileName)) {
        setValidationError(`Missing required file: ${requiredFileName}`);
        valid = false;
        break;

        // return valid;
      }
    }

    return valid;
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setUploadingSuccess("");

    const valid = validateFiles();

    if (!valid) {
      toast.error(validationError);
      return;
    }

    if (valid) {
      setIsUploading(true);

      const formData = new FormData();

      // // Append each file to the formData
      // for (const file of uploadedFiles) {
      //   formData.append("files", file);
      // }

      // // Append each file with its corresponding key
      // for (let i = 0; i < uploadedFiles.length; i++) {
      //   formData.append(`file${i + 1}`, uploadedFiles[i]);
      // }

      uploadedFiles.forEach((file) => {
        const key = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        formData.append(key, file);
      });

      // console.log("Form data", formData);

      // return;

      const response = await submit("/employee_csv/", formData, true);

      console.log(response);
      setIsUploading(false);
      // return;

      if (response?.uploaded) {
        toast.success("CSV and ZIP uploaded successfully");
        // setSuccess("Employee created successfully");
        // setIsLoading(false);
        // setErrors({});
        // setFormValues(initialValues);
      } else {
        toast.error(response?.message || "Something went wrong!");
        // setSuccess("Something went wrong!");
        // setIsLoading(false);
        // setErrors({});
        // setFormValues(initialValues);
      }
    }
  };

  // file download
  const handleExportToPDF = async () => {
    // console.log(displayedData);
    // return;
    const headers = [
      "Employee ID",
      "Employee Name",
      "Designation",
      "Group",
      "Department",
      "Shift",
      "Status",
    ];

    const data = displayedData.map((item) => ({
      ID: item.employee_id,
      username: item.username,
      Designation: item?.designation_name || "N/A",
      Group: item?.group_name || "N/A",
      Department: item?.department_name || "N/A",
      Shift: item?.shift_name || "N/A",
      Status: item?.is_active ? "Active" : "Inactive",
    }));

    exportToPDF(headers, data, "employee");
  };

  const handleExportToCSV = () => {
    const data = displayedData.map((item) => ({
      "Employee ID": item.employee_id,
      "Employee Name": item.username,
      Designation: item?.designation_name || "N/A",
      Group: item?.group_name || "N/A",
      Department: item?.department_name || "N/A",
      Shift: item?.shift_name || "N/A",
      Status: item?.is_active ? "Active" : "Inactive",
    }));

    exportToCSV(data, "employee");
  };

  const handleExportToExcel = () => {
    const data = displayedData.map((item) => ({
      "Employee ID": item.employee_id,
      "Employee Name": item.username,
      Designation: item?.designation_name || "N/A",
      Group: item?.group_name || "N/A",
      Department: item?.department_name || "N/A",
      Shift: item?.shift_name || "N/A",
      Status: item?.is_active ? "Active" : "Inactive",
    }));

    exportToExcel(data, "employee");
  };

  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const handleShiftSelect = (shift) => {
    setSelectedShift(shift);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  const handleBulkShiftAssign = (show) => {
    setShowShiftModal(show);
  };

  const handleBulkGroupAssign = () => {
    setShowGroupModal(true);
  };

  const handleGroupSubmit = () => {
    // Implement logic to submit selected group for bulk assignment
    console.log("Selected Group:", selectedGroup);
    setShowGroupModal(false);
  };

  return (
    <>
      <div className="page-top">
        <h3 className="page-title text-capitalize">Employees</h3>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">Employees</li>
        </ul>
      </div>

      <div className="mb-4">
        <div className="d-flex justify-content-between">
          <form
            className="d-flex justify-content-between"
            onSubmit={handleFormSubmit}
          >
            <Row>
              <Col xs={12} md={6} lg={2} xl={2}>
                <div>
                  <Select
                    className={classEase("rounded-1 form_border_focus mb-3")}
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    // // // isClearable={true}
                    // isSearchable={true}
                    value={selectFormValues.group_id}
                    options={groups}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "group_id")
                    }
                    placeholder="Select group..."
                  />
                </div>
              </Col>
              <Col xs={12} md={6} lg={2} xl={2}>
                <div>
                  <Select
                    className={classEase("rounded-1 form_border_focus mb-3")}
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    // // // isClearable={true}
                    // isSearchable={true}
                    value={selectFormValues.department_id}
                    options={departments}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "department_id")
                    }
                    placeholder="Select department..."
                  />
                </div>
              </Col>
              <Col xs={12} md={6} lg={2} xl={2}>
                <div>
                  <Select
                    className={classEase("rounded-1 form_border_focus mb-3")}
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    // // isClearable={true}
                    // // // isSearchable={true}
                    value={selectFormValues.designation_id}
                    options={designations}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "designation_id")
                    }
                    placeholder="Select designation..."
                  />
                </div>
              </Col>
              <Col xs={12} md={6} lg={2} xl={2}>
                <div>
                  <Select
                    className={classEase("rounded-1 form_border_focus mb-3")}
                    classNamePrefix="select"
                    isDisabled={false}
                    isLoading={false}
                    // // isClearable={true}
                    // isSearchable={true}
                    value={selectFormValues.shift_id}
                    options={shifts}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "shift_id")
                    }
                    placeholder="Select shift..."
                  />
                </div>
              </Col>
              <Col xs={12} md={6} lg={2} xl={2}>
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
              <Col xs={12} md={6} lg={2} xl={2}>
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

          <div className="d-flex justify-content-end">
            <div className="me-2">
              <Button
                type="submit"
                className="rounded-1 px-4 btn btn-success border-0"
                onClick={() => handleExportToPDF()}
              >
                PDF
              </Button>
            </div>
            <div className="me-2">
              <Button
                type="submit"
                className="rounded-1 px-4 btn btn-success border-0"
                onClick={() => handleExportToCSV()}
              >
                CSV
              </Button>
            </div>
            <div>
              <Button
                type="submit"
                className="rounded-1 px-4 btn btn-success border-0"
                onClick={() => handleExportToExcel()}
              >
                Excel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="datatable-box">
        <div className="d-flex justify-content-between">
          <div className="">
            {selectedRecords?.length ? (
              <div className="bulk_buttons mb-3">
                <button
                  className="me-3"
                  onClick={() => handleBulkShiftAssign(true)}
                >
                  Bulk Shift Assign
                </button>
                <button className="me-3" onClick={handleBulkGroupAssign}>
                  Bulk Group Assign
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="datatable-wrapper">
          <DataTable
            style={{
              height: apiData?.results?.length === 0 ? "300px" : "auto",
            }}
            className="datatable"
            // withTableBorder
            // withColumnBorders
            // striped
            highlightOnHover
            horizontalSpacing="sm"
            verticalSpacing="sm"
            fz="sm"
            verticalAlign="center"
            columns={[
              {
                title: "SL",
                accessor: "",
                noWrap: true,
                sortable: false,
                render: (_, index) => (currentPage - 1) * pageSize + index + 1,
              },
              {
                accessor: "image",
                title: "Image",
                sortable: false,
                render: ({ image }) => (
                  <div className="text-center">
                    <img
                      src={getStoragePath(image)}
                      alt=""
                      className="table_user_img"
                    />
                  </div>
                ),
              },
              {
                accessor: "employee_id",
                title: "Employee ID",
                noWrap: true,
                sortable: true,
              },
              {
                accessor: "username",
                title: "Employee Name",
                sortable: true,
                // visibleMediaQuery: aboveXs,
              },
              {
                accessor: "designation_name",
                title: "Designation",
                noWrap: true,
                // visibleMediaQuery: aboveXs,
                render: ({ designation_name }) => designation_name || "N/A",
              },
              {
                accessor: "group_name",
                title: "Group",
                // visibleMediaQuery: aboveXs,
                render: ({ group_name }) => group_name || "N/A",
              },
              {
                accessor: "department_name",
                title: "Department",
                // visibleMediaQuery: aboveXs,
                render: ({ department_name }) => department_name || "N/A",
              },
              {
                accessor: "shift_name",
                title: "Shift",
                // visibleMediaQuery: aboveXs,
                render: ({ shift_name }) => shift_name || "N/A",
              },
              {
                accessor: "is_active",
                title: "Status",
                // visibleMediaQuery: aboveXs,
                render: ({ is_active }) => (is_active ? "Active" : "Inactive"),
              },
              {
                accessor: "actions",
                title: "Actions",
                // width: "0%",
                render: (item) => (
                  <EditEmployee employee={item} setData={setDisplayedData} />
                ),
              },
            ]}
            fetching={isLoading}
            records={modifiedData?.results}
            page={currentPage}
            onPageChange={setCurrentPage}
            totalRecords={apiData?.count}
            recordsPerPage={pageSize}
            sortStatus={sortStatus}
            onSortStatusChange={handleSortStatusChange}
            selectedRecords={selectedRecords}
            onSelectedRecordsChange={setSelectedRecords}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}
            // rowExpansion={rowExpansion}
            // onRowContextMenu={handleContextMenu}
            // onScroll={hideContextMenu}
          />
        </div>
      </section>

      <div className="mt-5">
        <form className="" onSubmit={handleFileSubmit}>
          <div className="d-flex align-items-center">
            <div>
              <input
                type="file"
                className="form-control rounded-1 form_border_focus"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <div className="ms-3">
              <Button
                type="submit"
                // className="rounded-1 mt-2 px-4 add_btn_color border-0"
                className={classEase(
                  "d-flex justify-content-center align-items-center form-control form_border_focus rounded-1 theme_color fw-semibold text-white",
                  isUploading ? "loading" : ""
                )}
                disabled={isUploading}
              >
                import
                {isUploading && (
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

              {/* <input
                    type="submit"
                    className="form-control form_border_focus rounded-1 theme_color fw-semibold text-white ms-3"
                    value="import"
                    disabled={isUploading}
                  /> */}
            </div>
            <div className="ms-2 d-flex align-items-center">
              <a className="me-2" href="/csv_file.csv" download="csv_file.csv">
                Sample CSV
              </a>
              <a href="/zip_file.zip" download="zip_file.zip">
                Sample ZIP
              </a>
            </div>
          </div>
        </form>
      </div>

      <BulkShiftAssign
        show={showShiftModal}
        records={selectedRecords}
        setRecords={setSelectedRecords}
        onHide={handleBulkShiftAssign}
      />
    </>
  );
};

export default ManageInfo;
