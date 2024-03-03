"use client";

import React, { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Select from "react-select";
import { FaRegEdit } from "react-icons/fa";
import { RiFileExcel2Line } from "react-icons/ri";
import {
  BsFileEarmarkPdf,
  BsFileEarmarkText,
  BsFileEarmarkExcel,
} from "react-icons/bs";
import classEase from "classease";
import { DataTable } from "mantine-datatable";
import { Select as MantineSelect } from "@mantine/core";
import { Flex, Group, Button, Tooltip } from "@mantine/core";
import { toast } from "react-toastify";
// import Pagination from "../../utils/Pagination";
import { fetcher } from "../../../lib/fetch";
import { getDate, getTime } from "../../../lib/helper";
import { exportToPDF, exportToExcel, exportToCSV } from "../../../lib/export";
import { constants } from "../../../lib/config";
import { getData } from "../../../lib/fetch";

const ManageInfo = () => {
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
    `/log/raw_log/?date=${formData.year}-${formData.month}&employee_id=${formData.employee_id}&group_id=${formData.group_id}&department_id=${formData.department_id}&designation_id=${formData.designation_id}&page=${currentPage}&page_size=${pageSize}&column_accessor=${sortStatus.columnAccessor}&direction=${sortStatus.direction}`,
    fetcher,
    {
      errorRetryCount: 2,
      keepPreviousData: true,
    }
  );

  const handleSortStatusChange = (status) => {
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

    setFormData(formValues);
    setIsSubmitLoading(true);
    setFormSubmitted(true);
  };

  // const handlePageChange = (newPage) => {
  //   if (newPage >= 1) {
  //     setCurrentPage(newPage);
  //   }
  // };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    mutate();
  };

  const [employeeData, setEmployeeData] = useState([]);

  // useEffect(() => {
  //   if (!isLoading && !error) {
  //     console.log(apiData?.results);
  //     setEmployeeData(apiData?.results || []);
  //     console.log(apiData?.results);
  //   }
  // }, [isLoading, isValidating]);

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
        const url = `/log/raw_log/?date=${formData.year}-${formData.month}`;
        const response = await getData(url);
        exportedData = response?.data?.results;
        setDataToExport(exportedData);
      }

      const headers = [
        "Employee ID",
        "Employee Name",
        "Device",
        "Date",
        "Time",
        "Type",
      ];

      const data = exportedData.map((item) => ({
        ID: item.employee_id,
        username: item.CardName,
        Device: item?.device_id || "N/A",
        Date: getDate(item.InTime),
        Time: getTime(item.InTime),
        Type: item.Type,
      }));

      setTimeout(() => {
        exportToPDF(headers, data, "attendance-raw-data");
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
        const url = `/log/raw_log/?date=${formData.year}-${formData.month}`;
        const response = await getData(url);
        exportedData = response?.data?.results;
        // Cache the data
        setDataToExport(exportedData);
      }

      const data = exportedData.map((item) => ({
        "Employee ID": item.employee_id,
        "Employee Name": item.CardName,
        Device: item?.device_id || "N/A",
        Date: getDate(item.InTime),
        Time: getTime(item.InTime),
        Type: item.Type,
      }));

      setTimeout(() => {
        exportToCSV(data, "attendance-raw-data");
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
        const url = `/log/raw_log/?date=${formData.year}-${formData.month}`;
        const response = await getData(url);
        exportedData = response?.data?.results;
        // Cache the data
        setDataToExport(exportedData);
      }

      const data = exportedData.map((item) => ({
        "Employee ID": item.employee_id,
        "Employee Name": item.username,
        Device: item?.device_id || "N/A",
        Date: getDate(item.InTime),
        Time: getTime(item.InTime),
      }));

      setTimeout(() => {
        exportToExcel(data, "attendance-raw-data");
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
        <h3 className="page-title text-capitalize">Attendance Raw Data</h3>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">Raw Data</li>
        </ul>
      </div>

      <form
        className="d-flex justify-content-between filter_form"
        onSubmit={handleFormSubmit}
      >
        <div className="d-flex justify-content-start flex-wrap">
          <div className="me-2">
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

          <div className="me-2">
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

          <div className="me-2">
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

          <div className="me-2">
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

          <div className="me-2">
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

          <div className="me-2">
            <input
              type="search"
              id=""
              placeholder="Employee ID"
              className="form-control form_border_focus rounded-1 mb-3"
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  employee_id: e.target.value,
                }))
              }
            />
          </div>

          <Tooltip
            arrowOffset={"calc(50% - 2px)"}
            arrowSize={4}
            label="Apply"
            withArrow
            position="top"
          >
            <Button
              className="rounded-1 border-0 filter_button mb-3"
              type="submit"
            >
              {/* <MdRefresh /> */}
              Filter
            </Button>
          </Tooltip>
        </div>
      </form>

      <section className="datatable-box">
        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex justify-content-start align-items-center">
            <Flex
              gap="7"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <span>Show</span>
              <MantineSelect
                className="records_per_page"
                data={["10", "20", "30", "40"]}
                value={pageSize.toString()}
                onChange={(_value, option) => handlePageSizeChange(_value)}
                withCheckIcon={false}
              />
              <span>entries</span>
            </Flex>
          </div>
          <div className="">
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
        </div>

        <div className="datatable-wrapper">
          <DataTable
            style={{
              height: apiData?.results?.length === 0 ? "300px" : "auto",
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
      </section>
    </>
  );
};

export default ManageInfo;
