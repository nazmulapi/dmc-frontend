"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DataTable } from "mantine-datatable";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { toast } from "react-toastify";
import { Button } from "@mantine/core";
import { uploadCSV } from "../../../lib/submit";

const ManageInfo = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [didUploadedOperation, setDidUploadedOperation] = useState(false);
  // const [validationError, setValidationError] = useState("");
  const [failedEmployees, setFailedEmployees] = useState([]);
  const [successfulEmployees, setSuccessfulEmployees] = useState([]);

  const handleFileChange = (event) => {
    // setValidationError(null);
    const files = event.target.files;
    // Convert files to an array
    const filesArray = Array.from(files);
    setUploadedFiles(filesArray);
  };

  const validateFiles = () => {
    let invalid = false;

    // Basic validation: Check if exactly two files are selected
    if (uploadedFiles.length !== 2) {
      invalid =
        "Please select exactly two files: 'zip_file.zip' and 'csv_file.csv'.";
      return invalid;
    }

    // Validate file names
    const fileNames = uploadedFiles.map((file) => file.name);
    const requiredFileNames = ["zip_file.zip", "csv_file.csv"];

    for (const requiredFileName of requiredFileNames) {
      if (!fileNames.includes(requiredFileName)) {
        invalid = `Missing required file: ${requiredFileName}`;
        break;
      }
    }

    return invalid;
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    // setFailedEmployees([]);
    // setSuccessfulEmployees([]);
    // setUploadingSuccess("");
    setIsUploading(true);

    const invalid = validateFiles();

    if (invalid !== false) {
      setIsUploading(false);
      toast.error(invalid);
    } else {
      const formData = new FormData();

      uploadedFiles.forEach((file) => {
        const key = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        formData.append(key, file);
      });

      // console.log("Form data", formData);

      // return;

      const response = await uploadCSV("/employee_csv/", formData, true);

      console.log(response);
      setIsUploading(false);
      setDidUploadedOperation(true);
      // return;

      if (response?.succeeded_employee_id?.length) {
        setSuccessfulEmployees(response?.succeeded_employee_id);
      } else {
        setSuccessfulEmployees([]);
      }

      if (response?.failed_employee_id?.length) {
        setFailedEmployees(response?.failed_employee_id);
      } else {
        setFailedEmployees([]);
      }

      if (response?.error) {
        toast.error(response?.message);
      } else if (response?.status === 201) {
        toast.success("Files uploaded successfully");
      }

      // else if (response?.status === 400) {
      //   toast.error("Failed to upload files");
      // }

      // if (response?.uploaded) {
      //   toast.success("CSV and ZIP uploaded successfully");
      //   // setSuccess("Employee created successfully");
      //   // setIsLoading(false);
      //   // setErrors({});
      //   // setFormValues(initialValues);
      // } else {
      //   toast.error(response?.message || "Something went wrong!");
      //   // setSuccess("Something went wrong!");
      //   // setIsLoading(false);
      //   // setErrors({});
      //   // setFormValues(initialValues);
      // }
    }
  };

  return (
    <>
      <div className="page-top">
        <h3 className="page-title text-capitalize">Uplaod CSV</h3>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">Uplaod CSV</li>
        </ul>
      </div>

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

      {didUploadedOperation && (
        <>
          <div className="mt-5">
            <h4>Successful Employees</h4>
            {successfulEmployees.length > 0 ? (
              <div className="datatable-box">
                <div className="datatable-wrapper">
                  <DataTable
                    style={{
                      height:
                        !successfulEmployees || successfulEmployees.length === 0
                          ? "300px"
                          : "auto",
                    }}
                    classNames={{
                      root: "datatable",
                      table: "datatable_table",
                      header: "datatable_header",
                      pagination: "datatable_pagination",
                    }}
                    borderColor="#e0e6ed66"
                    rowBorderColor="#e0e6ed66"
                    c={{ dark: "#ffffff", light: "#0E1726" }}
                    highlightOnHover
                    horizontalSpacing="sm"
                    verticalSpacing="sm"
                    fz="sm"
                    verticalAlign="center"
                    columns={[
                      {
                        title: "#",
                        accessor: "",
                        noWrap: true,
                        sortable: false,
                        render: (_, index) => index + 1,
                      },
                      {
                        accessor: "employee_id",
                        title: "Employee ID",
                      },
                      {
                        accessor: "username",
                        title: "Employee Name",
                      },
                      {
                        accessor: "email",
                        title: "Email",
                        render: ({ email }) => email || "N/A",
                      },
                      {
                        accessor: "password",
                        title: "Password",
                        render: ({ password }) => password || "N/A",
                      },
                      {
                        accessor: "phone_number",
                        title: "Phone Number",
                        render: ({ phone_number }) => phone_number || "N/A",
                      },
                    ]}
                    records={successfulEmployees}
                    totalRecords={successfulEmployees?.length}
                  />
                </div>
              </div>
            ) : (
              <p>No records found</p>
            )}
          </div>

          <div className="mt-5">
            <h4 className="mb-2">Failed Employees</h4>
            {failedEmployees.length > 0 ? (
              <div className="datatable-box">
                <div className="datatable-wrapper">
                  <DataTable
                    style={{
                      height:
                        !failedEmployees || failedEmployees.length === 0
                          ? "300px"
                          : "auto",
                    }}
                    classNames={{
                      root: "datatable",
                      table: "datatable_table",
                      header: "datatable_header",
                      pagination: "datatable_pagination",
                    }}
                    borderColor="#e0e6ed66"
                    rowBorderColor="#e0e6ed66"
                    c={{ dark: "#ffffff", light: "#0E1726" }}
                    highlightOnHover
                    horizontalSpacing="sm"
                    verticalSpacing="sm"
                    fz="sm"
                    verticalAlign="center"
                    columns={[
                      {
                        title: "#",
                        accessor: "",
                        noWrap: true,
                        sortable: false,
                        render: (_, index) => index + 1,
                      },
                      {
                        accessor: "employee_id",
                        title: "Employee ID",
                      },
                      {
                        accessor: "username",
                        title: "Employee Name",
                      },
                      {
                        accessor: "email",
                        title: "Email",
                        render: ({ email }) => email || "N/A",
                      },
                      {
                        accessor: "password",
                        title: "Password",
                        render: ({ password }) => password || "N/A",
                      },
                      {
                        accessor: "phone_number",
                        title: "Phone Number",
                        render: ({ phone_number }) => phone_number || "N/A",
                      },
                    ]}
                    records={failedEmployees}
                    totalRecords={failedEmployees?.length}
                  />
                </div>
              </div>
            ) : (
              <p>No records found</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ManageInfo;
