import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Safe from "../components/Safe/Safe";
import Tab from "../components/Tab/Tab";
import ByOrder from "../components/Tables.jsx/ByOrder";
import ByProduct from "../components/Tables.jsx/ByProduct";
import { useGetOrdersQuery } from "../services/orders";
import { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader/CustomLoader";
import { searchOrders } from "../utils/searchOrders";

const RootPage = () => {
  const [tableTab, setTableTab] = useState("order");
  const [doviz, setDoviz] = useState("usd");
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const skip = !doviz;
  const {
    data: ordersData,
    error,
    isLoading,
    refetch,
  } = useGetOrdersQuery(doviz, { skip });
  useEffect(() => {
    refetch();
  }, [doviz]);
  useEffect(() => {
    const filteredOrders = searchOrders(
      ordersData ? ordersData : [],
      searchText
    );
    setFilteredData(filteredOrders);
  }, [searchText]);

  return (
    <div>
      <Header doviz={doviz} setDoviz={setDoviz} />
      <div>
        {" "}
        <Safe />
        <Tab
          setTableTab={setTableTab}
          tableTab={tableTab}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        {isLoading ? (
          <div className="h-96 flex items-center justify-center">
            <CustomLoader />
          </div>
        ) : (
          <div>
            {" "}
            {tableTab == "order" && (
              <ByOrder
                ordersData={searchText ? filteredData : ordersData}
                doviz={doviz}
              />
            )}
            {tableTab == "product" && (
              <ByProduct
                ordersData={searchText ? filteredData : ordersData}
                doviz={doviz}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RootPage;
