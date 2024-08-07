import * as HTTP from './http';

export const Create = async (body) => {
    let endpoint = `/reports`;

    try{
        var result = await HTTP.POST(endpoint, body);
    }catch(e){
        console.log(`CONTROLLER ERROR: reports.Create\n${e}`);
        return undefined;
    }

    return result;
}

export const List = async () => {
    let endpoint = `/reports`;

    try{
        var result = await HTTP.GET(endpoint);
    }catch(e){
        console.log(`CONTROLLER ERROR: reports.Listing\n${e}`);
        return undefined;
    }

    return result;
}

export const Find = async (id) => {
    let endpoint = `/reports/${id}`;

    try{
        var result = await HTTP.GET(endpoint);
    }catch(e){
        console.log(`CONTROLLER ERROR: reports.Find\n${e}`);
        return undefined;
    }

    return result;
}

export const AddArea = async(body) => {
    let endpoint = `/reports/areas`;

    try{
        var result = await HTTP.POST(endpoint, body);
    }catch(e){
        console.log(`CONTROLLER ERROR: reports.AddArea\n${e}`);
        return undefined;
    }

    return result;
}

export const RemoveArea = async(id) => {
    let endpoint = `/reports/areas/${id}`;

    try{
        var result = await HTTP.DELETE(endpoint);
    }catch(e){
        console.log(`CONTROLLER ERROR: reports.RemoveArea\n${e}`);
        return undefined;
    }

    return result;
}

export const AddResource = async(body) => {
    let endpoint = `/reports/resource`;

    try{
        var result = await HTTP.POST(endpoint, body);
    }catch(e){
        console.log(`CONTROLLER ERROR: reports.AddArea\n${e}`);
        return undefined;
    }

    return result;
}

export const RemoveResource = async(id) => {
    let endpoint = `/reports/resource/${id}`;

    try{
        var result = await HTTP.DELETE(endpoint);
    }catch(e){
        console.log(`CONTROLLER ERROR: reports.RemoveArea\n${e}`);
        return undefined;
    }

    return result;
}

// export const Update = async () => {
//     //TODO
//     let endpoint = `/users/login/local`;

//     var body = {
//         email: email,
//         password: password
//     };

//     try{
//         var result = await HTTP.POST(endpoint, body);
//     }catch(e){
//         console.log(`CONTROLLER ERROR: users.LocalLogin\n${e}`);
//         return undefined;
//     }

//     return result;
// }

// export const Remove = async () => {
//     //TODO
//     let endpoint = `/users/login/local`;

//     var body = {
//         email: email,
//         password: password
//     };

//     try{
//         var result = await HTTP.POST(endpoint, body);
//     }catch(e){
//         console.log(`CONTROLLER ERROR: users.LocalLogin\n${e}`);
//         return undefined;
//     }

//     return result;
// }