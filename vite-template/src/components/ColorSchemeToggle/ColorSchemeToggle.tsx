import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mt="xl">
      <Button onClick={() => setColorScheme('light')}>Modo claro</Button>
      <Button onClick={() => setColorScheme('dark')}>Modo oscuro</Button>

    </Group>
  );
}
