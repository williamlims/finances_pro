/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, Text } from 'react-native';
import BootSplash from 'react-native-bootsplash';

function App() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text>Teste</Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
