(function () {

  const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc'
  };

  class AngularTableController {
    constructor ($interpolate){
      this.$interpolate = $interpolate;

      this.datasource = {
        get: this.getDatasource.bind(this)
      };

    }

    interpolate(template, row) {
      return this.$interpolate(template)(row);
    }

    getDatasource(index, count, success) {
      return this.metaData.datasource(index, count, success);
    }

  }

  function AngularTableDirective() {
    'ngInject';
    this.restrict = 'E';
    this.scope = {
      metaData: '='
    };

    this.templateUrl = './src/angular-table.html';
    this.controller = 'angularTableController';
    this.controllerAs = '$ctrl';
    this.bindToController = true;
  }

  angular.module('angular-table', ['ngSanitize', 'ui.scroll'])
    .directive('angularTable', () => new AngularTableDirective)
    .controller('angularTableController', AngularTableController);

  // AngularTableController.$inject = ['$element', '$interpolate'];

})();