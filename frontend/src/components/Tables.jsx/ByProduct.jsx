import { useEffect, useState } from "react";
import CustomTable from "../CustomTable/CustomTable";
import { Modal } from "antd";
const ByProduct = ({ ordersData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productInfo, setProductInfo] = useState();

  const columns = [
    {
      title: "Ürün",
      dataIndex: "urunInfo",
      key: "urunAdi",
      render: (text) => (
        <span
          onClick={() => {
            setProductInfo(text);
            setIsModalOpen(true);
          }}
          className=" cursor-pointer bg-blue-100 border-2 border-blue-400 py-1 px-2 rounded">
          {text.urunAdi}
        </span>
      ),
    },
    {
      title: "Fatura Numarası",
      dataIndex: "fatura_numarasi",
      key: "fatura_numarasi",
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
          {text?.toFixed(2).replace(".", ",")}{" "}
          {ordersData[0]?.doviz == "usd" ? "USD" : "TL"}
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
          {text?.toFixed(2).replace(".", ",")}{" "}
          {ordersData[0]?.doviz == "usd" ? "USD" : "TL"}
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
          {ordersData[0]?.doviz == "usd" ? "USD" : "TL"}
        </span>
      ),
    },
  ];
  return (
    <div>
      <Modal
        title="Ürün Bilgisi"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}>
        <p>
          <b>Dış Çap:</b>{" "}
          {productInfo?.ozellikler["Dış Çap"] || "Bilgi mevcut değil"}
        </p>
        <p>
          <b>Mukavemet (Min-Max):</b>{" "}
          {productInfo?.ozellikler["Mukavemet (Min-Max)"] ||
            "Bilgi mevcut değil"}
        </p>
        <p>
          <b>Paket:</b>{" "}
          {productInfo?.ozellikler["Paket"] || "Bilgi mevcut değil"}
        </p>
        <p>
          <b>Sarım:</b>{" "}
          {productInfo?.ozellikler["Sarım"] || "Bilgi mevcut değil"}
        </p>
        <p>
          <b>Sarım Türü:</b>{" "}
          {productInfo?.ozellikler["Sarım Türü"] || "Bilgi mevcut değil"}
        </p>
        <p>
          <b>Tel Çapı:</b>{" "}
          {productInfo?.ozellikler["Tel Çapı"] || "Bilgi mevcut değil"}
        </p>
        <p>
          <b>Zn Kaplama:</b>{" "}
          {productInfo?.ozellikler["Zn Kaplama"] || "Bilgi mevcut değil"}
        </p>
        <p>
          <b>Çap Toleransları:</b>{" "}
          {productInfo?.ozellikler["Çap Toleransları"] || "Bilgi mevcut değil"}
        </p>
        <p>
          <b> İç Çap:</b>{" "}
          {productInfo?.ozellikler["İç Çap"] || "Bilgi mevcut değil"}
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

export default ByProduct;
