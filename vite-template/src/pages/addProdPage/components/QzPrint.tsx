import React, { useEffect, useState } from 'react';
import qz from 'qz-tray';
import { jsPDF } from 'jspdf';
import JsBarcode from 'jsbarcode';
const privateKeyUrl = "-----BEGIN PRIVATE KEY-----\n" +
    "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDZX7C7L93uaGqV\n" +
    "5OTO9wvOC33HR50+V7sEMqTfnBN5BzeKG4Lc5PMzVNg8Vwdinxdy+rfo2dkh2lPG\n" +
    "785tMBMUsAqdF6PgDRVG37x9R9x0I63Lg2WwWiyLSmbIUhhI4yCA6eeWHLYd2rQr\n" +
    "wrJQrj+AQDSVryhT8A3tPftgQoF2O6nq5jmpmq1823Fa1obnBtOmUdC/S/c2Q3Jl\n" +
    "69bujTb/x3f7KJntEhRl68E+IU+yn/L45NJ0ccfVRd3Co7ewGIyE2FUEgfdZc3IW\n" +
    "1zRI4C42TENIgeZmWE3uKFSuF0oJ2B5Yc9YmpOf4Mo7qcrGWN2JrA1uRaI/JrytV\n" +
    "lpA5gZaBAgMBAAECggEATIRkJEhBwaHs3w3fQ0FwXNvrryH05pSgRuaC5hm9Ow3A\n" +
    "zbNIefR37ZpQsdDazyr8aKN76JIC3mlJs04H5qSVGuOrIMhJDd3dHwE0Cw+oORO0\n" +
    "Il8DBTSA2Jlcm+hWFxYog2iS9mLt8o1hfcP/2+myfbVcLVKmigGHDXuTiLtwcgsA\n" +
    "9lObcZ3hfxNk46REu9BF9MRb6gYe/aFvhXxKKleXAL09VziN8YNGysgS4LzlydIr\n" +
    "/waffMZErOR3+DH2MEcNPmmJWONQ4Y8sV78SKfCvn2S74FRq2kYjZK1KyyE+qKKo\n" +
    "57ZDKEanWmVLBSCxRjq8HeMyChfX3pVk+hML9xmd7wKBgQD/fWf3S/6acqz+qjpB\n" +
    "2lVn6QUUjYuv32l5EV0SgGK63AVeXFViPHgzwrerwqzBXP+BxIIhvuy0QyTrgFIo\n" +
    "RKrrdUuZoZoQkjdYsj1GmQ/qXtadv11Awwpx49xaRWv3HJ2OcjOGhVC1LGyJ2hem\n" +
    "zw/B57ES1L/TXv/2NRvmiiFcOwKBgQDZzs0ZiDlFl5oBT/t+XqYup/ZjXACNQKRO\n" +
    "wVCiUpIXxpBQHLh44LtA600wWwFA2n2J9xW7rIdL3+1vn98uIWSAb63ZCcHQXSir\n" +
    "awK9XXy+VBAOmblmI6mAXuoGsD5r2JoEaD/kDQPtc23wZZPWTp7BA7Kx4HydeU04\n" +
    "oNeh2sT4cwKBgA+e9EdbfyKkVk1vzQYPul8TETtzeBH1v/YmCKHD9cVlBHMDhDjw\n" +
    "Z40Kn75BtdxQulKN2EMF8GUJIe3AN8W8hRLGZivrhIb02atzoml5nE6BI/AbLjFy\n" +
    "e2YBP4zJZ9OBDWUTOHFGH2wkXjKDgiSxzk3Vw67aESx0R4QfNSiAU4/XAoGBAKjX\n" +
    "IbDAI71pxs1rpgYQ8vvJ4jqlkBvvVy9htdMO9QcPOsGPcgTqGN47SSvJ8A/JD3YK\n" +
    "nsNL+9l6bcGRCd3lrtXNPNO5N5ABF0zCeG448UFNQuE+kzS1Qmkrqnii2NCbKNFv\n" +
    "ys9Ks5e3Wir3YwHHElOHPVecMJ2V8aGLNXzXbMc3AoGADeia4iWheNeOXxnNyypF\n" +
    "4LVnIlVjv5FFfmKGGbK1Rk0ERTwvVz214iwTX9dZVPw99oVdLOI6EVdKr9lohw6m\n" +
    "i7iTO11VZ7b4hoIZ6xv7jOhqeypdsK5zNUFF4TRhor+StTs7Kb5TiAs8O7HZZEES\n" +
    "otxTVUvI+HljCO4sys6eRK4=\n" +
    "-----END PRIVATE KEY-----\n";

