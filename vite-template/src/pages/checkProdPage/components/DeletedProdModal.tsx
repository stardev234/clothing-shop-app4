import { Table, Button, Pagination, Text, List, ListItem } from "@mantine/core";

export interface myProductElement {
    barcode: string,
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
    deletedElement: myProductElement
}



export const DeletedProduct: React.FC<any> = ({ deletedElement }) => {

    console.log("DELETED ELEMENT: ", deletedElement);



    return (

        <div>
            <List>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Codigo de barras: {" "}
                        </span>
                        {deletedElement.barcode}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Nombre: {" "}
                        </span>
                        {deletedElement.name}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Categoria: {" "}
                        </span>
                        {deletedElement.category}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Marca: {" "}
                        </span>
                        {deletedElement.brand}
                    </Text>
                </ListItem>


                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Talle: {" "}
                        </span>
                        {deletedElement.size}
                    </Text>
                </ListItem>


                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Color: {" "}
                        </span>
                        {deletedElement.color}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Material: {" "}
                        </span>
                        {deletedElement.material}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Stock: {" "}
                        </span>
                        {deletedElement.stock}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Descripción: {" "}
                        </span>
                        {deletedElement.description}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Fecha: {" "}
                        </span>
                        {deletedElement.date}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Género: {" "}
                        </span>
                        {deletedElement.gender}
                    </Text>
                </ListItem>


                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Precio: {" "}
                        </span>
                        {deletedElement.price}
                    </Text>
                </ListItem>

            </List>
        </div>
    );
}

