import { AxiosInstance } from "axios";
declare const _default: (api: AxiosInstance) => {
    sign: ({ toSign, url }: {
        toSign: string;
        url: string;
    }) => Promise<import("axios").AxiosResponse<any, any>>;
};
export default _default;
