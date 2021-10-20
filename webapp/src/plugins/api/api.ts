import { Fruit, User } from "./apiInterfaces";
import Vue from "vue";
import { getAuthorizationHeader } from "./apiUtils";

class Api{
    user:User|null = null;
    
    get isLogged() : boolean {
        return this.user != null;
    }
    
    private static API_URL = "/api";
    private static getUrl(url:string){
        if (url[0]=='/') {
            return Api.API_URL + url;
        }else if(url[0]=='.'){
            return url;
        }
        else{
            return Api.API_URL + "/" + url;
        }
    }

    async login(username:string,password:string):Promise<boolean> {
        const res = await fetch(Api.getUrl("/auth/login"),{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({username,password})
        })
        if (res.ok) {
            // TODO: check afterward
            this.user = {username,password};
        }
        return res.ok;
    }
    
    async logout(){
        this.user = null;
    }

    async getUserFruits(){
        if(!this.user){
            throw new Error("Not logged");
        }

        const res = await fetch(Api.getUrl("/fruit"),{
            headers:{
                "Authorization":getAuthorizationHeader(this.user.username,this.user.password)
            }
        });
        if (res.ok) {
            const fruits = await res.json();
            return fruits;
        }else{
            return [];
        }
    }

    async createUserFruit(fruit:Fruit){
        if(!this.user){
            throw new Error("Not logged");
        }

        const res = await fetch(Api.getUrl("/fruit"),{
            headers:{
                "Content-type":"application/json",
                "Authorization":getAuthorizationHeader(this.user.username,this.user.password)
            },
            method:"POST",
            body:JSON.stringify(fruit)
        });
        if (res.ok) {
            const fruit = await res.json();
            return fruit;
        }else{
            return null;
        }
    }
}

// TODO: there are better ways to implement a store in vue
// this is just a simple one
export default Vue.observable(new Api());