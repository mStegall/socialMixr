import * as angular from 'angular'

export interface column {
    title: string,
    name: string,
    hiddenXs?: boolean,
    unsortable?: boolean
}

class tableHeadCtrl {
    sortOrder: string;
    
    sortArrows(field: string) {
        return {
            'glyphicon': true,
            'glyphicon-triangle-bottom': this.sortOrder != '-' + field,
            'glyphicon-triangle-top': this.sortOrder == '-' + field
        };
    }

    setArrowColor (field) {
        if (this.sortOrder == field || this.sortOrder == '-' + field) {
            return { color: 'black' };
        } else {
            return { color: '#ccc' };
        }
    }
}

angular.module('app').directive('tableHead', function () {
    return {
        restrict: 'A',
        templateUrl: '/table/header.html',
        controller: tableHeadCtrl,
        controllerAs: '$ctrl',
        scope: {
            columns: '<',
            sortOrder: '<',
            sortOrderChange: '&'
        },
        bindToController: true
    }
})