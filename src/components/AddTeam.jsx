import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Icon,
  Select,
  Menu,
  Layout,
  message,
  Button,
  Modal,
  Tooltip
} from "antd";
import { createTeam } from "../actions";
import { useSelector } from "react-redux";
import TeamMembers from "./TeamMembers";
import AddMember from "./AddMember";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const { Option } = Select;

const AddTeam = ({ dispatch }) => {
  const teamData = useSelector(state => state.team);

  // console.log(teamData);
  const [team, setTeam] = useState("");
  const [type, setType] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [createNewModalShow, setCreateNewModalShow] = useState(false);
  const [loadAgain, setLoadAgain] = useState(false);

  const onSelectType = val => {
    // console.log(val);
    setType(val);
  };

  const onInputChange = e => {
    setTeam(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (team === "" || team === " " || team === undefined || team === null) {
      message.warning("Please Enter Team Name");
      return;
    }

    for (let i = 0; i < teamData.length; i++) {
      if (teamData[i].text === team) {
        message.warning("Team with this Name Already exists");
        return;
      }
    }

    dispatch(createTeam(team));
    message.success("Team created Succesfully");
    setTeam(" ");
  };

  const renderTeams = team => {
    return team.map(item => (
      <Menu.Item onClick={() => onTeamClick(item)} key={item.id}>
        <Icon type="user" /> {item.text}
      </Menu.Item>
    ));
  };

  const onTeamClick = data => {
    // console.log("data", data);
    setSelectedTeamName(data.text);
    setSelectedData(data);
  };

  const closeCreateNewModal = () => {
    setCreateNewModalShow(false);
  };

  const createNewMember = () => {
    setCreateNewModalShow(true);
  };

  return (
    <div
      style={
        {
          // height: "50vh"
        }
      }
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <Form onSubmit={onSubmit} style={{ float: "right" }}>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <div style={{ marginRight: "20px" }}>
                <Select
                  //defaultValue="lucy"
                  style={{ width: 120 }}
                  placeholder="Select Type"
                  onChange={onSelectType}
                >
                  <Option value="Team">Team</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                </Select>
              </div>
              <div style={{ marginRight: "20px" }}>
                <Tooltip title={type === "Team" ? "" : "Please Select Type"}>
                  <Input
                    disabled={type === "Team" ? false : true}
                    placeholder="Enter Team Name"
                    prefix={<Icon type="file-add" />}
                    onChange={e => onInputChange(e)}
                    value={team}
                  />
                </Tooltip>
              </div>
              <div style={{ marginRight: "20px" }}>
                <button
                  style={{
                    border: "0px",
                    padding: "5px 9px",
                    background: "#22A4ef",
                    borderRadius: "5px",
                    color: "#fff"
                  }}
                  type="submit"
                >
                  Add team
                </button>
              </div>
            </div>
          </Form>
        </Header>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
            width={300}
            style={{ background: "#fff" }}
          >
            <Menu
              mode="inline"
              //defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    Teams
                  </span>
                }
              >
                {renderTeams(teamData)}
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <div
              style={{ fontSize: "19px", fontWeight: 700, padding: "5px 6px" }}
            >
              {selectedTeamName}
            </div>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              {selectedTeamName === "" ? (
                "Please Select Team To See Its Member"
              ) : (
                <div>
                  <div style={{ marginBottom: "30px", textAlign: "right" }}>
                    <Button onClick={() => createNewMember()} type="primary">
                      Add New Member
                    </Button>
                  </div>

                  <TeamMembers
                    loadAgain={loadAgain}
                    selectedData={selectedData}
                  />
                </div>
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>

      {createNewModalShow === true ? (
        <Modal
          style={{ minWidth: "600px" }}
          title="Add New Member"
          closable={true}
          footer={null}
          onCancel={closeCreateNewModal}
          visible={createNewModalShow}
          destroyOnClose={true}
        >
          <AddMember
            selectedData={selectedData}
            setCreateNewModalShow={setCreateNewModalShow}
            setLoadAgain={setLoadAgain}
            loadAgain={loadAgain}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default connect()(AddTeam);
