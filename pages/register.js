import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import containerStyles from '../styles/containerStyles';
import buttonStyles from '../styles/buttonStyles';
import textStyles from '../styles/textStyles';
import auth from '../services/handleAuthentication';
import {LoadingScreen} from "./loading";
import {connect} from "react-redux";

class RegisterScreen extends React.Component{
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            name: "",
            loading:false
        };
    }

     async handleRegister() {
        this.setState({loading:true});
        await auth.register(this.state.name,this.state.email,this.state.password,this.props).catch();
        this.setState({loading:false});

     }

    render() {
        if(this.state.loading){
            return <LoadingScreen/>;
        }
        return (
            <View style={containerStyles.logInBack}>
                <View style={containerStyles.logInView}>
                    <Text style={textStyles.blackTextSmall}>
                        Register
                    </Text>
                    <TextInput style={containerStyles.logInInput}
                               placeholder="Name"
                               autoCapitalize="none"
                               onChangeText={name => this.setState({ name })}
                               value={this.state.name}/>

                    <TextInput style={containerStyles.logInInput}
                               placeholder="Email"
                               autoCapitalize="none"
                               onChangeText={email => this.setState({ email })}
                               value={this.state.email}/>

                    <TextInput style={containerStyles.logInInput}
                               secureTextEntry
                               placeholder="PASSWORD"
                               autoCapitalize="none"
                               onChangeText={password => this.setState({ password })}
                               value={this.state.password}/>

                    <TouchableOpacity style={buttonStyles.logInButton}
                                      onPress={this.handleRegister.bind(this)}>
                        <Text style={textStyles.whiteTextSmall}>
                            Register
                        </Text>
                    </TouchableOpacity>
                    <Text style={textStyles.blackTextSmall}>
                        OR
                    </Text>
                    <TouchableOpacity style={buttonStyles.registerContainer}
                                      onPress={()=>this.props.navigation.navigate('Login')}>
                        <Text style={textStyles.whiteTextSmall}>
                            Back to Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function MapDispatchToProps(dispatch) {
    return {
        loadA: (items) =>dispatch({type:'LOAD_ALL',items:items})
    }
}
export default connect(mapStateToProps,MapDispatchToProps)(RegisterScreen)