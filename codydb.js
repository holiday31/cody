var db = null;
var var_no = null;
var position = null;
var index;

// 데이터베이스 생성 및 오픈
function openDB() {
	db = window.openDatabase('codyDB', '1.0', '코디DB', 1024 * 1024);
	console.log('1_DB 생성...');
}

// 테이블 생성 트랜잭션 실행
function createTable() {
	db.transaction(function(tr) {
		var createSQL = 'create table if not exists codydb(datetime datetime, comment text)';
		tr.executeSql(createSQL, [], function() {
			console.log('2_1_테이블생성_sql 실행 성공...');
		}, function() {
			console.log('2_1_테이블생성_sql 실행 실패...');
		});
	}, function() {
		console.log('2_2_테이블 생성 트랜잭션 실패...롤백은 자동');
	}, function() {
		console.log('2_2_테이블 생성 트랜잭션 성공...');
	});
}

// 방명록 입력 트랜잭션 실행
function insertCody() {
	db.transaction(function(tr) {
		//var d = new Date();
		var datetime = new Date();
		var comment = $('#in').val();
		var insertSQL = 'insert into codydb(datetime, comment) values(?, ?)';
		tr.executeSql(insertSQL, [datetime, comment], function(tr, rs) {
				console.log('3_ 방명록 등록...no: ' + rs.insertId);
				alert('방명록과 시간날짜가 입력되었습니다');
				$('#in').val('');
		}, function(tr, err) {
			alert('DB오류 ' + err.message + err.code);
		});
	});
}

/*
 function selectCody(){
 db.transaction(function(tr){
 var selectSQL = 'select * from codydb limit 34, 44';
 tr.executeSql(selectSQL, [], function(tr, rs){
 while(c < 10) {
 $('#output').val('시간,날짜: '+rs.rows.item(c++).name+' 내용: '+rs.rows.item(c++).comment);
 index++;
 }
 });
 });
 } */
