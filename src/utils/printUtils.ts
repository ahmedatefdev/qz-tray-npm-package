// init the printers with the right url
//
// show small ui thahts you done well
// add btn to the small panal thats can open ui to add nums to it again
// show the current connect printer
// add many print functions
// printMultiplePDF
// printPDF
// printLabels

import { TPrintersData } from "../types";

import printerQz from "../utils/printQZ";

async function init({
  signInApiUrl,
  callback,
}: {
  signInApiUrl: string;
  callback: (PrintersData: TPrintersData) => void;
}) {
  let PrintersData: TPrintersData = {
    isConnecting: false,
    showSettings: false,
    printer: "",
    printers: [],
    error: "",
    isLoading: false,
    selectedPrinter: "",
    offsetX: "",
    offsetY: "",
    labelOrientation: "",
  };
  const pConfig = printerQz.getPrinterConfig();

  const printConfig = {
    selectedPrinter: pConfig ? pConfig.printer : "",
    offsetX: pConfig ? pConfig.offsetX : "",
    offsetY: pConfig ? pConfig.offsetY : "",
    labelOrientation: pConfig ? pConfig.labelOrientation : "",
  };

  printerQz.setCertificate(signInApiUrl);

  if (!printerQz.isActive()) {
    printerQz
      .connect()
      .then((data: string | any[]) => {
        const printer = Array.isArray(data) && data.length > 0 ? data[0] : data;
        PrintersData = {
          ...printConfig,
          printer,
          printers: data,
          isConnecting: false,
        };
      })
      .catch((error: { error: any; message: any }) => {
        PrintersData = {
          error: error.error || error.message || error || "Error connecting to QZ Tray",
          isConnecting: false,
        };
      });
  }
  callback(PrintersData);
}

function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function handleLaunchQzSoftware(callback: () => void) {
  printerQz.launchQZ();

  sleep(8000).then(() => {
    window.location.reload();
  });

  callback();
}

function disconnectQZ() {
  printerQz.disconnect();
}

async function updateSettingsQzSavedSetting(
  setting: { selectedPrinter: any; offsetX: any; offsetY: any; labelOrientation: string },
  currentPrinter?: any
) {
  const { selectedPrinter, offsetX, offsetY, labelOrientation } = setting;
  printerQz.setPrinterConfig({
    printer:
      currentPrinter === undefined || currentPrinter === null ? selectedPrinter : currentPrinter,
    offsetX,
    offsetY,
    labelOrientation: labelOrientation ?? "",
  });
  window.location.reload();
}

export { init, disconnectQZ, handleLaunchQzSoftware, updateSettingsQzSavedSetting };
