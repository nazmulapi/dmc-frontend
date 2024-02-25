"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { DataTable } from "mantine-datatable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { RiDeleteBin6Line } from "react-icons/ri";
import classEase from "classease";
import { toast } from "react-toastify";
import { fetcher } from "../../../lib/fetch";
import { deleteItem } from "../../../lib/submit";
import { sortBy } from "../../../lib/helper";
import EditDevice from "./EditDevice";

const DeviceManager = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "device_name",
    direction: "asc",
  });

  const [data, setData] = useState([]);

  const { error, isLoading } = useSWR(`/devices/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    onSuccess: (fetchedData) => {
      // Update local state when data is successfully fetched
      setData(sortBy(fetchedData, "device_name"));
    },
  });

  useEffect(() => {
    const sorted = sortBy(data, sortStatus.columnAccessor);
    setData(sortStatus.direction === "desc" ? sorted.reverse() : sorted);
  }, [sortStatus]);

  const filteredData = data
    ? data.filter(
        (item) =>
          item.device_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.device_ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.device_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  // Function to handle delete button click
  const handleDelete = async (device) => {
    setDeleting(true);
    try {
      // Perform delete action using API or other methods
      // For example, by making a DELETE request
      const res = await deleteItem(`/devices/${device.device_id}/`);
      if (!res?.error) {
        setData((prevData) =>
          prevData.filter((item) => item.device_id !== device.device_id)
        );
        setShow(false);
        setDeleting(false);
        toast.success(res?.message || "Device deleted successfully");
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

  return (
    <>
      <div className="page-top">
        <h3 className="page-title text-capitalize">Devices</h3>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">Devices</li>
        </ul>
      </div>

      <div className="search_part mb-3">
        <div className="d-flex justify-content-between py-2">
          <div className="">
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <input
                  type="search"
                  id="device_search"
                  className="form-control form_border_focus"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* <div className="d-flex justify-content-between">
              <div className="me-2">
                <Button
                  type="submit"
                  className="rounded-1 px-4 add_btn_color border-0"
                >
                  PDF
                </Button>
              </div>
              <div className="me-2">
                <Button
                  type="submit"
                  className="rounded-1 px-4 add_btn_color border-0"
                >
                  CSV
                </Button>
              </div>
              <div>
                <Button
                  type="submit"
                  className="rounded-1 px-4 add_btn_color border-0"
                >
                  Excel
                </Button>
              </div>
            </div> */}
        </div>
      </div>

      <section className="datatable-box">
        <div className="datatable-wrapper">
          <DataTable
            style={{ height: filteredData.length === 0 ? "300px" : "auto" }}
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
                accessor: "",
                title: "SL",
                render: (_, index) => index + 1,
              },
              {
                accessor: "device_id",
                title: "Device ID",
                sortable: true,
                // width: 150
              },
              {
                accessor: "device_ip",
                title: "Device IP",
                sortable: true,
                // width: 150
              },
              {
                accessor: "device_name",
                title: "Device Name",
                sortable: true,
                // width: 150
              },
              {
                accessor: "username",
                title: "Device Username",
                sortable: true,
                // width: 150
              },
              {
                accessor: "password",
                title: "Device Password",
              },
              {
                accessor: "location",
                title: "Location",
              },
              {
                accessor: "active_status",
                title: "Status",
                render: (item) =>
                  item?.active_status === "active" ? "Active" : "Inactive",
              },
              {
                accessor: "actions",
                title: "Actions",
                // width: "0%",
                render: (item) => (
                  <button
                    className="border-0 rounded-1"
                    onClick={() => {
                      setSelectedDevice(item);
                      setShow(true);
                    }}
                  >
                    <RiDeleteBin6Line color="#DB3545" />
                  </button>
                ),
              },
            ]}
            fetching={isLoading}
            records={filteredData}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
          />
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4 className="pt-2">Are you sure want to delete?</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button
              onClick={() => {
                setSelectedDevice(null);
                setShow(false);
              }}
              variant="success"
              className={classEase(
                "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button"
              )}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDelete(selectedDevice);
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
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
};

export default DeviceManager;
