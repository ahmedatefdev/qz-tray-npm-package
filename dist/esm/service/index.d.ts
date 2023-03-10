declare const PrintSupport: {
    sign: ({ toSign, url }: {
        toSign: string;
        url: string;
    }) => Promise<import("axios").AxiosResponse<any, any>>;
};
export { PrintSupport };
