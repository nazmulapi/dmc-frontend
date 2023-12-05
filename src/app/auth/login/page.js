"use client";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const page = () => {
  return (
    <>
      <section className="login_bg">
        <Container>
          <Row>
            <Col lg={6} className="div_height ">
              <div className="w-100 bg-white py-5 rounded-1">
                <div className="d-flex justify-content-center mb-3">
                  <img src="/th.jpg" alt="dmc logo" className="img-fluid" />
                </div>

                <div className="px-5">
                  <Form>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Email address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-1 form_padding"
                        id=""
                        placeholder="Enter your mail"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-1 form_padding"
                        id=""
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        type="submit"
                        className="btn btn-primary mb-3 rounded-1 w-100 py-2"
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                  <div className="text-end">
                    <Link href="/">Forgot Password?</Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default page;
