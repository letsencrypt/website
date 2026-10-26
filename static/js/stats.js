/*global Plotly*/
function doPlot() {

  // stats.js is used by stats.md to download graph data from the webserver,
  // and then display it using plotly.js.

  var numFormat = /\d+/;
  var dateFormat = /\d{4}-\d{2}-\d{2}/;

  Plotly.setPlotConfig({locale: document.documentElement.lang});


  const loc = document.getElementById("plot-translations").dataset;

                  
  // Process a string `s` and, for each row (line), call `f()` with an
  // array of each tab-separated value within that row.
  function parse_delim(s, delim, f) {
    var ix_end = 0;
    for (var ix = 0; ix < s.length; ix = ix_end + 1) {
      ix_end = s.indexOf("\n", ix);
      if (ix_end == -1) {
        ix_end = s.length;
      }
      var row = s.substring(ix, ix_end).trim().split(delim);
      f(row);
    }
  }

  // Add an (x,y) point to a Trace object if it is a real point.
  function insertPoint(trace, x, y) {
    if (numFormat.test(y)) {
      trace.x.push(x);
      trace.y.push(parseFloat(y));
    }
  }

  function tsvListener(text) {
    var tIssued = { type: "scatter", name: loc.issued, x:[], y:[],
                    fill: "tozeroy", line: { color: someGreen } };
    var tActive = { type: "scatter", name: loc.certificates_active, x:[], y:[],
                    line: { color: leOrange, dash: "dot" } };
    var tFqdn = { type: "scatter", name: loc.fully_qualified_domains_active,
                  x:[], y:[], line: { color: leBlue, dash: "line" } };
    var tRegDom = { type: "scatter", name: loc.registered_domains_active, x:[], y:[],
                    marker: { symbol: "diamond" }, line: { color: someGreen, dash: "dash" } };

    parse_delim(text, "\t", function(row){
      if (!dateFormat.test(row[0])) {
        return;
      }

      insertPoint(tIssued, row[0], row[1]);
      insertPoint(tActive, row[0], row[2]);
      insertPoint(tFqdn, row[0], row[3]);
      insertPoint(tRegDom, row[0], row[4]);
    });

    const activeUsage = document.getElementById("activeUsage");
    if (activeUsage) {
      activeUsage.innerHTML = ""; // remove waiting
      plotActiveUsage(activeUsage, tActive, tFqdn, tRegDom);
    }

    const issuancePerDay = document.getElementById("issuancePerDay");
    if (issuancePerDay) {
      issuancePerDay.innerHTML = ""; // remove waiting
      plotIssuancePerDay(issuancePerDay, tIssued);
    }

    const combinedTimeline = document.getElementById("combinedTimeline");
    if (combinedTimeline) {
      plotCombinedTimeline(combinedTimeline,tIssued, tActive, tFqdn, tRegDom);
    }
  }
  
  // Various running aggregates over time
  function plotActiveUsage(dom, tActive, tFqdn, tRegDom) {
    let traces = [ tActive, tFqdn, tRegDom ];
    let layout = {
      margin: { t: 20 },
      yaxis: {
        title: loc.active_count,
      },
      legend: {
        xanchor: "left",
        yanchor: "top",
        x: 0,
        y: 1
      }
    };
    Plotly.newPlot(dom, traces, layout);
  }

  // Certificates issued over time
  function plotIssuancePerDay(dom, tIssued) {
    let traces = [ tIssued ];
    let layout = {
      margin: { t: 20 },
      yaxis: {
        title: loc.issued_per_day,
      },
      legend: {
        xanchor: "left",
        yanchor: "top",
        x: 0,
        y: 1
      }
    };
    Plotly.newPlot(dom, traces, layout);
  }

  // Combined Graph: issuancePerDay + activeUsage
  function plotCombinedTimeline(dom, tIssued, tActive, tFqdn, tRegDom) {
    // Override the axis for the combined graph
    tIssued.yaxis = "y2";
    let traces = [ tActive, tFqdn, tRegDom, tIssued ];
    let layout = {
      margin: { t: 20 },
      yaxis: {
        title: loc.active_count,
        side: "right"
      },
      yaxis2: {
        title: loc.issued_per_day,
        titlefont: { color: "#2a7ae2" },
        tickfont: { color: "#2a7ae2" },
        overlaying: "y",
        side: "left",
        showgrid: false
      },
      legend: {
        xanchor: "left",
        yanchor: "top",
        x: 0,
        y: 1
      }
    };
    Plotly.newPlot(dom, traces, layout);
  }

  let leBlue = "#103a71";
  let leOrange = "#ffa409";
  let someGreen = "#2ca02c";

  // Line style for each OS column in chrome-https-adoption.csv. Columns not
  // listed here are still plotted, with Plotly's default style.
  const chromeOsStyles = {
    Windows: { color: leBlue },
    Mac: { color: leOrange, dash: "dot" },
    Linux: { color: someGreen, dash: "dash" },
    ChromeOS: { color: "#9467bd", dash: "dashdot" },
    Android: { color: "#d62728", dash: "longdash" },
  };

  // Chrome HTTPS page loads per OS over time, from Google's Transparency
  // Report. The CSV has a date column and one column per OS, each holding the
  // share (0-1) of that week's page loads that used HTTPS.
  function chromeHttpsPlot(dom, responseText) {
    let traces = [];

    parse_delim(responseText, ",", function(row){
      if (row[0] == "date") {
        for (let os of row.slice(1)) {
          traces.push({ type: "scatter", x:[], y:[], name: os,
                        line: chromeOsStyles[os] });
        }
        return;
      }
      if (!dateFormat.test(row[0])) {
        return;
      }

      for (let i = 0; i < traces.length; i++) {
        insertPoint(traces[i], row[0], parseFloat(row[i + 1]) * 100);
      }
    });

    let layout = {
      margin: { t: 20 },
      yaxis: {
        title: loc.percent_https,
        rangemode: "tozero",
        ticksuffix: "%",
        hoverformat: ".1f"
      },
      legend: {
        xanchor: "left",
        yanchor: "top",
        x: 0,
        y: 1
      }
    };
    Plotly.newPlot(dom, traces, layout);
  }

  var path;
  if ( location.hostname === "localhost" ) {
    path = "/js/"; // in dev, will use old data.
  } else {
    path = "https://d1dfn7jg27m4cf.cloudfront.net/";
  }

  fetch(path+"cert-daily-stats.tsv")
  .then(response => {
    return response.text();
  }).then(tsvListener);

  var waiting = "<div class=\"waiting\"></div>";

  const activeUsage = document.getElementById("activeUsage");
  if (activeUsage) {
    activeUsage.innerHTML = waiting;
  }

  const issuancePerDay = document.getElementById("issuancePerDay");
  if (issuancePerDay) {
    issuancePerDay.innerHTML = waiting;
  }

  const pageloadPercent = document.getElementById("pageloadPercent");
  if ( pageloadPercent ) {
    pageloadPercent.innerHTML = waiting;
    fetch(path+"chrome-https-adoption.csv")
    .then(response => {
      return response.text();
    }).then(responseText => {
      pageloadPercent.innerHTML = ""; // remove waiting
      chromeHttpsPlot(pageloadPercent, responseText);
    });
  }
}

if (document.readyState === "complete") {
  doPlot();
} else {
  window.addEventListener("load", doPlot);
}
