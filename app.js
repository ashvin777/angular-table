angular.module('app', ['angular-table'])
  .controller('MainController', MainController);

angular.element(document).ready(function () {
  angular.bootstrap(angular.element(document.body), ['app']);
});

function MainController() {

  this.tableMetaData = {
    columns: [{
      title: 'Name',
      key: 'name',
      width: '25%'
    }, {
      title: 'Age',
      key: 'age',
      width: '10%'
    }, {
      title: 'Phone',
      key: 'phone',
      width: '20%'
    }, {
      title: 'Email',
      key: 'email',
      width: '20%'
    }, {
      title: 'Company',
      width: '20%',
      key: 'company',
      template: '<i>{{ company }}</i>'
    }],
    datasource: data
  };
}