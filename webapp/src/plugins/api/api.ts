import { User } from "./apiInterfaces";
import Vue from "vue";

class Api{
    user:User|null = null;

    get isLogged() : boolean {
        return this.user != null;
    }
    
    async login(username:string,password:string):Promise<boolean> {
        const res = await fetch("/api/auth/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({username,password})
        })
        if (res.ok) {
            // TODO: check afterward
            this.user = {username,password};
        }
        return res.ok;
    }
}

// TODO: there are better ways to implement a store in vue
// this is just a simple one
export default Vue.observable(new Api());