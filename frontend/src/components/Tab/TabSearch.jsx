import { IoSearchOutline } from "react-icons/io5";

const TabSearch = ({ searchText, setSearchText }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Ara"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="h-10 px-5 max-w-96 w-full  text-primary bg-[#E1E6EB]   outline-none rounded-full"
      />
      <IoSearchOutline
        size={23}
        className="text-primary absolute right-4 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default TabSearch;
