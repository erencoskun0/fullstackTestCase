import { useOutletContext } from "react-router";
import Safe from "../components/Safe/Safe";
import Tab from "../components/Tab/Tab";
import ByOrder from "../components/Tables.jsx/ByOrder";
import ByProduct from "../components/Tables.jsx/ByProduct";

const RootLayout = () => {
  const context = useOutletContext();
  console.log(context);
  return (
    <div>
      {" "}
      <Safe />
      <Tab />
      {context.tableTab == "order" && <ByOrder context={context} />}
      {context.tableTab == "product" && <ByProduct context={context} />}
    </div>
  );
};

export default RootLayout;
