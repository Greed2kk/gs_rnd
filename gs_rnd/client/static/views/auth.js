import { View } from 'backbone.marionette';
import * as _ from 'underscore';

import { userModel } from '../models/user.js';
import { LoginView } from './login.js';

import unauth_view from '../../templates/unauth_view.hbs';
import auth_view from '../../templates/auth_view.hbs';

export class Auth extends View {

    get model() {
        return userModel;
    }

    template() {
        return auth_view;
    }

    childViewTriggers() {
        return {
            'workout:form': 'workout:form',
        }
    }

    regions() {
        return {
            'auth': '.auth',
        }
    }

    onChildWorkoutForm(childView) {
        this.render();
    }

    modelSync(model) {
        // window.user_pk = model.get('pk');
        // window.username = model.get('username');
        // this.showChildView('auth, new Authenticated({
        //     model: model,
        // }));
        console.log('hi');
        alert('auth');

    }

    modelError(error) {
        window.user_pk = undefined;
        this.showChildView('auth', new Unauthed());;
    }

    onRender() {
        this.model.fetch({
            success: data => {
                this.modelSync(data);
            },
            error: error => {
                this.modelError(error);
            }
        });
    }
}

class Unauthed extends View {

    childViewTriggers() {
        return {
            'workout:form': 'workout:form',
            'workout:cancel:form': 'child:workout:cancel:form',
        }
    }

    template() {
        return unauth_view;
    }

    events() {
        return {
            'click .registration': 'onClickRegistration',
            'click .login': 'onClickLogin',
        }
    }

    regions() {
        return {
            'signup_container': '.container',
            'login_container': '.container',
        }
    }

    onChildWorkoutCancelForm(childView) {
        childView.destroy();
        this.el.lastChild.classList.remove('display');
    }

    onClickRegistration() {
        this.el.lastChild.classList.add('display');
        this.showChildView('signup_container', new RegistrationView());
    }

    onClickLogin() {
        this.el.lastChild.classList.add('display');
        this.showChildView('login_container', new LoginView());
    }

}