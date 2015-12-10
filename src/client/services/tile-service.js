(function() {
  'use strict';

  angular.module('myApp').factory('TileService', [function () {

      var Obj = {};

      Obj.buildTiles = function(data) {
        var colors = [
            '#F44336',
            '#EF5350',
            '#E040FB',
            '#009688',
            '#2E7D32',
            '#00796B',
            '#827717',
            '#A1887F',
            '#795548',
            '#607D8B',
            '#546e7a',
            '#78909C',
            '#9e9d24',
            '#78909C',
          ];

          function getSize(priority) {
            if (priority === 3) return 3;
            else if (priority === 2) return 2;
            else if (priority === 1) return 1;
          }

          function randomColor() {
            return colors[Math.floor(Math.random() * colors.length)];
          }


        var tiles = [];
        for (var i = 0; i < data.length; i++) {
          tiles.push({
            title: data[i].title,
            description: data[i].description,
            deadline: data[i].deadline,
            priority: data[i].priority,
            colspan: getSize(data[i].priority),
            color: randomColor(),
            rowspan: getSize(data[i].priority),
          });
        }
        return tiles;
      };

      return Obj;
  }]);
}());
