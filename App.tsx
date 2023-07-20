
import {  StatusBar, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from '@components/loading';

import { THEME } from './src/theme'
import { SignUp } from '@screens/SignUp';

export default function App() {
 
    const [fontLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold }); 
  return (
    <NativeBaseProvider theme={THEME}> 
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
    />

      {fontLoaded ? <SignUp/> : <Loading/>}
    </NativeBaseProvider>
  );
}

