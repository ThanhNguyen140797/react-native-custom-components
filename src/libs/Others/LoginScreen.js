import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, Platform, TouchableOpacity, Alert } from 'react-native';

import Logo from '../../../assets/images/ic_logo.svg';
import IconSetting from '../../../assets/images/ic_settings.svg';
import IconMail from '../../../assets/images/ic_mail.svg';
import IconPassword from '../../../assets/images/ic_password.svg';
import IconFacebook from '../../../assets/images/ic_facebook.svg';
import IconGoogle from '../../../assets/images/ic_google.svg';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const initialLayout = { width: Dimensions.get('window').width };

class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
        this.secondTextInput;
    }

    _onChangeText(name) {
        return (value) => {
            this.setState({
                [name]: value
            })
        }
    }

    _onLogin = () => {
        Alert.alert(
            'Thông báo',
            this.state.username + ' - ' + this.state.password,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true },
        );
    }

    render() {
        return (
            <View style={styles.body}>
                <KeyboardAwareScrollView>
                    <View style={styles.page} >
                        <View style={styles.inputContainer}>
                            <IconMail
                                width={18}
                                height={18}
                                fill={'#BBDBEF'} />

                            <TextInput
                                style={styles.input}
                                placeholder=' Username'
                                placeholderTextColor='#BBDBEF'
                                returnKeyType={'next'}
                                autoCapitalize='none'
                                keyboardType='email-address'
                                blurOnSubmit={false}
                                onChangeText={this._onChangeText('username')}
                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                value={this.state.username}

                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <IconPassword
                                width={18}
                                height={18}
                                fill={'#BBDBEF'} />
                            <TextInput
                                ref={(input) => { this.secondTextInput = input; }}
                                style={styles.input}
                                autoCapitalize='none'
                                placeholder=' Password'
                                placeholderTextColor='#BBDBEF'
                                blurOnSubmit={true}
                                onChangeText={this._onChangeText('password')}
                                value={this.state.password}
                                secureTextEntry={true}
                            />
                        </View>
                        <TouchableOpacity
                            style={[styles.title2, { marginTop: 26 }]}
                            onPress={() => { console.log('forgot pwd') }}>
                            <Text style={styles.title2}>Forgot your password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._onLogin}>
                            <View style={styles.button}>
                                <Text style={[styles.title2, { fontWeight: "700" }]}>Login</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._onGuestLogin}>
                            <View style={styles.button2}>
                                <Text style={[styles.title2, { fontWeight: "700", color: '#9BC1DF' }]}>Use Without Login</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.footer}>
                            <TouchableOpacity
                                onPress={this._onLoginSocial}>
                                <View style={styles.buttonSocial}>
                                    <IconFacebook width={16} height={16} />
                                    <Text style={[styles.title2, { fontWeight: "700", marginLeft: 6 }]}>Facebook</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this._onLoginSocial}>
                                <View style={styles.buttonSocial}>
                                    <IconGoogle width={16} height={16} />
                                    <Text style={[styles.title2, { fontWeight: "700", marginLeft: 6 }]}>Google</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView >
            </View>
        )
    }
}

class RegisterPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
        this.secondTextInput;
    }

    _onChangeText(name) {
        return (value) => {
            this.setState({
                [name]: value
            })
        }
    }

    _onRegister = () => {
        Alert.alert(
            'Thông báo',
            this.state.username + ' - ' + this.state.password,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true },
        );
    }

    render() {
        return (
            <View style={styles.body}>
            <KeyboardAwareScrollView>
                <View style={styles.page} >
                    <View style={styles.inputContainer}>
                        <IconMail
                            width={18}
                            height={18}
                            fill={'#BBDBEF'} />

                        <TextInput
                            style={styles.input}
                            placeholder=' Username'
                            placeholderTextColor='#BBDBEF'
                            returnKeyType={'next'}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            blurOnSubmit={false}
                            onChangeText={this._onChangeText('username')}
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            value={this.state.username}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <IconPassword
                            width={18}
                            height={18}
                            fill={'#BBDBEF'} />
                        <TextInput
                            ref={(input) => { this.secondTextInput = input; }}
                            style={styles.input}
                            autoCapitalize='none'
                            placeholder=' Password'
                            placeholderTextColor='#BBDBEF'
                            blurOnSubmit={true}
                            onChangeText={this._onChangeText('password')}
                            value={this.state.password}
                            secureTextEntry={true}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={this._onRegister}>
                        <View style={styles.button}>
                            <Text style={[styles.title2, { fontWeight: "700" }]}>Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView >
        </View>
        )
    }
}
const renderScene = SceneMap({
    login: LoginPage,
    register: RegisterPage,
});

class LoginScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            index: 0,
            routes: [
                { key: 'login', title: 'Login' },
                { key: 'register', title: 'Register' },
            ]
        }
    }

    _handleIndexChange = index => this.setState({ index });

    _renderTabBar = (props) => {
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    if (route.key === "login") {
                        return (
                            <TouchableOpacity
                                key={i}
                                style={[styles.tabItem, { backgroundColor: this.state.index == 0 ? '#68B8F7' : '#7BC0FB' }]}
                                onPress={() => this.setState({ index: i })}>
                                <Text style={styles.title2}>Login</Text>
                            </TouchableOpacity>
                        );
                    } else {
                        return (
                            <TouchableOpacity
                                key={i}
                                style={[styles.tabItem, { backgroundColor: this.state.index == 1 ? '#68B8F7' : '#7BC0FB' }]}
                                onPress={() => this.setState({ index: i })}>
                                <Text style={styles.title2}>Register</Text>
                            </TouchableOpacity>
                        );
                    }
                })}
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Logo
                        width={90}
                        height={90} />
                    <Text style={styles.title}>Company Name</Text>
                    <IconSetting
                        width={24}
                        height={24}
                        fill={'white'}
                        style={styles.iconSetting}
                    />
                </View>
                <View style={styles.body}>
                    <TabView
                        lazy={true}
                        renderTabBar={this._renderTabBar}
                        navigationState={this.state}
                        renderScene={renderScene}
                        onIndexChange={this._handleIndexChange}
                        initialLayout={initialLayout}
                    />
                </View>
            </View>
        );
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5DAEEF',
        flex: 1,
    },
    header: {
        width: '100%',
        height: 180,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#BBDBEF',
        fontSize: 22,
        paddingTop: 12,
    },
    title2: {
        color: '#BBDBEF',
        fontSize: 16,
    },
    iconSetting: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    body: {
        flex: 1,
        backgroundColor: '#68B8F7'
    },
    page: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#68B8F7'
    },
    tabBar: {
        width: '100%',
        height: 50,
        flexDirection: 'row'
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        color: '#BBDBEF',
        fontSize: 16,
        marginLeft: 8,
        paddingBottom: 6,
    },

    inputContainer: {
        height: 40,
        width: '75%',
        borderBottomWidth: 1,
        color: '#BBDBEF',
        fontSize: 16,
        borderBottomColor: '#BBDBEF',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        width: 200,
        height: 40,
        marginTop: 26,
        borderColor: '#BBDBEF',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button2: {
        width: 200,
        height: 40,
        marginTop: 20,
        backgroundColor: '#F4F6F3',
        justifyContent: 'center',
        alignItems: 'center',
        //ios shadow
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            height: 4,
            width: 0
        },
        //android
        elevation: 3
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20,
    },
    buttonSocial: {
        borderColor: '#BBDBEF',
        borderWidth: 1,
        borderRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    }
});
