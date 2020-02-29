import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { connect } from "react-redux";
import { addTeamMembers } from "../actions";

const { TextArea } = Input;

const AddMember = ({
  dispatch,
  selectedData,
  setCreateNewModalShow,
  setLoadAgain,
  loadAgain
}) => {
  const id = selectedData.id;
  const text = selectedData.text;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onNameChange = event => {
    if (
      event.target.value === "" ||
      event.target.value === "" ||
      event.target.value === undefined
    ) {
      setName(null);
    } else {
      setName(event.target.value);
    }
  };

  const onDescriptionChange = event => {
    if (
      event.target.value === "" ||
      event.target.value === "" ||
      event.target.value === undefined
    ) {
      setDescription(null);
    } else {
      setDescription(event.target.value);
    }
  };

  const createNew = () => {
    if (name === "" || name === " " || name === undefined || name === null) {
      setName(null);
      message.warning("Please Enter Name");
      return;
    }
    if (
      description === "" ||
      description === " " ||
      description === undefined ||
      description === null
    ) {
      setDescription(null);
      message.warning("Please Enter description");
      return;
    }
    dispatch(addTeamMembers(id, text, name, description));
    message.success("Team Member Added Succesfully");
    setCreateNewModalShow(false);
    setLoadAgain(!loadAgain);
  };

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "25px" }}>
        <div
          style={{
            width: "140px",
            fontWeight: 600
          }}
        >
          Name
          <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
        </div>
        <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
          <div>
            <Input
              type="text"
              placeholder="Member Name"
              style={
                name === null
                  ? {
                      width: "100%",
                      border: "0.5px solid red"
                    }
                  : {
                      width: "100%"
                    }
              }
              onChange={onNameChange}
            />
          </div>
          {name === null ? (
            <div style={{ color: "red", marginTop: "5px" }}>* Required</div>
          ) : null}
        </div>
      </div>

      <div style={{ display: "flex", marginBottom: "25px" }}>
        <div
          style={{
            width: "140px",
            fontWeight: 600
          }}
        >
          Description
          <span style={{ color: "red", paddingLeft: "4px" }}>*</span>
        </div>
        <div style={{ width: "calc(100% - 160px)", marginLeft: "20px" }}>
          <div>
            <TextArea
              placeholder="Member Description"
              style={
                description === null
                  ? {
                      width: "100%",
                      border: "0.5px solid red"
                    }
                  : {
                      width: "100%"
                    }
              }
              onChange={onDescriptionChange}
              rows={4}
            />
          </div>
          {description === null ? (
            <div style={{ color: "red", marginTop: "5px" }}>* Required</div>
          ) : null}
        </div>
      </div>

      <div style={{ margin: "60px 0px 30px 0px", textAlign: "center" }}>
        <Button type="primary" onClick={() => createNew()}>
          Add New
        </Button>
      </div>
    </div>
  );
};

export default connect()(AddMember);
