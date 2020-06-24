import React, { useState, useEffect } from 'react';
import Navigation from './navigations/Navigation'
import { AppLoading } from 'expo';
import { CheckNote } from './database/database'
import * as Font from 'expo-font';

const  getFonts =()=> Font.loadAsync({
  'OpenSans-bold' : require('./fonts/open-sans/OpenSans-Bold.ttf'),
  'OpenSans-semi-bold' : require('./fonts/open-sans/OpenSans-SemiBold.ttf'),
  'OpenSans-light' : require('./fonts/open-sans/OpenSans-Light.ttf'),
  'OpenSans-regular' : require('./fonts/open-sans/OpenSans-Regular.ttf'),
})

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    CheckNote();
  }, [])

  if(fontsLoaded){
    return(
      <Navigation/>
    );
  } else {
    
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={()=>setFontsLoaded(true)}
      />
    );
  }
  
}
