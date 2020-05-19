import React, {Component} from 'react';
import {Container, Content, Button, Body, Text, CardItem, Card, Header} from 'native-base';

import {Actions} from 'react-native-router-flux';
import Logo from '../../components/Logo';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/auth.actions';
import Loader from '../../components/Loader';
import {ErrorUtils} from '../../utils/error.utils';
import renderTextInput from '../../components/reduxFormRenderers/RenderTextInput';
import {email, required, validateEmailField, validateRequiredField} from '../../utils/validate.utils';

class Login extends Component<{}> {

    loginUser = async (values) => {
        try {
            const response = await this.props.dispatch(loginUser(values));
            if (!response.success) {
                throw response;
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    };


    signUp() {
        Actions.signup();
    }

    onSubmit = (values) => {
        this.loginUser(values);
    };

    render() {
        const {handleSubmit, loginUser} = this.props;
        return (
            <Container>
                {loginUser.isLoading && <Loader/>}
                <Content padder contentContainerStyle={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                    <Logo/>
                    <Card transparent>
                        <CardItem>
                            <Body>
                                <Field name={'email'}
                                       keyboardType={'email-address'}
                                       placeholder={'Email'}
                                       validate={[email, required]}
                                       component={renderTextInput}/>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Field name={'password'}
                                       keyboardType={'default'}
                                       placeholder={'Password'}
                                       secureTextEntry={true}
                                       validate={[required]}
                                       component={renderTextInput}/>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Body>
                                <Button padder block primary onPress={handleSubmit(this.onSubmit)}>
                                    <Text>Login</Text>
                                </Button>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Text> Don't have an account yet?</Text>
                            <Button transparent onPress={this.signUp}>
                                <Text>Sign Up</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    };
}

const mapStateToProps = (state) => ({
    loginUser: state.authReducer.loginUser,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'login',
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        updateUnregisteredFields: true,
    }),
)(Login);
