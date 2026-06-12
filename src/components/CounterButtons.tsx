import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles/appStyles';

interface CounterButtonsProps {
  type: 'inc' | 'dec';
  theme: 'dark' | 'light';
  onPress: () => void;
}

interface ResetButtonProps {
  theme: 'dark' | 'light';
  onPress: () => void;
}

const CounterButton = ({ type, theme, onPress }: CounterButtonsProps) => {
  const value = type === 'inc' ? '↑' : '↓';
  const surfaceStyle = theme === 'dark' ? styles.SurfaceDark : styles.SurfaceLight;
  const textStyle = theme === 'dark' ? styles.TextDark : styles.TextLight;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.CounterButtonBase, surfaceStyle]}
    >
      <Text style={[styles.CounterButtonText, textStyle]}>{value}</Text>
    </TouchableOpacity>
  );
};

const ResetButton = ({ theme, onPress }: ResetButtonProps) => {
  const surfaceStyle = theme === 'dark' ? styles.SurfaceDark : styles.SurfaceLight;
  const textStyle = theme === 'dark' ? styles.TextDark : styles.TextLight;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.ResetButtonBase, surfaceStyle]}
    >
      <Text style={[styles.ResetText, textStyle]}>Reset</Text>
    </TouchableOpacity>
  );
};

export { CounterButton, ResetButton };
