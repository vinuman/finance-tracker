import React, { useState } from "react";
import { Table, Select, Radio } from "antd";
import Button from "./Button";
import { unparse } from "papaparse";

const TransactionTable = ({ transactions }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  function exportToCsv() {
    const csv = unparse(transactions, {
      fields: ["name", "type", "date", "amount", "tag"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <div className="w-[100%] h-[48px] flex items-center gap-4 my-2  justify-center">
        <div className="flex w-[100%] h-[100%] items-center justify-center gap-4 mx-auto">
          <input
            className="w-[60%] h-[80%] px-4 outline-blue border-gray-200 border-2 rounded-md shadow-sm caret-inherit text-[1.1rem]"
            value={search}
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search by name"
          ></input>
          <div className="w-[30%]">
            <Select
              className="select-input"
              onChange={(value) => setTypeFilter(value)}
              value={typeFilter}
              placeholder="Filter"
              allowClear
            >
              <Option value="">All</Option>
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center  justify-center">
        <h1 className="text-[1.8rem] font-semibold px-8">My Transactions</h1>
        <div className="w-[30rem]">
          <Radio.Group
            className=" flex items-center justify-center"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
        </div>
        <div className="flex items-center gap-4 w-[320px]">
          <Button onClick={exportToCsv} outlined={false} text="Export to CSV" />
        </div>
      </div>

      <Table
        className="py-4 px-16"
        dataSource={filteredTransactions}
        columns={columns}
      />
    </>
  );
};

export default TransactionTable;
