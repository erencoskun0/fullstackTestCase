import { useOutletContext } from "react-router";

const TabSelection = ({ tableTab, setTableTab }) => {
  return (
    <div>
      <select
        name=""
        id=""
        value={tableTab}
        onChange={(e) => setTableTab(e.target.value)}
        className="px-3 py-1 rounded border border-muted outline-none text-primary font-medium">
        <option value="order">Siparişe Göre</option>
        <option value="product">Ürünlere Göre</option>
      </select>
    </div>
  );
};

export default TabSelection;
