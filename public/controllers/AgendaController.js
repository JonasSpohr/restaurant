_myApp
    .factory('AgendaFactory', ['$resource', function ($resource) {
        return $resource('/clients/:id', null, {
            'all': { method: 'GET', url: '/clients/all' }
        });
    }])
    .controller('AgendaCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'AgendaFactory', '$route',
        function ($scope, $routeParams, $location, $localStorage, AgendaFactory, $route) {
            // Events
            $scope.events = [];

            /* message on eventClick */
            $scope.alertOnEventClick = function (event, allDay, jsEvent, view) {
                $scope.alertMessage = (event.title + ': Clicked ');
                $location.url('/event?id=' + event.id + '&clientId=' + event.clientId + "&back=agenda");
            };

            /* config object */
            $scope.uiConfig = {
                calendar: {
                    height: 550,
                    editable: false,
                    header: {
                        left: 'prev,next',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    eventClick: $scope.alertOnEventClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize,
                    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
                    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                    buttonText: {
                        today:'Hoje',
                        month:'Mês',
                        agendaWeek:'Semana',
                        agendaDay: 'Dia'
                    },
                    viewRender: function(view, element) {
                        
                    }
                }
            };

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
            $scope.eventSources = [$scope.events];
        }]);