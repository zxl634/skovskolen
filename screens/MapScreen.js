import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import GeoFenceComponent from '../components/GeoFenceComponent';

export default class MapScreen extends Component {
    constructor(props) {
      super(props);
      this.state = 
      {
        Zone : false,
        ZoneText : 'non-sense'
      };
      
    }

    
   inTheZone = (z,p)=>
   {
      this.setState({Zone : z , ZoneText:p.whatis});
      console.log('The point of interest in the zone:', p);  // Keeping track in the console/terminal
   };
  
    render() {
     
      return (
          <View style={styles.container}>

            <GeoFenceComponent  showCoordinates= {false} inZone = {this.inTheZone} >   </GeoFenceComponent>
            {(this.state.Zone) ?[<Text key={0} style={styles.paragraph}>{'Du er i Zonen ved ' + this.state.ZoneText}</Text>, 
                 <Button key={1}
                        title={'Fortæl mig lidt mere om ' + this.state.ZoneText}
                         onPress={() => this.props.navigation.navigate('Zone',{what:this.state.ZoneText})}  
                /> ] : null}
        </View>
      );
    }
  }

//Styling starter her
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin:10,
      fontSize: 18,
      textAlign: 'center'  
    } })
