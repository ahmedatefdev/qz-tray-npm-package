import { PrintSupport } from "../service";
// const qz = require("./print/qz");
import qz from "qz-tray";

// const certificateUrl =  '../../digital-certificate.txt';
const rawCertificate = `-----BEGIN CERTIFICATE-----
MIIFFDCCAv6gAwIBAgIFMTQxNTUwCwYJKoZIhvcNAQEFMIGYMQswCQYDVQQGEwJV
UzELMAkGA1UECAwCTlkxGzAZBgNVBAoMElFaIEluZHVzdHJpZXMsIExMQzEbMBkG
A1UECwwSUVogSW5kdXN0cmllcywgTExDMRkwFwYDVQQDDBBxemluZHVzdHJpZXMu
Y29tMScwJQYJKoZIhvcNAQkBFhhzdXBwb3J0QHF6aW5kdXN0cmllcy5jb20wHhcN
MjIwNTE3MDQwMDAwWhcNMjMwNTE4MDQwMDAwWjCB3jELMAkGA1UEBgwCQUUxDjAM
BgNVBAgMBUR1YmFpMQ4wDAYDVQQHDAVEdWJhaTEXMBUGA1UECgwOTm9vbiBFY29t
bWVyY2UxFzAVBgNVBAsMDk5vb24gRWNvbW1lcmNlMRcwFQYDVQQDDA5Ob29uIEVj
b21tZXJjZTEmMCQGCSqGSIb3DQEJAQwXaW5mcmFzdHJ1Y3R1cmVAbm9vbi5jb20x
PDA6BgNVBA0MM3JlbmV3YWwtb2YtMWNkZmI5MTgwMDRiMjVhNjg5NmJiMDNkZTVk
OTJkZGQ1NjIyYWIwMzCCASAwCwYJKoZIhvcNAQEBA4IBDwAwggEKAoIBAQDhdt66
vxH/z0B3nCe/wkZWrRZ6SNtgc0CVbKOJYc2mrTxqz628u4uUnrqO6GlmmefFKorj
CqD6WH7zuJr/C5wPcoY+yZLP7wZCQpimbw2OsuNgI+TjXey/Yb/pI/rvfNsQzGex
zXv5+6snbkEZXQuRUiB2vU1GZAYVWl+uSn7ThZMRTJPAxTe0aWGEOGNTMfWsC4BR
5CeTf2+YyVNpgf31UBog3BQaYG9B9hZN+JgzHVAxqpd4dqa2WO3Bhr+0PfINOxAA
vDJgFPAnpcJD1t0X9N341K/mhKhZ4Yv29hVwg+a45i88Clj3D7ucV3ZsuYZMEiDR
Tk5nkV8+h9PGJVLtAgMBAAGjIzAhMB8GA1UdIwQYMBaAFJCmULeE1LnqX/IFhBN4
ReipdVRcMAsGCSqGSIb3DQEBBQOCAgEAs77UfWaXWY5nilI+TJY0csaehg9hKv3B
Z9VY0XCFIZvJEXJMRzJmeioANr+pWc0yhvr4VHGjQSMvJ79Y3OKJfVxAYsDo3A2Q
xnPlT4WJDdMk9NCcI0xaoHRKnEhhzex5COr/+HqiR3/yD7MgBCHvTjWvMtVcFEFd
Wpvo3vMo80R6rMxqba8nhb/mXmSoUEHyYiSyPgwMG7OB76hK0/+DbqrlL35csBjg
walwIQZGjAO6MQ/Jpijl93FbyyXA6tEpWjvm9Hx258w9kbJjU/JL82au3R1YOFT2
IiBYIx0411SzkW0XT8/0HUyapTf0Mi6jwopz2OOQ32FsIhrhpyjEEgneD2W8eioC
cKOcYqclKaDYk9FWrov9cSlx+yXSuAFzcRB5PevShfhLH6paBuHWI18BPKcGrGMi
pQaXozCOMV2S8VWPXxt3cLx6cPanHIvd5KgwKeSUyBksWUzLEnhVIrIX/4UrCyzu
9KIsZPEbqRkJCisA4hfpDAteDyzWGG0o01bK8HnCjOW+aLjGzFTq8V7a2Ugxsze9
7HQqslcr2F0llWbe60auKRUs/bOZ2DWPivCU5LCqp3uRGMWKTTx4K7wQBJzMMgXU
K2PAVyQdsQ6gwc0zV6gY85/mMOH3/+AYEHz+ZWdJ0j0KsxPR77uQ77NAYHOu6xZr
Tyb0zIjI4hE=
-----END CERTIFICATE-----
--START INTERMEDIATE CERT--
-----BEGIN CERTIFICATE-----
MIIFEjCCA/qgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwgawxCzAJBgNVBAYTAlVT
MQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYDVQQKDBJRWiBJ
bmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMsIExMQzEZMBcG
A1UEAwwQcXppbmR1c3RyaWVzLmNvbTEnMCUGCSqGSIb3DQEJARYYc3VwcG9ydEBx
emluZHVzdHJpZXMuY29tMB4XDTE1MDMwMjAwNTAxOFoXDTM1MDMwMjAwNTAxOFow
gZgxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJOWTEbMBkGA1UECgwSUVogSW5kdXN0
cmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMxGTAXBgNVBAMM
EHF6aW5kdXN0cmllcy5jb20xJzAlBgkqhkiG9w0BCQEWGHN1cHBvcnRAcXppbmR1
c3RyaWVzLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANTDgNLU
iohl/rQoZ2bTMHVEk1mA020LYhgfWjO0+GsLlbg5SvWVFWkv4ZgffuVRXLHrwz1H
YpMyo+Zh8ksJF9ssJWCwQGO5ciM6dmoryyB0VZHGY1blewdMuxieXP7Kr6XD3GRM
GAhEwTxjUzI3ksuRunX4IcnRXKYkg5pjs4nLEhXtIZWDLiXPUsyUAEq1U1qdL1AH
EtdK/L3zLATnhPB6ZiM+HzNG4aAPynSA38fpeeZ4R0tINMpFThwNgGUsxYKsP9kh
0gxGl8YHL6ZzC7BC8FXIB/0Wteng0+XLAVto56Pyxt7BdxtNVuVNNXgkCi9tMqVX
xOk3oIvODDt0UoQUZ/umUuoMuOLekYUpZVk4utCqXXlB4mVfS5/zWB6nVxFX8Io1
9FOiDLTwZVtBmzmeikzb6o1QLp9F2TAvlf8+DIGDOo0DpPQUtOUyLPCh5hBaDGFE
ZhE56qPCBiQIc4T2klWX/80C5NZnd/tJNxjyUyk7bjdDzhzT10CGRAsqxAnsjvMD
2KcMf3oXN4PNgyfpbfq2ipxJ1u777Gpbzyf0xoKwH9FYigmqfRH2N2pEdiYawKrX
6pyXzGM4cvQ5X1Yxf2x/+xdTLdVaLnZgwrdqwFYmDejGAldXlYDl3jbBHVM1v+uY
5ItGTjk+3vLrxmvGy5XFVG+8fF/xaVfo5TW5AgMBAAGjUDBOMB0GA1UdDgQWBBSQ
plC3hNS56l/yBYQTeEXoqXVUXDAfBgNVHSMEGDAWgBQDRcZNwPqOqQvagw9BpW0S
BkOpXjAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQAJIO8SiNr9jpLQ
eUsFUmbueoxyI5L+P5eV92ceVOJ2tAlBA13vzF1NWlpSlrMmQcVUE/K4D01qtr0k
gDs6LUHvj2XXLpyEogitbBgipkQpwCTJVfC9bWYBwEotC7Y8mVjjEV7uXAT71GKT
x8XlB9maf+BTZGgyoulA5pTYJ++7s/xX9gzSWCa+eXGcjguBtYYXaAjjAqFGRAvu
pz1yrDWcA6H94HeErJKUXBakS0Jm/V33JDuVXY+aZ8EQi2kV82aZbNdXll/R6iGw
2ur4rDErnHsiphBgZB71C5FD4cdfSONTsYxmPmyUb5T+KLUouxZ9B0Wh28ucc1Lp
rbO7BnjW
-----END CERTIFICATE-----`;

