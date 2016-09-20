// stats.js is used by stats.md to download graph data from the webserver,
// and then display it using plotly.js. Right now it displays a single graph.

// Process a string `s` and, for each row (line), call `f()` with an
// array of each tab-separated value within that row.
function parse_tsv(s, f) {
  var ix_end = 0;
  for (var ix=0; ix<s.length; ix=ix_end+1) {
    ix_end = s.indexOf('\n', ix);
    if (ix_end == -1) {
      ix_end = s.length;
    }
    var row = s.substring(ix, ix_end).split('\t');
    f(row);
  }
}

// Add an (x,y) point to a Trace object if it is a real point.
function insertPoint(trace, x, y) {
  if (/\d+/.test(y)) {
    trace.x.push(x);
    trace.y.push(y);
  }
}

function tsvListener() {
  var tIssued = { type: "scatter", name: "Issued", x:[], y:[],
              fill: "tozeroy", line: { color: '#2a7ae2' } }
  var tActive = { type: "scatter", name: "Certificates Active", x:[], y:[],
              line: { color: '#fa3a12' } }
  var tFqdn = { type: "scatter", name: "Fully-Qualified Domains Active", x:[], y:[] }
  var tRegDom = { type: "scatter", name: "Registered Domains Active", x:[], y:[],
              marker: { symbol: "diamond" } }

  var dateFormat = /\d{4}-\d{2}-\d{2}/;
  var numFormat = /\d+/;

  parse_tsv(this.responseText, function(row){
    if (!dateFormat.test(row[0])) {
      return;
    }

    insertPoint(tIssued, row[0], row[1]);
    insertPoint(tActive, row[0], row[2]);
    insertPoint(tFqdn, row[0], row[3]);
    insertPoint(tRegDom, row[0], row[4]);
  });

  var plotIt = plot.bind(null, tIssued, tActive, tFqdn, tRegDom);
  if (document.readyState === "interactive") {
    plotIt();
  } else {
    document.addEventListener("DOMContentLoaded", plotIt);
  }
}

function plot(tIssued, tActive, tFqdn, tRegDom) {
  // Various running aggregates over time
  {
    traces = [ tActive, tFqdn, tRegDom ];
    layout = {
      margin: { t: 0 },
      yaxis: {
        title: 'Active Count',
      },
      legend: {
        xanchor: "left",
        yanchor: "top",
        x: 0,
        y: 1
      }
    }
    activeUsage = document.getElementById('activeUsage');
    if (activeUsage) {
      Plotly.plot(activeUsage, traces, layout);
    }
  }

  // Certificates issued over time
  {
    traces = [ tIssued ];
    layout = {
      margin: { t: 0 },
      yaxis: {
        title: 'Issued Per Day',
      },
      legend: {
        xanchor: "left",
        yanchor: "top",
        x: 0,
        y: 1
      }
    }
    issuancePerDay = document.getElementById('issuancePerDay');
    if (issuancePerDay) {
      Plotly.plot(issuancePerDay, traces, layout);
    }
  }

  // Combined Graph: issuancePerDay + activeUsage
  {
    // Override the axis for the combined graph
    tIssued.yaxis = "y2";
    traces = [ tActive, tFqdn, tRegDom, tIssued ];
    layout = {
      margin: { t: 0 },
      yaxis: {
        title: 'Active Count',
        side: 'right'
      },
      yaxis2: {
        title: 'Issued Per Day',
        titlefont: { color: '#2a7ae2' },
        tickfont: { color: '#2a7ae2' },
        overlaying: 'y',
        side: 'left',
        showgrid: false
      },
      legend: {
        xanchor: "left",
        yanchor: "top",
        x: 0,
        y: 1
      }
    }
    combinedTimeline = document.getElementById('combinedTimeline');
    if (combinedTimeline) {
      Plotly.plot(combinedTimeline, traces, layout);
    }
  }
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", tsvListener);
oReq.open("GET", "/js/cert-timeline.tsv");
oReq.send();
