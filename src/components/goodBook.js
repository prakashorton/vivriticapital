import React, { useState, useEffect } from "react";
import { Table, PageHeader, Input, Rate, Tag, Empty } from "antd";
import dataSource from "../utils/dummyData";

function GoodBook() {
  const { Search } = Input;
  const [completeData, setCompleteData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Brand",
      dataIndex: "Brand",
      key: "Brand"
    },
    {
      title: "Variety",
      dataIndex: "Variety",
      key: "Variety"
    },
    {
      title: "Style",
      dataIndex: "Style",
      key: "Style",
      render: st => <Tag color={"blue"}>{st.toUpperCase()}</Tag>
    },
    {
      title: "Country",
      dataIndex: "Country",
      key: "Country",
      render: con => <Tag color={"green"}>{con.toUpperCase()}</Tag>
    },
    {
      title: "Stars",
      dataIndex: "Stars",
      key: "Stars",
      render: star => (
        <Rate allowClear={false} disabled allowHalf defaultValue={star} />
      )
    }
  ];

  const getData = () => {
    // Dummy API Call
    setTimeout(() => {
      const keyAdded = dataSource.map((da, index) => {
        da.key = index;
        return da;
      });
      setCompleteData(keyAdded);
      setFilteredData(keyAdded);
    }, 500);
  };

  const onSearch = ({ target = {} }) => {
    const { value } = target;
    if (value) {
      const filteredData = completeData.filter(da =>
        columns.some(c =>
          da[c.title]
            .toString()
            .toLowerCase()
            .includes(value.trim().toLowerCase())
        )
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(dataSource);
    }
  };

  return (
    <div className="container">
      <div className="site-page-header-ghost-wrapper">
        <PageHeader ghost={false} title="Search">
          <Search
            placeholder="Enter item to Search from [Brand - Variety - Style - Country - Stars]"
            size="large"
            onChange={onSearch}
          />
        </PageHeader>
      </div>
      {filteredData && filteredData.length ? (
        <Table dataSource={filteredData} columns={columns} />
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default GoodBook;
