import { action, computed, observable} from "mobx";

class UserStore {

    @observable
    info: Record<string, any> = {}
    // 创建一个token
    @observable
    token = "";

    constructor() {
        this.info =  JSON.parse(localStorage.getItem('authenticated') || '{}');
        this.token = localStorage.getItem('token') || '';
    }

    @computed
    get isAuthenticated() {
        return !!this.info;
    }

    @action
    setInfo(info) {
        this.info=info
    }

    @action
    setToken(token) {
        this.token=token
    }

    @action
    login(info, token) {
        console.log("11111", info, "token", token)
        this.info = info;
        this.token = token;
        localStorage.setItem('authenticated', JSON.stringify(info));
        localStorage.setItem('token', token);
    }


    @action
    logout() {
        localStorage.setItem('authenticated', '');
        localStorage.setItem('token', '');
        this.info = {};
        this.token = '';
        console.log("logout finished!");
    }

}
export default UserStore;
