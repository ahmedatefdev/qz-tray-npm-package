"use strict";
exports.__esModule = true;
exports.generatePDF = exports.generateLabel = exports.print = void 0;
var tslib_1 = require("tslib");
var printQZ_1 = tslib_1.__importDefault(require("./printQZ"));
var qz_tray_1 = tslib_1.__importDefault(require("qz-tray"));
function print(_a) {
    var documents = _a.documents, currentPrinterData = _a.currentPrinterData, printerName = _a.printerName;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _b, printer, selectedPrinter, labelOrientation, _c, options, currentPrinter, config, e_1;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = currentPrinterData;
                    if (_c) return [3 /*break*/, 2];
                    return [4 /*yield*/, printQZ_1["default"].getPrinterConfig()];
                case 1:
                    _c = (_d.sent());
                    _d.label = 2;
                case 2:
                    _b = _c || {}, printer = _b.printer, selectedPrinter = _b.selectedPrinter, labelOrientation = _b.labelOrientation;
                    if (!documents[0] || (!printerName && !printer && !selectedPrinter)) {
                        return [2 /*return*/, false];
                    }
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 6, , 7]);
                    options = {};
                    if (labelOrientation) {
                        options.orientation = labelOrientation;
                    }
                    else if (documents.some(function (item) { return item.type === "pdf"; })) {
                        options.orientation = labelOrientation || "portrait";
                    }
                    currentPrinter = printerName || selectedPrinter || printer;
                    return [4 /*yield*/, qz_tray_1["default"].configs.create(currentPrinter, options)];
                case 4:
                    config = _d.sent();
                    return [4 /*yield*/, qz_tray_1["default"].print(config, documents.map(function (item) { return item.data; }))];
                case 5: return [2 /*return*/, _d.sent()];
                case 6:
                    e_1 = _d.sent();
                    console.log("print error:", e_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.print = print;
function generateLabel(_a) {
    var data = _a.data, currentPrinterData = _a.currentPrinterData;
    var qty = data.qty || 1;
    var _b = currentPrinterData || printQZ_1["default"].getPrinterConfig() || {}, _c = _b.offsetX, offsetX = _c === void 0 ? 0 : _c, _d = _b.offsetY, offsetY = _d === void 0 ? 0 : _d;
    var zplLabel = "\n        ^XA\n        ^FX section with bar code.\n        ^FO".concat(Number(offsetX) + 30, ",").concat(Number(offsetY) + 30, "^BY2^BCN,60,N,,,A^FD").concat(data.barcode, "^FS\n        ^FX section with details.\n        ^CF0,22\n        ^FO120,100^FD").concat(data.barcode, "^FS\n        ^CF0,20\n        ^FO30,130^FD").concat(Number(offsetX) + 30, ",").concat(Number(offsetY) + 115, "^FD").concat(data.id_partner, "^FS\n        ^FO30,155^FD").concat(Number(offsetX) + 30, ",").concat(Number(offsetY) + 135, "^FD").concat(data.pbarcode || "", "^FS\n        ^PQ").concat(qty, "\n        ^JZN\n        ^XZ\n      ");
    return { type: "zpl", data: zplLabel, ref: "zplLabel" };
}
exports.generateLabel = generateLabel;
function generatePDF(_a) {
    var pdfUrl = _a.pdfUrl;
    return {
        type: "pdf",
        data: pdfUrl
    };
}
exports.generatePDF = generatePDF;
//# sourceMappingURL=printTypes.js.map