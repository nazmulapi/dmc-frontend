"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
// import Button from "react-bootstrap/Button";
import Select from "react-select";
import Spinner from "react-bootstrap/Spinner";
import { Row, Col } from "react-bootstrap";
import classEase from "classease";
import { toast } from "react-toastify";
import { DataTable } from "mantine-datatable";
import { Select as MantineSelect } from "@mantine/core";
import { Flex, Group, Button, Tooltip, Input } from "@mantine/core";
import {
  BsFileEarmarkPdf,
  BsFileEarmarkText,
  BsFileEarmarkExcel,
} from "react-icons/bs";
import { MdRefresh } from "react-icons/md";

import EditEmployee from "./EditEmployee";
import BulkShiftAssign from "./BulkShiftAssign";
import { submit } from "../../../lib/submit";
import { fetcher } from "../../../lib/fetch";
import { getStoragePath } from "../../../lib/helper";
import { exportToPDF, exportToExcel, exportToCSV } from "../../../lib/export";
import { constants } from "../../../lib/config";

const ManageInfo = () => {
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
    </>
  );
};

export default ManageInfo;
