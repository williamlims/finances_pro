import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, Text } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { NavigationContainer, TransitionSpecs } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Test1 } from './screens/Test1';
import { Test2 } from './screens/Test2';
import { Home } from './screens/Home';
import { Index as IndexRegister } from './screens/register/Index';
import { RegisterExpense } from './screens/register/RegisterExpense';
import { RegisterRecipe } from './screens/register/RegisterRecipe';
import { RegisterGoods } from './screens/register/RegisterGoods';
import { Dashboard } from './screens/Dashboard';
import { Index as IndexLimits } from './screens/limits/Index';
import { SetMonthLimit } from './screens/limits/SetMonthLimit';
import { SetAnnualLimit } from './screens/limits/SetAnnualLimit';
import { Index as IndexRegisters } from './screens/registers/Index';
import { ExpenseRecords } from './screens/registers/ExpenseRecords';
import { RecipeRecords } from './screens/registers/RecipeRecords';
import { GoodsRecords } from './screens/registers/GoodsRecords';
import { Appellants } from './screens/Appellants';
import { Data } from './screens/Data';

const Stack = createNativeStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  }
}

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 200,
  }
}

function RootStackNav() {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: true,
        transitionSpec: {
          open: config,
          close: closeConfig,
        }
      }}
      >
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="IndexRegister" component={IndexRegister} options={{ headerShown: false }}/>
        <Stack.Screen name="RegisterExpense" component={RegisterExpense} options={{ headerShown: false }}/>
        <Stack.Screen name="RegisterRecipe" component={RegisterRecipe} options={{ headerShown: false }}/>
        <Stack.Screen name="RegisterGoods" component={RegisterGoods} options={{ headerShown: false }}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
        <Stack.Screen name="IndexLimits" component={IndexLimits} options={{ headerShown: false }}/>
        <Stack.Screen name="SetMonthLimit" component={SetMonthLimit} options={{ headerShown: false }}/>
        <Stack.Screen name="SetAnnualLimit" component={SetAnnualLimit} options={{ headerShown: false }}/>
        <Stack.Screen name="IndexRegisters" component={IndexRegisters} options={{ headerShown: false }}/>
        <Stack.Screen name="ExpenseRecords" component={ExpenseRecords} options={{ headerShown: false }}/>
        <Stack.Screen name="RecipeRecords" component={RecipeRecords} options={{ headerShown: false }}/>
        <Stack.Screen name="GoodsRecords" component={GoodsRecords} options={{ headerShown: false }}/>
        <Stack.Screen name="Appellants" component={Appellants} options={{ headerShown: false }}/>
        <Stack.Screen name="Data" component={Data} options={{ headerShown: false }}/>

        <Stack.Screen name="Test1" component={Test1} options={{ headerShown: false }}/>
        <Stack.Screen name="Test2" component={Test2} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

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
      <NavigationContainer>
        <RootStackNav />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
