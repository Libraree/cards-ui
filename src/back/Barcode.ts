export const BARCODES: Barcode[] = [
    { type: 'codabar', name: 'Codabar', writer: 'rationalizedCodabar', reader: 'codabar' },
    { type: 'code_128', name: 'Code 128', writer: 'code128', reader: 'CODE_128' },
    { type: 'code_39', name: 'Code 39', writer: 'code39', reader: 'CODE_39' },
    { type: 'code_93', name: 'Code 93', writer: 'code93', reader: 'CODE_93' },
    { type: 'ean_8', name: 'EAN 8', writer: 'ean8', reader: 'EAN_8' },
    { type: 'ean_13', name: 'EAN 13', writer: 'ean13', reader: 'EAN_13' },
    { type: 'i2of5', name: 'Interleaved 2 of 5', writer: 'interleaved2of5', reader: 'ITF' },
    { type: 'qrcode', name: 'QR Code', writer: 'qrcode', reader: 'QR_CODE' },
    { type: 'upc_e', name: 'UPC-E', writer: 'upce', reader: 'UPC_E' },
    { type: 'upc_a', name: 'UPC-A', writer: 'upca', reader: 'UPC_A' },
    { type: 'telepen', name: 'Telepen', writer: 'telepen', reader: 'TELEPEN' },
    { type: 'telepen_numeric', name: 'Telepen Numeric', writer: 'telepennumeric', reader: 'TELEPEN', hints: { 12: 'true' } }
];

export default class Barcode {
    type: string = null!;
    name: string = null!;
    reader: string = null!;
    writer: string = null!;
    hints?: Record<number, string> = {};
}