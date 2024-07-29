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
        var queryResult = await db.query(`
            Select
                qa_reports.*,
                (Select users.email From users Where id = qa_reports.creator) as creatorinfo,
                (Select json_agg(json_build_object('id', areas.id, 'name', areas.name)) From areas Where id in (Select area From report_areas Where report = qa_reports.id)) as areas,
                (Select json_agg(json_build_object('id', resources.id, 'url', resources.url)) From resources Where report = qa_reports.id) as resources
            From qa_reports
            Order By qa_reports.id Desc
            `);
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
        reports: queryResult.rows
    });
}

exports.Find = async function(req,res){
    const {reportId} = req.params;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Select
                qa_reports.*,
                (Select users.email From users Where id = qa_reports.creator) as creatorinfo,
                (Select json_agg(json_build_object('id', areas.id, 'name', areas.name)) From areas Where id in (Select area From report_areas Where report = qa_reports.id)) as areas,
                (Select json_agg(json_build_object('id', resources.id, 'url', resources.url)) From resources Where report = qa_reports.id) as resources
            From qa_reports
            Where id = $1`,
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

exports.AddArea = async function(req, res){
    const {reportId, areaId} = req.body;

    try{
        const db = await DB.GetClient();
        await db.connect();
        const query = {
            text: 'Insert Into report_areas (report, area) Values ($1, $2)',
            values: [reportId, areaId]
        };
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Report Add Area',
            error: e
        });
        return;
    }

    res.json({
        success : true,
        message: 'Area Added to Report'
    })
}

exports.RemoveArea = async function(req, res){
    const {relationId} = req.params;

    try{
        const db = await DB.GetClient();
        await db.connect();
        const query = {
            text: 'Delete From report_areas Where id = $1',
            values: [relationId]
        };
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Report Remove Area',
            error: e
        });
        return;
    }

    res.json({
        success : true,
        message: 'Area Removed From Report'
    })
}

exports.AddResource = async function(req, res){
    const {reportId, url} = req.body;

    try{
        const db = await DB.GetClient();
        await db.connect();
        const query = {
            text: 'Insert Into resources (report, url) Values ($1, $2)',
            values: [reportId, url]
        };
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Report Add Resource',
            error: e
        });
        return;
    }

    res.json({
        success : true,
        message: 'Resource Added to Report'
    })
}

exports.RemoveResource = async function(req, res){
    const {resourceId} = req.params;

    try{
        const db = await DB.GetClient();
        await db.connect();
        const query = {
            text: 'Delete From resources Where id = $1',
            values: [resourceId]
        };
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Report Remove Resource',
            error: e
        });
        return;
    }

    res.json({
        success : true,
        message: 'Resource Removed From Report'
    })
}