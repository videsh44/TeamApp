import React, { useState, useEffect } from "react";
import { Table, Input, Icon } from "antd";
import { useSelector } from "react-redux";
import { deleteTeamMember } from "../actions";
import { connect } from "react-redux";

const TeamMembers = props => {
  //console.log("props", props.selectedData.members);
  const teamData = useSelector(state => state.team);

  const [data, setData] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reLoader, setReLoader] = useState(false);
  const [SearchfilterString, setSearchfilterString] = useState("");

  useEffect(() => {
    //console.log("TeamMember", teamData);
    setLoading(true);
    let tempList = [];
    for (let i = 0; i < teamData.length; i++) {
      if (teamData[i].id === props.selectedData.id) {
        for (let j = 0; j < teamData[i].members.length; j++) {
          tempList.push(teamData[i].members[j]);
        }
      }
    }
    //  console.log("tempList", tempList);
    setData(tempList);
    setGlobalData(tempList);
    setLoading(false);

    return () => {
      setData([]);
    };
  }, [props.selectedData.id, props.loadAgain, reLoader]);

  const SearchValFromTable = filterString => {
    setSearchfilterString(filterString);
    if (filterString) {
      const list = globalData.filter(item =>
        item.name.toLowerCase().includes(filterString)
      );
      setData(list);
    } else {
      setData(globalData);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 120
    },
    {
      title: "Discription",
      dataIndex: "discription",
      key: "discription",
      width: 200
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: record => (
        <span
          onClick={() => onDeleteMember(record)}
          style={{ color: "red", cursor: "pointer" }}
        >
          Delete
        </span>
      )
    }
  ];

  const onDeleteMember = data => {
    // console.log(data);
    props.dispatch(deleteTeamMember(props.selectedData.id, data.user_id));
    setReLoader(!reLoader);
  };

  return (
    <div>
      <div>
        <Input
          placeholder="Search using Name"
          prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
          value={SearchfilterString}
          allowClear
          onChange={e =>
            SearchValFromTable(e.target.value ? e.target.value : null)
          }
          style={{ width: 350, marginBottom: "30px" }}
        />
      </div>
      <Table
        loading={loading}
        rowKey={(k, i) => i}
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default connect()(TeamMembers);
