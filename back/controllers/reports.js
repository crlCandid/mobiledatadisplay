const DB = require('./db');

exports.Create = async function(req,res){
    const {creator, kind, identifier, name, description, from, to} = req.body;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Insert Into qa_reports (creator, kind, identifier, name, description, dtfrom, dtto) Values ($1, $2, $3, $4, $5, $6, $7) Returning id`,
            values: [creator, kind, identifier, name, description, from, to],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Report Create',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'Report not Created',
            error: 'Report not Created',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Report Created',
        result: result.rows[0].id
    });
}

exports.List = async function(req, res){
    try{
        var db = await DB.GetClient();
        await db.connect();
        var queryResult = await db.query(`Select * From qa_reports Order By id Desc`);
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
        message: 'Reports listing',
        users: queryResult.rows
    });
}

exports.Find = async function(req,res){
    const {reportId} = req.params;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Select * from qa_reports Where id = $1`,
            values: [reportId],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Report Find',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'Report not Found',
            error: 'Report not Found',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Report Found',
        result: result.rows[0]
    });
}

exports.Update = async function(req,res){
    const {report} = req.params;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Update qa_reports Set kind=$1, identifier=$2, name=$3, description=$4, dtfrom=$5, dtto=$6, status=$7 Where id =$8`,
            values: [report.kind, report.identifier, report.name, report.description, report.dtfrom, report.dtto, report.status, report.id],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Report Update',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'Report not Updated',
            error: 'Report not Updated',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Report Updated'
    });
}

exports.Delete = async function(req,res){
    const {reportId} = req.body;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Delete From qa_reports Where id = $1`,
            values: [reportId],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Report Delete',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'Report not Deleted',
            error: 'Report not Deleted',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Report Deleted'
    });
}