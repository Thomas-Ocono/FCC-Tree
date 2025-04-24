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

  //create the tooltip
  const tooltip = d3.select("body").append("div").attr("id", "tooltip");

  //creating the svg to draw on
  const svg = d3
    .select("body")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .style("border", "4px, solid, black")
    .style("display", "block")
    .style("margin", "auto");

  //sorting the data recieved into something usable by d3.treemap
  const hierarchy = d3
    .hierarchy(data, (node) => {
      return node["children"];
    })
    .sum((node) => {
      return node["value"];
    })
    .sort((node1, node2) => {
      return node2["value"] - node1["value"];
    });

  let treemap = d3.treemap().size([width, height])(hierarchy);
  //return sorted data as videoGametiles
  let videoGameTiles = hierarchy.leaves();
  console.log(videoGameTiles);

  //adding g elements with rect and text to the svg
  let tiles = svg
    .selectAll("g")
    .data(videoGameTiles)
    .enter()
    .append("g")
    .attr("transform", (game) => {
      return `translate(${game.x0},${game.y0})`;
    });
  tiles
    .append("rect")
    .attr("class", "tile")
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .style("stroke", "black")
    .style("stroke-width", 0.25)
    .attr("width", (d) => {
      return d.x1 - d.x0;
    })
    .attr("height", (d) => {
      return d.y1 - d.y0;
    })
    .attr("fill", (game) => {
      let console = game.data.category;
      switch (console) {
        case "Wii":
          return "#ccccff";
        case "DS":
          return "#ccffcc";
        case "X360":
          return "#ffff99";
        case "GB":
          return "#cc99ff";
        case "PS3":
          return "#9999ff";
        case "NES":
          return "#ffb399";
        case "PS2":
          return "#99ffe6";
        case "3DS":
          return "#99e6ff";
        case "PS4":
          return "#d2ff4d";
        case "SNES":
          return "#3399ff";
        case "PS":
          return "#ff3333";
        case "N64":
          return "#e6e6e6";
        case "GBA":
          return "#e6b3e6";
        case "XB":
          return "#ff944d";
        case "PC":
          return "#ff1a1a";
        case "2600":
          return "#ff4dff";
        case "PSP":
          return "#aaaa55";
        case "XOne":
          return "#6666ff";
      }
    });

  tiles
    .append("text")
    .attr("transform", (d) => {
      let centerX = (d.x1 - d.x0) / 2;
      let centerY = (d.y1 - d.y0) / 2;
      return `translate(${centerX / 5}, ${centerY})`;
    })
    .style("font-size", "10px")
    .text((d) => d.data.name);

  const legend = d3
    .select("body")
    .append("svg")
    .attr("id", "legend")
    .attr("height", 200)
    .attr("width", 1000)
    .style("border", "1px, solid, black")
    .style("display", "block")
    .style("margin", "auto")
    .style("margin-top", "2rem");
};
