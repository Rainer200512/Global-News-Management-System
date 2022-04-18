import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Tree } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const { confirm } = Modal;
export default function RoleList() {
  const [dataSource, setdataSource] = useState([]);
  const [rightList, setRightList] = useState([]);
  const [currentRights, setcurrentRights] = useState([]);
  const [currentId, setcurrentId] = useState(0);
  const [isModalVisible, setisModalVisible] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => confirmMethod(item)}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setisModalVisible(true);
                setcurrentRights(item.rights);
                setcurrentId(item.id);
              }}
            />
          </div>
        );
      },
    },
  ];

  const confirmMethod = (item) => {
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,

      onOk() {
        deleteMethod(item);
      },
      onCancel() {},
    });
  };
  //删除
  const deleteMethod = (item) => {
    setdataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`/roles/${item.id}`);
  };

  useEffect(() => {
    axios.get("/roles").then((res) => {
      setdataSource(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/rights?_embed=children").then((res) => {
      setRightList(res.data);
    });
  }, []);

  const handleOk = () => {
    console.log(currentRights, currentId);
    setisModalVisible(false);
    //同步datasource
    setdataSource(
      dataSource.map((item) => {
        if (item.id === currentId) {
          return {
            ...item,
            rights: currentRights,
          };
        }
        return item;
      })
    );
    //patch

    axios.patch(`/roles/${currentId}`, {
      rights: currentRights,
    });
  };

  const handleCancel = () => {
    setisModalVisible(false);
  };

  const onCheck = (checkKeys) => {
    setcurrentRights(checkKeys.checked);
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>

      <Modal
        title="权限分配"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          checkedKeys={currentRights}
          onCheck={onCheck}
          checkStrictly={true}
          treeData={rightList}
        />
      </Modal>
    </div>
  );
}
