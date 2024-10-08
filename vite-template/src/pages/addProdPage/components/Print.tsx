import React, { useEffect } from 'react';
import JSPrintManager from 'jsprintmanager';
const PrintComponent: React.FC = () => {
    useEffect(() => {
        JSPrintManager.autoReconnect = true;
        JSPrintManager.getInstance().onConnectionStatusChanged = (status) => {
            if (status) {
                console.log("Printer connected");
            } else {
                console.log("Printer disconnected");
            }
        };
        
        JSPrintManager.autoReconnect = true;
        JSPrintManager.getInstance().onConnectionLost = () => {
            console.log("Connection lost. Reconnecting...");
        };

        JSPrintManager.getInstance().onConnectionError = () => {
            console.log("Connection restored.");
        };

        JSPrintManager.getInstance().connect();

        return () => {
            JSPrintManager.getInstance().disconnect();
        };
    }, []);

    const printBarcode = () => {
        const printJob = new JSPrintManager.PrintJob("Your Thermal Printer Name");

        printJob.addText("Your Barcode Text", {
            fontSize: 24,
            bold: true,
            alignment: "center",
        });

        printJob.addBarcode("123456789012", {
            type: "CODE128",
            height: 60,
            width: 2,
            alignment: "center",
        });

        printJob.send();
    };

    return (
        <div>
            <h1>Barcode Printing</h1>
            <button onClick={printBarcode}>Print Barcode</button>
        </div>
    );
};

export default PrintComponent;
