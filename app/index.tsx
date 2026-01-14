import { StatusBar } from 'expo-status-bar';
import { ScreenContent } from '../components/ScreenContent';
import { Container } from 'components/Container';

export default function HomeScreen() {
  return (
    <Container>
      <ScreenContent title="Home" path="index.tsx" />
      <StatusBar style="auto" />
    </Container>
  );
}
