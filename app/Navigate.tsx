import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../ui/screens/LoginScreen';
import RegisterScreen from '../ui/screens/RegisterScreen';
import RestorePasswordScreen from '../ui/screens/RestorePasswordScreen';
import SuccessScreen from '../ui/screens/SuccessScreen';
import NewPasswordScreen from '../ui/screens/NewPasswordScreen';

const Stack = createStackNavigator();

function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="RestorePassword"
          component={RestorePasswordScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Success"
          component={SuccessScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="NewPassword"
          component={NewPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigate;
