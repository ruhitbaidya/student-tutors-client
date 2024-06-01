import { useQuery } from "@tanstack/react-query";
import useSecureApi from "../SecureApi/useSecureApi";

const useQueryGetSecure = (url) => {
  const secureApiCall = useSecureApi();
  const { data: secureData,isLoading, refetch,  } = useQuery({
    queryKey: ["role", url],
    queryFn: async () => {
      const res = await secureApiCall.get(url);
      return res;
    },
  });
  console.log(secureData)
  return [secureData, refetch, isLoading];
};

export default useQueryGetSecure;
