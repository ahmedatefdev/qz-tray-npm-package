"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var ReactPortal_1 = tslib_1.__importDefault(require("./ReactPortal"));
// import "./style.css";
var printQZ_1 = tslib_1.__importDefault(require("../utils/printQZ"));
var printUtils_1 = require("../utils/printUtils");
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
        _this.state = tslib_1.__assign(tslib_1.__assign({}, currentPrinterData), { printers: [], isConnecting: false, showSettings: false, isLoading: false, error: "" });
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
        return _this;
    }
    QZPrintUI.prototype.componentDidMount = function () {
        var _this = this;
        (0, printUtils_1.init)({
            signInApiUrl: "qz/url",
            callback: function (printerData) {
                _this.setState(printerData);
                currentPrinterData = tslib_1.__assign(tslib_1.__assign({}, currentPrinterData), printerData);
            }
        });
    };
    QZPrintUI.prototype.componentWillUnmount = function () {
        (0, printUtils_1.disconnectQZ)();
    };
    QZPrintUI.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(ReactPortal_1["default"], { wrapperId: "react-portal-QZ-wrapper" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("div", { className: "wrapper" },
                    react_1["default"].createElement("div", { className: "printerInfo" }, printQZ_1["default"].isActive() && this.state.showSettings ? (react_1["default"].createElement("div", { className: "formCtr" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("h4", null, "Connected Printers")),
                        react_1["default"].createElement("ul", null, Array.isArray(this.state.printers) ? ((this.state.printers || []).map(function (printerName) { return (react_1["default"].createElement("li", { onClick: function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                _this.setState({ selectedPrinter: printerName });
                                _this.updateSettings(printerName);
                            } },
                            printerName === _this.state.selectedPrinter && (react_1["default"].createElement("i", { className: "icon-check-circle" })),
                            react_1["default"].createElement("span", { className: "printer-name" }, printerName))); })) : (react_1["default"].createElement("span", null,
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement("i", { className: "icon-check-circle" }),
                                react_1["default"].createElement("span", { className: "printer-name" }, this.state.printers))))),
                        react_1["default"].createElement("button", { className: "cancel", onClick: this.cancelSettings }, "Cancel"))) : printQZ_1["default"].isActive() ? (react_1["default"].createElement("button", { className: "primary", onClick: this.onClickSettings }, "Printer connected")) : (react_1["default"].createElement("div", { className: "settingCtr" },
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
// export function printLabelZplShape({ barcode, productName }) {}
// export function printPDF({ prioctsize, barcode, weight }) {}
// export function printBarcode() {}
//# sourceMappingURL=QzPrintUI.js.map