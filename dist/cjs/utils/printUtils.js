"use strict";
// init the printers with the right url
//
// show small ui thahts you done well
// add btn to the small panal thats can open ui to add nums to it again
// show the current connect printer
// add many print functions
// printMultiplePDF
// printPDF
// printLabels
exports.__esModule = true;
exports.updateSettingsQzSavedSetting = exports.handleLaunchQzSoftware = exports.disconnectQZ = exports.init = void 0;
var tslib_1 = require("tslib");
var printQZ_1 = tslib_1.__importDefault(require("../utils/printQZ"));
function init(_a) {
    var signInApiUrl = _a.signInApiUrl, callback = _a.callback;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var PrintersData, pConfig, printConfig;
        return tslib_1.__generator(this, function (_b) {
            PrintersData = {
                isConnecting: false,
                showSettings: false,
                printer: "",
                printers: [],
                error: "",
                isLoading: false,
                selectedPrinter: "",
                offsetX: "",
                offsetY: "",
                labelOrientation: ""
            };
            pConfig = printQZ_1["default"].getPrinterConfig();
            printConfig = {
                selectedPrinter: pConfig ? pConfig.printer : "",
                offsetX: pConfig ? pConfig.offsetX : "",
                offsetY: pConfig ? pConfig.offsetY : "",
                labelOrientation: pConfig ? pConfig.labelOrientation : ""
            };
            printQZ_1["default"].setCertificate(signInApiUrl);
            if (!printQZ_1["default"].isActive()) {
                printQZ_1["default"]
                    .connect()
                    .then(function (data) {
                    var printer = Array.isArray(data) && data.length > 0 ? data[0] : data;
                    PrintersData = tslib_1.__assign(tslib_1.__assign({}, printConfig), { printer: printer, printers: data, isConnecting: false });
                })["catch"](function (error) {
                    PrintersData = {
                        error: error.error || error.message || error || "Error connecting to QZ Tray",
                        isConnecting: false
                    };
                });
            }
            callback(PrintersData);
            return [2 /*return*/];
        });
    });
}
exports.init = init;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function handleLaunchQzSoftware(callback) {
    printQZ_1["default"].launchQZ();
    sleep(8000).then(function () {
        window.location.reload();
    });
    callback();
}
exports.handleLaunchQzSoftware = handleLaunchQzSoftware;
function disconnectQZ() {
    printQZ_1["default"].disconnect();
}
exports.disconnectQZ = disconnectQZ;
function updateSettingsQzSavedSetting(setting, currentPrinter) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var selectedPrinter, offsetX, offsetY, labelOrientation;
        return tslib_1.__generator(this, function (_a) {
            selectedPrinter = setting.selectedPrinter, offsetX = setting.offsetX, offsetY = setting.offsetY, labelOrientation = setting.labelOrientation;
            printQZ_1["default"].setPrinterConfig({
                printer: currentPrinter === undefined || currentPrinter === null ? selectedPrinter : currentPrinter,
                offsetX: offsetX,
                offsetY: offsetY,
                labelOrientation: labelOrientation !== null && labelOrientation !== void 0 ? labelOrientation : ""
            });
            window.location.reload();
            return [2 /*return*/];
        });
    });
}
exports.updateSettingsQzSavedSetting = updateSettingsQzSavedSetting;
//# sourceMappingURL=printUtils.js.map