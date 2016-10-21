// stats.js is used by stats.md to download graph data from the webserver,
// and then display it using plotly.js.

var numFormat = /\d+/;

// Process a string `s` and, for each row (line), call `f()` with an
// array of each tab-separated value within that row.
function parse_tsv(s, f) {
  var ix_end = 0;
  for (var ix = 0; ix < s.length; ix = ix_end + 1) {
    ix_end = s.indexOf('\n', ix);
    if (ix_end == -1) {
      ix_end = s.length;
    }
    var row = s.substring(ix, ix_end).split('\t');
    f(row);
  }
}

// Maintain a moving average
function movingAvg(stack, value, window=14) {
  let total = 0;
  if (numFormat.test(value)) {
    stack.push(parseFloat(value));
    while (stack.length > window) {
      stack.shift(0);
    }
  }

  for (let i = 0; i < stack.length; i++) {
    total = total + stack[i];
  }

  if (stack.length == 0) {
    return "NULL";
  }

  return total / stack.length;
}

// Add an (x,y) point to a Trace object if it is a real point.
function insertPoint(trace, x, y) {
  if (numFormat.test(y)) {
    trace.x.push(x);
    trace.y.push(parseFloat(y));
  }
}

function tsvListener() {
  var tIssued = { type: "scatter", name: "Issued", x:[], y:[],
                  fill: "tozeroy", line: { color: '#2a7ae2' } }
  var tActive = { type: "scatter", name: "Certificates Active", x:[], y:[],
                  line: { color: '#fa3a12' } }
  var tFqdn = { type: "scatter", name: "Fully-Qualified Domains Active",
                x:[], y:[] }
  var tRegDom = { type: "scatter", name: "Registered Domains Active", x:[], y:[],
                  marker: { symbol: "diamond" } }
  var tPctTLSAvg = { type: "scatter", name: "% of Firefox Pageloads use TLS (14 day moving average)",
                     x:[], y:[] }

  var dateFormat = /\d{4}-\d{2}-\d{2}/;

  var stackPctTLSAvg = [];

  parse_tsv(this.responseText, function(row){
    if (!dateFormat.test(row[0])) {
      return;
    }

    insertPoint(tIssued, row[0], row[1]);
    insertPoint(tActive, row[0], row[2]);
    insertPoint(tFqdn, row[0], row[3]);
    insertPoint(tRegDom, row[0], row[4]);
    insertPoint(tPctTLSAvg, row[0], movingAvg(stackPctTLSAvg, row[5]))
  });

  var plotIt = plot.bind(null, tIssued, tActive, tFqdn, tRegDom, tPctTLSAvg);
  if (document.readyState === "complete") {
    plotIt();
  } else {
    window.addEventListener("load", plotIt);
  }
}

function plot(tIssued, tActive, tFqdn, tRegDom, tPctTLSAvg) {
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

  // Firefox telemetry (HTTP_PAGELOAD_IS_SSL) over time
  {
    traces = [ tPctTLSAvg ];
    layout = {
      margin: { t: 0 },
      yaxis: {
        title: 'Percent of Pageloads over HTTPS',
        rangemode: 'tozero',
        ticksuffix: '%'
      },
      legend: {
        xanchor: "left",
        yanchor: "top",
        x: 0,
        y: 1
      }
    }
    pageloadPercent = document.getElementById('pageloadPercent');
    if (pageloadPercent) {
      Plotly.plot(pageloadPercent, traces, layout);
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
