import React, { useState } from "react";
import PropTypes from "prop-types";
import "./EditView.css";
import Nav from "../Nav/Nav";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import FormInput from "../FormInput/FormInput";
import DateInput from "../DateInput/DateInput";
import { useForm, Controller } from "react-hook-form";

const EditView = ({ title }) => {
  const [items, addItem] = useState(1);
  const [img, setImg] = useState();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImg(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return (
    <div className="EditView" style={{ paddingBottom: 70 }}>
      <MDBContainer>
        <MDBCol md="6">
          <form onSubmit={handleSubmit(onSubmit)} style={{ paddingTop: 10 }}>
            <p className="h4 text-center mb-4">{title || "Create donation"}</p>
            <FormInput
              title="Donation Items"
              id="item"
              addInput={addItem}
              items={items}
              register={register}
            />
            <br />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label className="grey-text">Image</label>
              <input
                style={{ marginBottom: 20, width: 100 }}
                type="file"
                name="image"
                onChange={onImageChange}
              />
              {img && (
                <MDBRow className="mb-4">
                  <MDBCol md="4">
                    <img src={img} className="img-fluid" alt="" />
                  </MDBCol>
                </MDBRow>
              )}
            </div>
            <br />
            <label className="grey-text">Pick-up Window</label>
            <DateInput title="From" register={register} name="from" />
            <DateInput title="Until" register={register} name="until" />
            <br />
            <FormInput title="Address" id="address" register={register} />
            <div className="text-center mt-4">
              <MDBBtn color="red">Cancel</MDBBtn>
              <MDBBtn color="indigo" type="submit">
                Save
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBContainer>
    </div>
  );
};

EditView.propTypes = {};

EditView.defaultProps = {};

export default EditView;
