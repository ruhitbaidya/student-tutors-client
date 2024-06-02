import { useQuery } from "@tanstack/react-query";
import useSecureApi from "../SecureApi/useSecureApi";

const useQueryGetSecure = (url) => {
  const secureApiCall = useSecureApi();
  const { data: secureData, refetch,  } = useQuery({
    queryKey: ["role", url],
    queryFn: async () => {
      const res = await secureApiCall.get(url);
      return res;
    },
  });
  return [secureData, refetch];
};

export default useQueryGetSecure;
