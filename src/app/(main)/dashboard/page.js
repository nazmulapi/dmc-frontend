"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Col, Row, Form } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const page = () => {
  return (
    <>
      <Row>
        <div className="d-flex">
          <Col lg={4}>
            <div className="mb-4 rounded-1 multi_select">
              <DropdownMultiselect
                options={[
                  "Screen One",
                  "Screen Two",
                  "Screen Three",
                  "Screen Four",
                  "Screen Five",
                  "Screen Six",
                  "Screen Seven",
                  "Screen Eight",
                  "Screen Nine",
                  "Screen Ten",
                ]}
                name="countries"
                placeholder="Select screen"
                selectDeselectLabel="Select / Deselect ALL"
              />
            </div>
          </Col>

          <div>
            <button type="submit" className="sync_btn btn btn-primary">
              Sync
            </button>
          </div>
        </div>
        <Col lg={3}>
          <Link href="#" className="text-decoration-none">
            <div className="screen_one rounded-1 p-4 text-center mb-3">
              <div>
                <img src="/face.png" alt="" className="screen_img " />
                <p className="m-0 text-capitalize text-white font_20">
                  screen one
                </p>
              </div>
            </div>
          </Link>
        </Col>
        <Col lg={3}>
          <Link href="#" className="text-decoration-none">
            <div className="screen_one rounded-1 p-4 text-center mb-3">
              <div>
                <img src="/face.png" alt="" className="screen_img " />
                <p className="m-0 text-capitalize text-white font_20">
                  screen one
                </p>
              </div>
            </div>
          </Link>
        </Col>
        <Col lg={3}>
          <Link href="#" className="text-decoration-none">
            <div className="screen_one rounded-1 p-4 text-center mb-3">
              <div>
                <img src="/face.png" alt="" className="screen_img " />
                <p className="m-0 text-capitalize text-white font_20">
                  screen one
                </p>
              </div>
            </div>
          </Link>
        </Col>
        <Col lg={3}>
          <Link href="#" className="text-decoration-none">
            <div className="screen_one rounded-1 p-4 text-center mb-3">
              <div>
                <img src="/face.png" alt="" className="screen_img " />
                <p className="m-0 text-capitalize text-white font_20">
                  screen one
                </p>
              </div>
            </div>
          </Link>
        </Col>
        <Col lg={3}>
          <Link href="#" className="text-decoration-none">
            <div className="screen_one rounded-1 p-4 text-center mb-3">
              <div>
                <img src="/face.png" alt="" className="screen_img " />
                <p className="m-0 text-capitalize text-white font_20">
                  screen one
                </p>
              </div>
            </div>
          </Link>
        </Col>
        <Col lg={3}>
          <Link href="#" className="text-decoration-none">
            <div className="screen_one rounded-1 p-4 text-center mb-3">
              <div>
                <img src="/face.png" alt="" className="screen_img " />
                <p className="m-0 text-capitalize text-white font_20">
                  screen one
                </p>
              </div>
            </div>
          </Link>
        </Col>
        <Col lg={3}>
          <Link href="#" className="text-decoration-none">
            <div className="screen_one rounded-1 p-4 text-center mb-3">
              <div>
                <img src="/face.png" alt="" className="screen_img " />
                <p className="m-0 text-capitalize text-white font_20">
                  screen one
                </p>
              </div>
            </div>
          </Link>
        </Col>
        <Col lg={3}>
          <Link href="#" className="text-decoration-none">
            <div className="screen_one rounded-1 p-4 text-center mb-3">
              <div>
                <img src="/face.png" alt="" className="screen_img " />
                <p className="m-0 text-capitalize text-white font_20">
                  screen one
                </p>
              </div>
            </div>
          </Link>
        </Col>
        <Col lg={3}>
          <Link href="#" className="text-decoration-none">
            <div className="screen_one rounded-1 p-4 text-center mb-3">
              <div>
                <img src="/face.png" alt="" className="screen_img " />
                <p className="m-0 text-capitalize text-white font_20">
                  screen one
                </p>
              </div>
            </div>
          </Link>
        </Col>
        <Col lg={3}>
          <Link href="#" className="text-decoration-none">
            <div className="screen_one rounded-1 p-4 text-center mb-3">
              <div>
                <img src="/face.png" alt="" className="screen_img " />
                <p className="m-0 text-capitalize text-white font_20">
                  screen one
                </p>
              </div>
            </div>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default page;
