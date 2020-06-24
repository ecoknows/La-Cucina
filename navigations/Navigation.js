import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Pic } from '../components'
import { Cuisine, Ingridients, Favorite, History,CuisineSelected, NoteEditor } from '../screens';

import { theme } from '../constants';

const Tab = createBottomTabNavigator();
const Stack  = createStackNavigator();

function BottomNavigation({navigation}){
    navigation.setOptions({
        headerShown: false,
    });
    const [active, setActive] = useState('Cuisine');
    return(
        <Tab.Navigator
        
                    
        tabBarOptions={{

            style: {				
                elevation: 0,
                borderTopWidth: 0,
            },
            tabStyle:{
                height: 50,
            flexDirection: 'row',
            alignItems:'center',
            justifyContent: 'center',
            }
        }}
        >
            <Tab.Screen name="Cuisine" component={Cuisine} 
            listeners={{
                tabPress: e => {
                    setActive('Cuisine')
                },
                }}
            options={{
                tabBarLabel: () => active === 'Cuisine' ? <Text accent familiy='semi-bold' size={13} style={{marginLeft: -20, marginTop: 5}}>Cuisine</Text> : null,
                tabBarIcon: ({ color }) => 
                    
                <Pic
                resizeMode='contain' src={require('../assets/images/cuisine.png')} 
                    size={[25,25]}
                    style={{marginBottom: 50}}
                    accent={active==='Cuisine'}
                />
                }}

                />
            <Tab.Screen name="Ingridients" component={Ingridients}
            listeners={{
                tabPress: e => {
                    setActive('Ingridients')
                },
                }}
            options={{
                tabBarLabel: () => active === 'Ingridients' ? 
                <Text accent familiy='semi-bold' size={13} style={{marginLeft: -5, marginTop: 5}}>Ingridients</Text>
                : null,
                tabBarIcon: ({ color }) => (
                        <Pic 
                            resizeMode='contain' src={require('../assets/images/ingridients.png')} 
                            size={[25,25]}
                            style={{marginBottom: 50}}
                            accent={active==='Ingridients'}

                        />
                )

            }}
            
            />
            <Tab.Screen name="Favorite" component={Favorite} 
                listeners={{
                tabPress: e => {
                    setActive('Favorites')
                },
                }}
            options={{
                tabBarLabel: () => active === 'Favorites' ? 
                <Text accent familiy='semi-bold' size={13} style={{marginLeft: -5, marginTop: 5}}>Favorites</Text>
                : null,
                tabBarIcon: ({ color }) => (
                        <Pic resizeMode='contain' src={require('../assets/images/favorite.png')} 
                            size={[25,25]}
                            style={{marginBottom: 50}}
                            accent={active==='Favorites'}
                        />
                ),
                }}
            
            />
            <Tab.Screen name="History" component={History} 
            listeners={{
                tabPress: e => {
                    setActive('History')
                },
                }}

            options={{
                tabBarLabel: () => active === 'History' ? 
                <Text accent familiy='semi-bold' size={13} style={{marginRight: 20, marginTop: 5}}>History</Text>
                : null,
                tabBarIcon: ({ color }) => (
                        <Pic resizeMode='contain' src={require('../assets/images/history.png')} 
                            size={[25,25]}
                            style={{marginBottom: 50}}
                            accent={active==='History'}
                        />
                ),
                }}
            />
        </Tab.Navigator>
    )
}

function Navigation({navigation}){
    return(
        <NavigationContainer>
            <Stack.Navigator  >
                <Stack.Screen name="Cuisine" component={BottomNavigation} />
                <Stack.Screen name="CuisineSelected" component={CuisineSelected} />
                <Stack.Screen name="NoteEditor" component={NoteEditor} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
