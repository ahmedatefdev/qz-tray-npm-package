import { TPrintersData, TZPLLabelData } from "../types";
export declare function print({ documents, currentPrinterData, printerName, }: {
    currentPrinterData?: TPrintersData;
    documents: Array<{
        data: any;
        ref?: string;
        type: string;
    }>;
    printerName?: string;
}): Promise<any>;
export declare function generateLabel({ data, currentPrinterData, }: {
    currentPrinterData?: TPrintersData;
    data: TZPLLabelData;
}): {
    type: string;
    data: string;
    ref: string;
};
export declare function generatePDF({ pdfUrl }: {
    pdfUrl: string;
}): {
    type: string;
    data: string;
};
