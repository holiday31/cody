var db = null;
var var_no = null;
var position = null;
var index;

// 데이터베이스 생성 및 오픈
function openDB(){
   db = window.openDatabase('codyDB', '1.0', '코디DB', 1024*1024);
   console.log('1_DB 생성...');
}
// 테이블 생성 트랜잭션 실행
function createTable() {
   db.transaction(function(tr){
   var createSQL = 'create table if not exists codydb(datetime datetime, comment text)';
   tr.executeSql(createSQL, [], function(){
     		console.log('2_1_테이블생성_sql 실행 성공...');
	   }, function(){
	      console.log('2_1_테이블생성_sql 실행 실패...');
	   });
	   }, function(){
	      console.log('2_2_테이블 생성 트랜잭션 실패...롤백은 자동');
	   }, function(){
	      console.log('2_2_테이블 생성 트랜잭션 성공...');
     });
 }
 // 방명록 입력 트랜잭션 실행
 function insertCody(){
    db.transaction(function(tr){
    	var d = new Date();
    	var datetime = d;
  		var comment = $('#in').val();
  		var insertSQL = 'insert into codydb(datetime, comment) values(?, ?)';
     	tr.executeSql(insertSQL, [datetime, comment], function(tr, rs){
      	    console.log('3_ 방명록 등록...no: ' + rs.insertId);
	        alert('방명록과 시간날짜가 입력되었습니다');
	   		$('#in').val('');
		}, function(tr, err){
				alert('DB오류 ' + err.message + err.code);
			}
		);
    });
 }

//db에 저장하는 건 성공했는데 저장한 걸 다 불러오는 건 실패ㅠㅠ 불러오는 것도 하는건지 잘 모르겠따..흑

/*function selectCody(){
   db.transaction(function(tr){
	 var selectSQL = 'select * from codydb';
  	 tr.executeSql(selectSQL, [], function(tr, rs){
  	 	while(index <= rs.rows.length-1) {
  	 		$('#output').val('시간,날짜: '+rs.rows.item(index).name+' 내용: '+rs.rows.item(index).comment);
  	 		index++;
  	 	}
	 	});
   });
} */
