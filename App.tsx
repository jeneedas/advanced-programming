import { StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CounterDisplay from './src/components/CounterDisplay';
import { CounterButton, ResetButton } from './src/components/CounterButtons';
import { useState } from 'react';
import styles from './src/styles/appStyles';
import ThemeButton from './src/components/ThemeButton';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [value, setValue] = useState<number>(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const screenStyle = theme === 'dark' ? styles.ScreenDark : styles.ScreenLight;
  const mainStyle =
    theme === 'dark' ? styles.MainContainerDark : styles.MainContainerLight;

  const increaseNumber = () => {
    setValue(prevValue => prevValue + 1);
  };

  const decreaseNumber = () => {
    setValue(prevValue => {
      if (prevValue <= 0) return 0;
      else return prevValue - 1;
    });
  };

  const resetNumber = () => {
    setValue(0);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'dark') return 'light';
      else return 'dark';
    });
  };

  return (
    <SafeAreaView style={screenStyle}>
      <View style={mainStyle}>
        <View style={styles.CounterContainer}>
          <CounterButton theme={theme} type="dec" onPress={decreaseNumber} />
          <CounterDisplay value={value} theme={theme} />
          <CounterButton theme={theme} type="inc" onPress={increaseNumber} />
        </View>
        <ResetButton theme={theme} onPress={resetNumber} />
        <ThemeButton value={theme} onPress={toggleTheme} />
      </View>
    </SafeAreaView>
  );
}

export default App;
