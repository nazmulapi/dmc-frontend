"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import BSButton from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { Flex, Group, Button, Input, CloseButton } from "@mantine/core";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line, RiFileExcel2Line } from "react-icons/ri";
import { BsFileEarmarkPdf, BsFileEarmarkText } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import classEase from "classease";
import { DataTable } from "mantine-datatable";
import { toast } from "react-toastify";
import { fetcher } from "../../../lib/fetch";
import { deleteItem } from "../../../lib/submit";
import { sortBy } from "../../../lib/helper";
import { exportToPDF, exportToExcel, exportToCSV } from "../../../lib/export";
import { getData } from "../../../lib/fetch";
import EditDepartment from "./EditDepartment";

const DepartmentManager = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "department",
    direction: "asc",
  });

  const { error, isLoading } = useSWR(`/department/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    onSuccess: (fetchedData) => {
      // Update local state when data is successfully fetched
      setData(sortBy(fetchedData, "department"));
    },
  });

  useEffect(() => {
    const sorted = sortBy(data, sortStatus.columnAccessor);
    setData(sortStatus.direction === "desc" ? sorted.reverse() : sorted);
  }, [sortStatus]);

  const filteredData = data
    ? data.filter((item) =>
        item.department.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  // Function to handle delete button click
  const handleDelete = async (department) => {
    setDeleting(true);
    try {
      // Perform delete action using API or other methods
      // For example, by making a DELETE request
      const res = await deleteItem(`/department/${department.id}/`);
      if (!res?.error) {
        setData((prevData) =>
          prevData.filter((item) => item.id !== department.id)
        );
        setShow(false);
        setDeleting(false);
        toast.success(res?.message || "Department deleted successfully");
      } else {
        setShow(false);
        setDeleting(false);
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Delete failed", error);
      setShow(false);
      setDeleting(false);
      toast.error("Something went wrong!");
    }
  };

  // file export
  const [isExportDataFetching, setIsExportDataFetching] = useState({
    pdf: false,
    csv: false,
    excel: false,
  });

  const [dataToExport, setDataToExport] = useState(null);

  const handleExportToPDF = async (e) => {
    e.preventDefault();
    setIsExportDataFetching((prev) => ({
      ...prev,
      pdf: true,
    }));

    try {
      let exportedData = dataToExport; // Use cached data if available

      if (!exportedData) {
        const url = `/department/`;
        const response = await getData(url);
        exportedData = response?.data;
        // Cache the data
        setDataToExport(exportedData);
      }

      const headers = ["SL", "Department Title", "Department Details"];

      const data = exportedData.map((item, index) => ({
        sl: index + 1,
        department: item?.department || "",
        description: item?.description || "",
      }));

      setTimeout(() => {
        exportToPDF(headers, data, "departments");
        setIsExportDataFetching((prev) => ({
          ...prev,
          pdf: false,
        }));
      }, 1000);
    } catch (error) {
      console.error("Error exporting data to PDF:", error);
      // Handle error
      setTimeout(() => {
        setIsExportDataFetching((prev) => ({
          ...prev,
          pdf: false,
        }));
        toast.error("Failed to export!");
      }, 1000);
    }
  };

  const handleExportToCSV = async (e) => {
    e.preventDefault();
    setIsExportDataFetching((prev) => ({
      ...prev,
      csv: true,
    }));

    try {
      let exportedData = dataToExport; // Use cached data if available

      if (!exportedData) {
        const url = `/department/`;
        const response = await getData(url);
        exportedData = response?.data;
        // Cache the data
        setDataToExport(exportedData);
      }

      const data = exportedData.map((item, index) => ({
        SL: index + 1,
        "Department Title": item?.department || "",
        "Department Details": item?.description || "",
      }));

      setTimeout(() => {
        exportToCSV(data, "departments");
        setIsExportDataFetching((prev) => ({
          ...prev,
          csv: false,
        }));
      }, 1000);
    } catch (error) {
      console.error("Error exporting data to CSV:", error);
      setTimeout(() => {
        setIsExportDataFetching((prev) => ({
          ...prev,
          csv: false,
        }));
        toast.error("Failed to export!");
      }, 1000);
    }
  };

  const handleExportToExcel = async (e) => {
    e.preventDefault();
    setIsExportDataFetching((prev) => ({
      ...prev,
      excel: true,
    }));

    try {
      let exportedData = dataToExport; // Use cached data if available

      if (!exportedData) {
        const url = `/department/`;
        const response = await getData(url);
        // console.log(response);
        // return;
        exportedData = response?.data;
        // Cache the data
        setDataToExport(exportedData);
      }

      // console.log(exportedData);

      const data = exportedData.map((item, index) => ({
        SL: index + 1,
        "Department Title": item?.department || "",
        "Department Details": item?.description || "",
      }));

      setTimeout(() => {
        exportToExcel(data, "departments");
        setIsExportDataFetching((prev) => ({
          ...prev,
          excel: false,
        }));
      }, 1000);
    } catch (error) {
      console.error("Error exporting data to Excel:", error);
      setTimeout(() => {
        setIsExportDataFetching((prev) => ({
          ...prev,
          excel: false,
        }));
        toast.error("Failed to export!");
      }, 1000);
    }
  };

  return (
    <>
      <div className="page-top">
        <h3 className="page-title text-capitalize">Departments</h3>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">Departments</li>
        </ul>
      </div>

      <section className="datatable-box">
        <div className="d-flex justify-content-between mb-4">
          <div className="">
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <Input
                  leftSection={<GoSearch size={16} />}
                  placeholder="Search with name.."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.currentTarget.value)}
                  rightSectionPointerEvents="all"
                  rightSection={
                    <CloseButton
                      aria-label="Clear input"
                      onClick={() => setSearchQuery("")}
                      style={{ display: searchQuery ? undefined : "none" }}
                    />
                  }
                />
              </div>
            </div>
          </div>
          <Group justify="center" gap="xs">
            <Button
              styles={{
                section: {
                  marginRight: 5,
                },
              }}
              variant="filled"
              size="sm"
              leftSection={<BsFileEarmarkPdf size={14} />}
              onClick={(e) => handleExportToPDF(e)}
              loading={isExportDataFetching?.pdf}
              loaderProps={{ type: "dots" }}
            >
              PDF
            </Button>

            <Button
              styles={{
                section: {
                  marginRight: 5,
                },
              }}
              variant="filled"
              size="sm"
              leftSection={<BsFileEarmarkText size={14} />}
              onClick={(e) => handleExportToCSV(e)}
              loading={isExportDataFetching?.csv}
              loaderProps={{ type: "dots" }}
            >
              CSV
            </Button>

            <Button
              styles={{
                section: {
                  marginRight: 5,
                },
              }}
              variant="filled"
              size="sm"
              leftSection={<RiFileExcel2Line size={14} />}
              onClick={(e) => handleExportToExcel(e)}
              loading={isExportDataFetching?.excel}
              loaderProps={{ type: "dots" }}
            >
              Excel
            </Button>
          </Group>
        </div>

        <div className="datatable-wrapper">
          <DataTable
            style={{ height: filteredData.length === 0 ? "300px" : "auto" }}
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
                accessor: "id",
                title: "Department ID",
                // render: (_, index) => index + 1,
              },
              {
                accessor: "department",
                title: "Department Name",
                sortable: true,
                // width: 150
              },
              {
                accessor: "description",
                title: "Description",
                sortable: true,
                // width: 150
              },

              {
                accessor: "actions",
                title: "Actions",
                // width: "0%",
                render: (item) => (
                  <>
                    <EditDepartment item={item} setItem={setData} />
                    <button
                      className="bg-transparent border-0 px-1 py-0 m-0 btn btn-primary"
                      onClick={() => {
                        setSelectedDepartment(item);
                        setShow(true);
                      }}
                    >
                      <RiDeleteBin6Line color="#DB3545" />
                    </button>
                  </>
                ),
              },
            ]}
            fetching={isLoading}
            records={filteredData}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
          />
        </div>
      </section>

      {/* <div className="employee_table table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">SL</th>
                <th scope="col">Department</th>
                <th scope="col">Department Details</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr>
                  <td colSpan={4}>Failed to load</td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td colSpan={4}>Loading...</td>
                </tr>
              )}

              {filteredData?.length ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.department}</td>
                    <td>{item.description}</td>
                    <td>
                      <EditDepartment item={item} setItem={setData} />

                      <button
                        className="border-0 rounded-1"
                        onClick={() => {
                          setSelectedDepartment(item);
                          setShow(true);
                        }}
                      >
                        <RiDeleteBin6Line color="#DB3545" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {!isLoading && (
                    <tr>
                      <td colSpan={4}>No data found!</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="pt-2">Are you sure want to delete?</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <BSButton
            onClick={() => {
              setSelectedDepartment(null);
              setShow(false);
            }}
            variant="success"
            className={classEase(
              "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button"
            )}
          >
            Cancel
          </BSButton>
          <BSButton
            onClick={() => {
              handleDelete(selectedDepartment);
            }}
            variant="success"
            className={classEase(
              "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button",
              deleting ? "loading" : ""
            )}
            disabled={deleting}
          >
            Delete
            {deleting && (
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
          </BSButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DepartmentManager;
