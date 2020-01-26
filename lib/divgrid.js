// http://bl.ocks.org/3687826
d3.divgrid = function(config) {
  var columns = [];

  var dg = function(selection) {
    if (columns.length == 0) columns = d3.keys(selection.data()[0][0]);

    // header
    selection.selectAll(".header")
        .data([true])
      .enter().append("div")
        .attr("class", "header")

    var header = selection.select(".header")
      .selectAll(".cell")
      .data(columns);

    header.enter().append("div")
      .attr("class", function(d,i) { return "col-" + i; })
      .classed("cell", true)

    selection.selectAll(".header .cell")
      .text(function(d) { return d; });

    header.exit().remove();

    // rows
    var rows = selection.selectAll(".row")
        .data(function(d) { return d; })

    rows.enter().append("div")
        .attr("class", "row") 
    
    rows.exit().remove();


    var cells = selection.selectAll(".row").selectAll(".cell")
        .data(function(d) { return columns.map(function(col){return d[col];}) })

    // cells
    cells.enter().append("div")
      .attr("class", function(d,i) { return "col-" + i; })
      .classed("cell", true)

    cells.exit().remove();

    var colors = ["#e67c73", "#ec9270", "#f2a96d", "#f8bf6a", "#ffd666", "#ded16d", "#bccc74", "#9bc67b", "#79c182", "#57bb8a"];
    selection.selectAll(".cell")
      .html(function(d) { return d; })
      .style("background-color", function(d) {
          if(isNumber(d) && d.length<=2){
            return colors[d-1];
          }
      });

    return dg;
  };

  dg.columns = function(_) {
    if (!arguments.length) return columns;
    columns = _;
    return this;
  };

  return dg;
};

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
