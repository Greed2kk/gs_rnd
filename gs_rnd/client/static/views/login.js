import $ from 'jquery';
import * as _ from 'underscore';
import { View } from 'backbone.marionette';

import login_template from '../../templates/login_modal.hbs';

export class LoginView extends View {

    className() {
        return 'login-modal';
    }

    template() {
        return login_template;
    }

    events() {
        return {
            'click button.login': 'onLogin',
            'click button.cancel': 'onCancel',
        }
    }

    onLogin(events) {
        events.preventDefault();
        const url = '/auth/login/';
        const formValues = {
            username: $('.logininig input.input-username')[0].value,
            password: $('.logininig input.input-password')[0].value,
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: formValues,
            success: (json, data) => {
                this.trigger('workout:form', this);

            },
            error: (error) => {
                alert('Error! Invalid data!');
            }
        });
    }

    onCancel(events) {
        events.preventDefault();
        this.trigger('workout:cancel:form', this);
    }
}