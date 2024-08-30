import React from 'react';
import { TextInput, Button, Group, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createProduct, getBarcode, NewProduct, ProductResponse, BarcodeResponse } from '@/utils/fetchData';


const fields = [
  { name: 'provider', label: 'Proveedor', placeholder: 'Proveedor' },
  { name: 'name', label: 'Nombre', placeholder: 'Nombre' },
  { name: 'category', label: 'Categoría', placeholder: 'Categoría' },
  { name: 'brand', label: 'Marca', placeholder: 'Marca' },
  { name: 'size', label: 'Talle', placeholder: 'Talle' },
  { name: 'color', label: 'Color', placeholder: 'Color' },
  { name: 'material', label: 'Material', placeholder: 'Material' },
  { name: 'price', label: 'Precio', placeholder: 'Precio', type: 'number' },
  { name: 'stock', label: 'Stock (solo numeros)', placeholder: 'Stock (solo numeros)', type: 'number' },
  { name: 'description', label: 'Descripción', placeholder: 'Descripción' },
  { name: 'date', label: 'Fecha', placeholder: 'Fecha', type: 'date' },
  { name: 'gender', label: 'Genero', placeholder: 'Genero' },
];


const validate = (values: any) => {
  const errors: Record<string, string> = {};
  const fieldsWithErrors = fields.map(field => field.name);

  fieldsWithErrors.forEach(field => {
    if (!values[field]) {
      errors[field] = `${fields.find(f => f.name === field)?.label} is required`;
    }
  });


  if (isNaN(values.price) || values.price <= 0) errors.price = 'Precio must be a positive number';
  if (isNaN(values.stock) || values.stock < 0) errors.stock = 'Stock cannot be negative';

  return errors;
};

const FormComponent: React.FC = () => {
  const form = useForm({
    initialValues: fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
    validate,
  });



  const handleSubmit = async (values: any) => {
    const barcode = await getBarcode()
    // Map form values to NewProduct type
    const product: NewProduct = {
      barcode: barcode,
      name: values.name,
      category: values.category,
      brand: values.brand,
      size: values.size,
      color: values.color,
      material: values.material,
      price: values.price,
      stock: values.stock,
      description: values.description,
      date: new Date(values.date),
      gender: values.gender,
    };

    try {
      const response = await createProduct(product);
      console.log('Product created successfully:', response);


    } catch (error) {
      console.error('Error creating product:', error);
      
    }
  };
  
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      
      <Stack   style={{ paddingLeft: '20%', paddingRight:"20%"}} >
        {fields.map((field) => (
          <div key={field.name}>
            <TextInput 
              label={field.label}
              placeholder={field.placeholder}
              type={field.type || 'text'}
              {...form.getInputProps(field.name)}
            />
          
          </div>
          
        ))}
        <Group align="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Stack>
    </form>
  );
};

export default FormComponent;
