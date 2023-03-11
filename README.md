# qz-tray-noon

This repo is for creating qz npm package thats could be shared around noon projects.

you can import this package nad use it as comming.

## Installation:

update the project dependencies by the coming package

```bash
dependencies: {
...
"qz-tray-noon": "github:fastfishio/qz-tray-noon"
...
}
```

## Usage :

Add `QZPrintUI ` to your component root components :

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QZPrintUI } from "qz-tray-noon";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
    ...
    <QZPrintUI />
    ...
    </React.StrictMode>,
)
```

print printPDFs

```js
import { printPDFs } from "qz-tray-noon";

printPDFs({ data: "pdf/url" });
printPDFs({ data: ["pdf/url", "pdf/url2"] });
printPDFs({ data: "pdf/url", printerName: "HP_Smart_Tank_515" });
printPDFs({ data: ["pdf/url", "pdf/url2"], printerName: "HP_Smart_Tank_515" });
```

print printZplLabels

```js
import { printZplLabels } from "qz-tray-noon";

printZplLabels({
  data: { qty: 2, id_partner: "id_partner", barcode: "barcode", pbarcode: "pbarcode" },
});

printZplLabels({
  data: [
    { qty: 2, id_partner: "id_partner", barcode: "barcode", pbarcode: "pbarcode" },
    { qty: 1, id_partner: "id_partner2", barcode: "barcode2", pbarcode: "pbarcode2" },
  ],
});

printZplLabels({
  data: { qty: 2, id_partner: "id_partner", barcode: "barcode", pbarcode: "pbarcode" },
  printerName: "HP_Smart_Tank_515",
});

printZplLabels({
  data: [
    { qty: 2, id_partner: "id_partner", barcode: "barcode", pbarcode: "pbarcode" },
    { qty: 1, id_partner: "id_partner2", barcode: "barcode2", pbarcode: "pbarcode2" },
  ],
  printerName: "HP_Smart_Tank_515",
});
```
