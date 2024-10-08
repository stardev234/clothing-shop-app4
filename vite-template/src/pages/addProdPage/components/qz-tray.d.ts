declare module 'qz-tray' {
    export interface QZSecurity {
        setCertificatePromise(callback: () => Promise<string>): void;
        setSignaturePromise(callback: () => Promise<string>): void;
    }

    export interface QZWebSocket {
        connect(config?: { certificate?: string }): Promise<void>;
        disconnect(): Promise<void>;
    }

    const qz: {
        security: QZSecurity;
        websocket: QZWebSocket;
        configs: {
            create(printer: string): any; // Adjust type as necessary
        };
        print(config: any, data: any): Promise<void>; // Adjust type as necessary
    };

    export default QZPrintComponent;
}
