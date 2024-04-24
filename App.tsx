import React from 'react';
import {SafeAreaView} from 'react-native';
import Signup from './src/screens/signup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(51,50,56)'}}>
      <KeyboardAwareScrollView>
        <Signup></Signup>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default App;
