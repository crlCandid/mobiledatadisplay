import * as HTTP from './http';

export const Create = async (body) => {
    let endpoint = `/users`;

    try{
        var result = await HTTP.POST(endpoint, body);
    }catch(e){
        console.log(`CONTROLLER ERROR: users.Create\n${e}`);
        return undefined;
    }

    return result;
}

export const List = async () => {
    let endpoint = `/users`;

    try{
        var result = await HTTP.GET(endpoint);
    }catch(e){
        console.log(`CONTROLLER ERROR: users.Listing\n${e}`);
        return undefined;
    }

    return result;
}

export const Find = async (id) => {
    let endpoint = `/users/complete/${id}`;

    try{
        var result = await HTTP.GET(endpoint);
    }catch(e){
        console.log(`CONTROLLER ERROR: users.Find\n${e}`);
        return undefined;
    }

    return result;
}

export const Update = async (body) => {
    let endpoint = `/users`;

    try{
        var result = await HTTP.PUT(endpoint, body);
    }catch(e){
        console.log(`CONTROLLER ERROR: users.Update\n${e}`);
        return undefined;
    }

    return result;
}

export const Remove = async (id) => {
    let endpoint = `/users/${id}`;

    try{
        var result = await HTTP.DELETE(endpoint);
    }catch(e){
        console.log(`CONTROLLER ERROR: users.Remoce\n${e}`);
        return undefined;
    }

    return result;
}