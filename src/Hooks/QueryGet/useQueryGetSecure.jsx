import { useQuery } from "@tanstack/react-query";
import useSecureApi from "../SecureApi/useSecureApi";

const useQueryGetSecure = (url) => {
  console.log(url)
  const secureApiCall = useSecureApi();
  const { data: secureData, refetch } = useQuery({
    queryKey: ["role", url],
    queryFn: async () => {
      const res = await secureApiCall.get(url);
      return res;
    },
  });
  console.log(secureData)
  return [secureData, refetch];
};

export default useQueryGetSecure;
