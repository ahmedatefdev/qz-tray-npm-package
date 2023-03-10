import { __assign, __awaiter, __extends, __generator } from "tslib";
import React, { Component } from "react";
import ReactPortal from "./ReactPortal";
// import "./style.css";
import printerQz from "../utils/printQZ";
import { init, disconnectQZ, handleLaunchQzSoftware, updateSettingsQzSavedSetting, } from "../utils/printUtils";
var currentPrinterData = {
    printer: "",
    printers: [],
    selectedPrinter: "",
    offsetX: "",
    offsetY: "",
    labelOrientation: ""
};
var QZPrintUI = /** @class */ (function (_super) {
    __extends(QZPrintUI, _super);
    function QZPrintUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = __assign(__assign({}, currentPrinterData), { printers: [], isConnecting: false, showSettings: false, isLoading: false, error: "" });
        _this.handleLaunchQz = function () {
            handleLaunchQzSoftware(function () {
                _this.setState({
                    isConnecting: true
                });
            });
        };
        _this.updateSettings = function (currentPrinter) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                updateSettingsQzSavedSetting(this.state, currentPrinter);
                return [2 /*return*/];
            });
        }); };
        _this.onClickSettings = function () {
            _this.setState({
                showSettings: true
            });
        };
        _this.cancelSettings = function () {
            _this.setState({
                showSettings: false
            });
        };
        return _this;
    }
    QZPrintUI.prototype.componentDidMount = function () {
        var _this = this;
        init({
            signInApiUrl: "qz/url",
            callback: function (printerData) {
                _this.setState(printerData);
                currentPrinterData = __assign(__assign({}, currentPrinterData), printerData);
            }
        });
    };
    QZPrintUI.prototype.componentWillUnmount = function () {
        disconnectQZ();
    };
    QZPrintUI.prototype.render = function () {
        var _this = this;
        return (React.createElement(ReactPortal, { wrapperId: "react-portal-QZ-wrapper" },
            React.createElement("div", null,
                React.createElement("div", { className: "wrapper" },
                    React.createElement("div", { className: "printerInfo" }, printerQz.isActive() && this.state.showSettings ? (React.createElement("div", { className: "formCtr" },
                        React.createElement("div", null,
                            React.createElement("h4", null, "Connected Printers")),
                        React.createElement("ul", null, Array.isArray(this.state.printers) ? ((this.state.printers || []).map(function (printerName) { return (React.createElement("li", { onClick: function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                _this.setState({ selectedPrinter: printerName });
                                _this.updateSettings(printerName);
                            } },
                            printerName === _this.state.selectedPrinter && (React.createElement("i", { className: "icon-check-circle" })),
                            React.createElement("span", { className: "printer-name" }, printerName))); })) : (React.createElement("span", null,
                            React.createElement("li", null,
                                React.createElement("i", { className: "icon-check-circle" }),
                                React.createElement("span", { className: "printer-name" }, this.state.printers))))),
                        React.createElement("button", { className: "cancel", onClick: this.cancelSettings }, "Cancel"))) : printerQz.isActive() ? (React.createElement("button", { className: "primary", onClick: this.onClickSettings }, "Printer connected")) : (React.createElement("div", { className: "settingCtr" },
                        React.createElement("div", null,
                            React.createElement("h4", null, "QZ tray is not running."),
                            React.createElement("br", null),
                            "Please press ",
                            React.createElement("strong", null, "Activate QZ Tray"),
                            " button and wait until QZ Tray is active and then reload the page and try again."),
                        React.createElement("br", null),
                        React.createElement("button", { className: "primary", onClick: this.handleLaunchQz, disabled: this.state.isConnecting }, this.state.isConnecting ? "waiting..." : "Activate QZ Tray"))))))));
    };
    return QZPrintUI;
}(Component));
export default QZPrintUI;
// export function printLabelZplShape({ barcode, productName }) {}
// export function printPDF({ prioctsize, barcode, weight }) {}
// export function printBarcode() {}
//# sourceMappingURL=QzPrintUI.js.map