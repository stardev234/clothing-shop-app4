
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Button, Group, Stack } from '@mantine/core'; 
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <>
      
      <ColorSchemeToggle  />
<Stack style={{position:"absolute", left:"500px",bottom:"500px" , width:"1000px"}}>
      
      <Button variant='filled' style={{ fontSize: '24px', width:"90%",}} component={Link} to={"/check-prod-page"}>Ver productos</Button>
      <Button variant='filled' style={{ fontSize: '24px', width:"90%",}}
      
      component={Link}
      to='/add-prod-page'
      >Añadir Producto</Button>

    
    </Stack>
    </>
  );
}
