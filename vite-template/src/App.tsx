import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';


// Create a client

export default function App() {
  return (

    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>

  );
}
