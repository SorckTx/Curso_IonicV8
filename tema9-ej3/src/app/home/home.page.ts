import { Component } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  public scannedCode: string = '';
  constructor() { }
  async escanearCodigo(): Promise<any> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL, // Tipo de codigo de barras, podemos encontrar todos en el tipo CapacitorBarcodeScannerTypeHint
    });
    if (result.ScanResult) {
      this.scannedCode = result.ScanResult;
    }

  }
}
