import { Model } from 'backbone';

class UserModel extends Model {
    url() {
        return 'auth/user/';
    }
    parse(data) {
        return data;
    }
}

export const userModel = new UserModel();