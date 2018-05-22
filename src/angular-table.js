function AngularTableController() {

}

function AngularTableDirective() {
  this.restrict = 'E';
  this.scope = {
    metaData: '<',
    data: '<'
  };

  this.templateUrl = './src/angular-table.html';
  this.controller = 'angularTableController';
  this.controllerAs = '$ctrl';
  this.bindToController = true;
}

angular.module('angular-table', [])
  .directive('angularTable', () => new AngularTableDirective)
  .controller('angularTableController', AngularTableController);