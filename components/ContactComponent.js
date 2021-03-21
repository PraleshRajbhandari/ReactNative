import React from "react";
import {Card, Button, Icon}from "react-native-elements";
import{Text, ScrollView} from "react-native"
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
function Contact(){
    return(
    <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card title="Contact Information" >
                <Text style={{marginLeft:5}}>{
`121, Clear Water Bay Road
Clear Water Bay, Kowloon
HONG KONG
Tel: +852 1234 5678
Fax: +852 8765 4321
Email:confusion@food.net`
                }       
                </Text>
                <Button
                    title='Send Email'
                    buttonStyle = {{backgroundColor: '#512DA8'}}
                    icon={<Icon name='envelope-o' type="font-awesome" color='white'/>}
                    onPress={sendMail}
                />
            </Card>
            </Animatable.View>
        </ScrollView>
    );
}
function sendMail(){
    MailComposer.composeAsync({
        recipients: ['confusion@food.net'],
        subject: 'Enquiry',
        body: 'To Whom It May Concern'
    });
}

export default Contact;