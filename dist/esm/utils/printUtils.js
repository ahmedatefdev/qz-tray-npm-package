// init the printers with the right url
//
// show small ui thahts you done well
// add btn to the small panal thats can open ui to add nums to it again
// show the current connect printer
// add many print functions
// printMultiplePDF
// printPDF
// printLabels
import { __assign, __awaiter, __generator } from "tslib";
import printerQz from "../utils/printQZ";
function init(_a) {
    var signInApiUrl = _a.signInApiUrl, callback = _a.callback;
    return __awaiter(this, void 0, void 0, function () {
        var PrintersData, pConfig, printConfig;
        return __generator(this, function (_b) {
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
            pConfig = printerQz.getPrinterConfig();
            printConfig = {
                selectedPrinter: pConfig ? pConfig.printer : "",
                offsetX: pConfig ? pConfig.offsetX : "",
                offsetY: pConfig ? pConfig.offsetY : "",
                labelOrientation: pConfig ? pConfig.labelOrientation : ""
            };
            printerQz.setCertificate(signInApiUrl);
            if (!printerQz.isActive()) {
                printerQz
                    .connect()
                    .then(function (data) {
                    var printer = Array.isArray(data) && data.length > 0 ? data[0] : data;
                    PrintersData = __assign(__assign({}, printConfig), { printer: printer, printers: data, isConnecting: false });
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
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function handleLaunchQzSoftware(callback) {
    printerQz.launchQZ();
    sleep(8000).then(function () {
        window.location.reload();
    });
    callback();
}
function disconnectQZ() {
    printerQz.disconnect();
}
function updateSettingsQzSavedSetting(setting, currentPrinter) {
    return __awaiter(this, void 0, void 0, function () {
        var selectedPrinter, offsetX, offsetY;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    selectedPrinter = setting.selectedPrinter, offsetX = setting.offsetX, offsetY = setting.offsetY;
                    return [4 /*yield*/, printerQz.setPrinterConfig({
                            printer: currentPrinter === undefined || currentPrinter === null ? selectedPrinter : currentPrinter,
                            offsetX: offsetX,
                            offsetY: offsetY
                        })];
                case 1:
                    _a.sent();
                    window.location.reload();
                    return [2 /*return*/];
            }
        });
    });
}
export { init, disconnectQZ, handleLaunchQzSoftware, updateSettingsQzSavedSetting };
//# sourceMappingURL=printUtils.js.map