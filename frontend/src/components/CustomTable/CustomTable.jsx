import { useState } from "react";
import { Table } from "antd";

const CustomTable = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} />;
};

export default CustomTable;
