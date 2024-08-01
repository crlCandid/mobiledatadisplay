import * as HTTP from './http';

// export const Create = async () => {
//     //TODO
//     let endpoint = `/reports`;

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