const certificateUrl = "-----BEGIN CERTIFICATE-----\n" +
    "MIIECzCCAvOgAwIBAgIGAZJqEylYMA0GCSqGSIb3DQEBCwUAMIGiMQswCQYDVQQG\n" +
    "EwJVUzELMAkGA1UECAwCTlkxEjAQBgNVBAcMCUNhbmFzdG90YTEbMBkGA1UECgwS\n" +
    "UVogSW5kdXN0cmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMx\n" +
    "HDAaBgkqhkiG9w0BCQEWDXN1cHBvcnRAcXouaW8xGjAYBgNVBAMMEVFaIFRyYXkg\n" +
    "RGVtbyBDZXJ0MB4XDTI0MTAwNzAzMDEzM1oXDTQ0MTAwNzAzMDEzM1owgaIxCzAJ\n" +
    "BgNVBAYTAlVTMQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYD\n" +
    "VQQKDBJRWiBJbmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMs\n" +
    "IExMQzEcMBoGCSqGSIb3DQEJARYNc3VwcG9ydEBxei5pbzEaMBgGA1UEAwwRUVog\n" +
    "VHJheSBEZW1vIENlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDZ\n" +
    "X7C7L93uaGqV5OTO9wvOC33HR50+V7sEMqTfnBN5BzeKG4Lc5PMzVNg8Vwdinxdy\n" +
    "+rfo2dkh2lPG785tMBMUsAqdF6PgDRVG37x9R9x0I63Lg2WwWiyLSmbIUhhI4yCA\n" +
    "6eeWHLYd2rQrwrJQrj+AQDSVryhT8A3tPftgQoF2O6nq5jmpmq1823Fa1obnBtOm\n" +
    "UdC/S/c2Q3Jl69bujTb/x3f7KJntEhRl68E+IU+yn/L45NJ0ccfVRd3Co7ewGIyE\n" +
    "2FUEgfdZc3IW1zRI4C42TENIgeZmWE3uKFSuF0oJ2B5Yc9YmpOf4Mo7qcrGWN2Jr\n" +
    "A1uRaI/JrytVlpA5gZaBAgMBAAGjRTBDMBIGA1UdEwEB/wQIMAYBAf8CAQEwDgYD\n" +
    "VR0PAQH/BAQDAgEGMB0GA1UdDgQWBBQ71/GvAE15cNk2zf3zvQd2pNhuyjANBgkq\n" +
    "hkiG9w0BAQsFAAOCAQEAzDEzAr2ZWyBPRHE7w5QrZLEFs5WniPqj6IaRSOJvQHlM\n" +
    "hfh8qRTEieYjzJcxNv+izKK9R0dYxYe8V/g5jQ/MqP4CtZADy7EXRZdIHKwor6oa\n" +
    "qfKAwoS3HFrVL1yvlT5KTsz0DZcD+ek96E/kRinlc7msAYIyESczG/2JgbF6RSHx\n" +
    "WLdIJbEXhd44VNAbVy+OOGaTYE5zbZijPGysxMUBq297Nz1paV5QcriIAJvM7vaX\n" +
    "EeK/J7CYRGHwypr0da08RCDo7vkngWlA3c5oOHnwqgF1e4HhzHmctJCfA/Ktgboa\n" +
    "UNpyCkPMBW0VE7Bzuzvb4wtF7pdlroiI7k3rM8IqgQ==\n" +
    "-----END CERTIFICATE-----\n";



import jsrsasign from 'jsrsasign';



const PrintComponent: React.FC = () => {
    /*const certificateUrl = "/digital-certificate.txt"; // Path to your certificate
    const privateKeyUrl = "/private-key.pem"; // Path to your private key
*/

    const [inputValue, setInputValue] = useState('');
  
    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      console.log(inputValue); // Handle the input value here (e.g., send it to an API)
    };



    useEffect(() => {
        const connectToQZ = async () => {
            try {
                // Fetch the certificate
                qz.security.setCertificatePromise(async () => {
                    const response = certificateUrl
                    const text = response
                    console.log("RESPONSE", text);
                    return text; // Return the certificate response for further use
                });

                console.log("after setCertificatePromise");

                // Set the signature algorithm
                qz.security.setSignatureAlgorithm("SHA512");
                qz.security.setSignaturePromise(async (hash: any) => {
                    console.log("from setSignaturePromise");

                    const response = privateKeyUrl
                    const data = response;
                    console.log("private key response", data);

                    const pk = jsrsasign.KEYUTIL.getKey(data);
                    const sig = new jsrsasign.KJUR.crypto.Signature({ alg: "SHA512withRSA" });
                    sig.init(pk);
                    sig.updateString(hash);
                    console.log("sig", sig);

                    const hex = sig.sign();
                    console.log("DEBUG: \n\n" + jsrsasign.stob64(jsrsasign.hextorstr(hex)));
                    return jsrsasign.stob64(jsrsasign.hextorstr(hex));
                });

                // Connect to QZ Tray
                await qz.websocket.connect();
                console.log("Connected to QZ Tray");

                // List available printers
                const printers = await qz.printers.find();
                console.log("Available Printers:", printers);
            } catch (e) {
                console.error("Could not connect to QZ Tray:", e);
            }
        };

        connectToQZ();

        return () => {
            if (qz.websocket.isActive()) {
                qz.websocket.disconnect();
            }
        };


    }, []);


    useEffect(() => {

    }, []);

    const printBarcode = async (amountOfCopies: number) => {
        /*if (!qz.websocket.isActive()) {
            console.error("Not connected to QZ Tray. Attempting to connect...");
            await connectToQZ();
        }
*/
        const barcodeText = 'GTbfNT4ATJy1'; // Example barcode text
        const barcodeCanvas = document.createElement('canvas');
        JsBarcode(barcodeCanvas, barcodeText, {
            format: 'CODE128',
            displayValue: false,
            height: 150,
            width: 3,
        });

        const barcodeImage = barcodeCanvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(barcodeImage, 'PNG', 10, 10, 180, 150);
        pdf.setFontSize(65);
        pdf.text(barcodeText, 10, 170);
        const pdfData = pdf.output('datauristring');

        const config = qz.configs.create('POS58 Printer', { copies: amountOfCopies });
        const data = [{
            type: 'PDF',
            format: 'base64',
            data: pdfData.split(',')[1], // Extract base64 data
        }];
        

        const printOptions = {
            copies: 2, // Set the number of copies
            // other options like 'orientation', 'size', etc.
        };
        console.log("before print");

        try {

                await qz.print(config, data, printOptions);
                console.log("Print job sent successfully.");
        

            
        } catch (e) {
            console.error("Print job failed:", e);
        }

    };

    return (
        <div>
            <h1>Barcode Printing</h1>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Type something..."
            />
            <button onClick={() => { printBarcode(parseInt(inputValue)) }}>Print Barcode</button>
        </div>
    );
};

export default PrintComponent;