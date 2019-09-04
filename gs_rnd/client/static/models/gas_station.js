import { Model } from 'backbone';

export class GasStation extends Model {

    defaults() {
        return {
            id: null,
            title: '',
            coordinates: '',
            address: '',
            marker: null,
            logo: null,
            active: false,
        };
    }
}