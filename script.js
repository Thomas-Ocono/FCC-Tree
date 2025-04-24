const url =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

const req = new XMLHttpRequest();

req.open("GET", url, true);
req.onload = () => {
  let data = JSON.parse(req.responseText);
  main(data);
};
req.send();

const main = (data) => {
  console.log(data);
  const height = 600;
  const width = 1000;
  const svg = d3
    .select("body")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .style("border", "4px, solid, black")
    .style("display", "block")
    .style("margin", "auto");

  const legend = d3
    .select("body")
    .append("svg")
    .attr("id", "legend")
    .attr("height", 100)
    .attr("width", 1000)
    .style("border", "1px, solid, black")
    .style("display", "block")
    .style("margin", "auto")
    .style("margin-top", "2rem");
};
