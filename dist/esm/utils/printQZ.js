import { __awaiter, __generator } from "tslib";
import { PrintSupport } from "../service";
// const qz = require("./print/qz");
import qz from "qz-tray";
// const certificateUrl =  '../../digital-certificate.txt';
var rawCertificate = "-----BEGIN CERTIFICATE-----\nMIIFFDCCAv6gAwIBAgIFMTQxNTUwCwYJKoZIhvcNAQEFMIGYMQswCQYDVQQGEwJV\nUzELMAkGA1UECAwCTlkxGzAZBgNVBAoMElFaIEluZHVzdHJpZXMsIExMQzEbMBkG\nA1UECwwSUVogSW5kdXN0cmllcywgTExDMRkwFwYDVQQDDBBxemluZHVzdHJpZXMu\nY29tMScwJQYJKoZIhvcNAQkBFhhzdXBwb3J0QHF6aW5kdXN0cmllcy5jb20wHhcN\nMjIwNTE3MDQwMDAwWhcNMjMwNTE4MDQwMDAwWjCB3jELMAkGA1UEBgwCQUUxDjAM\nBgNVBAgMBUR1YmFpMQ4wDAYDVQQHDAVEdWJhaTEXMBUGA1UECgwOTm9vbiBFY29t\nbWVyY2UxFzAVBgNVBAsMDk5vb24gRWNvbW1lcmNlMRcwFQYDVQQDDA5Ob29uIEVj\nb21tZXJjZTEmMCQGCSqGSIb3DQEJAQwXaW5mcmFzdHJ1Y3R1cmVAbm9vbi5jb20x\nPDA6BgNVBA0MM3JlbmV3YWwtb2YtMWNkZmI5MTgwMDRiMjVhNjg5NmJiMDNkZTVk\nOTJkZGQ1NjIyYWIwMzCCASAwCwYJKoZIhvcNAQEBA4IBDwAwggEKAoIBAQDhdt66\nvxH/z0B3nCe/wkZWrRZ6SNtgc0CVbKOJYc2mrTxqz628u4uUnrqO6GlmmefFKorj\nCqD6WH7zuJr/C5wPcoY+yZLP7wZCQpimbw2OsuNgI+TjXey/Yb/pI/rvfNsQzGex\nzXv5+6snbkEZXQuRUiB2vU1GZAYVWl+uSn7ThZMRTJPAxTe0aWGEOGNTMfWsC4BR\n5CeTf2+YyVNpgf31UBog3BQaYG9B9hZN+JgzHVAxqpd4dqa2WO3Bhr+0PfINOxAA\nvDJgFPAnpcJD1t0X9N341K/mhKhZ4Yv29hVwg+a45i88Clj3D7ucV3ZsuYZMEiDR\nTk5nkV8+h9PGJVLtAgMBAAGjIzAhMB8GA1UdIwQYMBaAFJCmULeE1LnqX/IFhBN4\nReipdVRcMAsGCSqGSIb3DQEBBQOCAgEAs77UfWaXWY5nilI+TJY0csaehg9hKv3B\nZ9VY0XCFIZvJEXJMRzJmeioANr+pWc0yhvr4VHGjQSMvJ79Y3OKJfVxAYsDo3A2Q\nxnPlT4WJDdMk9NCcI0xaoHRKnEhhzex5COr/+HqiR3/yD7MgBCHvTjWvMtVcFEFd\nWpvo3vMo80R6rMxqba8nhb/mXmSoUEHyYiSyPgwMG7OB76hK0/+DbqrlL35csBjg\nwalwIQZGjAO6MQ/Jpijl93FbyyXA6tEpWjvm9Hx258w9kbJjU/JL82au3R1YOFT2\nIiBYIx0411SzkW0XT8/0HUyapTf0Mi6jwopz2OOQ32FsIhrhpyjEEgneD2W8eioC\ncKOcYqclKaDYk9FWrov9cSlx+yXSuAFzcRB5PevShfhLH6paBuHWI18BPKcGrGMi\npQaXozCOMV2S8VWPXxt3cLx6cPanHIvd5KgwKeSUyBksWUzLEnhVIrIX/4UrCyzu\n9KIsZPEbqRkJCisA4hfpDAteDyzWGG0o01bK8HnCjOW+aLjGzFTq8V7a2Ugxsze9\n7HQqslcr2F0llWbe60auKRUs/bOZ2DWPivCU5LCqp3uRGMWKTTx4K7wQBJzMMgXU\nK2PAVyQdsQ6gwc0zV6gY85/mMOH3/+AYEHz+ZWdJ0j0KsxPR77uQ77NAYHOu6xZr\nTyb0zIjI4hE=\n-----END CERTIFICATE-----\n--START INTERMEDIATE CERT--\n-----BEGIN CERTIFICATE-----\nMIIFEjCCA/qgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwgawxCzAJBgNVBAYTAlVT\nMQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYDVQQKDBJRWiBJ\nbmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMsIExMQzEZMBcG\nA1UEAwwQcXppbmR1c3RyaWVzLmNvbTEnMCUGCSqGSIb3DQEJARYYc3VwcG9ydEBx\nemluZHVzdHJpZXMuY29tMB4XDTE1MDMwMjAwNTAxOFoXDTM1MDMwMjAwNTAxOFow\ngZgxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJOWTEbMBkGA1UECgwSUVogSW5kdXN0\ncmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMxGTAXBgNVBAMM\nEHF6aW5kdXN0cmllcy5jb20xJzAlBgkqhkiG9w0BCQEWGHN1cHBvcnRAcXppbmR1\nc3RyaWVzLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANTDgNLU\niohl/rQoZ2bTMHVEk1mA020LYhgfWjO0+GsLlbg5SvWVFWkv4ZgffuVRXLHrwz1H\nYpMyo+Zh8ksJF9ssJWCwQGO5ciM6dmoryyB0VZHGY1blewdMuxieXP7Kr6XD3GRM\nGAhEwTxjUzI3ksuRunX4IcnRXKYkg5pjs4nLEhXtIZWDLiXPUsyUAEq1U1qdL1AH\nEtdK/L3zLATnhPB6ZiM+HzNG4aAPynSA38fpeeZ4R0tINMpFThwNgGUsxYKsP9kh\n0gxGl8YHL6ZzC7BC8FXIB/0Wteng0+XLAVto56Pyxt7BdxtNVuVNNXgkCi9tMqVX\nxOk3oIvODDt0UoQUZ/umUuoMuOLekYUpZVk4utCqXXlB4mVfS5/zWB6nVxFX8Io1\n9FOiDLTwZVtBmzmeikzb6o1QLp9F2TAvlf8+DIGDOo0DpPQUtOUyLPCh5hBaDGFE\nZhE56qPCBiQIc4T2klWX/80C5NZnd/tJNxjyUyk7bjdDzhzT10CGRAsqxAnsjvMD\n2KcMf3oXN4PNgyfpbfq2ipxJ1u777Gpbzyf0xoKwH9FYigmqfRH2N2pEdiYawKrX\n6pyXzGM4cvQ5X1Yxf2x/+xdTLdVaLnZgwrdqwFYmDejGAldXlYDl3jbBHVM1v+uY\n5ItGTjk+3vLrxmvGy5XFVG+8fF/xaVfo5TW5AgMBAAGjUDBOMB0GA1UdDgQWBBSQ\nplC3hNS56l/yBYQTeEXoqXVUXDAfBgNVHSMEGDAWgBQDRcZNwPqOqQvagw9BpW0S\nBkOpXjAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQAJIO8SiNr9jpLQ\neUsFUmbueoxyI5L+P5eV92ceVOJ2tAlBA13vzF1NWlpSlrMmQcVUE/K4D01qtr0k\ngDs6LUHvj2XXLpyEogitbBgipkQpwCTJVfC9bWYBwEotC7Y8mVjjEV7uXAT71GKT\nx8XlB9maf+BTZGgyoulA5pTYJ++7s/xX9gzSWCa+eXGcjguBtYYXaAjjAqFGRAvu\npz1yrDWcA6H94HeErJKUXBakS0Jm/V33JDuVXY+aZ8EQi2kV82aZbNdXll/R6iGw\n2ur4rDErnHsiphBgZB71C5FD4cdfSONTsYxmPmyUb5T+KLUouxZ9B0Wh28ucc1Lp\nrbO7BnjW\n-----END CERTIFICATE-----";
// const printerName = 'zebra';
var printerQz = {
    /** connect to qz printer
     * @function connect
     * @return {object} connected printer qz instance
     */
    connect: function () {
        return __awaiter(this, void 0, void 0, function () {
            var pconfig, printerName, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        pconfig = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("pconfig") || "") : {};
                        printerName = pconfig ? pconfig.printer : "";
                        qz.api.setPromiseType(function (resolver) {
                            return new Promise(resolver);
                        });
                        return [4 /*yield*/, qz.websocket.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, qz.printers.find(printerName)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    disconnect: function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, qz.websocket.disconnect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    printGeneratedLabels: function (printerName, labels) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, qz.configs.create(printerName)];
                    case 1:
                        config = _a.sent();
                        return [4 /*yield*/, qz.print(config, labels)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    isActive: function () {
        return qz.websocket.isActive();
    },
    launchQZ: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!qz.websocket.isActive()) {
                    window.location.assign("qz:launch");
                }
                return [2 /*return*/];
            });
        });
    },
    setCertificate: function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, qz.security.setCertificatePromise(function (resolve) {
                                return resolve(rawCertificate);
                            })];
                    case 1:
                        _a.sent();
                        qz.security.setSignaturePromise(function (toSign) {
                            return function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                var signature;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, PrintSupport.sign({ url: url, toSign: toSign })];
                                        case 1:
                                            signature = _a.sent();
                                            resolve(signature);
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1, "error in cert");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    getPrinterConfig: function () {
        return typeof window !== "undefined" ? JSON.parse(localStorage.getItem("pconfig") || "") : {};
    },
    setPrinterConfig: function (config) {
        return localStorage.setItem("pconfig", JSON.stringify(config));
    }
};
export default printerQz;
//# sourceMappingURL=printQZ.js.map