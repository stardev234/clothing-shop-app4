import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/fetchProds';
import { Product } from '@/models/Products';
import { Card, Image, Text, Badge, Group, Grid, Center, Button, Modal } from '@mantine/core';
import { FilteringBar } from "./FilteringBar"
import { IconEdit, icons } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
const CheckProdPage: React.FC = () => {
  // State for storing product data, loading state, and error
  const [product, setProduct] = useState<Product | Array<string> | string | Object>(["defaultProducts"]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const icon = <IconEdit size={22} />;
  const [opened, { open, close }] = useDisclosure(false);
  const [id, setId] = useState<string>("")
  
  const updateProducts = (newData: Product | Array<string> | string | Object) => {
    console.log(typeof newData);

    setProduct(newData)
  }

  const editProducts = (id: string) => {
   
    
    setId(id)
    console.log(id);
    
    open()
  }


  // useEffect to fetch product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProducts();

        setProduct(productData)

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (

    <div>

      <FilteringBar onAction={updateProducts}></FilteringBar>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: "center" }}>

        <Modal opened={opened} onClose={close} title="Authentication">
          {/* Modal content */}
          <div>{id}</div>
        </Modal>

        {

          product.map((product: Product,) => (

            <Card key={product._id} shadow="xl" style={{ borderRadius: "px", padding: "xs", width: "500px" }}>



              <Button onClick={()=>editProducts(product._id)} style={{ width: "50px", padding: "0px", margin: "0px", bottom: "15px", left: "430px" }}>{icon}</Button>
              <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Codigo de barras:</Text>

              <Text style={{ fontWeight: 400, fontSize: '110%' }}>{product.barcode}</Text>



              <Group>
                <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Nombre:</Text>
                <Text style={{ fontWeight: 400, fontSize: '110%', }}>{product.name}</Text>
                <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Categoría:</Text>
                <Text style={{ fontWeight: 400, fontSize: '110%' }}>{product.category}</Text>
              </Group>

              <Group>
                <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Marca:</Text>
                <Text style={{ fontWeight: 400, fontSize: '110%' }}>{product.brand}</Text>

                <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Talle:</Text>
                <Text style={{ fontWeight: 400, fontSize: '110%' }}>{product.size}</Text>

                <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Color:</Text>
                <Text style={{ fontWeight: 400, fontSize: '110%' }}>{product.color}</Text>
              </Group>

              <Group>
                <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Material:</Text>
                <Text style={{ fontWeight: 400, fontSize: '110%' }}>{product.material}</Text>

                <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Stock:</Text>
                <Text style={{ fontWeight: 400, fontSize: '110%' }}>{product.stock}</Text>
              </Group>
              <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Descripcion:</Text>
              <Text style={{ fontWeight: 400, fontSize: '110%' }}>descripcion</Text>

              <Group>
                <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Fecha:</Text>
                <Text style={{ fontWeight: 400, fontSize: '110%' }}>{product.date}</Text>
                <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Genero:</Text>
                <Text style={{ fontWeight: 400, fontSize: '110%' }}>{product.gender}</Text>
                <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Precio:</Text>
                <Text style={{ fontWeight: 400, fontSize: '110%' }}>${product.price}</Text>
              </Group>

            </Card>

          ))}
      </div>
    </div>
  );
};

export default CheckProdPage;
