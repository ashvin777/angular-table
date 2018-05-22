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
      width: '20%'
    }, {
      title: 'Mobile',
      key: 'phone',
      width: '25%'
    }, {
      title: 'Email',
      key: 'email',
      width: '30%'
    }]
  };

  this.data = data;
}