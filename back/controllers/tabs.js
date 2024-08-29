const DB = require('./db');

exports.Create = async function(req,res){
    const {header, url, icon} = req.body;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Insert Into tabs (header, url, icon) Values ($1, $2, $3)`,
            values: [header, url, icon],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Tab Create',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'Tab not Created',
            error: 'Tab not Created',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Tab Created'
    });
}

exports.List = async function(req, res){
    try{
        const db = await DB.GetClient();
        await db.connect();
        var queryResult = await db.query(`Select * From tabs Order By id Asc`);
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
        message: 'Tabs listing',
        result: queryResult.rows
    });
}

exports.Find = async function(req,res){
    const {tabId} = req.params;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Select * from tabs Where id = $1`,
            values: [tabId],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Tab Find',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'Tab not Found',
            error: 'Tab not Found',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Tab Found',
        result: result.rows[0]
    });
}

exports.Update = async function(req,res){
    const {tab} = req.body;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Update tabs Set header = $1, url = $2, icon = $4 Where id = $3`,
            values: [tab.header, tab.url, tab.id, tab.icon],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Tab Update',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'Tab not Updated',
            error: 'Tab not Updated',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Tab Updated'
    });
}

exports.Delete = async function(req,res){
    const {tabId} = req.params;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Delete From tabs Where id = $1`,
            values: [tabId],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Tab Delete',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'Tab not Deleted',
            error: 'Tab not Deleted',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Tab Deleted'
    });
}