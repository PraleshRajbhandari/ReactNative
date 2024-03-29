import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Login from './LoginComponent';
import Favorites from './FavoriteComponent';
import Reservation from "./ReservationComponent";
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  })
  

const HomeNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const MenuNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();
const ReservationNavigator = createStackNavigator();
const FavoritesNavigator   = createStackNavigator();
const MainDrawerNavigator = createDrawerNavigator();
const LoginNavigator = createStackNavigator();

const StackNavigatorIcon = ({ navigation }) => {
    return (
        <Icon
            iconStyle={{ padding: 15 }}
            name='menu'
            size={24}
            color='white'
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
    )
}

const DrawerNavigatorIcon = ({ name, size }) => {
    return (
        <Icon
            name={name}
            type='font-awesome'
            size={size ? size : 24}
        />
    )
}

const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView {...props}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 1.75 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </SafeAreaView>
    </DrawerContentScrollView>
);

function HomeNavigatorScreen({ navigation }) {
    return (
        <HomeNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />

        </HomeNavigator.Navigator>
    );
}

function AboutNavigatorScreen({ navigation }) {
    return (
        <AboutNavigator.Navigator
            initialRouteName='About Us'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <AboutNavigator.Screen
                name="About Us"
                component={About}
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
        </AboutNavigator.Navigator>
    )
}

function ContactNavigatorScreen({ navigation }) {
    return (
        <ContactNavigator.Navigator
            initialRouteName='Contact Us'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <ContactNavigator.Screen
                name="Contact Us"
                component={Contact}
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
        </ContactNavigator.Navigator>
    )
}


function ReservationNavigatorScreen({ navigation }) {
    return (
        <ReservationNavigator.Navigator
            initialRouteName='Reservation'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <ReservationNavigator.Screen
                name="Reservation"
                component={Reservation}
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
        </ReservationNavigator.Navigator>
    )
}
function LoginNavigatorScreen({ navigation }) {
    return (
        <LoginNavigator.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <LoginNavigator.Screen
                name="Login"
                component={Login}
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
        </LoginNavigator.Navigator>
    )
}
function FavoritesNavigatorScreen({ navigation }) {
    return (
        <FavoritesNavigator.Navigator
            initialRouteName='Favorites'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <FavoritesNavigator.Screen
                name="Login"
                component={Favorites}
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
        </FavoritesNavigator.Navigator>
    )
}
function MenuNavigatorScreen({ navigation }) {
    return (
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
           <MenuNavigator.Screen
            name="Menu"
            component={Menu}
            options={{
                headerLeft: () => <StackNavigatorIcon navigation={navigation} />
            }}/>
            
        <MenuNavigator.Screen
            name="Dishdetail"
            component={Dishdetail}
            
        />            
    </MenuNavigator.Navigator>
    );
}


function MainDrawerScreen() {
    return (
        <MainDrawerNavigator.Navigator
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor: "#D1C4E9"
            }}
            drawerContent={props => <CustomDrawerContentComponent {...props} />}
        >
            <MainDrawerNavigator.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='home' />
                }}
            />
            <MainDrawerNavigator.Screen
                name="About Us"
                component={AboutNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='info-circle' />
                }}
            />
            <MainDrawerNavigator.Screen
                name="Menu"
                component={MenuNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='list' />
                }}
            />
            <MainDrawerNavigator.Screen
                name="Contact Us"
                component={ContactNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='address-card' size={22} />
                }}
            />
             <MainDrawerNavigator.Screen
                name="Reservation"
                component={ReservationNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='cutlery' size={22}/>
                }}
            />
             <MainDrawerNavigator.Screen
                name="Favorites"
                component={FavoritesNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='heart' size={22}/>
                }}
            />
             <MainDrawerNavigator.Screen
                name="Login"
                component={LoginNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='sign-in' size={22}/>
                }}
               
            />
            
        </MainDrawerNavigator.Navigator>
    )
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
      }
      
    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationContainer>
                    <MainDrawerScreen />
                </NavigationContainer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Main);