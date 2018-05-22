(function () {

  const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc'
  };

  function AngularTableController($element, $interpolate) {

    this.interpolate = function (template, row) {
      return $interpolate(template)(row);
    }
  }




  function AngularTableDirective() {
    this.restrict = 'E';
    this.scope = {
      metaData: '<'
    };

    this.templateUrl = './src/angular-table.html';
    this.controller = 'angularTableController';
    this.controllerAs = '$ctrl';
    this.bindToController = true;
  }

  angular.module('angular-table', ['ngSanitize'])
    .directive('angularTable', () => new AngularTableDirective)
    .controller('angularTableController', AngularTableController);

  AngularTableController.$inject = ['$element', '$interpolate'];

})();