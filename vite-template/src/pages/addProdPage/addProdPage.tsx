import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button } from '@mantine/core';
import CreateFields from "./components/CreateFields"
export default function AddProdPage() {

 
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
        <CreateFields/>
        </div>
   
    )
}