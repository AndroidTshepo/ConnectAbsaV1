app.controller("mainCtrl", function($scope,$http, defaultService) {

console.log("inside mainCtrl");
$scope.score = 0;
$scope.data = {};
$scope.data.title ="";
$scope.data.body ="";
$scope.error = "";

$scope.rate= function(id){
	$scope.removeAll();
	$("#"+id).removeClass("unCard");
	$("#"+id).addClass('card');
	$scope.score = id;
	
}
$scope.removeAll= function(){
	$("#1").addClass('unCard');
	$("#2").addClass('unCard');
	$("#3").addClass('unCard');
	$("#4").addClass('unCard');
	$("#5").addClass('unCard');
}

$scope.submitdata = function(data){
	if($scope.data.title =="" && $scope.data.title ==""){
		//Doing a form validation to check if data has been entered into the form.
		$scope.error ="Fill in the whole form";
	}else{
		$scope.error ="";
		if($scope.score > 1){
			$scope.error ="submitting...";
			$scope.Data = {};
							$scope.Data.method = "insertComment";
							$scope.Data.commentS = data.title ;
							$scope.Data.commentB = data.body ;
							$scope.Data.commentStar = $scope.score;
							$scope.Data.commentSeen = 0;
							$scope.removeAll();
							$scope.score = 0;
							$scope.data = {};
							$scope.data.title ="";
							$scope.data.body ="";
							$('.md-modal').removeClass('md-show');
							
							defaultService.data($scope.Data)
							.then(function(response){
								$scope.error ="Thank you for your submittion";
							}, function(error) {
								$scope.error = "";
			                });
		}else{
			$scope.error ="Please click a number to rate us.";
		}
	}
}




	$scope.time = new Date(new Date().getTime()).toLocaleTimeString(); // 11:18:48 AM
	$scope.seen = 0; // initial value
	$scope.receive = 0; // initial value
	$scope.seenComments = []; 
	$scope.tempComments = []; 
	$scope.color="#E64A19";
	$scope.tick = "ion-android-done";
	$scope.showButton = true;
	$scope.getComments = function(){
							
							$scope.Data = {};
							$scope.Data.method = "getComments";
							defaultService.data($scope.Data)
							.then(function(response){
								$scope.comments = response.data.data;
								$scope.tempComments = $scope.comments ;
								$scope.receive = $scope.comments.length;
								$scope.color="#E64A19";
								$scope.tick = "ion-android-done";
								$scope.showButton = true;
								//$scope.seen = 0;
								for (var i = 0; i < $scope.comments.length; i++) {
								    $scope.comments[i].cDateTime =new Date($scope.comments[i].cDateTime).getHours() +":"+new Date($scope.comments[i].cDateTime).getMinutes(); 
								}


								 //alert(JSON.stringify($scope.comments));
							}, function(error) {
								$scope.error = "";
			                });
	}
	$scope.getComments();


			//remove by attr
			$scope.removeByAttr = function(arr, attr, value){
			    var i = arr.length;
			    while(i--){
			       if( arr[i] 
			           && arr[i].hasOwnProperty(attr) 
			           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

			           arr.splice(i,1);

			       }
			    }
			    return arr;
			}
	$scope.refresh = function(){
		$scope.time = new Date(new Date().getTime()).toLocaleTimeString(); // 11:18:48 AM
		$scope.getComments();
	}
	$scope.Seen = function(item){
		$scope.seen = $scope.seen + 1;
		$scope.receive = $scope.receive - 1;
		$scope.seenComments.push(item); 
		$scope.removeByAttr($scope.comments , 'cID', item.cID);  
		$scope.tempComments = $scope.comments ;
							$scope.Data = {};
							$scope.Data.method = "updateSeen";
							$scope.Data.id = item.cID;
							defaultService.data($scope.Data)
							.then(function(response){
								
							}, function(error) {
								$scope.error = "";
			                });

	}
	$scope.getSeen = function(){
		$scope.color="#757575";
		$scope.tick = "ion-android-done-all";
		$scope.showButton = false;
		$scope.comments = $scope.seenComments ; 
	}
	$scope.getReceived = function(){
		$scope.color="#E64A19";
		$scope.tick = "ion-android-done";
		$scope.showButton = true;
		$scope.comments = $scope.tempComments ; 
	}



})