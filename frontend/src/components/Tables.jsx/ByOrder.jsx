import { useEffect, useState } from "react";
import CustomTable from "../CustomTable/CustomTable";
import { Modal } from "antd";
import { BsFillInfoCircleFill } from "react-icons/bs";

const ByOrder = ({ ordersData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({});

  const columns = [
    {
      title: "Müşteri",
      dataIndex: "musteri_bilgileri",
      key: "sirket_Ad",
      render: (text) => (
        <span className=" font-medium   flex items-center gap-x-2">
          <span
            className="cursor-pointer"
            onClick={() => {
              setIsModalOpen(true);
              setCustomerInfo(text);
            }}>
            {" "}
            <BsFillInfoCircleFill size={22} color="#334155" />
          </span>
          {text.companyname}
        </span>
      ),
    },
    {
      title: "Fatura Numarası",
      dataIndex: "fatura_numarasi",
      key: "fatura_numarasi",
      render: (text) => <span className=" font-medium">{text}</span>,
    },
    {
      title: "Toplam Miktar",
      dataIndex: "toplam_miktar",
      key: "toplam_miktar",
      sorter: (a, b) => a.toplam_miktar - b.toplam_miktar,
      sortDirections: ["ascend", "descend"],
      render: (text) => (
        <span className="text-lg font-medium">
          {text?.toFixed(4).replace(".", ",")} ton
        </span>
      ),
    },
    {
      title: "Toplam Tutar",
      dataIndex: "toplam_tutar",
      key: "toplam_tutar",
      sorter: (a, b) => a.toplam_tutar - b.toplam_tutar,
      sortDirections: ["ascend", "descend"],
      render: (text) => (
        <span className="text-lg font-medium">
          {text?.toFixed(2).replace(".", ",")}
          {ordersData[0]?.doviz == "usd" ? " USD" : " TL"}
        </span>
      ),
    },
    {
      title: "Toplam Maliyet",
      dataIndex: "toplam_maliyet",
      key: "toplam_maliyet",
      sorter: (a, b) => a.toplam_maliyet - b.toplam_maliyet,
      sortDirections: ["ascend", "descend"],
      render: (text) => (
        <span className="text-lg font-medium">
          {text?.toFixed(2).replace(".", ",")}
          {ordersData[0]?.doviz == "usd" ? " USD" : " TL"}
        </span>
      ),
    },
    {
      title: "Toplam Karlılık",
      dataIndex: "karlilik_hesabi",
      key: "karlilik_hesabi",
      sorter: (a, b) => a.karlilik_hesabi - b.karlilik_hesabi,
      sortDirections: ["ascend", "descend"],
      render: (text) => (
        <span
          className={`text-sm py-1 px-2 rounded ${
            text < 0
              ? "bg-myredbg border-2 border-myred text-myred"
              : "bg-mygreenbg border-2 border-mygreen text-mygreen"
          }`}>
          {text?.toFixed(2).replace(".", ",")}{" "}
          {ordersData[0]?.doviz == "usd" ? " USD" : "TL"}
        </span>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <Modal
        title="Şirket Bilgisi"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}>
        <p>
          <b>Şirket Adı:</b>{" "}
          {customerInfo["companyname"] || "Bilgi mevcut değil"}
        </p>
        <p>
          <b>Email:</b> {customerInfo.email || "Bilgi mevcut değil"}
        </p>{" "}
        <p>
          <b>Telefon:</b> {customerInfo.phone || "Bilgi mevcut değil"}
        </p>
      </Modal>
      <div className=" overflow-x-auto">
        <div className="min-w-[1100px] w-full">
          {" "}
          <CustomTable data={ordersData} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default ByOrder;
