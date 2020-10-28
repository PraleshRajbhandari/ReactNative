import React from "react";
import {Card}from "react-native-elements";
import{Text} from "react-native"
function Contact(){
    return(
        
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
            </Card>
    );
}

export default Contact;