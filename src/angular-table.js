(function () {

  const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc'
  };

  class AngularTableController {
    constructor($sce) {
      this.$sce = $sce;
      this.datasource = {
        get: this.getDatasource.bind(this)
      };
      this.sortBy = {};
      this.sortOrder = '';
    }

    getDatasource(index, count, success) {
      return this.metaData.datasource(index, count, success);
    }

    getTrustedHtml(template) {
      return this.$sce.trustAsHtml(template);
    }

    sort(column) {

      if (column.key) {
        if (this.sortBy.title === column.title && this.sortOrder === SORT_ORDER.DESC) {
          this.sortOrder = SORT_ORDER.ASC;
          this.sortBy = column;
        } else if (this.sortBy.title === column.title && this.sortOrder === SORT_ORDER.ASC) {
          this.sortOrder = '';
          this.sortBy = {};
        } else {
          this.sortOrder = SORT_ORDER.DESC;
          this.sortBy = column;
        }

        this.metaData.sort(this.sortBy, this.sortOrder);
      }
    }

  }

  function AngularTableDirective() {
    'ngInject';
    this.restrict = 'E';
    this.scope = {
      metaData: '=',
      controller: '=',
      adapter: '='
    };

    this.templateUrl = './src/angular-table.html';
    this.controller = 'angularTableController';
    this.controllerAs = '$ctrl';
    this.bindToController = true;
  }

  function AngularTableCompileDirective($parse, $compile) {
    'ngInject';
    return {
      restrict: 'A',
      link: function ($scope, element, attr) {
        var parse = $parse(attr.ngBindHtml);

        function value() {
          return (parse($scope) || '').toString();
        }

        $scope.$watch(value, function () {
          $compile(element, null, -9999)($scope);
        });
      }
    }

  }

  angular.module('angular-table', ['ngSanitize', 'ui.scroll'])
    .directive('angularTable', () => new AngularTableDirective)
    .directive('angularTableCompile', AngularTableCompileDirective)
    .controller('angularTableController', AngularTableController);

})();