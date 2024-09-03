import React, { useState, useEffect } from 'react';
import { getProducts } from '@/utils/fetchData';
import { getProductsResponse } from '@/utils/fetchData';
import { Card, Image, Text, Badge, Group, Stack, Button } from '@mantine/core';

// Define a type for the user data
type ProductJsonString = JSON


const CheckProdPage: React.FC = () => {
  // State for storing user data, loading state, and error
  const [user, setUser] = useState<ProductJsonString | null| undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getProducts();
        setUser(userData);
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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
    {typeof user}
    {user.map( product  => (
      <Card key={product.id} shadow="sm" padding="lg" style={{ width: '300px' }}>
  

        <Group  mt="md" mb="xs">
          <Text >{product.name}</Text>

            {product.category}

        </Group>

        <Text size="sm" color="dimmed">
          {product.description}
        </Text>

        <Group  mt="md">
          <Text >{product.price}</Text>
         
        </Group>
      </Card>
    ))}
  </div>
  );
};

export default CheckProdPage;
