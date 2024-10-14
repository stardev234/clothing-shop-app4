import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/fetchProds';
import { Product } from '@/models/Products';
import { Card, Text, Group, Button, Modal, TextInput, Table, Container, Stack } from '@mantine/core';
import { FilteringBar } from "./FilteringBar";
import { IconEdit, IconShoppingCart, IconPrinter } from '@tabler/icons-react';

import { useDisclosure } from '@mantine/hooks';
import { EditProd } from './EditProd';
import { Pagination } from '@mantine/core';
import { UpdatedProduct } from './UpdatedProduct';
import { DeleteProduct } from './DeleteProd';
import { deleteProdFetch } from '../utils/fetchDeleteProd';
import { DeletedProduct } from './DeletedProdModal';
import PrintComponent from '@/pages/addProdPage/components/Print';
import SuccessComponent from '@/pages/addProdPage/components/SuccesComponent';
import BarcodeScanner from './BarcodeScanner';
import { ShoppingCart } from './shoppingCart';
const CheckProdPage: React.FC = () => {
  // State for storing product data, loading state, and error

  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [prod, setEditingProd] = useState<Product>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(20);
  const icon = <IconEdit size={22} />;
  const printerIcon = <IconPrinter size={22} style={{}} ></IconPrinter>

  const totalProducts = (product as Product[]).length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(false);
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null); // State for the updated product
  const [deletedProduct, setdeletedProduct] = useState<Product | null>(null);
  const [deletedProductTrigger, setDeletedProductTrigger] = useState<Product | null>(null); // State for the updated product
  const [modalOpen, setModalOpen] = useState<boolean>(false); // State for modal visibility
  const [modalTitle, setModalTitle] = useState<string>("Editar producto")
  const [modalContent, setModalContent] = useState("editMode")
 
  const [shoppingProd, setShoppingProd] = useState<Product | null>(null);



  const updateProducts = (newData: Product[] | string | Object) => {
    console.log("newData FILTERED", newData);
    
    setProduct(newData as Product[]);
    console.log("From update products",product);
    
    setCurrentPage(1)
  };

  const editProducts = (editingProduct: Product) => {
    console.log(editingProduct);
    setEditingProd(editingProduct);
    console.log(prod);

    open();
  };



  const deleteProduct = (product: Product) => {

    setdeletedProduct(product)
    setDeleteTrigger(true)
  };





  const handleUpdate = (product: Product) => {
    console.log("from handle update: ", product);
    setUpdatedProduct(product); // Store the updated product
    console.log("from handleUpdate: ", updatedProduct);
    setModalOpen(true); // Open the modal
    setUpdateTrigger(true); // Set the trigger to true
  };


  const handleDelete = (product: Product) => {
    console.log("from handle delete", product);

    setdeletedProduct(product)
    setDeletedProductTrigger(true)
    setUpdateTrigger(true)
  };

  interface DateFormatProps {
    isoDate: string;
  }

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const DateFormat: React.FC<DateFormatProps> = ({ isoDate }) => {
    return <span>{formatDate(isoDate)}</span>;
  };



  const handleShoppingCart = (product: Product) => {
    setShoppingProd(product)
    console.log("FROM HANDLE SHOPPING CART");
    console.log(shoppingProd);
    
    
    
  }


  // Fetches product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProducts();
        setProduct(productData);
        console.log(product);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // updates list of products after editing
  useEffect(() => {
    if (updateTrigger) {

      const fetchData = async () => {
        try {
          const productData = await getProducts();
          setProduct(productData);
          setUpdateTrigger(false)
          setModalContent("updatedProduct")
          setModalTitle("Producto editado correctamente")
          console.log("from useEffect update trigger");

        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          setLoading(false);
        }
      };
      fetchData()
    };
  }, [updatedProduct]);


  //changes modal to delete mode
  useEffect(() => {
    if (deleteTrigger) {
      const fetchData = async () => {
        try {
          console.log("from deletedProductTrigger useEffect: ", deletedProduct);
          setModalContent("deleteMode")
          setModalTitle("¿Eliminar el siguiente producto?")
          setDeleteTrigger(false)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          setLoading(false);
        }
      };

      fetchData()
    };
  }, [deletedProduct]);


  useEffect(() => {
    if (deletedProductTrigger) {
      const fetchData = async () => {
        try {
          console.log("from deletedProductTrigger useEffect: ", deletedProduct);
          setModalContent("deletedProduct")
          setModalTitle("El siguiente producto ha sido borrado")
          setDeletedProductTrigger(false)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          setLoading(false);
        }
      };

      fetchData()
    };
  }, [deletedProduct]);

  // updates list of products after deleting
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
  }, [deletedProduct]);




  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;





  return (
    <div>
      <BarcodeScanner onAction={handleShoppingCart} />

      <div>
        <Modal opened={opened} onClose={close} title={modalTitle} size="md">
          <div>
            {modalContent === 'editMode' && <EditProd productElement={prod} onUpdate={handleUpdate} onDelete={deleteProduct} />}
            {modalContent === 'updatedProduct' && <UpdatedProduct updatedElement={updatedProduct} />}
            {modalContent === 'deleteMode' && <DeleteProduct productElement={prod} onDelete={handleDelete} />}
            {modalContent === 'deletedProduct' && <DeletedProduct deletedElement={deletedProduct} />}
            {modalContent === 'printingMode' && <SuccessComponent product={prod} onAddAnother={() => { throw new Error('Function not implemented.'); }} />}
          </div>
        </Modal>
        <Stack gap="xs" style={{ listStyleType: "none", padding: "0", width: "70px", position: "fixed" }}>
          <FilteringBar onAction={updateProducts} />
          <ShoppingCart productElement={shoppingProd}/>
        </Stack>

        <Table.ScrollContainer style={{ paddingLeft: "100px", paddingRight: "100px" }} minWidth={500} type="native">

          <Table verticalSpacing="xs" horizontalSpacing="lg">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Código de Barras</Table.Th>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Categoría</Table.Th>
                <Table.Th>Marca</Table.Th>
                <Table.Th>Talle</Table.Th>
                <Table.Th>Color</Table.Th>
                <Table.Th>Material</Table.Th>
                <Table.Th>Stock</Table.Th>
                <Table.Th>Descripción</Table.Th>
                <Table.Th>Fecha</Table.Th>
                <Table.Th>Género</Table.Th>
                <Table.Th>Precio</Table.Th>
                <Table.Th>Acciones</Table.Th>
              </Table.Tr>
            </Table.Thead>

            {product.map((product) => (
              <Table.Tr key={product._id}>
                <Table.Td>{product.barcode}</Table.Td>
                <Table.Td>{product.name}</Table.Td>
                <Table.Td>{product.category}</Table.Td>
                <Table.Td>{product.brand}</Table.Td>
                <Table.Td>{product.size}</Table.Td>
                <Table.Td>{product.color}</Table.Td>
                <Table.Td>{product.material}</Table.Td>
                <Table.Td>{product.stock}</Table.Td>
                <Table.Td>{product.description}</Table.Td>
                <Table.Td>{formatDate(product.date)}</Table.Td>
                <Table.Td>{product.gender}</Table.Td>
                <Table.Td>${product.price}</Table.Td>
                <Table.Td>
                  <Button
                    onClick={() => {
                      editProducts(product);
                      setModalContent("editMode");
                      setModalTitle("Editar producto")
                    }}
                    variant='light'

                  >
                    {icon}
                  </Button>
                  <Button
                    onClick={() => {
                      editProducts(product);
                      setModalContent("printingMode");
                      setModalTitle("Imprimir Producto")
                    }}
                    variant='light'
                    color='orange'
                  >{printerIcon}</Button>
                </Table.Td>
              </Table.Tr>
            ))}

          </Table>
        </Table.ScrollContainer>
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: "20px" }}>
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CheckProdPage;

/*
<Button
                    onClick={() => {
                      editProducts(product);
                      setModalContent("editMode");
                      setModalTitle("Editar producto")
                    }}
                    variant='light'
                    style={{ width: "50px", padding: "0px", margin: "0px", position: "relative", left: "1750px" }}
                  >
                    {icon}
                  </Button>
                  <Button
                    onClick={() => {
                      editProducts(product);
                      setModalContent("printingMode");
                      setModalTitle("Imprimir Producto")
                    }}
                    variant='light'
                    color='orange'
                    style={{ width: "50px", padding: "0px", margin: "0px", position: "relative", left: "1550px" }}>{printerIcon}</Button><ul style={{ listStyleType: "none", padding: "0" }}>
          <li><FilteringBar onAction={updateProducts} /></li>
          <li><ShoppingCart /></li>
        </ul>*/