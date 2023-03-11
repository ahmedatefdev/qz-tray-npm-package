import { __assign, __awaiter, __extends, __generator } from "tslib";
import React, { Component } from "react";
import ReactPortal from "./ReactPortal";
import printerQz from "../utils/printQZ";
import "../css/style.css";
import { init, disconnectQZ, handleLaunchQzSoftware, updateSettingsQzSavedSetting, } from "../utils/printUtils";
import { generateLabel, generatePDF, print } from "../utils/printTypes";
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
        _this.state = __assign(__assign({}, currentPrinterData), { printers: [], isConnecting: false, showSettings: false, isLoading: false, error: "", formValue: {
                labelOrientation: "",
                offsetY: null,
                offsetX: null
            } });
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
        _this.applySettings = function () {
            _this.setState(function (prevState, _props) {
                var payload = {
                    offsetX: prevState.formValue.offsetX || "",
                    offsetY: prevState.formValue.offsetY || "",
                    labelOrientation: prevState.formValue.labelOrientation || "",
                    selectedPrinter: prevState.selectedPrinter,
                    formValue: {
                        labelOrientation: "",
                        offsetY: null,
                        offsetX: null
                    }
                };
                updateSettingsQzSavedSetting(__assign({}, payload));
                currentPrinterData = __assign(__assign({}, currentPrinterData), payload);
                return payload;
            });
        };
        return _this;
    }
    QZPrintUI.prototype.componentDidMount = function () {
        var _this = this;
        init({
            signInApiUrl: "qz/url",
            callback: function (printerData) {
                _this.setState(__assign({}, printerData));
                currentPrinterData = __assign(__assign({}, currentPrinterData), printerData);
            }
        });
    };
    QZPrintUI.prototype.componentWillUnmount = function () {
        disconnectQZ();
    };
    QZPrintUI.prototype.updateSelectedPrinter = function (e, printerName) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ selectedPrinter: printerName });
        this.updateSettings(printerName);
        currentPrinterData.selectedPrinter = printerName;
    };
    QZPrintUI.prototype.updateFormValues = function (value, InputType) {
        this.setState(function (oldState, _props) {
            var _a;
            return ({
                formValue: __assign(__assign({}, oldState.formValue), (_a = {}, _a[InputType] = value, _a))
            });
        });
    };
    QZPrintUI.prototype.render = function () {
        var _this = this;
        var _a, _b, _c;
        return (React.createElement(ReactPortal, { wrapperId: "react-portal-QZ-wrapper" },
            React.createElement("div", null,
                React.createElement("div", { className: "wrapper" },
                    React.createElement("div", { className: "printerInfo" }, printerQz.isActive() && this.state.showSettings && !this.state.isConnecting ? (React.createElement("div", { className: "formCtr" },
                        React.createElement("div", null,
                            React.createElement("h4", null, "Connected Printers")),
                        React.createElement("ul", null, Array.isArray(this.state.printers) ? ((this.state.printers || []).map(function (printerName) { return (React.createElement("li", { onClick: function (e) {
                                _this.updateSelectedPrinter(e, printerName);
                            } },
                            printerName === _this.state.selectedPrinter && (React.createElement("i", { className: "icon-check-circle" })),
                            React.createElement("span", { className: "printer-name" }, printerName))); })) : (React.createElement("span", null,
                            React.createElement("li", null,
                                React.createElement("i", { className: "icon-check-circle" }),
                                React.createElement("span", { className: "printer-name" }, this.state.printers))))),
                        React.createElement("label", { htmlFor: "offsetX" }, "offsetX: "),
                        React.createElement("input", { type: "number", id: "offsetX", value: (_a = this.state.formValue.offsetX) !== null && _a !== void 0 ? _a : 0, onChange: function (e) {
                                _this.updateFormValues(e.target.value, "offsetX");
                            } }),
                        React.createElement("br", null),
                        React.createElement("label", { htmlFor: "offsetY" }, "offsetX: "),
                        React.createElement("input", { type: "number", id: "offsetY", value: (_b = this.state.formValue.offsetY) !== null && _b !== void 0 ? _b : 0, onChange: function (e) {
                                _this.updateFormValues(e.target.value, "offsetY");
                            } }),
                        React.createElement("br", null),
                        React.createElement("label", { htmlFor: "labelOrientation" }, "label Orientation: "),
                        React.createElement("input", { type: "text", id: "labelOrientation", value: (_c = this.state.formValue.labelOrientation) !== null && _c !== void 0 ? _c : 0, onChange: function (e) {
                                _this.updateFormValues(e.target.value, "labelOrientation");
                            } }),
                        React.createElement("br", null),
                        React.createElement("button", { className: "cancel apply", onClick: this.applySettings }, "Apply"),
                        React.createElement("button", { className: "cancel", onClick: this.cancelSettings }, "Cancel"))) : printerQz.isActive() && !this.state.isConnecting ? (React.createElement("button", { className: "primary", onClick: this.onClickSettings },
                        "Printer connected ",
                        "\n",
                        "current selected: ",
                        this.state.selectedPrinter)) : (React.createElement("div", { className: "settingCtr" },
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
export function printZplLabels(_a) {
    var data = _a.data, printerName = _a.printerName;
    var labels = [];
    if (Array.isArray(data)) {
        labels = data.map(function (item) {
            return generateLabel({ data: item, currentPrinterData: currentPrinterData });
        });
    }
    else {
        labels = [generateLabel({ data: data, currentPrinterData: currentPrinterData })];
    }
    print({ documents: labels, currentPrinterData: currentPrinterData, printerName: printerName });
}
export function printPDFs(_a) {
    var data = _a.data, printerName = _a.printerName;
    var pdfs = [];
    if (Array.isArray(data)) {
        pdfs = data.map(function (item) {
            return generatePDF({ pdfUrl: item });
        });
    }
    else {
        pdfs = [generatePDF({ pdfUrl: data })];
    }
    print({ documents: pdfs, printerName: printerName });
}
// export function printPDF({ prioctsize, barcode, weight }) {}
// export function printBarcode() {}
//# sourceMappingURL=QzPrint.js.map