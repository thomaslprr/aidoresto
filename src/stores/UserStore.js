import { extendObservable } from 'mobx';

class UserStore {
    constructor() {
        extendObservable(this,{

            loading: true,
            isLoggedIn: false,
            id: ''

        })
    }
}

export default new UserStore();