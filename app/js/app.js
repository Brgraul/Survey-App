var quiz = angular.module('quiz', ['ngMaterial'])

quiz.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red', {
      'default': '400'
      })
});

quiz.config(function($sceDelegateProvider) {
 $sceDelegateProvider.resourceUrlWhitelist([
   // Allow same origin resource loads.
   'self',
   // Allow loading from our assets do.  Notice the difference between * and **.
   'http://srv*.assets.example.com/**',
 ]);
 })

quiz.run(['$rootScope', function($rootScope){

	$rootScope.fullscreen = false;
	$rootScope.initialized = false;


	llb_app.addListener('window_state', function(data){
		if(data.fullscreen)
		{
			$rootScope.$apply(function(){
				$rootScope.fullscreen = true
			})

		}
		else
		{
			$rootScope.$apply(function(){
				$rootScope.fullscreen = false
				$rootScope.$broadcast("changed_window_state");
			})


		}
	})

	llb_app.request('window_dimensions')

	llb_app.addListener('window_dimensions', function(data){
		$rootScope.$apply(function(){
			$rootScope.window_dimensions = data
			$rootScope.initialized = true;
		})
	})
}])

quiz.controller('MainController', ['$rootScope', function($rootScope){
	var vm = this;
	vm.screen = 'start';
	$rootScope.myCard = 0;
  vm.location = '';

  llb_app.addListener('location', function(result){
  if(result.status == 'success'){
  }
  })

	$rootScope.$on('changed_window_state', function(){
		vm.screen = 'start';
	})

	$rootScope.toggler1 = function (){
		$rootScope.myCard = $rootScope.myCard + 1;
    llb_app.request('location');
    console.log(vm.location);
	};
}])
