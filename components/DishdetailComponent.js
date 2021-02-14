import React, { Component } from 'react';
import { Text, View ,Button,Image,ScrollView,FlatList, Modal, StyleSheet} from 'react-native';
import { Card, Icon, Rating, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import {postComment, postFavorite} from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites:state.favorites,
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment:(dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment))
  });

  function RenderDish(props) {
    
    const dish = props.dish;
    
        if (dish != null) {
            return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.formRow}>
                    <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                      <Icon
                    raised
                    reverse
                    name="pencil"
                    type='font-awesome'
                    color='#512DA8'
                    onPress={()=>props.OnSelect()}
                    />
                    </View>
                </Card>
            </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}
function RenderComments(props){
    const comments = props.comments;
    const renderCommentItem = ({item,index})=>{
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Rating
                imageSize={20}
                readonly
                startingValue={item.rating}
                style={{ alignItems: "flex-start" }}/>
                <Text style={{fontSize:12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }
    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={(item)=>item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component{

    constructor(props){
        super(props);

        this.state={
            showModal : false,
            rating: 1,
            author: '',
            comment:''

        }
    }

    toggleModal(){
        this.setState({showModal:!this.state.showModal})
    }
    resetForm(){
        this.setState({
            showModal : false,
            rating: 1,
            author: '',
            comment:''
        })
    }
    handleComment=(dishId)=>{
       this.props.postComment(dishId,this.state.rating, this.state.author, this.state.comment)
    }

    markFavorite(dishId){
        this.props.postFavorite(dishId)
    }
    static navigationOptions={
        title:'Dish Details'
   }

    render(){
        const dishId= this.props.route.params?.dishId ?? '';
       
        return(
            <ScrollView>
            <RenderDish 
                dish={this.props.dishes.dishes[+dishId]}
                favorite={this.props.favorites.some(el => el === dishId)}
                onPress={() => this.markFavorite(dishId)} 
                OnSelect={()=>this.toggleModal(dishId)}
                />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} 
            postComment={this.props.postComment}/>

            <Modal animationType={"slide"} transparent={false}
             visible = {this.state.showModal}
             onDismiss = {() => this.toggleModal() }
             onRequestClose = {() => this.toggleModal() }>
                   <View style = {styles.modal}>
                        <Text style={styles.formLabel}>Rating</Text>
                        <Rating showRating
                         style={{ paddingVertical: 10 }}
                         startingValue={1}
                         onFinishRating={(value) => this.setState({ rating: value })}/>
                         <View style={styles.row}>
                        <Input
                            placeholder="Author"
                            leftIcon={
                                <Icon
                                  name='user'
                                  type="font-awesome"
                                  size={24}
                                  color="light"
                                />
                              }
                            onChangeText={value => this.setState({ author: value })}
                            />
                            <Input
                                placeholder="comment"
                                onChangeText={value => this.setState({ comment: value })}
                                leftIcon={
                                    <Icon
                                    name="comment"
                                    type="font-awesome"
                                    size={24}/>
                                }
                                />
                             </View>
                             <Button
                            title="Submit"
                            onPress={()=>{this.handleComment(dishId);  this.resetForm();}}
                            color="#512DA8"
                              color="#6c757d"/>
                        

                             <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#f194ff"
                            title="Cancel" 
                            />            
                    </View>
             </Modal>
        </ScrollView>
        );
    }  
}
const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});


export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);