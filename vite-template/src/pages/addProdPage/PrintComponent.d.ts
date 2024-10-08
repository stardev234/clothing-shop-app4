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
        PrintJob: any;
        autoReconnect: boolean;
        start(): void;
        getInstance(): {
            onConnectionLost: () => void;
            connect(): unknown;
            disconnect(): unknown;
            onConnectionStatusChanged: (status: any) => void;
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
