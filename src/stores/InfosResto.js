import { extendObservable } from 'mobx';

class InfosResto {
    constructor() {
        extendObservable(this,{

            estChoisi: false,
            nom: '',
            adresse: {},
            code_resto: '',
            tel: ''

        })
    }
}

export default new InfosResto();