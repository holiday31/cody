var mysql      = require('mysql');
var fs = require('fs');

var connection = mysql.createConnection({
    host     : 'codyplus.cmkwzw7x9dy7.ap-northeast-2.rds.amazonaws.com',
    user     : 'codyplus',
    password : 'cody1234',
    port     : 3306,
    database : 'codyplus',
    multipleStatements: true
  });

connection.connect();

exports.logout = function(req, res)
{
    req.session.destroy();
    console.log(req.session);
    res.redirect('/');
};

exports.mainList = function(req, res) //메뉴 코디고민 최신
{

	connection.query('select userId,date,typeId,imgpath,likecnt,dislike from post where typeId=1 order by postid desc'
	,function(err,rows){
			if (!err){

			var arr = [];

			for(var i=0; i<rows.length; i++){
				arr.push({userId: rows[i].userId, date: rows[i].date, typeId:rows[i].typeId, imgpath:rows[i].imgpath, like:rows[i].likecnt, dislike:rows[i].dislike});
			}

			var result = {
				data: arr
			}

			res.send(result);
		   }
		else{
			console.log('<main load>Error while performing Query.', err);
		}
	});
}

exports.main = function(req, res)
{

//    if(req.session.login)
//         res.render('main.html');
//     else
//         res.render('login.html');
    res.render('main.html');

};



exports.newB = function(req, res) //메뉴 코디공유 최신
{
    connection.query('select userId,date,typeId,imgpath,likecnt,dislike from post where typeId=2 order by postid desc'
	,function(err,rows){
			if (!err){

			var arr = [];

			for(var i=0; i<rows.length; i++){
				arr.push({userId: rows[i].userId, date: rows[i].date, typeId:rows[i].typeId, imgpath:rows[i].imgpath, like:rows[i].likecnt, dislike:rows[i].dislike});
			}

			var result = {
				data: arr
			}

			res.send(result);
		   }
		else{
			console.log('<main load>Error while performing Query.', err);
		}
	});

};

exports.hotA = function(req, res) //메뉴 코디고민 인기
{
    connection.query('select userId,date,typeId,imgpath,likecnt,dislike from post where typeId=1 order by likecnt desc'
	,function(err,rows){
			if (!err){

			var arr = [];

			for(var i=0; i<rows.length; i++){
				arr.push({userId: rows[i].userId, date: rows[i].date, typeId:rows[i].typeId, imgpath:rows[i].imgpath, like:rows[i].likecnt, dislike:rows[i].dislike});
			}

			var result = {
				data: arr
			}

			res.send(result);
		   }
		else{
			console.log('<main load>Error while performing Query.', err);
		}
	});

};

exports.hotB = function(req, res) //메뉴 코디공유 인기
{
    connection.query('select userId,date,typeId,imgpath,likecnt,dislike from post where typeId=2 order by likecnt desc'
	,function(err,rows){
			if (!err){

			var arr = [];

			for(var i=0; i<rows.length; i++){
				arr.push({userId: rows[i].userId, date: rows[i].date, typeId:rows[i].typeId, imgpath:rows[i].imgpath, like:rows[i].likecnt, dislike:rows[i].dislike});
			}

			var result = {
				data: arr
			}

			res.send(result);
		   }
		else{
			console.log('<main load>Error while performing Query.', err);
		}
	});

};
exports.feed = function(req, res)
{
    res.render('feed.html');
};
exports.feed2 = function(req, res)
{
    res.render('feed2.html');
};
exports.feedload = function(req, res)
{
    var _postId=req.param('postId');
    connection.query('select distinct p.* ,count(c.commentId) as comment from post p inner join comment c on p.postId=c.postId where p.postId=?',[_postId]
    ,function(err,rows){
			if (!err){
			var arr = [];
			arr.push({userId: rows[0].userId, date: rows[0].date,imgpath:rows[0].imgpath, like:rows[0].likecnt, dislike:rows[0].dislike,comment:rows[0].comment});

			var result = {
				data: arr
			}
      console.log(result);
			res.send(result);
		   }
		else{
			console.log('<feed load>Error while performing Query.', err);
		}
	});
};
exports.feedload2 = function(req, res)
{
    var _postId=req.param('postId');
    console.log(_postId);
    connection.query('select distinct p.* ,count(c.commentId) as comment from post p inner join comment c on p.postId=c.postId where p.postId=?',[_postId]
	,function(err,rows){
			if (!err){
                var arr = [];
                arr.push({userId: rows[0].userId, date: rows[0].date,imgpath:rows[0].imgpath,topurl:rows[0].topurl,bottomurl:rows[0]._bottomurl,

                    topx:rows[0].topx,topy:rows[0].topy,bottomx:rows[0].bottomx,bottomy:rows[0].bottomy,like:rows[0].likecnt, dislike:rows[0].dislike,comment:rows[0].comment});

                var result = {
                    data: arr
                }
                console.log(result);

			res.send(result);
		   }
		else{
			console.log('<feed load>Error while performing Query.', err);
		}
	});
};


