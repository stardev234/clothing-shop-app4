import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/fetchProds';
import { Product } from '@/models/Products';
import { Card, Image, Text, Badge, Group, Grid, Center } from '@mantine/core';
import { FilteringBar } from "./FilteringBar"

const CheckProdPage: React.FC = () => {
  // State for storing product data, loading state, and error
  const [product, setProduct] = useState<Product | Array<string> | string | Object>(["defaultProducts"]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const updateProducts = (newData: Product | Array<string> | string | Object) => {
    console.log(typeof newData);

    setProduct(newData)
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

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: "center" }}>

        <FilteringBar onAction={updateProducts}></FilteringBar>

        {

          product.map((product: Product) => (

            <Card shadow="xl" style={{ borderRadius: "px", padding: "xs", width: "500px" }}>
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
