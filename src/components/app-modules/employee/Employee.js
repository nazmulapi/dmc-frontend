"use client";
import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Field, Form, Formik, useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import ShowHide from "./ShowHide";

const initialValues = {
  // employee_id: "",
  email_id: "",
  in_time: "",
  surname: "",
  departments: "",
  employee_name: "",
  out_time: "",
  bod: "",
  designation: "",
  status: "",
  radioOption: "",
};

const validationSchema = Yup.object({
  in_time: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  surname: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  email_id: Yup.string().required("Required"),
  departments: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  nid: Yup.string().required("Required nid"),
  employee_name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  out_time: Yup.string().required("Required"),
  bod: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  designation: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  radioOption: Yup.string().required("Please select an option"),
});

const onSubmit = (values) => {
  console.log("submit data", values);
};

const page = () => {
  const [key, setKey] = useState("home");

  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetform }) => {
        console.log(values);
        resetForm(initialValues);
      }}
      validationSchema={validationSchema}
    >
      <div className="add_employ">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-2"
        >
          <Tab eventKey="home" title="Home">
            <Form>
              <Row>
                <Col lg={6}>
                  <div className="mb-2">
                    <label className="mb-2">
                      Employee ID
                      {/* <span className="text-danger">*</span> */}
                    </label>
                    <Field
                      type="text"
                      placeholder=""
                      name="employee_id"
                      className="rounded-1 form_border_focus form-control "
                    />
                    {/* <div className="text-danger">
                      <ErrorMessage name="employee_id" />
                    </div> */}
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      Employee Name <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="text"
                      placeholder=""
                      className="form-control rounded-1 form_border_focus"
                      name="employee_name"
                    />
                    <div className="text-danger">
                      <ErrorMessage name="employee_name" />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      Email <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="email"
                      placeholder=""
                      name="email_id"
                      className="rounded-1 form_border_focus form-control "
                    />
                    <div className="text-danger">
                      <ErrorMessage name="email_id" />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      Designation<span className="text-danger">*</span>
                    </label>
                    <Field
                      type="number"
                      placeholder=""
                      className="form-control rounded-1 form_border_focus"
                      name="designation"
                    />
                    <div className="text-danger">
                      <ErrorMessage name="designation" />
                    </div>
                  </div>
                  {/* <div className="mb-2">
                    <label className="mb-2">
                      Shift Start <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="text"
                      placeholder=""
                      name="in_time"
                      className="form-control rounded-1 form_border_focus"
                    />
                    <div className="text-danger">
                      <ErrorMessage name="in_time" />
                    </div>
                  </div> */}
                  {/* <div className="mb-2">
                    <label className="mb-2">
                      Shift End <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="text"
                      placeholder=""
                      className="form-control rounded-1 form_border_focus"
                      name="out_time"
                    />
                    <div className="text-danger">
                      <ErrorMessage name="out_time" />
                    </div>
                  </div> */}

                  <div className="mb-2">
                    <label className="mb-2">
                      Phone Number
                      {/* <span className="text-danger">*</span> */}
                    </label>
                    <Field
                      type="number"
                      placeholder=""
                      className="form-control rounded-1 form_border_focus"
                      name="phone_num"
                    />
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="mb-2">
                    <label className="mb-2">
                      Employee Status <span className="text-danger">*</span>
                    </label>
                    <Field
                      as="select"
                      className="form-select form-control rounded-1 form_border_focus"
                      aria-label="Default select example"
                      name="status"
                    >
                      <option>Select Status</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </Field>
                    <div className="text-danger">
                      <ErrorMessage name="status" />
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="mb-2">
                      Employee Group <span className="text-danger">*</span>
                    </label>
                    <Field
                      as="select"
                      className="form-select form-control rounded-1 form_border_focus"
                      name="group_id"
                      aria-label="Default select example"
                    >
                      <option>Select Group</option>
                      <option value="1">Doctor</option>
                      <option value="2">Nurse</option>
                    </Field>
                    <div className="text-danger">
                      <ErrorMessage name="departments" />
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="mb-2">Upload Photo</label>
                    <Field
                      type="file"
                      placeholder=""
                      name="employee_img"
                      className="rounded-1 form_border_focus form-control "
                    />
                    <div className="text-danger">
                      <ErrorMessage name="employee_img" />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      Employee Role<span className="text-danger">*</span>
                    </label>
                    <div>
                      <ShowHide />
                    </div>

                    <div className="text-danger">
                      <ErrorMessage name="employee_role" />
                    </div>
                  </div>
                </Col>
              </Row>

              <Button
                type="submit"
                className="rounded-1 mt-2 px-4 add_btn_color border-0"
              >
                + Add
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </div>
    </Formik>
  );
};

export default page;
