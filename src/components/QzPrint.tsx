import React, { Component } from "react";
import ReactPortal from "./ReactPortal";
import printerQz from "../utils/printQZ";
import "../css/style.css";

import {
  init,
  disconnectQZ,
  handleLaunchQzSoftware,
  updateSettingsQzSavedSetting,
} from "../utils/printUtils";
import { TPrintersData, TZPLLabelData } from "../types";
import { generateLabel, generatePDF, print } from "../utils/printTypes";

let currentPrinterData: TPrintersData = {
  printer: "",
  printers: [],
  selectedPrinter: "",
  offsetX: "",
  offsetY: "",
  labelOrientation: "",
};

interface TQZPrintUIState extends TPrintersData {
  formValue: {
    labelOrientation: string;
    offsetY: null | number | string;
    offsetX: null | number | string;
  };
}
interface TQZPrintUIProps {}

export default class QZPrintUI extends Component<TQZPrintUIProps, TQZPrintUIState> {
  state: TQZPrintUIState = {
    ...currentPrinterData,
    printers: [],
    isConnecting: false,
    showSettings: false,
    isLoading: false,
    error: "",
    formValue: {
      labelOrientation: "",
      offsetY: null,
      offsetX: null,
    },
  };

  componentDidMount() {
    init({
      signInApiUrl: "qz/url",
      callback: (printerData: TPrintersData) => {
        this.setState({ ...printerData });
        currentPrinterData = { ...currentPrinterData, ...printerData };
      },
    });
  }

  componentWillUnmount() {
    disconnectQZ();
  }

  handleLaunchQz = () => {
    handleLaunchQzSoftware(() => {
      this.setState({
        isConnecting: true,
      });
    });
  };

  updateSettings = async (currentPrinter: string) => {
    updateSettingsQzSavedSetting(this.state as any, currentPrinter);
  };

  onClickSettings = () => {
    this.setState({
      showSettings: true,
    });
  };

  cancelSettings = () => {
    this.setState({
      showSettings: false,
    });
  };
  applySettings = () => {
    this.setState((prevState, _props) => {
      const payload = {
        offsetX: prevState.formValue.offsetX || "",
        offsetY: prevState.formValue.offsetY || "",
        labelOrientation: prevState.formValue.labelOrientation || "",
        selectedPrinter: prevState.selectedPrinter,
        formValue: {
          labelOrientation: "",
          offsetY: null,
          offsetX: null,
        },
      };
      updateSettingsQzSavedSetting({ ...payload });
      currentPrinterData = { ...currentPrinterData, ...payload };
      return payload;
    });
  };

  private updateSelectedPrinter(e: React.MouseEvent<HTMLLIElement, MouseEvent>, printerName: any) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ selectedPrinter: printerName });
    this.updateSettings(printerName);
    currentPrinterData.selectedPrinter = printerName;
  }

  private updateFormValues(
    value: string | number,
    InputType: "offsetX" | "offsetY" | "labelOrientation"
  ) {
    this.setState((oldState, _props) => ({
      formValue: { ...oldState.formValue, [InputType]: value },
    }));
  }
  render() {
    return (
      <ReactPortal wrapperId="react-portal-QZ-wrapper">
        <div>
          <div className={"wrapper"}>
            <div className={"printerInfo"}>
              {printerQz.isActive() && this.state.showSettings && !this.state.isConnecting ? (
                <div className={"formCtr"}>
                  <div>
                    <h4>Connected Printers</h4>
                  </div>
                  <ul>
                    {Array.isArray(this.state.printers) ? (
                      (this.state.printers || []).map((printerName) => (
                        <li
                          onClick={(e) => {
                            this.updateSelectedPrinter(e, printerName);
                          }}
                        >
                          {printerName === this.state.selectedPrinter && (
                            <i className="icon-check-circle" />
                          )}
                          <span className="printer-name">{printerName}</span>
                        </li>
                      ))
                    ) : (
                      <span>
                        <li>
                          <i className="icon-check-circle" />
                          <span className="printer-name">{this.state.printers}</span>
                        </li>
                      </span>
                    )}
                  </ul>

                  <label htmlFor="offsetX">offsetX: </label>
                  <input
                    type="number"
                    id="offsetX"
                    value={this.state.formValue.offsetX ?? 0}
                    onChange={(e) => {
                      this.updateFormValues(e.target.value, "offsetX");
                    }}
                  />
                  <br />
                  <label htmlFor="offsetY">offsetX: </label>
                  <input
                    type="number"
                    id="offsetY"
                    value={this.state.formValue.offsetY ?? 0}
                    onChange={(e) => {
                      this.updateFormValues(e.target.value, "offsetY");
                    }}
                  />
                  <br />
                  <label htmlFor="labelOrientation">label Orientation: </label>
                  <input
                    type="text"
                    id="labelOrientation"
                    value={this.state.formValue.labelOrientation ?? 0}
                    onChange={(e) => {
                      this.updateFormValues(e.target.value, "labelOrientation");
                    }}
                  />
                  <br />
                  <button className={"cancel apply"} onClick={this.applySettings}>
                    Apply
                  </button>
                  <button className={"cancel"} onClick={this.cancelSettings}>
                    Cancel
                  </button>
                </div>
              ) : printerQz.isActive() && !this.state.isConnecting ? (
                <button className={"primary"} onClick={this.onClickSettings}>
                  Printer connected {"\n"}
                  current selected: {this.state.selectedPrinter}
                </button>
              ) : (
                <div className={"settingCtr"}>
                  <div>
                    <h4>QZ tray is not running.</h4>
                    <br />
                    Please press <strong>Activate QZ Tray</strong> button and wait until QZ Tray is
                    active and then reload the page and try again.
                  </div>
                  <br />
                  <button
                    className={"primary"}
                    onClick={this.handleLaunchQz}
                    disabled={this.state.isConnecting}
                  >
                    {this.state.isConnecting ? "waiting..." : `Activate QZ Tray`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </ReactPortal>
    );
  }
}

export function printZplLabels({
  data,
  printerName,
}: {
  data: TZPLLabelData | Array<TZPLLabelData>;
  printerName: string;
}) {
  let labels = [];
  if (Array.isArray(data)) {
    labels = data.map((item) => {
      return generateLabel({ data: item, currentPrinterData });
    });
  } else {
    labels = [generateLabel({ data, currentPrinterData })];
  }

  print({ documents: labels, currentPrinterData, printerName });
}

export function printPDFs({
  data,
  printerName,
}: {
  data: Array<string> | string;
  printerName: string;
}) {
  let pdfs = [];
  if (Array.isArray(data)) {
    pdfs = data.map((item) => {
      return generatePDF({ pdfUrl: item });
    });
  } else {
    pdfs = [generatePDF({ pdfUrl: data })];
  }

  print({ documents: pdfs, printerName });
}

