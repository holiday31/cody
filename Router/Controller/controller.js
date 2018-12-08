var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'codyplus.cmkwzw7x9dy7.ap-northeast-2.rds.amazonaws.com',
  user     : 'codyplus',
  password : 'cody1234',
  port     : 3306,
  database : 'codyplus'
});

connection.connect();

exports.logout = function(req, res)
{
    req.session.destroy();
    console.log(req.session);
    res.render('main.html');
};

exports.main = function(req, res)
{
    console.log(req.session);
    res.render('main.html');
    // if(req.session.login)
    //     res.render('main.html');
    // else
    //     res.render('login.html');
};

exports.loginGET = function(req, res)
{
    res.render('login.html');
};

exports.joinGET = function(req, res) {
    res.render('join.html');
};

exports.loginPOST = function(req, res)
{
    console.log(req.session);
    // POST 방식으로 ID, PW 를 받음
    var _id = req.body.userId;
    var _pw = req.body.password;

    connection.query('select count(1) as count from codyplus.user where userId=? and password=?', [_id, _pw], function(err, rows, fields) {
        if (!err)
        {
            if(rows[0].count == 0) // 일치하는 개수가 없을때
            {
                console.log("로그인 실패");

                req.session.login = false;
                req.session.msg = "아이디 혹은 비밀번호를 잘못 입력하셨습니다.";

                //res.location('/login');
                res.render("login.html");
            }
            else
            {
                console.log("로그인 성공");
                req.session.login = true;
                req.session.id = _id;

                //res.location('/');
                res.render('main.html');
            }
        }
        else
            console.log('Error while performing Query.', err);
    });

    //connection.end();
};

exports.joinPOST = function(req, res) {
    var _id = req.body.userId;
    var _pw = req.body.password;
    var _name = req.body.name;
    var _email = req.body.email;
    connection.query('insert into user values(?,?,?,?)', [_id, _pw, _name, _email],function(err) {

        if (!err){
         res.render("login.html");
        }
        else{
         console.log('Error while performing Query.', err);
        }
    });
};
