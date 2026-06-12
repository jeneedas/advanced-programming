import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/appStyles';

interface ToggleButtonProps {
  value: 'dark' | 'light';
  onPress: () => void;
}

const ThemeButton = ({ value, onPress }: ToggleButtonProps) => {
  const themeLabel = value === 'dark' ? 'Dark' : 'Light';
  const surfaceStyle = value === 'dark' ? styles.SurfaceDark : styles.SurfaceLight;
  const textStyle = value === 'dark' ? styles.TextDark : styles.TextLight;
  const mutedStyle = value === 'dark' ? styles.TextMutedDark : styles.TextMutedLight;
  return (
    <View style={styles.ThemeToggleContainer}>
      <Text style={[styles.ThemeLabel, mutedStyle]}>Theme</Text>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={[styles.ThemeButtonBase, surfaceStyle]}
      >
        <Text style={[styles.ThemeButtonText, textStyle]}>{themeLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThemeButton;
