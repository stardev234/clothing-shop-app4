import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button } from '@mantine/core';
import { CreateFields } from './components/CreateFields';
import BarcodePrinter from './components/PrintComponent';
export default function AddProdPage() {

 
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
        <div className='hidden'>
        <CreateFields/>
        </div>
        
        <BarcodePrinter />
        </div>
   
    )
}