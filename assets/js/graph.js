//--------------------------------------------------
// Estilo
//--------------------------------------------------
const BG = "#1a1a1a";
const COLOR_NOTE  = "#7bcba3";
const COLOR_INDEX = "#e5e5e5";
const COLOR_EDGE  = "#bababa"; // líneas claras

//--------------------------------------------------
const cont = document.getElementById("graph-container");
const W = cont.clientWidth;
const H = cont.clientHeight;

const svg = d3.select(cont)
  .append("svg")
  .attr("width", W)
  .attr("height", H)
  .style("background", BG)
  .attr("vector-effect", "non-scaling-stroke"); // << SUPER IMPORTANTE

const g = svg.append("g");

svg.call(
  d3.zoom()
    .scaleExtent([0.05, 3])
    .on("zoom", ev => g.attr("transform", ev.transform))
);

//--------------------------------------------------
// IMPORTANCIA LOGARÍTMICA
//--------------------------------------------------
function computeImportance(nodes, links) {

  links.forEach(l => {
    nodes[l.source].degree++;
    nodes[l.target].degree++;
  });

  const children = {};
  nodes.forEach(n => children[n.id] = []);
  links.forEach(l => children[l.source].push(l.target));

  const dfs = id =>
    children[id].reduce((acc, c) => acc + 1 + dfs(c), 0);

  nodes.forEach(n => n.subtree = dfs(n.id));

  const logScale = x => Math.log10(1 + x);

  nodes.forEach(n => {
    if (n.isIndex) {
      n.importance = logScale(n.subtree);
    } else {
      let parentImp = 0;
      links.forEach(l => {
        if (l.target === n.id) {
          const parent = nodes[l.source];
          if (parent.isIndex)
            parentImp = parent.subtree;
        }
      });
      n.importance = logScale(parentImp);
    }
  });

  const nonRoot = nodes.filter(n => n.depth > 0);
  const maxImp = Math.max(...nonRoot.map(n => n.importance || 1));

  nodes.forEach(n => {
    if (n.depth === 0) {
      n.radius = 10;
      return;
    }

    const ratio = n.importance / maxImp;

    if (n.isIndex)
      n.radius = 5 + ratio * 26;
    else
      n.radius = 3 + ratio * 11;
  });
}

//--------------------------------------------------
// Render
//--------------------------------------------------
async function init() {

  const res = await fetch("/apuntes/arbol.json");
  const tree = await res.json();

  let nodes = [];
  let links = [];
  let id = 0;

  function walk(node, parent = null, depth = 0) {
    const isDir = node.type === "directory";
    const isFile = node.type === "file" && node.path?.endsWith(".md");
    let name = isDir ? node.name :
      node.path.split("/").pop().replace(".md", "");

    let isIndex = false;
    if (isDir) isIndex = true;
    if (isFile) {
      if (/^0\./.test(name)) isIndex = true;
      let cleanF = name.replace(/^\d+\.\s*/, "").toLowerCase();
      let cleanP = (node.parent || "").replace(/^\d+\.\s*/, "").toLowerCase();
      if (cleanF === cleanP) isIndex = true;
    }

    const thisId = id++;
    nodes.push({
      id: thisId,
      name,
      path: node.path || null,
      isIndex,
      depth,
      degree: 0,
      subtree: 0,
      importance: 0,
      radius: 4
    });

    if (parent !== null)
      links.push({ source: parent, target: thisId });

    if (node.contents)
      node.contents.forEach(c => {
        if (c.type === "file") c.parent = node.name;
        walk(c, thisId, depth + 1);
      });
  }

  walk(tree);

  computeImportance(nodes, links);

  const sim = d3.forceSimulation(nodes)
    .force("link",
      d3.forceLink(links)
        .id(d => d.id)
        .distance(d => 50 + d.target.radius * 1.3)
        .strength(0.55)
    )
    .force("charge", d3.forceManyBody().strength(-230))
    .force("center", d3.forceCenter(W / 2, H / 2))
    .force("collide", d3.forceCollide().radius(d => d.radius + 10));

  const edge = g.append("g")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke", COLOR_EDGE)
    .attr("stroke-width", 2.4)
    .attr("stroke-opacity", 0.75);

  const node = g.append("g")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", d => d.radius)
    .attr("fill", d => d.isIndex ? COLOR_INDEX : COLOR_NOTE)
    .style("cursor", d => d.isIndex ? "default" : "pointer")
    .on("click", (_, d) => {
      if (!d.isIndex && d.path)
        window.location.href =
          `/markdown-viewer.html?file=${encodeURIComponent(d.path)}`;
    });

  const label = g.append("g")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .text(d => d.name)
    .attr("font-size", "0.7rem")
    .attr("fill", "#ddd")
    .attr("opacity", d => d.radius > 9 ? 0.9 : 0.45)
    .attr("text-anchor","middle")
    .attr("pointer-events","none")
    .attr("dy", d => -(d.radius + 4));

  sim.on("tick", () => {
    edge
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    label
      .attr("x", d => d.x)
      .attr("y", d => d.y - d.radius - 4);
  });

  setTimeout(() => {
    const b = g.node().getBBox();
    const scale = 0.90 * Math.min(W / b.width, H / b.height);
    const tx = (W - b.width * scale) / 2 - b.x * scale;
    const ty = (H - b.height * scale) / 2 - b.y * scale;

    svg.call(
      d3.zoom().transform,
      d3.zoomIdentity.translate(tx, ty).scale(scale)
    );
  }, 900);
}

init();

