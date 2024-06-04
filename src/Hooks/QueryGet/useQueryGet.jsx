import { useQuery } from "@tanstack/react-query";
import usePullicApi from "../publicApi/usePullicApi";

const useQueryGetPublic = (url) => {
    const publicApicall = usePullicApi();
  const { data : publicData , refetch } = useQuery({
    queryKey: ["dataget"],
    queryFn : async()=>{
        const res = await publicApicall.get(url);
        return res;
    }
  });

  return [publicData, refetch]
};

export default useQueryGetPublic;
