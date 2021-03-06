angular.module('portainer.app')
.controller('StacksDatatableController', ['$scope', '$controller', 'DatatableService',
function ($scope, $controller, DatatableService) {

  angular.extend(this, $controller('GenericDatatableController', {$scope: $scope}));

   /**
   * Do not allow external items
   */
  this.allowSelection = function(item) {
    return !(item.External && item.Type === 2);
  }

  this.$onInit = function() {
    this.setDefaults();
    this.prepareTableFromDataset();

    var storedOrder = DatatableService.getDataTableOrder(this.tableKey);
    if (storedOrder !== null) {
      this.state.reverseOrder = storedOrder.reverse;
      this.state.orderBy = storedOrder.orderBy;
    }

    var textFilter = DatatableService.getDataTableTextFilters(this.tableKey);
    if (textFilter !== null) {
      this.state.textFilter = textFilter;
      this.onTextFilterChange();
    }

    var storedFilters = DatatableService.getDataTableFilters(this.tableKey);
    if (storedFilters !== null) {
      this.filters = storedFilters;
    }
    if (this.filters && this.filters.state) {
      this.filters.state.open = false;
    }

    var storedSettings = DatatableService.getDataTableSettings(this.tableKey);
    if (storedSettings !== null) {
      this.settings = storedSettings;
      this.settings.open = false;
    }
    this.onSettingsRepeaterChange();
    this.state.orderBy = this.orderBy;
  };

}]);
