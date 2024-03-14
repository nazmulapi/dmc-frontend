"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
// import Button from "react-bootstrap/Button";
// import Spinner from "react-bootstrap/Spinner";
import Select from "react-select";
import classEase from "classease";
import { toast } from "react-toastify";
import { DataTable } from "mantine-datatable";
import { Select as MantineSelect } from "@mantine/core";
import { Flex, Group, Button, Tooltip } from "@mantine/core";
import { MdRefresh } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";
import {
  BsFileEarmarkPdf,
  BsFileEarmarkText,
  BsFileEarmarkExcel,
} from "react-icons/bs";

import EditEmployee from "./EditEmployee";
import BulkShiftAssign from "./BulkShiftAssign";
import BulkGroupAssign from "./BulkGroupAssign";
import { submit } from "../../../lib/submit";
import { fetcher } from "../../../lib/fetch";
import { getStoragePath } from "../../../lib/helper";
import { exportToPDF, exportToExcel, exportToCSV } from "../../../lib/export";
import { constants } from "../../../lib/config";
import { getData } from "../../../lib/fetch";

const ManageInfo = () => {
  const { PAGE_SIZES } = constants;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "username",
    direction: "asc",
  });

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

  const [formData, setFormData] = useState({
    group_id: "",
    department_id: "",
    designation_id: "",
    shift_id: "",
    employee_id: "",
  });

  const buildApiUrl = (formData) => {
    const {
      group_id,
      department_id,
      designation_id,
      shift_id,
      employee_id,
      // year,
      // month,
    } = formData;

    return `/employee/?page=${currentPage}&page_size=${pageSize}&employee_id=${employee_id}&group_id=${group_id}&department=${department_id}&designation=${designation_id}&shift_id=${shift_id}&column_accessor=${sortStatus.columnAccessor}&direction=${sortStatus.direction}`;
  };

  const {
    data: apiData,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR(buildApiUrl(formData), fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

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

    const isFormEmpty = Object.values(formValues).every(
      (value) => value === ""
    );
    // if (isFormEmpty) return;
    if (isFormEmpty) {
      setSortStatus({
        columnAccessor: "username",
        direction: "asc",
      });
    }

    setCurrentPage(1);

    setSuccess("");

    setFormData(formValues);
    setIsSubmitLoading(true);
    // setFormSubmitted(true);
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

  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) {
      setDisplayedData(apiData?.results || []);
      console.log(apiData?.results);
    }
  }, [isLoading, isValidating]);

  // file export
  const [isExportDataFetching, setIsExportDataFetching] = useState({
    pdf: false,
    csv: false,
    excel: false,
  });

  const [dataToExport, setDataToExport] = useState(null);

  const getExportDataUrl = (formData) => {
    const {
      group_id, //
      department_id,
      designation_id,
      shift_id,
      employee_id,
    } = formData;

    let url = `/employee/?employee_id=${employee_id}&group_id=${group_id}&department=${department_id}&designation=${designation_id}&shift_id=${shift_id}&column_accessor=${sortStatus.columnAccessor}&direction=${sortStatus.direction}`;

    return url;
  };

  const handleExportToPDF = async (e) => {
    e.preventDefault();
    setIsExportDataFetching((prev) => ({
      ...prev,
      pdf: true,
    }));

    try {
      // let exportedData = dataToExport; // Use cached data if available
      let exportedData = null;

      if (!exportedData) {
        const url = getExportDataUrl(formData);
        const response = await getData(url);
        exportedData = response?.data?.results;
        // Cache the data
        setDataToExport(exportedData);
      }

      const headers = [
        "Employee ID",
        "Employee Name",
        "Designation",
        "Group",
        "Department",
        "Shift",
        "Status",
      ];

      const data = exportedData.map((item) => ({
        ID: item.employee_id,
        username: item.username,
        Designation: item?.designation_name || "N/A",
        Group: item?.group_name || "N/A",
        Department: item?.department_name || "N/A",
        Shift: item?.shift_name || "N/A",
        Status: item?.is_active ? "Active" : "Inactive",
      }));

      setTimeout(() => {
        exportToPDF(headers, data, "employee");
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
      // let exportedData = dataToExport; // Use cached data if available
      let exportedData = null;

      if (!exportedData) {
        const url = getExportDataUrl(formData);
        const response = await getData(url);
        exportedData = response?.data?.results;
        // Cache the data
        setDataToExport(exportedData);
      }

      const data = exportedData.map((item) => ({
        "Employee ID": item.employee_id,
        "Employee Name": item.username,
        Designation: item?.designation_name || "N/A",
        Group: item?.group_name || "N/A",
        Department: item?.department_name || "N/A",
        Shift: item?.shift_name || "N/A",
        Status: item?.is_active ? "Active" : "Inactive",
      }));

      setTimeout(() => {
        exportToCSV(data, "employee");
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
      // let exportedData = dataToExport; // Use cached data if available
      let exportedData = null;

      if (!exportedData) {
        const url = getExportDataUrl(formData);
        const response = await getData(url);
        exportedData = response?.data?.results;
        // Cache the data
        setDataToExport(exportedData);
      }

      const data = exportedData.map((item) => ({
        "Employee ID": item.employee_id,
        "Employee Name": item.username,
        Designation: item?.designation_name || "N/A",
        Group: item?.group_name || "N/A",
        Department: item?.department_name || "N/A",
        Shift: item?.shift_name || "N/A",
        Status: item?.is_active ? "Active" : "Inactive",
      }));

      setTimeout(() => {
        exportToExcel(data, "employee");
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

  const [showShiftModal, setShowShiftModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const handleBulkShiftAssign = (show) => {
    setShowShiftModal(show);
  };

  const handleBulkGroupAssign = (show) => {
    setShowGroupModal(show);
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
              // isSearchable={true}
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
              // isSearchable={true}
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
              // isSearchable={true}
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
              // isSearchable={true}
              value={selectFormValues.shift_id}
              options={shifts}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "shift_id")
              }
              placeholder="Select shift..."
            />
          </div>

          <div className="me-2">
            <input
              type="search"
              id=""
              placeholder="Employee ID or name"
              className="form-control form_border_focus rounded-1"
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
            <Button className="rounded-1 border-0 filter_button" type="submit">
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

            {selectedRecords?.length ? (
              <div className="bulk_buttons">
                <Button
                  classNames={{
                    root: "bulk_edit_btn",
                  }}
                  variant="filled"
                  size="sm"
                  // leftSection={<BsFileEarmarkPdf size={14} />}
                  onClick={() => handleBulkShiftAssign(true)}
                >
                  Bulk Shift Assign
                </Button>
                <Button
                  classNames={{
                    root: "bulk_edit_btn",
                  }}
                  variant="filled"
                  size="sm"
                  // leftSection={<BsFileEarmarkPdf size={14} />}
                  onClick={() => handleBulkGroupAssign(true)}
                >
                  Bulk Group Assign
                </Button>

                {/* <button
                  className="bulk_edit_btn"
                  onClick={() => handleBulkShiftAssign(true)}
                >
                  Bulk Shift Assign
                </button>
                <button
                  className="bulk_edit_btn"
                  onClick={handleBulkGroupAssign}
                >
                  Bulk Group Assign
                </button> */}
              </div>
            ) : (
              ""
            )}
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
              height:
                !apiData?.results || apiData.results.length === 0
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
                  <EditEmployee employee={item} mutate={mutate} />
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
            // recordsPerPageOptions={PAGE_SIZES}
            // onRecordsPerPageChange={setPageSize}
            // rowExpansion={rowExpansion}
            // onRowContextMenu={handleContextMenu}
            // onScroll={hideContextMenu}
          />
        </div>
      </section>

      <BulkShiftAssign
        show={showShiftModal}
        records={selectedRecords}
        setRecords={setSelectedRecords}
        onHide={handleBulkShiftAssign}
        mutate={mutate}
      />

      <BulkGroupAssign
        show={showGroupModal}
        records={selectedRecords}
        setRecords={setSelectedRecords}
        onHide={handleBulkGroupAssign}
        mutate={mutate}
      />
    </>
  );
};

export default ManageInfo;
