"use client";
import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { useFormik } from "formik";

const initialValues = {
  employee_id: "",
  in_time: "",
  surname: "",
  departments: "",
  location: "",
  nid: "",
  date: "",
  phone_num: "",
  employee_name: "",
  out_time: "",
  bod: "",
  designation: "",
  branch: "",
  address: "",
  status: "",
  status: "",
};
const onSubmit = (values) => {
  console.log("submit data", values);
};
const validate = (values) => {
  let errors = {};
  if (!values.employee_id) {
    errors.employee_id = "Required";
  }
  if (!values.in_time) {
    errors.in_time = "Required";
  }
  if (!values.surname) {
    errors.surname = "surname Required";
  }
  if (!values.departments) {
    errors.departments = "Required";
  }
  if (!values.location) {
    errors.location = "Required";
  }
  if (!values.nid) {
    errors.nid = "Required";
  }
  if (!values.date) {
    errors.date = "Required";
  }
  if (!values.phone_num) {
    errors.phone_num = "Required";
  }
  if (!values.employee_name) {
    errors.employee_name = "Required";
  }
  if (!values.out_time) {
    errors.out_time = "Required";
  }
  if (!values.bod) {
    errors.bod = "Required";
  }
  if (!values.designation) {
    errors.designation = "Required";
  }
  if (!values.branch) {
    errors.branch = "Required";
  }
  if (!values.status) {
    errors.status = "Required";
  }
  if (!values.status) {
    errors.status = "Required";
  }

  return errors;
};

const page = () => {
  const [key, setKey] = useState("home");
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <>
      <div className="add_employ">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-2"
        >
          <Tab eventKey="home" title="Home">
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col lg={6}>
                  <div className="mb-2">
                    <label className="mb-2">
                      Employee ID <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      name="employee_id"
                      className="rounded-1 form_border_focus form-control "
                      onChange={formik.handleChange}
                      value={formik.values.employee_id}
                    />
                    {formik.touched.employee_id && formik.errors.employee_id ? (
                      <div className="text-danger">
                        {formik.errors.employee_id}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      In Time <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      name="in_time"
                      className="form-control rounded-1 form_border_focus"
                      onChange={formik.handleChange}
                      value={formik.values.in_time}
                    />
                    {formik.touched.in_time && formik.errors.in_time ? (
                      <div className="text-danger">{formik.errors.in_time}</div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      Surname <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control rounded-1 form_border_focus"
                      name="surname"
                      onChange={formik.handleChange}
                      value={formik.values.surname}
                    />
                    {formik.touched.surname && formik.errors.surname ? (
                      <div className="text-danger">{formik.errors.surname}</div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      Department <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select form-control rounded-1 form_border_focus"
                      name="departments"
                      onChange={formik.handleChange}
                      value={formik.values.departments}
                      aria-label="Default select example"
                    >
                      <option>Select Department</option>
                      <option value="1">Doctor</option>
                      <option value="2">Nurse</option>
                    </select>
                    {formik.touched.departments && formik.errors.departments ? (
                      <div className="text-danger">
                        {formik.errors.departments}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      Location <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      name="location"
                      className="form-control rounded-1 form_border_focus"
                      onChange={formik.handleChange}
                      value={formik.values.location}
                    />
                    {formik.touched.location && formik.errors.location ? (
                      <div className="text-danger">
                        {formik.errors.location}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      NID <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder=""
                      name="nid"
                      onChange={formik.handleChange}
                      value={formik.values.nid}
                      className="form-control rounded-1 form_border_focus"
                    />
                    {formik.touched.nid && formik.errors.nid ? (
                      <div className="text-danger">{formik.errors.nid}</div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      Register Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      placeholder=""
                      className="form-control rounded-1 form_border_focus"
                      name="date"
                      onChange={formik.handleChange}
                      value={formik.values.date}
                    />
                    {formik.touched.date && formik.errors.date ? (
                      <div className="text-danger">{formik.errors.date}</div>
                    ) : null}
                  </div>

                  <div className="mb-2">
                    <label className="mb-2">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder=""
                      className="form-control rounded-1 form_border_focus"
                      name="phone_num"
                      onChange={formik.handleChange}
                      value={formik.values.phone_num}
                    />
                    {formik.touched.phone_num && formik.errors.phone_num ? (
                      <div className="text-danger">
                        {formik.errors.phone_num}
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-2">
                    <label className="mb-2">
                      Employee Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control rounded-1 form_border_focus"
                      name="employee_name"
                      onChange={formik.handleChange}
                      value={formik.values.employee_name}
                    />
                    {formik.touched.employee_name &&
                    formik.errors.employee_name ? (
                      <div className="text-danger">
                        {formik.errors.employee_name}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      Out Time <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control rounded-1 form_border_focus"
                      name="out_time"
                      onChange={formik.handleChange}
                      value={formik.values.out_time}
                    />
                    {formik.touched.out_time && formik.errors.out_time ? (
                      <div className="text-danger">
                        {formik.errors.out_time}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      BOD <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control rounded-1 form_border_focus"
                      name="bod"
                      onChange={formik.handleChange}
                      value={formik.values.bod}
                    />
                    {formik.touched.bod && formik.errors.bod ? (
                      <div className="text-danger">{formik.errors.bod}</div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      Designation <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control rounded-1 form_border_focus"
                      name="designation"
                      onChange={formik.handleChange}
                      value={formik.values.divesignation}
                    />
                    {formik.touched.designation && formik.errors.designation ? (
                      <div className="text-danger">
                        {formik.errors.designation}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      Branch <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control rounded-1 form_border_focus"
                      name="branch"
                      onChange={formik.handleChange}
                      value={formik.values.branch}
                    />
                    {formik.touched.branch && formik.errors.branch ? (
                      <div className="text-danger">{formik.errors.branch}</div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control rounded-1 form_border_focus"
                      name="address"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <div className="text-danger">{formik.errors.address}</div>
                    ) : null}
                  </div>

                  <div className="mb-2">
                    <label className="mb-2">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select form-control rounded-1 form_border_focus"
                      aria-label="Default select example"
                      name="status"
                      onChange={formik.handleChange}
                      value={formik.values.status}
                    >
                      <option>Select Status</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </select>
                    {formik.touched.status && formik.errors.status ? (
                      <div className="text-danger">{formik.errors.status}</div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label className="mb-2">
                      Gender <span className="text-danger">*</span>
                    </label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="option2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          Female
                        </label>
                      </div>
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
            </form>
          </Tab>

          <Tab eventKey="profile" title="Profile">
            <form>
              <Row>
                <Col lg={6}>
                  <div className="mb-2">
                    <label>
                      Employee ID <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder=""
                      className="rounded-1 form_border_focus"
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-2">
                    <div className="mb-3">
                      <label>Upload Photo</label>
                      <input
                        type="file"
                        className="rounded-1 form_border_focus"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Button
                type="submit"
                className="rounded-1 px-4 mt-2 add_btn_color border-0"
              >
                + Add
              </Button>
            </form>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default page;
