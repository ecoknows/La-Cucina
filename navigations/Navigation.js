import React,{useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Pic } from '../components'
import { Cuisine, Ingridients, Favorite, History,CuisineSelected, NoteEditor } from '../screens';
import {InfoModal, ImageModal} from '../modal';
import { dynamic } from '../constants';

const Tab = createBottomTabNavigator();
const Stack  = createStackNavigator();
let active = 0;
let click = false;
let stack_active = [];
let active_string = ['Cuisine', 'Ingridients', 'Favorites', 'History'];

function BottomNavigation({navigation}){
    navigation.setOptions({
        headerShown: false,
    });

    if(!click && stack_active.length != 0){
        active = stack_active[stack_active.length-1];
        stack_active.pop();
    }
    click = false;
    
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
                    stack_active = stack_active.filter(item=> item != active);
                    stack_active.push(active);
                    active = 0;
                    click = true;
                },
                }}
            options={{
                tabBarLabel: () => active_string[active] === 'Cuisine' ? <Text accent familiy='semi-bold' size={13} style={{marginLeft: 0, marginTop: 5}}>Cuisine</Text> : null,
                tabBarIcon: ({ color }) => 
                    
                <Pic
                resizeMode='contain' src={require('../assets/images/cuisine.png')} 
                    size={[25,25]}
                    style={{marginBottom: 50}}
                    accent={active_string[active]==='Cuisine'}
                />,
                
                }}

                />
            <Tab.Screen name="Ingridients" component={Ingridients}
            listeners={{
                tabPress: e => {
                    stack_active = stack_active.filter(item=> item != active);
                    stack_active.push(active);
                    active = 1;
                    click = true;
                },
                }}
            options={{
                tabBarLabel: () => active_string[active] === 'Ingridients' ? 
                <Text accent familiy='semi-bold' size={13} style={{marginLeft: 0, marginTop: 5}}>Ingredients</Text>
                : null,
                tabBarIcon: ({ color }) => (
                        <Pic 
                            resizeMode='contain' src={require('../assets/images/ingridients.png')} 
                            size={[25,25]}
                            style={{marginBottom: 50}}
                            accent={active_string[active]==='Ingridients'}

                        />
                )

            }}
            
            />
            <Tab.Screen name="Favorite" component={Favorite} 
                listeners={{
                tabPress: e => {
                    stack_active = stack_active.filter(item=> item != active);
                    stack_active.push(active);
                    active = 2;
                    click = true;
                },
                }}
            options={{
                tabBarLabel: () => active_string[active] === 'Favorites' ? 
                <Text accent familiy='semi-bold' size={13} style={{marginLeft: 0, marginTop: 5}}>Favorites</Text>
                : null,
                tabBarIcon: ({ color }) => (
                        <Pic resizeMode='contain' src={require('../assets/images/favorite.png')} 
                            size={[25,25]}
                            style={{marginBottom: 50}}
                            accent={active_string[active]==='Favorites'}
                        />
                ),
                }}
            
            />
            <Tab.Screen name="History" component={History} 
            listeners={{
                tabPress: e => {
                    stack_active = stack_active.filter(item=> item != active);
                    stack_active.push(active);
                    active = 3;
                    click = true;
                },
                }}

            options={{
                tabBarLabel: () => active_string[active] === 'History' ? 
                <Text accent familiy='semi-bold' size={13} style={{marginRight: 20, marginTop: 5}}>History</Text>
                : null,
                tabBarIcon: ({ color }) => (
                        <Pic resizeMode='contain' src={require('../assets/images/history.png')} 
                            size={[25,25]}
                            style={{marginBottom: 50}}
                            accent={active_string[active]==='History'}
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
            <Stack.Navigator mode='modal' >
                <Stack.Screen name="Main" component={BottomNavigation} />
                <Stack.Screen name="CuisineSelected" component={CuisineSelected}
                options={{
                    headerShown: false
                }}
                />
                <Stack.Screen name="NoteEditor" component={NoteEditor}
                options={{
                    headerShown: false
                }}
                />
                <Stack.Screen name="InfoModal" component={InfoModal}
                options={{                
                    animationEnabled: false,
                    headerShown: false,
                    cardStyle: {backgroundColor: 'rgba(226,67,9,0.25)'},
                    cardOverlayEnabled: true,
                }}/>
                
                <Stack.Screen name="ImageModal" component={ImageModal}
                options={{                
                    animationEnabled: false,
                    headerShown: false,
                    cardStyle: {backgroundColor: 'rgba(226,67,9,0.25)'},
                    cardOverlayEnabled: true,
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
