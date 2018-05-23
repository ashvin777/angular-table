# Angular Table -
This is anuglar table ui component can be used to draw basic table.

# Demo
[https://ashvin777.github.io/angular-table/]https://ashvin777.github.io/angular-table/

# Supported Features -

1. Column Sorting
2. Pagination - Infinite Scrolling
3. Data source
4. Custom templates of cell
5. Custom filters in cells

# Usage

Template
```html
<angular-table
  controller="$ctrl",
  adapter="$ctrl.tableAdapter"
  meta-data='$ctrl.tableMetaData'>
</angular-table>
```

```js
//data.js file
var data = [
  {
    "_id": "5b0542f18a7ab77a12e3cd14",
    "index": 0,
    "age": 24,
    "name": "Sasha Wong",
    "gender": "female",
    "company": "ACRUEX",
    "email": "sashawong@acruex.com",
    "phone": "+1 (923) 546-2211"
  },.....]

//Controller initializing table meta data
function MainController() {

  this.selected = [];
  this.selectToggle = function (row) {

    if (row.isSelected) {
      this.selected.push(row._id);
    } else {
      let index = this.selected.indexOf(row._id);
      this.selected.splice(index, 1);
    }
  };

  this.onDelete = function (row, index) {
    console.log('on delete clicked on row ', row);

    this.tableAdapter.applyUpdates(item => {
      if (item._id === row._id) {
        return [];
      }
    });

    let indexOf = this.selected.indexOf(row._id);
    this.selected.splice(indexOf, 1);
  };

  this.tableMetaData = {
    columns: [{
      titleTemplate: `<input type="checkbox" disabled/>`,
      template: `<input type="checkbox" ng-model="row.isSelected" ng-change="$ctrl.controller.selectToggle(row)"/>`,
      width: '22px'
    }, {
      title: 'Id',
      key: '_id',
      width: '25%'
    }, {
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
      template: `<i>{{ row.company }}</i>`
    }, {
      title: 'Actions',
      type: 'actions',
      width: '20%',
      template: `<i class="fa fa-trash" ng-click="$ctrl.controller.onDelete(row, $index)"></i>`
    }],
    datasource: (index, count, success) => {
      // If a negative, reset to start of list.

      if (index < 0) {
        count = count + index;
        index = 0;

        if (count <= 0) {
          success([]);
          return;
        }
      }

      let newData = angular.copy(data).splice(index, count)

      newData.forEach(element => {
        element.isSelected = this.selected.indexOf(element._id) !== -1;
      });

      success(newData);
    },
    sort: (sortBy, sortOrder) => {

      if (sortOrder === 'asc') {
        data.sort((a, b) => {
          if (a[sortBy.key] > b[sortBy.key]) {
            return -1;
          } else {
            return 1;
          }
        });
      } else {
        data.sort((a, b) => {
          if (a[sortBy.key] < b[sortBy.key]) {
            return -1;
          } else {
            return 1;
          }
        });
      }

      this.tableAdapter.reload();
    }
  };
}
```