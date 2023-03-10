import React, { Component } from "react";
import ReactPortal from "./ReactPortal";
import "../css/style.css";
import printerQz from "../utils/printQZ";

import {
  init,
  disconnectQZ,
  handleLaunchQzSoftware,
  updateSettingsQzSavedSetting,
} from "../utils/printUtils";
import { TPrintersData } from "../types";

let currentPrinterData: TPrintersData = {
  printer: "",
  printers: [],
  selectedPrinter: "",
  offsetX: "",
  offsetY: "",
  labelOrientation: "",
};

export default class QZPrintUI extends Component {
  state = {
    ...currentPrinterData,
    printers: [],
    isConnecting: false,
    showSettings: false,
    isLoading: false,
    error: "",
  };

  componentDidMount() {
    init({
      signInApiUrl: "qz/url",
      callback: (printerData: TPrintersData) => {
        this.setState(printerData);
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

  updateSettings = async (currentPrinter: any) => {
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

  render() {
    return (
      <ReactPortal wrapperId="react-portal-QZ-wrapper">
        <div>
          <div className={"wrapper"}>
            <div className={"printerInfo"}>
              {printerQz.isActive() && this.state.showSettings ? (
                <div className={"formCtr"}>
                  <div>
                    <h4>Connected Printers</h4>
                  </div>
                  <ul>
                    {Array.isArray(this.state.printers) ? (
                      (this.state.printers || []).map((printerName) => (
                        <li
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.setState({ selectedPrinter: printerName });
                            this.updateSettings(printerName);
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
                  <button className={"cancel"} onClick={this.cancelSettings}>
                    Cancel
                  </button>
                  {/* add labelOrientation */}
                  {/* add offsetX */}
                  {/* add offsetY */}
                </div>
              ) : printerQz.isActive() ? (
                <button className={"primary"} onClick={this.onClickSettings}>
                  Printer connected
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

// export function printLabelZplShape({ barcode, productName }) {}

// export function printPDF({ prioctsize, barcode, weight }) {}

// export function printBarcode() {}
