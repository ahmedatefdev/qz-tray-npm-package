import printQZ from "./printQZ";
import qz from "qz-tray";
import { TPrintersData, TZPLLabelData } from "../types";

export async function print({
  documents,
  currentPrinterData,
  printerName,
}: {
  currentPrinterData?: TPrintersData;
  documents: Array<{ data: any; ref?: string; type: string }>;
  printerName?: string;
}) {
  const { printer, selectedPrinter, labelOrientation } =
    currentPrinterData || (await printQZ.getPrinterConfig()) || {};
  if (!documents[0] || (!printerName && !printer && !selectedPrinter)) {
    return false;
  }

  try {
    const options: any = {};
    if (labelOrientation) {
      options.orientation = labelOrientation;
    } else if (documents.some((item) => item.type === "pdf")) {
      options.orientation = labelOrientation || "portrait";
    }
    const currentPrinter = printerName || selectedPrinter || printer;
    const config = await qz.configs.create(currentPrinter, options);
    return await qz.print(
      config,
      documents.map((item) => item.data)
    );
  } catch (e) {
    console.log("print error:", e);
  }
}

export function generateLabel({
  data,
  currentPrinterData,
}: {
  currentPrinterData?: TPrintersData;
  data: TZPLLabelData;
}) {
  const qty = data.qty || 1;
  const { offsetX = 0, offsetY = 0 } = currentPrinterData || printQZ.getPrinterConfig() || {};

  const zplLabel = `
        ^XA
        ^FX section with bar code.
        ^FO${Number(offsetX) + 30},${Number(offsetY) + 30}^BY2^BCN,60,N,,,A^FD${data.barcode}^FS
        ^FX section with details.
        ^CF0,22
        ^FO120,100^FD${data.barcode}^FS
        ^CF0,20
        ^FO30,130^FD${Number(offsetX) + 30},${Number(offsetY) + 115}^FD${data.id_partner}^FS
        ^FO30,155^FD${Number(offsetX) + 30},${Number(offsetY) + 135}^FD${data.pbarcode || ""}^FS
        ^PQ${qty}
        ^JZN
        ^XZ
      `;

  return { type: "zpl", data: zplLabel, ref: "zplLabel" };
}

export function generatePDF({ pdfUrl }: { pdfUrl: string }) {
  return {
    type: "pdf",
    data: pdfUrl,
  };
}
