var Column, Grid, GridToPs, draw_grid, grid_definitions;

grid_definitions = {
  grid_number_of_columns: 12,
  grid_half_gutter: 15,
  grid_mobile_landscape: 480,
  grid_mobile_portrait: 320,
  grid_tablet_width: 750,
  grid_desktop_width: 970,
  grid_desktop_large_width: 1170
};

Grid = Grid = (function() {
  function Grid(grid_definition) {
    var col_outer_width, num, _i, _ref;
    this.columns = [];
    this.width = grid_definition.width;
    col_outer_width = this.width / grid_definition.columns;
    for (num = _i = 1, _ref = grid_definition.columns; 1 <= _ref ? _i <= _ref : _i >= _ref; num = 1 <= _ref ? ++_i : --_i) {
      this.columns.push(new Column(num, col_outer_width, grid_definition.gutter));
    }
  }

  Grid.prototype.get_columns = function() {
    return this.columns;
  };

  return Grid;

})();

Column = Column = (function() {
  function Column(num, outer_width, half_gutter) {
    var inner_width;
    this.outer_width = outer_width;
    inner_width = outer_width - 2 * half_gutter;
    this.left_outer_x = (num - 1) * outer_width;
    this.left_inner_x = this.left_outer_x + half_gutter;
    this.right_inner_x = this.left_inner_x + inner_width;
    this.right_outer_x = this.right_inner_x + half_gutter;
  }

  Column.prototype.get_x_values = function() {
    return [this.left_outer_x, this.left_inner_x, this.right_inner_x, this.right_outer_x];
  };

  return Column;

})();

GridToPs = GridToPs = (function() {
  function GridToPs(active_ps_doc, grid) {
    this.active_ps_doc = active_ps_doc;
    this.grid = grid;
  }

  GridToPs.prototype.draw = function() {
    var col, doc_width, grid_offset, x_value, _i, _len, _ref, _results;
    doc_width = parseInt(this.active_ps_doc.width.value);
    grid_offset = parseInt((doc_width - this.grid.width) / 2);
    _ref = this.grid.columns;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      col = _ref[_i];
      _results.push((function() {
        var _j, _len1, _ref1, _results1;
        _ref1 = col.get_x_values();
        _results1 = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          x_value = _ref1[_j];
          _results1.push(this.active_ps_doc.guides.add(Direction.VERTICAL, x_value + grid_offset));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  return GridToPs;

})();

draw_grid = function(grid_definition) {
  var active_ps_doc, grid, grid_to_ps;
  if (app.documents.length > 0) {
    active_ps_doc = app.activeDocument;
    if (grid_definition.width == null) {
      grid_definition.width = active_ps_doc.width;
    }
    grid = new Grid(grid_definition);
    grid_to_ps = new GridToPs(active_ps_doc, grid);
    return grid_to_ps.draw();
  }
};

if (typeof module !== "undefined" && module !== null) {
  module.exports.Grid = Grid;
  module.exports.Column = Column;
  module.exports.grid_definitions = grid_definitions;
}

draw_grid({
  width: grid_definitions.grid_mobile_landscape,
  columns: grid_definitions.grid_number_of_columns / 2,
  gutter: grid_definitions.grid_half_gutter
});
