import * as HTTP from './http';

export const LocalLogin = async (email, password) => {
    //TODO: password security
    let endpoint = `/users/login/local`;

    var body = {
        email: email,
        password: password
    };

    try{
        var result = await HTTP.POST(endpoint, body);
    }catch(e){
        console.log(`CONTROLLER ERROR: users.LocalLogin\n${e}`);
        return undefined;
    }

    return result;
}