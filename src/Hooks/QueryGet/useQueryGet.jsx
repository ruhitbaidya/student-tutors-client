import { useQuery } from "@tanstack/react-query";
import usePullicApi from "../publicApi/usePullicApi";

const useQueryGetPublic = () => {
    const publicApicall = usePullicApi();
  const { data : publicData , refetch } = useQuery({
    queryKey: ["dataget"],
    queryFn : async()=>{
        const res = await publicApicall.get("/");
        return res;
    }
  });

  return [publicData, refetch]
};

export default useQueryGetPublic;
