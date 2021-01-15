import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faPlusCircle,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

import Home from './Home';
import Article from './Article';
import SearchResult from './SearchResult';
import Account from './MyProfile';
import EditProfile from './EditProfile';
import CreateArticle from './CreateArticle';
import ArticleInCategory from './ArticleByCategory';

import Login from './Login';
import SignUp from './Signup';
import ForgotPassword from './ForgotPassword';

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen options={{title: 'Login'}} name="Login" component={Login} />
      <Stack.Screen
        options={{title: 'Sign Up'}}
        name="Signup"
        component={SignUp}
      />
      <Stack.Screen
        options={{title: 'Forgot'}}
        name="Forgot"
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen options={{title: 'Home'}} name="Home" component={Home} />
      <Stack.Screen
        options={{title: 'Article'}}
        name="Article"
        component={Article}
      />
      <Stack.Screen
        options={{title: 'Search Result'}}
        name="SearchResult"
        component={SearchResult}
      />
    </Stack.Navigator>
  );
};

const TabbedScreen = () => {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}>
      <BottomTab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => {
            color = focused ? '#2D6B97' : color;
            return <FontAwesomeIcon icon={faHome} size={size} color={color} />;
          },
        }}
        name="Home"
        component={Home}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => {
            color = focused ? '#2D6B97' : color;
            return (
              <FontAwesomeIcon icon={faPlusCircle} size={size} color={color} />
            );
          },
        }}
        name="Create"
        component={CreateArticle}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => {
            color = focused ? '#2D6B97' : color;
            return (
              <FontAwesomeIcon icon={faUserCircle} size={size} color={color} />
            );
          },
        }}
        name="Profile"
        component={Account}
      />
    </BottomTab.Navigator>
  );
};

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="TabbedScreen" component={TabbedScreen} />
          {!this.props.auth.isLogin ? (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          ) : null}
          <Stack.Screen name="HomeStack" component={HomeStack} />
          <Stack.Screen name="Article" component={Article} />
          <Stack.Screen
            name="ArticleInCategory"
            component={ArticleInCategory}
          />
          <Stack.Screen name="SearchResult" component={SearchResult} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
