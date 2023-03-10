declare const printerQz: {
    /** connect to qz printer
     * @function connect
     * @return {object} connected printer qz instance
     */
    connect(): Promise<any>;
    disconnect(): Promise<boolean>;
    printGeneratedLabels(printerName: any, labels: any): Promise<any>;
    isActive(): any;
    launchQZ(): Promise<void>;
    setCertificate(url: any): Promise<void>;
    getPrinterConfig(): any;
    setPrinterConfig(config: any): void;
};
export default printerQz;
