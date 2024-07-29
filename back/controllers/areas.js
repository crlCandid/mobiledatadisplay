const DB = require('./db');

exports.Create = async function(req,res){
    const {name} = req.body;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Insert Into areas (name) Values ($1)`,
            values: [name],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Area Create',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'Area not Created',
            error: 'Area not Created',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Area Created'
    });
}

exports.List = async function(req, res){
    try{
        var db = await DB.GetClient();
        await db.connect();
        var queryResult = await db.query(`Select * From areas`);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error fetching results',
            error: e
        });
        return;
    }

    res.json({
        success : true,
        message: 'Areas listing',
        users: queryResult.rows
    });
}

exports.Find = async function(req,res){
    const {areaId} = req.params;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Select * from areas Where id = $1`,
            values: [areaId],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Area Find',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'Area not Found',
            error: 'Area not Found',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Area Found',
        result: result.rows[0]
    });
}

exports.Update = async function(req,res){
    const {area} = req.params;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Update areas Set name = $1, status = $2 Where id = $3`,
            values: [area.name, area.status, area.id],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Area Update',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'Area not Updated',
            error: 'Area not Updated',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Area Updated'
    });
}

exports.Delete = async function(req,res){
    const {areaId} = req.body;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Delete From areas Where id = $1`,
            values: [areaId],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Area Delete',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'Area not Deleted',
            error: 'Area not Deleted',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Area Deleted'
    });
}