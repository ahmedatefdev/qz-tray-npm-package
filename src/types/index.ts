export type TPrintersData = {
  isConnecting?: boolean;
  showSettings?: boolean;
  printer?: string;
  printers?: Array<any> | string;
  error?: string;
  isLoading?: boolean;
  selectedPrinter?: string;
  offsetX?: string | number;
  offsetY?: string | number;
  labelOrientation?: string;
};
export type TZPLLabelData = {
  qty: number;
  id_partner: string;
  barcode: string;
  pbarcode: string;
};
