"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetch";
import { submit } from "../../../lib/submit";

function MyVerticallyCenteredModal({ show, onHide, employee, setData }) {
  // console.log(employee.is_active);
  const [empId, setEmpId] = useState(employee.employee_id);

  const [formValues, setFormValues] = useState({
    shift_id: employee.shift_id,
    is_active: Boolean(employee.is_active),
  });

  const [selectFormValues, setSelectFormValues] = useState({
    shift_id: "",
  });

  // useEffect(() => {
  //   setFormValues();
  // }, []);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // console.log(formValues);

    if (
      !formValues.shift_id ||
      (typeof formValues.shift_id === "string" && !formValues.shift_id.trim())
    ) {
      newErrors.shift_id = "Shift ID is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
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

  const handleInputChange = (e) => {
    // e.preventDefault();
    setSuccess("");

    // const { name, value } = e.target;
    const { name, value, type, files } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    if (type === "checkbox") {
      setFormValues((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
    } else if (type === "file") {
      setFormValues((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    const valid = validateForm();

    // console.log("Form Value: ", formValues);
    // console.log("Error: ", errors);

    if (valid) {
      setIsLoading(true);

      const response = await submit(`/employee/${employee.employee_id}/`, {
        shift_id: selectFormValues.shift_id.value,
        is_active: formValues.is_active,
      });

      // console.log(response);

      if (response?.employee_id) {
        setTimeout(() => {
          setData((prevData) => {
            console.log(prevData, formValues);
            prevData.map((i) =>
              i.employee_id === formValues.employee_id
                ? {
                    ...prevData,
                    shift_id: selectFormValues.shift_id.value,
                    is_active: formValues.is_active,
                  }
                : i
            );
          });
          setSuccess("Employee updated successfully");
          setIsLoading(false);
          // setErrors({});
          // setFormValues(initialValues);
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
          Edit Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-2">
            Shift <span className="text-danger"> *</span>
          </div>
          <Select
            className={classEase(
              "rounded-1 form_border_focus",
              errors.shift_id && "is-invalid"
            )}
            classNamePrefix="select"
            isDisabled={false}
            isLoading={false}
            isClearable={true}
            isSearchable={true}
            value={selectFormValues.shift_id}
            options={shifts}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "shift_id")
            }
          />

          {errors.shift_id && (
            <div className="invalid-feedback">{errors.shift_id}</div>
          )}

          <label className="mt-2 mb-2 me-1" htmlFor="activeStatus">
            Active
          </label>

          {console.log(formValues.is_active)}
          <input
            id="activeStatus"
            type="checkbox"
            name="is_active"
            checked={formValues.is_active}
            onChange={(e) => handleInputChange(e)}
          />

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
}

function EditEmployee({ employee, setData }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setModalShow(true);
        }}
        className="bg-transparent border-0 p-0 m-0"
      >
        <FaRegEdit color="#585858" />
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        employee={employee}
        setData={setData}
      />
    </>
  );
}

export default EditEmployee;
