_myApp
.factory('HomeFactory', ['$resource', function ($resource) {
    return $resource('/clients/:id', null, {
        'all': { method: 'GET', url: '/clients/all' }
    });
}])
.controller('HomeCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'HomeFactory', '$route',
    function ($scope, $routeParams, $location, $localStorage, AgendaFactory, $route) {

            // Events
            $scope.events = [];           

            angular.element(document).ready(function () {

                var Clients = AgendaFactory.all({
                    companyId : $localStorage.user.companyId
                }, function(){
                    if(Clients.error){
                        alert('Não foi possível consultar os funcionários.');
                    }else{
                        for(i = 0; i < Clients.result.length; i++){
                            var events = Clients.result[i].events;
                            for(e = 0; e < events.length; e++){
                                var event = events[e];
                                var arrEvent = event.event.date.split('/');
                                var dateEvent = new Date(arrEvent[2], (arrEvent[1] - 1), arrEvent[0],  0, 0, 0)

                                $scope.events.push(
                                    { id: event._id, clientId : Clients.result[i]._id, title: event.event.title, start: dateEvent, allDay: true, stick : true }
                                    );
                            }                            
                        }
                    }                    
                });
            });            
        }]);