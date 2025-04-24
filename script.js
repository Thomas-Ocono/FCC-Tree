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
  const height = 600;
  const width = 1000;

  //create the tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("background-color", "gray")
    .style("border-radius", "5px")
    .style("opacity", 0);

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
    })
    .on("mouseover", (d) => {
      tooltip.style("opacity", 0.9);
      tooltip.style("position", "absolute");
      tooltip.style("left", d3.event.pageX + "px");
      tooltip.style("top", d3.event.pageY - 50 + "px");
      tooltip.style("padding", "10px");
      tooltip.attr("data-value", d.data.value);
      tooltip.text(`Name: ${d.data.name}`);
    })
    .on("mouseout", (d) => {
      tooltip.style("opacity", 0);
    });

  tiles
    .append("text")
    .style("font-size", "10px")
    .attr("transform", (d) => {
      let x = 5;
      let y = 12;
      return `translate(${x},${y})`;
    })
    .text((d) => d.data.name);

  let categories = [];
  data.children.forEach((element) => {
    categories.push(element.name);
  });

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

  const legendElement = legend
    .selectAll("g")
    .data(categories)
    .enter()
    .append("g")
    .attr("transform", (d, i) => {
      let x = i * 100;
      let y = 25;
      if (i > 9) {
        y = 100;
        x = (i - 9) * 100;
      }
      return `translate(${x}, ${y})`;
    });
  legendElement.append("text").text((d) => d);
  legendElement
    .append("rect")
    .attr("class", "legend-item")
    .attr("height", 25)
    .attr("width", 25)
    .attr("fill", (d, i) => {
      switch (d) {
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
};