// const printerName = 'zebra';

const printerQz = {
  /** connect to qz printer
   * @function connect
   * @return {object} connected printer qz instance
   */
  async connect() {
    try {
      const pconfig =
        typeof window !== "undefined" ? JSON.parse(localStorage.getItem("pconfig") || "") : {};
      const printerName = pconfig ? pconfig.printer : "";
      qz.api.setPromiseType(
        (resolver: (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void) =>
          new Promise(resolver)
      );
      await qz.websocket.connect();
      return await qz.printers.find(printerName);
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async disconnect() {
    try {
      await qz.websocket.disconnect();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  async printGeneratedLabels(printerName: any, labels: any) {
    const config = await qz.configs.create(printerName);
    return await qz.print(config, labels);
  },

  isActive() {
    return qz.websocket.isActive();
  },

  async launchQZ() {
    if (!qz.websocket.isActive()) {
      window.location.assign("qz:launch");
    }
  },

  async setCertificate(url: any) {
    try {
      await qz.security.setCertificatePromise((resolve: (arg0: string) => any) =>
        resolve(rawCertificate)
      );
      qz.security.setSignaturePromise((toSign: any) => {
        return async (resolve: (arg0: any) => void) => {
          const signature = await PrintSupport.sign({ url, toSign });
          resolve(signature);
        };
      });
    } catch (error) {
      console.log(error, "error in cert");
    }
  },

  getPrinterConfig() {
    return typeof window !== "undefined" ? JSON.parse(localStorage.getItem("pconfig") || "") : {};
  },

  setPrinterConfig(config: any) {
    return localStorage.setItem("pconfig", JSON.stringify(config));
  },
};

export default printerQz;
