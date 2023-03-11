import { Component } from "react";
import "../css/style.css";
import { TPrintersData, TZPLLabelData } from "../types";
interface TQZPrintUIState extends TPrintersData {
    formValue: {
        labelOrientation: string;
        offsetY: null | number | string;
        offsetX: null | number | string;
    };
}
interface TQZPrintUIProps {
}
export default class QZPrintUI extends Component<TQZPrintUIProps, TQZPrintUIState> {
    state: TQZPrintUIState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleLaunchQz: () => void;
    updateSettings: (currentPrinter: string) => Promise<void>;
    onClickSettings: () => void;
    cancelSettings: () => void;
    applySettings: () => void;
    private updateSelectedPrinter;
    private updateFormValues;
    render(): JSX.Element;
}
export declare function printZplLabels({ data, printerName, }: {
    data: TZPLLabelData | Array<TZPLLabelData>;
    printerName: string;
}): void;
export declare function printPDFs({ data, printerName, }: {
    data: Array<string> | string;
    printerName: string;
}): void;
export {};