exports.like = function(req, res)
{
  var _postId=req.param('postId');
  var _like=req.param('like');
  connection.query('update post set likecnt=? where postId=?',[(_like+1),_postId]
,function(err,rows){
    if (!err){
              var result = {
                  like: _like+1
              }
              console.log(result);

              res.send(result);
     }
  else{
    console.log('<feed load>Error while performing Query.', err);
  }
}

exports.dislike = function(req, res)
{
  var _postId=req.param('postId');
  var _dislike=req.param('dislike');
  connection.query('update post set dislike=? where postId=?',[(_dislike+1),_postId]
  ,function(err,rows){
    if (!err){
              var result = {
                  dislike: _dislike+1
              }
              console.log(result);

              res.send(result);
     }
  else{
    console.log('<feed load>Error while performing Query.', err);
  }
}

exports.cmtcreate = function(req, res)
{
    if(req.session.login){
    var _userId=req.session.userId;
    var _postId=req.body.postId;
    var _comment=req.body.comment;
    var _date=new Date();
    connection.query('insert into (null,?,?,?,?)',[_userId,_postId,_comment,_date]
    ,function(err){
			if (!err){
			    res.send();
		   }
		else{
			   console.log('<cmt create>Error while performing Query.', err);
		}
	});
}
  else
    res.render("login.html");
};

exports.comment = function(req, res)
{
  var _postId=req.body.postId;
  connection.query('select * from comment where postId=?',[_postId]
  ,function(err,rows){
    if (!err){
      var arr = [];
      for(var i=0; i<rows.length; i++){
        arr.push({userId: rows[i].userId, date: rows[i].date,comment: rows[i].comment});
      }
      var result = {
        data: arr
      }

      res.send(result);
     }
  else{
    console.log('<comment load>Error while performing Query.', err);
  }
});
};



exports.loginGET = function(req, res)
{
    res.render('login.html');
};

exports.joinGET = function(req, res) {
    res.render('join.html');
};

exports.postGET = function(req, res) {
       if(req.session.login)
        res.render('post.html');
       else
        res.render('login.html');

};

exports.searchGET = function(req, res) {
    res.render('search.html');
};

exports.searchList = function(req, res) {
    var _search=req.body.search;
    connection.query('select p.imgpath from post p where top= ? or bottom=?',[_search,_search]
	,function(err,rows){
			if (!err){
			var arr = [];
			for(var i=0; i<rows.length; i++){
				arr.push({imgpath: rows[i].imgpath});
			}
			var result = {
				data: arr
			}
			res.render('search.html',result);
		   }
		else{
			console.log('<search load>Error while performing Query.', err);
		}
	});
};

exports.myprofileGET = function(req, res) {
    // if(req.session.login)
    //     res.render('main.html');
    // else
    //     res.render('login.html');
    res.render('myprofile.html');
};


exports.profileList = function(req, res) {
    var _userId;
        if(req.session.login)
            _userId=req.session.userId;
        else
            _userId="admin";
    connection.query('select p.imgpath from post p where userId=?',[_userId],function(err,rows){
			if (!err){
			var arr = [];
			for(var i=0; i<rows.length; i++){
				arr.push({imgpath: rows[i].imgpath});
			}
			var result = {
                data: arr,
                userId: _userId
            }
            console.log(JSON.stringify(result));
			res.send(result);
		   }
		else{
			console.log('<profile load>Error while performing Query.', err);
		}
	});
};


exports.likeGET = function(req, res) {
    res.render('like.html');
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
                res.redirect("/login");
            }
            else
            {
                console.log("로그인 성공");
                req.session.login = true;
                req.session.userId = _id;
                console.log(req.session);
                console.log(req.session.userId);
                //res.location('/');
                res.redirect("/");
            }
        }
        else
            console.log('<loginPOST> Error while performing Query.', err);
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
         res.redirect("/login");
         //res.render("login.html");
        }
        else{
         console.log('<joinPOST>Error while performing Query.', err);
        }
    });
};


exports.postPOST = function(req, res)
{
    var _title = req.body.title;
    var _content = req.body.textarea;
    var _date = new Date();
    var _userId = req.session.userId;
    var _typeId = req.body.codyType;
    var _top = req.body.top;
    var _bottom = req.body.bottom;
    var _topurl = req.body.urltop;
    var _bottomurl = req.body.urlbottom;
    var _topx = req.body.topx;
    var _topy = req.body.topy;
    var _bottomx = req.body.bottomx;
    var _bottomy = req.body.bottomy;
    var _imgurl=req.file.filename;
    connection.query('insert into post values(null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0);'
        ,[_title,_content,_date,_userId,_typeId,_top,_bottom,_topurl,_bottomurl,_imgurl,_topx,_topy,_bottomx,_bottomy]//,_topx,_topy,_bottomx,_bottomy,like,dislike
        ,function(err){
         if (!err){
           console.log(req.file);
           res.render("main.html");
         }
            // res.redirect("/");
           // res.render("main.html");
        else{
            console.log('<upload>Error while performing Query.', err);
        }
    });
};
