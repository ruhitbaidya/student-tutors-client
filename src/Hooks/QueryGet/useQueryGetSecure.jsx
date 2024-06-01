import { useQuery } from "@tanstack/react-query";

const useQueryGetSecure = () => {
  const secureApiCall = useQueryGetSecure();
  const { data: secureData, refetch } = useQuery({
    queryKey: ["dataget"],
    queryFn: async () => {
      const res = await secureApiCall("/");
      return res;
    },
  });

  return [secureData, refetch];
};

export default useQueryGetSecure;
