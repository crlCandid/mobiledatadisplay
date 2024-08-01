const Const = require('./consts');

exports.Indexes = {
    ...Const.MemoIndex
};

exports.Get = async(index) => {
    try{
        var result = await JSON.parse(localStorage.getItem(index));
    }catch(e){
        return false;
    }
    
    return true;
}

exports.Set = async(index, object) => {
    try{
        await localStorage.setItem(index, JSON.stringify(object));
    }catch(e){
        return false;
    }
    
    return true;
}

exports.Remove = async(index) => {
    try{
        await localStorage.removeItem(index);
    }catch(e){
        return false;
    }
    
    return true;
}