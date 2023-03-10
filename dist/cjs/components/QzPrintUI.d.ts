import { Component } from "react";
export default class QZPrintUI extends Component {
    state: {
        printers: never[];
        isConnecting: boolean;
        showSettings: boolean;
        isLoading: boolean;
        error: string;
        printer?: string | undefined;
        selectedPrinter?: string | undefined;
        offsetX?: string | undefined;
        offsetY?: string | undefined;
        labelOrientation?: string | undefined;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleLaunchQz: () => void;
    updateSettings: (currentPrinter: any) => Promise<void>;
    onClickSettings: () => void;
    cancelSettings: () => void;
    render(): JSX.Element;
}
