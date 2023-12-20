import React from 'react'

const page = () => {
  return (
    <>
      <div>
        <h2 className="text-capitalize text-center">clean raw data </h2>
        <div className="d-flex justify-content-center mt-3">
          <button type="submit" class="btn btn-primary mb-3 rounded-1 text-capitalize">
            clean now
          </button>
        </div>
        <p className="text-center font_18">last clean data date: 10-10-2023 at 00:00:00 pm</p>
      </div>
    </>
  )
}

export default page