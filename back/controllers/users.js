const DB = require('./db');
const UID = require('../utils/uuidGenerator');

exports.Super = async function(){
    const db = await DB.GetClient();
    try{
        await db.connect();
    }catch(e){
        return {result: false, msg: 'Unable to reach db'};
    }

    try{
        var queryResult = await db.query(`Select * From users where email = 'super@admin.com'`);
    }catch(e){
        await db.end();
        return {result: false, msg: 'User fetching fail'};
    }

    if(queryResult.rowCount > 0){
        await db.end();
        return {result: true, msg: 'Existing'};
    }

    try{
        queryResult = await db.query(`Insert Into users (email, password, roles, control) Values ('super@admin.com', 'CandidRoot2024!', '{"Edit", "View", "Remove","Admin"}', 'Local')`);
    }catch(e){
        await db.end();
        return {result: false, msg: 'Super User creation fail'};
    }

    await db.end();

    return {result: true, msg: 'Created', info: queryResult};
}

exports.LocalLogin = async function(req, res){
    const {email, password} = req.body;
    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `SELECT id, email, to_json(roles::TEXT[]) as roles FROM users WHERE email = $1 And password = $2 And status = 'Active' And control = 'Local'`,
            values: [email, password],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Local Login',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'User not Found',
            error: 'User not Found'
        });
        return;
    }

    res.json({
        success : true,
        message: 'Local Login Success',
        result: result.rows[0]
    });
}

exports.RemoteLogin = async function(req, res){
    const {email} = req.body;
    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `SELECT id, email, roles FROM users WHERE email = $1 And status = 'Active' And control = 'Remote'`,
            values: [email],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error Local Login',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'User not Found',
            error: 'User not Found'
        });
        return;
    }

    res.json({
        success : true,
        message: 'Local Login Success',
        result: result.rows
    });
}

exports.Create = async function(req,res){
    const {email, password, roles, control} = req.body;
    const passRole = control == 'Remote' ? await UID.Get() : password;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Insert Into users (email, password, roles, control) Values ($1, $2,$3::user_roles[], $4) Returning id`,
            values: [email, passRole, roles, control],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error User Create',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'User not Created',
            error: 'User not Created',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Users Created',
        result: result.rows[0].id
    });
}

exports.List = async function(req, res){
    const db = await DB.GetClient();
    try{
        await db.connect();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error reaching db',
            error: e
        });
        return;
    }

    try{
        var queryResult = await db.query(`Select id, email, to_json(roles) as roles, control, status From users Where id > 1 Order By id Asc`);
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
        message: 'Users listing',
        result: queryResult.rows
    });
}

exports.Find = async function(req,res){
    const {userId} = req.params;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Select id, email, to_json(roles::TEXT[]) as roles, control, status From users Where id = $1`,
            values: [userId],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error User Find',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'User not Found',
            error: 'User not Found',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Users Found',
        result: result.rows[0]
    });
}

exports.FindComplete = async function(req,res){
    const {userId} = req.params;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Select id, email, password, to_json(roles::TEXT[]) as roles, control, status From users Where id = $1`,
            values: [userId],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error User Find',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'User not Found',
            error: 'User not Found',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'User Found',
        result: result.rows[0]
    });
}

exports.Update = async function(req,res){
    const {user} = req.body;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Update users Set email = $1, roles = $2::user_roles[], control = $3, status = $4, password = $6 Where id = $5`,
            values: [user.email, user.roles, user.control, user.status, user.id, user.password],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error User Update',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'User not Updated',
            error: 'User not Updated',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Users Updated'
    });
}

exports.UpdatePassword = async function(req,res){
    const {password, id} = req.body;

    try{
        var db = await DB.GetClient();
        await db.connect();
        const query = {
            text: `Update users Set password = $1 Where id = $2`,
            values: [password, id],
        }
        var result = await db.query(query);
        await db.end();
    }catch(e){
        res.status(500).json({
            success : false,
            message: 'Error User Update Password',
            error: e
        });
        return;
    }

    if(result.rowCount == 0){
        res.json({
            success : false,
            message: 'User not Updated Password',
            error: 'User not Updated Password',
        });
        return;
    }
 
    res.json({
        success : true,
        message: 'Users Updated Password'
    });
}