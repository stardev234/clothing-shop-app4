import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/fetchProds';
import { Product } from '@/models/Products';
import { Card, Text, Group, Button, Modal, TextInput, Table, Container } from '@mantine/core';
import { FilteringBar } from "./FilteringBar";
import { IconEdit } from '@tabler/icons-react';
import { IconPrinter } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { EditProd } from './EditProd';
import { Pagination } from '@mantine/core';
import { UpdatedProduct } from './UpdatedProduct';
import { DeleteProduct } from './DeleteProd';
import { deleteProdFetch } from '../utils/fetchDeleteProd';
import { DeletedProduct } from './DeletedProdModal';
import PrintComponent from '@/pages/addProdPage/components/Print';
import SuccessComponent from '@/pages/addProdPage/components/SuccesComponent';
const CheckProdPage: React.FC = () => {
  // State for storing product data, loading state, and error
  
  const [product, setProduct] = useState<Product[] | string | Object>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [prod, setEditingProd] = useState<Product>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(20);
  const icon = <IconEdit size={22} />;
  const printerIcon = <IconPrinter size={22} style={{ }} ></IconPrinter>
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
  const currentProducts = (product as Product[]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(
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




  // Fetches product data
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


  // updates list of products after editing
  useEffect(() => {
    if (updateTrigger) {

      const fetchData = async () => {
        try {
          const productData = await getProducts();
          setProduct(productData);
          setUpdateTrigger(false)
          setModalContent("updatedProduct")
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
      <FilteringBar onAction={updateProducts} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: "center" }}>

        <Modal opened={opened} onClose={() => { close() }}
          title={modalTitle} size={"md"} >

          <div>
            {modalContent === 'editMode' && <EditProd productElement={prod} onUpdate={handleUpdate} onDelete={deleteProduct} />}
            {modalContent === 'updatedProduct' && <UpdatedProduct updatedElement={updatedProduct} />}
            {modalContent === 'deleteMode' && <DeleteProduct productElement={prod} onDelete={handleDelete} />}
            {modalContent === 'deletedProduct' && <DeletedProduct deletedElement={deletedProduct} />}
            {modalContent === 'printingMode' && <SuccessComponent product={prod} onAddAnother={function (): void {
              throw new Error('Function not implemented.');
            } }></SuccessComponent>}
          </div>



        </Modal>

        <Table style={{ padding: "10px", paddingRight: "1000px", width: "1550px" }}>
          <thead style={{ width: "1550px", position: "relative", right: "15px" }} >
            <tr style={{ width: "1550px" }}>
              <th style={{ fontSize: "1em", left: "110px", }}>Acciones</th>
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
              <tr key={product._id} style={{ padding: "20px" }}>
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
                  <Button
                  onClick={() => {
                    editProducts(product);
                    setModalContent("printingMode");
                    setModalTitle("Imprimir Producto")
                  }}
                   style={{ width: "50px", padding: "0px", margin: "0px", backgroundColor:"green" }}>{printerIcon}</Button>
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
