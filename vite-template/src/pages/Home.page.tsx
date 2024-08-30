import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Button, Group } from '@mantine/core'; 
import { Link } from 'react-router-dom';
export function HomePage() {
  return (
    <>
      
      <ColorSchemeToggle />
      <Group justify='center' mt="250">
      <Button  style={{ fontSize: '24px', width:"30%",}}>Ver productos</Button>
      <Button style={{ fontSize: '24px', width:"30%",}}
      
      component={Link}
      to='/add-prod-page'
      >Añadir Producto</Button>
    </Group>
    
    
    </>
  );
}
