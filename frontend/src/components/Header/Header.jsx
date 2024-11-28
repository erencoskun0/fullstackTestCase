import { FaRegBell } from "react-icons/fa";
const Header = ({ doviz, setDoviz }) => {
  return (
    <div className=" bg-backg h-12 ">
      <div className="max-w-screen-2xl mx-auto flex sm:flex-row flex-col sm:py-0 py-4 gap-y-4 items-center justify-between h-full px-4">
        {" "}
        <div className="text-lg font-medium">Karlılık</div>
        <div className="flex items-center sm:gap-x-5 flex-wrap gap-x-2">
          <FaRegBell size={23} className="cursor-pointer" />
          <div className="flex items-center gap-x-1">
            <img
              className="w-7 h-7 rounded-full bg-backg"
              src="https://i.pinimg.com/736x/3b/73/48/3b73483fa5af06e3ba35f4f71e541e7a.jpg"
              alt=""
            />
            <span className="font-medium">User Name</span>
          </div>
          <div className="flex items-center">
            <p className="text-sm">Para Birimi:</p>
            <select
              name=""
              id=""
              value={doviz}
              onChange={(e) => setDoviz(e.target.value)}
              className="outline-none  text-sm bg-backg cursor-pointer">
              <option value="tl">TL</option>
              <option value="usd">USD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
