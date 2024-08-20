const Memory = require('./memory');
const Const = require('./consts');

exports.Indexes = {
    ...Const.SessionIndex
}

exports.Roles = async() => { 
    const data = await Memory.Get(Memory.Indexes.UserSession);
    return data.roles;
}

exports.HasRole = async(index) => { 
    const data = await Memory.Get(Memory.Indexes.UserSession);
    return data.roles.includes(index);
}

exports.Logout = async() => {
    return await Memory.Remove(Memory.Indexes.UserSession);
}

exports.Admin = async() => {
    const data = await Memory.Get(Memory.Indexes.UserSession);
    return data.roles.includes(this.Indexes.Roles.Admin);
}

exports.HasLogin = async() => {
    const data = await Memory.Get(Memory.Indexes.UserSession);
    const result = data !== null && data !== false;
    return result;
}