"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBin6Line } from "react-icons/ri";
import EditEmployee from "./EditEmployee";
// import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Row, Col } from "react-bootstrap";
import classEase from "classease";
import { toast } from "react-toastify";
import { submit } from "../../../lib/submit";
import { fetcher } from "../../../lib/fetch";
import Pagination from "../../utils/Pagination";
import {
  formatDate,
  getDate,
  getTime,
  getStoragePath,
} from "../../../lib/helper";
import { exportToPDF, exportToExcel, exportToCSV } from "../../../lib/export";

const ManageInfo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // const { data, error, isLoading } = useSWR(
  //   `/employee/?page=${currentPage}&page_size=${itemsPerPage}`,
  //   fetcher
  // );
  const {
    data: apiData,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR(`/employee/?page=${currentPage}&page_size=${pageSize}`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(apiData?.count / pageSize);
  // const displayedData = apiData && apiData?.results;

  // const isLoading = isValidating && displayedData.length === 0;

  // const totalPages = Math.ceil(data?.length / pageSize);

  // const { data, error, isLoading } = useSWR(`/employee/`, fetcher);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // const displayedData = data?.slice(startIndex, endIndex);

  // const totalPages = Math.ceil((data?.length || 0) / pageSize);

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
      "Shift",
      "Designation",
      "Status",
    ];

    const data = displayedData.map((item) => ({
      ID: item.employee_id,
      username: item.username,
      Shift: item?.shift_name || "N/A",
      Designation: item?.designation_name || "N/A",
      Status: item?.is_active ? "Active" : "Inactive",
    }));

    exportToPDF(headers, data, "employee");
  };

  const handleExportToCSV = () => {
    const data = displayedData.map((item) => ({
      "Employee ID": item.employee_id,
      "Employee Name": item.username,
      Shift: item?.shift_name || "N/A",
      Designation: item?.designation_name || "N/A",
      Status: item?.is_active ? "Active" : "Inactive",
    }));

    exportToCSV(data, "employee");
  };

  const handleExportToExcel = () => {
    const data = displayedData.map((item) => ({
      "Employee ID": item.employee_id,
      "Employee Name": item.username,
      Shift: item?.shift_name || "N/A",
      Designation: item?.designation_name || "N/A",
      Status: item?.is_active ? "Active" : "Inactive",
    }));

    exportToExcel(data, "employee");
  };

  return (
    <>
      <section>
        <div className="search_part border mb-3">
          <div className="d-flex justify-content-between p-2">
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
                  <a
                    className="me-2"
                    href="/csv_file.csv"
                    download="csv_file.csv"
                  >
                    Sample CSV
                  </a>
                  <a href="/zip_file.zip" download="zip_file.zip">
                    Sample ZIP
                  </a>
                </div>
              </div>
            </form>

            <div className="d-flex justify-content-between">
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
        <div className="employee_table table-responsive">
          <table className="table table-bordered table-striped font_14">
            <thead>
              <tr>
                {/* <th scope="col">
                  <div className="form-check p-0">
                    <input
                      className=""
                      type="checkbox"
                      value=""
                      id="EmployeeListAllCheckbox"
                    />
                  </div>
                </th> */}
                <th scope="col">SL</th>
                <th scope="col">image</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Group</th>
                <th scope="col">Department</th>
                <th scope="col">Shift</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr>
                  <td colSpan={10}>Failed to load</td>
                </tr>
              )}

              {displayedData && !error
                ? displayedData.map((item, index) => (
                    <tr key={index}>
                      {/* <th scope="row">
                        <div className="form-check p-0">
                          <input
                            className=""
                            type="checkbox"
                            value=""
                            id={item.employee_id}
                          />
                        </div>
                      </th> */}
                      <th scope="row">{startIndex + index + 1}</th>
                      <th scope="row" className="text-center">
                        <img
                          src={getStoragePath(item?.image)}
                          alt=""
                          className="table_user_img"
                        />
                      </th>
                      <td>{item.employee_id}</td>
                      <td>{item.username}</td>
                      <td>{item?.designation_name || "N/A"}</td>
                      <td>{item?.group_name || "N/A"}</td>
                      <td>{item?.department_name || "N/A"}</td>
                      <td>{item?.shift_name || "N/A"}</td>
                      <td>{item?.is_active ? "Active" : "Inactive"}</td>
                      <td>
                        {/* {console.log(item)} */}
                        <EditEmployee
                          employee={item}
                          setData={setDisplayedData}
                        />

                        {/* <button className="bg-danger border-0 rounded-1">
                        <RiDeleteBin6Line color="white" />
                      </button> */}
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>

          {/* {isLoading && (
            <div className="loading-overlay">
              <p>Loading...</p>
            </div>
          )} */}

          {/* {isValidating && (
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

export default ManageInfo;
