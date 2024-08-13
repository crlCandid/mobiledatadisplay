import * as HTTP from './http';

export const Create = async (body) => {
    let endpoint = `/tabs`;

    try{
        var result = await HTTP.POST(endpoint, body);
    }catch(e){
        console.log(`CONTROLLER ERROR: tabs.Create\n${e}`);
        return undefined;
    }

    return result;
}

export const List = async () => {
    let endpoint = `/tabs`;

    try{
        var result = await HTTP.GET(endpoint);
    }catch(e){
        console.log(`CONTROLLER ERROR: tabs.Listing\n${e}`);
        return undefined;
    }

    return result;
}

// export const Find = async (id) => {
//     let endpoint = `/reports/${id}`;

//     try{
//         var result = await HTTP.GET(endpoint);
//     }catch(e){
//         console.log(`CONTROLLER ERROR: reports.Find\n${e}`);
//         return undefined;
//     }

//     return result;
// }

export const Update = async (body) => {
    let endpoint = `/tabs`;

    try{
        var result = await HTTP.PUT(endpoint, body);
    }catch(e){
        console.log(`CONTROLLER ERROR: tabs.Update\n${e}`);
        return undefined;
    }

    return result;
}

export const Remove = async (id) => {
    let endpoint = `/tabs/${id}`;

    try{
        var result = await HTTP.DELETE(endpoint);
    }catch(e){
        console.log(`CONTROLLER ERROR: tabs.Remoce\n${e}`);
        return undefined;
    }

    return result;
}