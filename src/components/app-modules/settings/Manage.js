import React from "react";
import Button from "react-bootstrap/Button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Manage = () => {
  return (
    <>
      <section>
        <div className="employee_table table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr className="align-items-center table_head">
                <th scope="col">SL</th>
                <th scope="col">Institution Name</th>
                <th scope="col">Address</th>
                <th scope="col">Email</th>
                <th scope="col">Logo</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-items-center">
                <td scope="row">1</td>
                <td>API</td>
                <td>
                  House: 04, Flat: 7/A, Road: 23/A, Block: B, Banani,
                  Dhaka-1213.{" "}
                </td>
                <td>demomail@gmail.com</td>
                <td>
                  <img src="/logo.png" alt="" className="logo" />
                </td>

                <td>
                  <div className="d-flex">
                    <button className="add_btn_color border-0 rounded-1 me-2">
                      <FaRegEdit color="white" />
                    </button>
                    <button className="bg-danger border-0 rounded-1">
                      <RiDeleteBin6Line color="white" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Manage;
