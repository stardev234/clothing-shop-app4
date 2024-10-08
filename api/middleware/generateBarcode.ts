import * as uuid from 'uuid';
import Product from '../db/dbModels';

function base64urlEncode(input: Buffer): string {
    return input.toString('base64url').replace(/=/g, ''); // Remove padding
}

export default async function generateBarcode(): Promise<string> {
    let uuidV4 = uuid.v4();
    
    // Create a Buffer from the UUID and encode it in Base64 URL format
    const buffer = Buffer.from(uuidV4.replace(/-/g, ''), 'hex');
    let shortBarcode = base64urlEncode(buffer).substring(0, 12); // Adjust length as needed

    // Ensure uniqueness
    while (await isBarcodeExists(shortBarcode)) {
        uuidV4 = uuid.v4(); // Generate a new UUID
        const newBuffer = Buffer.from(uuidV4.replace(/-/g, ''), 'hex');
        const newShortBarcode = base64urlEncode(newBuffer).substring(0, 12);
        shortBarcode = newShortBarcode;
    }

    return shortBarcode;
}

async function isBarcodeExists(barcode: string): Promise<boolean> {
    const existingProduct = await Product.findOne({ barcode });
    return existingProduct !== null;
}
