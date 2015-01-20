(function(angular) {
  'use strict';

  angular
    .module('documents-client', [
      'ui.router'
    ])
    .config(setRoutes)
    .controller('DocumentsListCtrl', DocumentsListCtrl)
    .controller('DocumentCtrl', DocumentCtrl);

  function setRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/documents');

    $stateProvider
      .state('documents', {
        url: '/documents',
        template: '<h1>Documents</h1><ul><li ng-repeat="doc in ctrl.documents"><a ui-sref="document({id: doc._id})">{{doc.title}}</a></li></ul>',
        controller: 'DocumentsListCtrl as ctrl'
      })
      .state('document', {
        url: '/documents/:id',
        template: '<a ui-sref="documents">Documents list</a><h1>{{ctrl.doc.title}}</h1><p>{{ctrl.doc.content}}</p>',
        controller: 'DocumentCtrl as ctrl',
        resolve: {
          documentId: function($stateParams) {
            return $stateParams.id;
          }
        }
      });
  }

  function DocumentsListCtrl($http) {
    var ctrl = this;

    ctrl.documents = [];

    $http.get('/api/documents').then(function(response) {
      ctrl.documents = response.data;
    });
  }

  function DocumentCtrl($http, documentId) {
    var ctrl = this;

    ctrl.doc = null;

    $http.get('/api/documents/' + documentId).then(function(response) {
      ctrl.doc = response.data;
    });
  }

})(window.angular);
