import TabSearch from "./TabSearch";
import TabSelection from "./TabSelection";

const Tab = ({ tableTab, setTableTab, setSearchText, searchText }) => {
  return (
    <div className="bg-backg ">
      <div className="  py-8 px-4 flex items-center justify-between">
        <TabSelection tableTab={tableTab} setTableTab={setTableTab} />
        <TabSearch setSearchText={setSearchText} searchText={searchText} />
      </div>
    </div>
  );
};

export default Tab;
