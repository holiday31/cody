var db = null;

// 데이터베이스 생성 및 오픈
function openDB(){
   db = window.openDatabase('writeDB', '1.0', '방명록DB', 1024*1024);
   console.log('DB 생성...');
}
// 테이블 생성 트랜잭션 실행
function createTable() {
   db.transaction(function(tr){
   var createSQL = 'create table if not exists write(write text)';
   tr.executeSql(createSQL, [], function(){
     		console.log('테이블생성_sql 실행 성공...');
	   }, function(){
	      console.log('테이블생성_sql 실행 실패...');
	   });
	   }, function(){
	      console.log('테이블 생성 트랜잭션 실패...롤백은 자동');
	   }, function(){
	      console.log('테이블 생성 트랜잭션 성공...');
     });
 }
 function insertBook(){
    db.transaction(function(tr){

  		var write= $('#in').val();
      var output=$('#output').val();
  		var insertSQL = 'insert into write(write) values(?)';
     	tr.executeSql(insertSQL, [write], function(tr, rs){
      	    console.log('방명록 등록...no: ' + rs.insertId);
	        alert('방명록 ' + $('#in').val() + ' 이 입력되었습니다');
	   		$('#in').val('');
			$('#output').val(output+'\n'+write);

		}, function(tr, err){
				alert('DB오류 ' + err.message + err.code);
			}
		)})}
