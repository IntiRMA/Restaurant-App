import React,{Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import containerStyles from '../styles/containerStyles';
import buttonStyles from '../styles/buttonStyles';
import textStyles from '../styles/textStyles';
import {connect} from 'react-redux';
import auth from '../services/handleAuthentication';
import {LoadingScreen} from "./loading";
class LoginScreen extends Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:"",
            loading:false
        };
    }

    async handleSignUp(){
        this.setState({loading:true});
        await auth.login(this.state.email, this.state.password, this.props).catch();
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
                    LOG IN
                </Text>
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
                    onPress={this.handleSignUp.bind(this)}>
                    <Text style={textStyles.whiteTextSmall}>
                        LogIn
                    </Text>
                </TouchableOpacity>
                <Text style={textStyles.blackTextSmall}>
                    OR
                </Text>
                <TouchableOpacity style={buttonStyles.registerContainer}
                    onPress={()=>this.props.navigation.navigate('Register')}>
                    <Text style={textStyles.whiteTextSmall}>
                        REGISTER
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
export default connect(mapStateToProps,MapDispatchToProps)(LoginScreen)