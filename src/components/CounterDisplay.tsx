import { Text, View } from 'react-native';
import styles from '../styles/appStyles';

interface CounterDisplayProps {
  value: number;
  theme: 'dark' | 'light';
}

const CounterDisplay = ({ value, theme }: CounterDisplayProps) => {
  const containerStyle =
    theme === 'dark'
      ? styles.CounterDisplayContainerDark
      : styles.CounterDisplayContainerLight;
  const textStyle =
    theme === 'dark' ? styles.CounterDisplayDark : styles.CounterDisplayLight;

  return (
    <View style={[styles.CounterDisplayContainerBase, containerStyle]}>
      <Text style={textStyle}>{value}</Text>
    </View>
  );
};

export default CounterDisplay;
