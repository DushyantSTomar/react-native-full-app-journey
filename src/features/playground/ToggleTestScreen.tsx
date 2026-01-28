import { View, Text, Button } from 'react-native';
import { useToggle } from '../../hooks/useToggle';
import { styles } from './styles';

const ToggleTestScreen = () => {
  const { value, on, off, toggle } = useToggle();

  return (
    <View style={styles.container}>
      <Text>{value ? 'ON' : 'OFF'}</Text>

      <Button title="ON" onPress={on} />
      <Button title="OFF" onPress={off} />
      <Button title="TOGGLE" onPress={toggle} />
    </View>
  );
};

export default ToggleTestScreen;
