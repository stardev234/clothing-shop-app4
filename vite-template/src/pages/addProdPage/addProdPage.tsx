import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button } from '@mantine/core';
import { CreateFields } from './components/CreateFields';
import BarcodePrinter from './components/PrintComponent';
import './components/print.css';

export default function AddProdPage() {

    return (
        <div style={{justifyContent:"center"}} >
      
   
        <CreateFields/>

        </div>
   
    )
}