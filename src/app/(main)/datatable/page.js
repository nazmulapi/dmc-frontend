"use client";

import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Group,
  Image,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import useSWR from "swr";
// import { closeAllModals, openModal } from "@mantine/modals";
// import { showNotification } from "@mantine/notifications";
// import {
//   IconClick,
//   IconEdit,
//   IconMessage,
//   IconTrash,
//   IconTrashX,
// } from "@tabler/icons-react";
// import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../lib/fetch";
import { DataTable } from "mantine-datatable";
// import dayjs from "dayjs";
// import { useContextMenu } from "mantine-contextmenu";
import { useCallback, useState } from "react";
// import { getEmployeesAsync } from "~/data/async";
// import classes from "./style.module.css";
import {
  formatDate,
  getDate,
  getTime,
  getStoragePath,
} from "../../../lib/helper";

const PAGE_SIZES = [10, 20, 30, 40];

export default function ComplexUsageExample() {
  // const { showContextMenu, hideContextMenu } = useContextMenu();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "name",
    direction: "asc", // desc
  });

  // const { data, isFetching } = useQuery({
  //   queryKey: [
  //     "employees",
  //     sortStatus.columnAccessor,
  //     sortStatus.direction,
  //     page,
  //   ],
  //   queryFn: () =>
  //     getEmployeesAsync({
  //       recordsPerPage: PAGE_SIZE,
  //       page,
  //       sortStatus,
  //       delay: { min: 300, max: 500 },
  //     }),
  // });

  const {
    data,
    error,
    isValidating,
    isLoading: isFetching,
    mutate,
  } = useSWR(
    `/employee/?page=${page}&page_size=${pageSize}&column_accessor=${sortStatus.columnAccessor}&direction=${sortStatus.direction}`,
    fetcher,
    {
      errorRetryCount: 2,
      keepPreviousData: true,
    }
  );

  console.log(data);

  const [selectedRecords, setSelectedRecords] = useState([]);

  const handleSortStatusChange = (status) => {
    console.log(status);
    setPage(1);
    setSortStatus(status);
  };

  const editRecord = useCallback(({ firstName, lastName }) => {
    console.log({
      withBorder: true,
      title: "Editing record",
      message: `In a real application we could show a popup to edit ${firstName} ${lastName}, but this is just a demo, so we're not going to do that`,
    });
  }, []);

  const deleteRecord = useCallback(({ firstName, lastName }) => {
    console.log({
      withBorder: true,
      color: "red",
      title: "Deleting record",
      message: `Should delete ${firstName} ${lastName}, but we're not going to, because this is just a demo`,
    });
  }, []);

  const deleteSelectedRecords = useCallback(() => {
    console.log({
      withBorder: true,
      color: "red",
      title: "Deleting multiple records",
      message: `Should delete ${selectedRecords.length} records, but we're not going to do that because deleting data is bad... and this is just a demo anyway`,
    });
  }, [selectedRecords.length]);

  const sendMessage = useCallback(({ firstName, lastName }) => {
    console.log({
      withBorder: true,
      title: "Sending message",
      message: `A real application could send a message to ${firstName} ${lastName}, but this is just a demo and we're not going to do that because we don't have a backend`,
      color: "green",
    });
  }, []);

  const renderActions = (record) => (
    <Group gap={4} justify="right" wrap="nowrap">
      <ActionIcon
        size="sm"
        variant="transparent"
        color="green"
        onClick={(e) => {
          e.stopPropagation();
          console.log("Clicked");
          // openModal({
          //   title: `Send message to ${record.firstName} ${record.lastName}`,
          //   classNames: {
          //     header: classes.modalHeader,
          //     title: classes.modalTitle,
          //   },
          //   children: (
          //     <>
          //       <TextInput mt="md" placeholder="Your message..." />
          //       <Group mt="md" gap="sm" justify="flex-end">
          //         <Button
          //           variant="transparent"
          //           c="dimmed"
          //           onClick={() => closeAllModals()}
          //         >
          //           Cancel
          //         </Button>
          //         <Button
          //           color="green"
          //           onClick={() => {
          //             sendMessage(record);
          //             closeAllModals();
          //           }}
          //         >
          //           Send
          //         </Button>
          //       </Group>
          //     </>
          //   ),
          // });
        }}
      >
        Icon
      </ActionIcon>
      <ActionIcon
        size="sm"
        variant="transparent"
        onClick={(e) => {
          e.stopPropagation();
          editRecord(record);
        }}
      >
        Icon
      </ActionIcon>
    </Group>
  );

  const rowExpansion = {
    allowMultiple: true,
    content: ({
      record: { id, sex, firstName, lastName, birthDate, department },
    }) => (
      <Flex p="xs" pl={rem(50)} gap="md" align="center">
        <Image
          radius="sm"
          w={50}
          h={50}
          alt={`${firstName} ${lastName}`}
          src={`https://xsgames.co/randomusers/avatar.php?g=${sex}&q=${id}`}
        />
        <Text size="sm" fs="italic">
          {firstName} {lastName}, born on{" "}
          {dayjs(birthDate).format("MMM D YYYY")}, works in {department.name}{" "}
          department at {department.company.name}.
          <br />
          His office address is {department.company.streetAddress},{" "}
          {department.company.city}, {department.company.state}.
        </Text>
      </Flex>
    ),
  };

  // const now = dayjs();
  const aboveXs = (theme) => `(min-width: ${theme.breakpoints.xs})`;

  const columns = [
    {
      accessor: "image",
      noWrap: true,
      sortable: false,
      render: ({ image }) => (
        <img src={getStoragePath(image)} alt="" className="table_user_img" />
      ),
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
    },
    {
      accessor: "designation_name",
      title: "Designation",
      sortable: true,
      // visibleMediaQuery: aboveXs,
    },
    {
      accessor: "group_name",
      title: "Group",
      noWrap: true,
      // visibleMediaQuery: aboveXs,
    },
    {
      accessor: "department_name",
      title: "Department",
      // visibleMediaQuery: aboveXs,
    },
    {
      accessor: "shift_name",
      title: "Shift",
      // width: 80,
      textAlign: "right",
      sortable: true,
      // render: ({ birthDate }) => now.diff(birthDate, "years"),
      render: ({ birthDate }) => birthDate,
      // visibleMediaQuery: aboveXs,
    },
    {
      accessor: "age",
      title: "Status",
      // width: 80,
      textAlign: "right",
      sortable: true,
      // render: ({ birthDate }) => now.diff(birthDate, "years"),
      render: ({ birthDate }) => birthDate,
      // visibleMediaQuery: aboveXs,
    },
    {
      accessor: "actions",
      title: "Actions",
      // width: "0%",
      render: () => "Edit",
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Employee</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="dashboard">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Employee</li>
            </ul>
          </div>
          <div className="col-auto float-end ms-auto">
            <a
              href="#"
              className="btn add-btn"
              data-bs-toggle="modal"
              data-bs-target="#add_employee"
            >
              <i className="fa fa-plus"></i> Add Employee
            </a>
            <div className="view-icons">
              <a href="employees" className="grid-view btn btn-link">
                <i className="fa fa-th"></i>
              </a>
              <a
                href="employees_list"
                className="list-view btn btn-link active"
              >
                <i className="fa fa-bars"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row filter-row">
        <div className="col-sm-6 col-md-3">
          <div className="form-group form-focus focused">
            <input type="text" className="form-control floating" />
            <label className="focus-label">Employee ID</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="form-group form-focus focused">
            <input type="text" className="form-control floating" />
            <label className="focus-label">Employee Name</label>
          </div>
        </div>
        <div
          className="col-sm-6 col-md-3"
          data-select2-id="select2-data-24-qt9o"
        >
          <div
            className="form-group custom-select"
            data-select2-id="select2-data-23-6r2j"
          >
            <select
              className="select floating select2-hidden-accessible"
              data-select2-id="select2-data-1-nkfm"
              tabindex="-1"
              aria-hidden="true"
            >
              <option data-select2-id="select2-data-3-duym">
                Select Designation
              </option>
              <option data-select2-id="select2-data-26-cyc0">
                Web Developer
              </option>
              <option data-select2-id="select2-data-27-nbj8">
                Web Designer
              </option>
              <option data-select2-id="select2-data-28-w5h9">
                Android Developer
              </option>
              <option data-select2-id="select2-data-29-xlhe">
                Ios Developer
              </option>
            </select>
            <span
              className="select2 select2-container select2-container--default select2-container--below"
              dir="ltr"
              data-select2-id="select2-data-2-t3f0"
              style={{ width: "100%" }}
            >
              <span className="selection">
                <span
                  className="select2-selection select2-selection--single"
                  role="combobox"
                  aria-haspopup="true"
                  aria-expanded="false"
                  tabindex="0"
                  aria-disabled="false"
                  aria-labelledby="select2-3n26-container"
                  aria-controls="select2-3n26-container"
                >
                  <span
                    className="select2-selection__rendered"
                    id="select2-3n26-container"
                    role="textbox"
                    aria-readonly="true"
                    title="Web Developer"
                  >
                    Web Developer
                  </span>
                  <span
                    className="select2-selection__arrow"
                    role="presentation"
                  >
                    <b role="presentation"></b>
                  </span>
                </span>
              </span>
              <span className="dropdown-wrapper" aria-hidden="true"></span>
            </span>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <a href="#" className="btn btn-success w-100">
            {" "}
            Search{" "}
          </a>
        </div>
      </div>

      <DataTable
        // height={400}
        // withTableBorder
        highlightOnHover
        // borderRadius="sm"
        // withColumnBorders
        striped
        verticalAlign="top"
        // pinLastColumn
        columns={columns}
        fetching={isFetching}
        records={data?.results || []}
        page={page}
        onPageChange={setPage}
        totalRecords={data?.count}
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
    </>
  );
}
