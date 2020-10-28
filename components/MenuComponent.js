import React, { Component } from 'react';
import { View, FlatList,Image} from 'react-native';
import { ListItem,Text,Avatar} from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state={
            dishes:DISHES
        };
    }
 
render(){
    
    const renderMenuItem = ({item, index}) => {

        return (
                <ListItem key={index} onPress={()=>navigate('Dishdetail',{dishId:item.id})}>
                        <Image source = {require('./images/uthappizza.png')} avatarStyle/>
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <View>
                            <Text>{item.description}</Text>
                            </View>
                        </ListItem.Content>
                </ListItem>
        );
    };

    const {navigate} = this.props.navigation;
    return (
        <FlatList 
            data={this.state.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            />
);
}
   
}


export default Menu;