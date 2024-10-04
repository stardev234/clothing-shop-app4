// App.tsx
/*
import React from 'react';

const App: React.FC = () => {
    const handlePrint = () => {
        const printContent = "Hello, this is a string to print!  \n  ";
        const newWindow = window.open('', '', 'width=600,height=400');
        newWindow?.document.write(`<pre>${printContent}</pre>`);
        newWindow?.document.close();
        newWindow?.focus();
        newWindow?.print();
        newWindow?.close();
    };

    return (
        <div>
            <h1>Print Example</h1>
            <button onClick={handlePrint}>Print String</button>
        </div>
    );
};

export default App;
*/

import React, { useState } from 'react';
import Barcode from 'react-barcode';
import './print.css';
const BarcodePrinter: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [barcodeValue, setBarcodeValue] = useState<string | null>(null);

    const handlePrint = () => {
        setTimeout(() => {
            window.print();
        }, 100); // Delay to allow barcode to render
    };

    const handleGenerateBarcode = () => {
        setBarcodeValue(inputValue);
    };

    return (
        <div>
            <h1 className='hidden'>Barcode Generator</h1>
            <input className='hidden'
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a number"
            />
            <button className='hidden' onClick={handleGenerateBarcode}>Generate Barcode</button>
            {barcodeValue && (
                <div>
                <div id="barcode-container">
                    <Barcode value={barcodeValue} />
                    
                </div>
                <button className='hidden' onClick={handlePrint}>Print Barcode</button></div>
            )}
            {!barcodeValue && <p>Please enter a number to generate a barcode.</p>}
        </div>
    );
};
export default BarcodePrinter;
