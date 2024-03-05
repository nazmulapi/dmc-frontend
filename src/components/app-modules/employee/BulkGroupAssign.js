"use client";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import useSWR from "swr";
import { FaRegEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { fetcher } from "../../../lib/fetch";
import { submit } from "../../../lib/submit";

const EditModal = ({ show, onHide, records, setRecords, mutate }) => {
  const [formValues, setFormValues] = useState({
    // id: item.id,
    group_id: "",
    employee_id_list: [],
  });

  useEffect(() => {
    if (records && records.length > 0) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        employee_id_list: records.map((record) => record.id),
      }));
    }
  }, [records]);

  useEffect(() => {
    console.log(records);
  }, [show]);

  const [selectFormValues, setSelectFormValues] = useState({
    group_id: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  // useEffect(() => {
  //   setFormValues((prev) => ({
  //     ...prev,
  //     id: item.id,
  //     designation: item.designation,
  //     description: item.description,
  //   }));
  // }, [item]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (
      !formValues.group_id ||
      (typeof formValues.group_id === "string" && !formValues.group_id.trim())
    ) {
      newErrors.group_id = "Group ID is required";
      valid = false;
    }
    setErrors(newErrors);

    return valid;
  };

  const handleInputChange = (e) => {
    setSuccess("");

    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");

    // console.log(formValues);
    // return;

    const valid = validateForm();

    if (valid) {
      setIsLoading(true);

      const response = await submit(
        `/empgrp/assign-group/${formValues.group_id}/`,
        formValues
      );

      // console.log(response);
      // return;

      if (response?.message?.success_empid?.length) {
        console.log("Success");

        setTimeout(() => {
          // setItem((prevData) =>
          //   prevData.map((i) => (i.id === formValues.id ? formValues : i))
          // );
          setSuccess("Groups updated successfully");
          setIsLoading(false);
          setRecords([]);
          // setErrors({});
          // setFormValues(initialValues);
          mutate();
        }, 1000);
      } else {
        setTimeout(() => {
          setSuccess("Something went wrong!");
          setIsLoading(false);
          // setErrors({});
          // setFormValues(initialValues);
        }, 1000);
      }
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Bulk Group Assign
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-2">
            <div className="mb-2">
              Group <span className="text-danger"> *</span>
            </div>
            <Select
              className={classEase(
                "rounded-1 form_border_focus",
                errors.group_id && "is-invalid"
              )}
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
            />
            {errors.group_id && (
              <div className="invalid-feedback">{errors.group_id}</div>
            )}
          </div>

          {success && success !== "" && (
            <div className="success-feedback mb-3">{success}</div>
          )}

          <Button
            type="submit"
            className={classEase(
              "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button",
              isLoading ? "loading" : ""
            )}
            disabled={isLoading}
          >
            Submit
            {isLoading && (
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
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
          <Button>Edit</Button>
        </Modal.Footer> */}
    </Modal>
  );
};

export default EditModal;
