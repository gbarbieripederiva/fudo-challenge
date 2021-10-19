function utf8_to_b64( str:string ) {
    return window.btoa(unescape(encodeURIComponent( str )));
  }
  
function b64_to_utf8( str:string ) {
    return decodeURIComponent(escape(window.atob( str )));
}

export async function login(username:string,password:string):Promise<boolean> {
    const res = await fetch("/api/auth/login",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({username,password})
    })
    return res.ok;
}




export default {
    login
}