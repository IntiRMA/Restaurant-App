import React from 'react';
import {ActivityIndicator, Text, View} from "react-native";
export class LoadingScreen extends React.Component {
    render() {
            return (
                <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text>
                        loading..
                    </Text>
                    <ActivityIndicator/>
                </View>
            );
        }
}