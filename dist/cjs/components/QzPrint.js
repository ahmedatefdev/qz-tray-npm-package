"use strict";
exports.__esModule = true;
exports.printPDFs = exports.printZplLabels = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var ReactPortal_1 = tslib_1.__importDefault(require("./ReactPortal"));
var printQZ_1 = tslib_1.__importDefault(require("../utils/printQZ"));
require("../css/style.css");
var printUtils_1 = require("../utils/printUtils");
var printTypes_1 = require("../utils/printTypes");
var currentPrinterData = {
    printer: "",
    printers: [],
    selectedPrinter: "",
    offsetX: "",
    offsetY: "",
    labelOrientation: ""
};
var QZPrintUI = /** @class */ (function (_super) {
    tslib_1.__extends(QZPrintUI, _super);
    function QZPrintUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = tslib_1.__assign(tslib_1.__assign({}, currentPrinterData), { printers: [], isConnecting: false, showSettings: false, isLoading: false, error: "", formValue: {
                labelOrientation: "",
                offsetY: null,
                offsetX: null
            } });
        _this.handleLaunchQz = function () {
            (0, printUtils_1.handleLaunchQzSoftware)(function () {
                _this.setState({
                    isConnecting: true
                });
            });
        };
        _this.updateSettings = function (currentPrinter) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                (0, printUtils_1.updateSettingsQzSavedSetting)(this.state, currentPrinter);
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
                (0, printUtils_1.updateSettingsQzSavedSetting)(tslib_1.__assign({}, payload));
                currentPrinterData = tslib_1.__assign(tslib_1.__assign({}, currentPrinterData), payload);
                return payload;
            });
        };
        return _this;
    }
    QZPrintUI.prototype.componentDidMount = function () {
        var _this = this;
        (0, printUtils_1.init)({
            signInApiUrl: "qz/url",
            callback: function (printerData) {
                _this.setState(tslib_1.__assign({}, printerData));
                currentPrinterData = tslib_1.__assign(tslib_1.__assign({}, currentPrinterData), printerData);
            }
        });
    };
    QZPrintUI.prototype.componentWillUnmount = function () {
        (0, printUtils_1.disconnectQZ)();
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
                formValue: tslib_1.__assign(tslib_1.__assign({}, oldState.formValue), (_a = {}, _a[InputType] = value, _a))
            });
        });
    };
    QZPrintUI.prototype.render = function () {
        var _this = this;
        var _a, _b, _c;
        return (react_1["default"].createElement(ReactPortal_1["default"], { wrapperId: "react-portal-QZ-wrapper" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("div", { className: "wrapper" },
                    react_1["default"].createElement("div", { className: "printerInfo" }, printQZ_1["default"].isActive() && this.state.showSettings && !this.state.isConnecting ? (react_1["default"].createElement("div", { className: "formCtr" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("h4", null, "Connected Printers")),
                        react_1["default"].createElement("ul", null, Array.isArray(this.state.printers) ? ((this.state.printers || []).map(function (printerName) { return (react_1["default"].createElement("li", { onClick: function (e) {
                                _this.updateSelectedPrinter(e, printerName);
                            } },
                            printerName === _this.state.selectedPrinter && (react_1["default"].createElement("i", { className: "icon-check-circle" })),
                            react_1["default"].createElement("span", { className: "printer-name" }, printerName))); })) : (react_1["default"].createElement("span", null,
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("i", { className: "icon-check-circle" }),
                                react_1["default"].createElement("span", { className: "printer-name" }, this.state.printers))))),
                        react_1["default"].createElement("label", { htmlFor: "offsetX" }, "offsetX: "),
                        react_1["default"].createElement("input", { type: "number", id: "offsetX", value: (_a = this.state.formValue.offsetX) !== null && _a !== void 0 ? _a : 0, onChange: function (e) {
                                _this.updateFormValues(e.target.value, "offsetX");
                            } }),
                        react_1["default"].createElement("br", null),
                        react_1["default"].createElement("label", { htmlFor: "offsetY" }, "offsetX: "),
                        react_1["default"].createElement("input", { type: "number", id: "offsetY", value: (_b = this.state.formValue.offsetY) !== null && _b !== void 0 ? _b : 0, onChange: function (e) {
                                _this.updateFormValues(e.target.value, "offsetY");
                            } }),
                        react_1["default"].createElement("br", null),
                        react_1["default"].createElement("label", { htmlFor: "labelOrientation" }, "label Orientation: "),
                        react_1["default"].createElement("input", { type: "text", id: "labelOrientation", value: (_c = this.state.formValue.labelOrientation) !== null && _c !== void 0 ? _c : 0, onChange: function (e) {
                                _this.updateFormValues(e.target.value, "labelOrientation");
                            } }),
                        react_1["default"].createElement("br", null),
                        react_1["default"].createElement("button", { className: "cancel apply", onClick: this.applySettings }, "Apply"),
                        react_1["default"].createElement("button", { className: "cancel", onClick: this.cancelSettings }, "Cancel"))) : printQZ_1["default"].isActive() && !this.state.isConnecting ? (react_1["default"].createElement("button", { className: "primary", onClick: this.onClickSettings },
                        "Printer connected ",
                        "\n",
                        "current selected: ",
                        this.state.selectedPrinter)) : (react_1["default"].createElement("div", { className: "settingCtr" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("h4", null, "QZ tray is not running."),
                            react_1["default"].createElement("br", null),
                            "Please press ",
                            react_1["default"].createElement("strong", null, "Activate QZ Tray"),
                            " button and wait until QZ Tray is active and then reload the page and try again."),
                        react_1["default"].createElement("br", null),
                        react_1["default"].createElement("button", { className: "primary", onClick: this.handleLaunchQz, disabled: this.state.isConnecting }, this.state.isConnecting ? "waiting..." : "Activate QZ Tray"))))))));
    };
    return QZPrintUI;
}(react_1.Component));
exports["default"] = QZPrintUI;
function printZplLabels(_a) {
    var data = _a.data, printerName = _a.printerName;
    var labels = [];
    if (Array.isArray(data)) {
        labels = data.map(function (item) {
            return (0, printTypes_1.generateLabel)({ data: item, currentPrinterData: currentPrinterData });
        });
    }
    else {
        labels = [(0, printTypes_1.generateLabel)({ data: data, currentPrinterData: currentPrinterData })];
    }
    (0, printTypes_1.print)({ documents: labels, currentPrinterData: currentPrinterData, printerName: printerName });
}
exports.printZplLabels = printZplLabels;
function printPDFs(_a) {
    var data = _a.data, printerName = _a.printerName;
    var pdfs = [];
    if (Array.isArray(data)) {
        pdfs = data.map(function (item) {
            return (0, printTypes_1.generatePDF)({ pdfUrl: item });
        });
    }
    else {
        pdfs = [(0, printTypes_1.generatePDF)({ pdfUrl: data })];
    }
    (0, printTypes_1.print)({ documents: pdfs, printerName: printerName });
}
exports.printPDFs = printPDFs;
// export function printPDF({ prioctsize, barcode, weight }) {}
// export function printBarcode() {}
//# sourceMappingURL=QzPrint.js.map