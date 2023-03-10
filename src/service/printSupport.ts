import { AxiosInstance } from "axios";

export default (api: AxiosInstance) => {
  const sign = async ({ toSign, url }: { toSign: string; url: string }) =>
    api.get(`${url}?request=${toSign}`);

  return {
    sign,
  };
};
