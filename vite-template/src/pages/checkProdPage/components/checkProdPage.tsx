import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/fetchProds';
import { Product } from '@/models/Products';
import { Card, Text, Group, Button, Modal, TextInput, Table, Container } from '@mantine/core';
import { FilteringBar } from "./FilteringBar";
import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { EditProd } from './EditProd';
import { Pagination } from '@mantine/core';
import { UpdatedProduct } from './UpdatedProduct';
const CheckProdPage: React.FC = () => {
  // State for storing product data, loading state, and error
  const [product, setProduct] = useState<Product[] | string | Object>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState("editMode")
  const [prod, setEditingProd] = useState<Product>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(20);
  const icon = <IconEdit size={22} />;
  const totalProducts = (product as Product[]).length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null); // State for the updated product
  const [modalOpen, setModalOpen] = useState<boolean>(false); // State for modal visibility
  const [modalTitle, setModalTitle] = useState<string>("Editar producto")

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

  const handleUpdate = (product: Product) => {
    console.log("from handle update");
    setUpdatedProduct(product); // Store the updated product
    console.log("from handleUpdate: ", updatedProduct);
    setModalOpen(true); // Open the modal
    setUpdateTrigger(true); // Set the trigger to true
  };

  useEffect(() => {
    console.log("from useEffect Prod", prod); // This will log the updated state
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
        }};
      fetchData()
    };
  }, [updateTrigger]);

  useEffect(() => {
    if (updatedProduct) {
      const fetchData = async () => {
        try {
          console.log("from updated product useEffect: ", updatedProduct);
          setModalContent("")
          setModalTitle("Producto editado")
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

        <Modal opened={opened} onClose={() => { close() }} 
        title={modalTitle} size={"md"} >
          {modalContent === 'editMode' ? (
            <EditProd productElement={prod} onUpdate={handleUpdate} />
          ) : (
            <>
            <UpdatedProduct updatedElement={updatedProduct}  />
            </>
          )}

        </Modal>

        <Table style={{ padding:"10px", paddingRight:"1000px", width:"1550px"}}>
      <thead style={{ width:"1550px", position:"relative", right:"15px"}} >
        <tr style={{ width:"1550px"}}>
          <th style={{fontSize:"1em", left:"110px",}}>Acciones</th>
          <th>Código de Barras</th>
          <th >Nombre</th>
          <th>Categoría</th>
          <th>Marca</th>
          <th>Talle</th>
          <th>Color</th>
          <th>Material</th>
          <th>Stock</th>
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Género</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody >
        {currentProducts.map((product) => (
          <tr key={product._id} style={{padding:"20px"}}>
            <td >
              <Button
                onClick={() => {
                  editProducts(product);
                  setModalContent("editMode");
                  setModalTitle("Editar producto")
                }}
                style={{ width: "50px", padding: "0px", margin: "0px" }}
              >
                {icon}
              </Button>
            </td>
            <td style={{ fontSize: '1.1em' }}>{product.barcode}</td>
            <td style={{ fontSize: '1.1em' }}>{product.name}</td>
            <td style={{ fontSize: '1.1em' }}>{product.category}</td>
            <td style={{ fontSize: '1.1em' }}>{product.brand}</td>
            <td style={{ fontSize: '1.1em' }}>{product.size}</td>
            <td style={{ fontSize: '1.1em' }}>{product.color}</td>
            <td style={{ fontSize: '1.1em' }}>{product.material}</td>
            <td style={{ fontSize: '1.1em' }}>{product.stock}</td>
            <td style={{ fontSize: '1.1em' }}>{product.description}</td>
            <td style={{ fontSize: '1.1em' }}>{product.date}</td>
            <td style={{ fontSize: '1.1em' }}>{product.gender}</td>
            <td style={{ fontSize: '1.1em' }}>${product.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>

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
