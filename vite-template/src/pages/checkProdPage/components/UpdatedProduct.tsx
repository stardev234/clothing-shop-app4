import { Table, Button, Pagination, Text, List, ListItem } from "@mantine/core";

export interface myProductElement {
  _id: string,
  provider: string,
  name: string,
  category: string,
  brand: string,
  size: string,
  color: string,
  material: string,
  price: string,
  description: string,
  stock: Number,
  gender: string,
  date: Date,
}

export interface productElement {
  updatedElement: myProductElement
}



export const UpdatedProduct: React.FC<any> = ({ updatedElement }) => {

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };




  
  return (

    <div>
      <List style={{ listStyleType: 'none', padding: 0 }}>
        <ListItem>
          <Text>
            <span style={{ fontWeight: 'bold' }}>
              Codigo de barras: {" "}
            </span>
            {updatedElement.barcode}
          </Text>
        </ListItem>

        <ListItem>
          <Text>
            <span style={{ fontWeight: 'bold' }}>
              Nombre: {" "}
            </span>
            {updatedElement.name}
          </Text>
        </ListItem>

        <ListItem>
          <Text>
            <span style={{ fontWeight: 'bold' }}>
              Categoria: {" "}
            </span>
            {updatedElement.category}
          </Text>
        </ListItem>

        <ListItem>
          <Text>
            <span style={{ fontWeight: 'bold' }}>
              Marca: {" "}
            </span>
            {updatedElement.brand}
          </Text>
        </ListItem>


        <ListItem>
          <Text>
            <span style={{ fontWeight: 'bold' }}>
              Talle: {" "}
            </span>
            {updatedElement.size}
          </Text>
        </ListItem>


        <ListItem>
          <Text>
            <span style={{ fontWeight: 'bold' }}>
              Color: {" "}
            </span>
            {updatedElement.color}
          </Text>
        </ListItem>

        <ListItem>
          <Text>
            <span style={{ fontWeight: 'bold' }}>
              Material: {" "}
            </span>
            {updatedElement.material}
          </Text>
        </ListItem>

        <ListItem>
          <Text>
            <span style={{ fontWeight: 'bold' }}>
              Stock: {" "}
            </span>
            {updatedElement.stock}
          </Text>
        </ListItem>

        <ListItem>
          <Text>
            <span style={{ fontWeight: 'bold' }}>
              Descripción: {" "}
            </span>
            {updatedElement.description}
          </Text>
        </ListItem>

        <ListItem>
          <Text>
            <span style={{ fontWeight: 'bold' }}>
              Fecha: {" "}
            </span>
            {formatDate(updatedElement.date)}
          </Text>
        </ListItem>

        <ListItem>
          <Text>
            <span style={{ fontWeight: 'bold' }}>
            Género: {" "}
            </span>
            {updatedElement.gender}
          </Text>
        </ListItem>
      
        
        <ListItem>
          <Text>
            <span style={{ fontWeight: 'bold' }}>
            Precio: {" "}
            </span>
            {updatedElement.price}
          </Text>
        </ListItem>

      </List>
    </div>
  );
}

