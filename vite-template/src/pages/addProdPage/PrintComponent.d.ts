declare module 'jsprintmanager' {
    interface Printer {
        name: string;
        // Add other relevant properties based on your usage
    }

    interface PrintJob {
        append(content: string, contentType: string): void;
        send(): void;
        // Add any other methods if needed
    }

    interface JSPrintManager {
        autoReconnect: boolean;
        start(): void;
        getInstance(): {
            onConnectionSuccess: () => void;
            onConnectionError: () => void;
            onGetPrinters: (printers: Printer[]) => void;
            getPrinters(): void;
            setPrinter(printer: Printer): void;
            createPrintJob(): PrintJob; // You can add this to create print jobs
        };
    }

    const JSPrintManager: JSPrintManager;
    export default JSPrintManager;
}
