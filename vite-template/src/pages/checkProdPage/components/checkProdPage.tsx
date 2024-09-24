import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/fetchProds';
import { Product } from '@/models/Products';
import { Card, Text, Group, Button, Modal, TextInput } from '@mantine/core';
import { FilteringBar } from "./FilteringBar";
import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { EditProd } from './EditProd';
import { Pagination } from '@mantine/core';

const CheckProdPage: React.FC = () => {
  // State for storing product data, loading state, and error

  const [product, setProduct] = useState<Product[] | string | Object>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const [modalContent, setModalContent] = useState("editMode")
  const [prod, setEditingProd] = useState<Product>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(6);
  const icon = <IconEdit size={22} />;
  const totalProducts = (product as Product[]).length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null); // State for the updated product
  const [modalOpen, setModalOpen] = useState<boolean>(false); // State for modal visibility

  const currentProducts = (product as Product[]).slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const updateProducts = (newData: Product[] | string | Object) => {
    setProduct(newData as Product[]);
    setCurrentPage(1)
  };

  const editProducts = (editingProduct: Product) => {
    console.log(editingProduct);
    setEditingProd(editingProduct);
 
    open();
  };


  useEffect(() => {
    console.log("from useEffect Prod",prod); // This will log the updated state
}, [prod]);




  // useEffect to fetch product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProducts();
        setProduct(productData);


        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (updateTrigger) {
    
    const fetchData = async () => {
      try {
        const productData = await getProducts();
        setProduct(productData);
        setUpdateTrigger(false)

        console.log("from useEffect update trigger");
        
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData()
  };
  }, [updateTrigger]);

  const handleUpdate = (product: Product) => {
    console.log("from handle update");
    setUpdatedProduct(product); // Store the updated product
    
    console.log("from handleUpdate: ", updatedProduct);
    
    setModalOpen(true); // Open the modal
    setUpdateTrigger(true); // Set the trigger to true
    

  };


  useEffect(() => {
    if (updatedProduct) {
    const fetchData = async () => {
      try {
        console.log("from updated product useEffect: ",updatedProduct);
        setModalContent("")
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData()
  };
  }, [updatedProduct]);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;



  return (
    <div>
      <FilteringBar onAction={updateProducts} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: "center" }}>
        
        <Modal opened={opened} onClose={close} title="Editar Producto" size={"md"} >
        {modalContent === 'editMode' ? (
          <EditProd productElement={prod} onUpdate={handleUpdate}   />
        ) : (
          <div>
            {updatedProduct.name}
            {updatedProduct.brand}
            {updatedProduct.category}
            {updatedProduct.color}
            {updatedProduct.name}
            {updatedProduct.name}
            {updatedProduct.name}
          </div>
        )}
          
          
        </Modal>




        {currentProducts.map((product: Product) => (
          <Card key={product._id} shadow="xl" style={{ borderRadius: "px", padding: "xs", width: "500px" }}>
            <Button onClick={() => {editProducts(product)}} style={{ width: "50px", padding: "0px", margin: "0px", bottom: "15px", left: "430px" }}>
              {icon}
            </Button>
            <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Codigo de barras:</Text>
            <Text style={{ fontWeight: 400, fontSize: '110%' }}>{product.barcode}</Text>

            <Group>
              <Text style={{ backgroundColor: '#0c243b', padding: '0 4px' }}>Nombre:</Text>
              <Text style={{ fontWeight: 400, fontSize: '110%' }}>{product.name}</Text>
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
            <Text style={{ fontWeight: 400, fontSize: '110%' }}>{product.description}</Text>

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

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default CheckProdPage;
