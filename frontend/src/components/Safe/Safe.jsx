import { BsFillSafeFill } from "react-icons/bs";
import { useGetSafeQuery } from "../../services/safe";
import CustomLoader from "../CustomLoader/CustomLoader";
const Safe = () => {
  const { data: safe, error, isLoading, refetch } = useGetSafeQuery();
  return (
    <div className="bg-backg h-[30vh] flex items-center justify-center">
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <BsFillSafeFill size={40} color="#334155" />
          <span className="text-xl font-medium text-primary">
            {safe?.toplamKarlilik.toFixed(2).replace(".", ",")} USD
          </span>
        </div>
      )}
    </div>
  );
};

export default Safe;
