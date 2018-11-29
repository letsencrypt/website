/*global Plotly*/

// stats.js is used by stats.md to download graph data from the webserver,
// and then display it using plotly.js.

var numFormat = /\d+/;
var dateFormat = /\d{4}-\d{2}-\d{2}/;

var gHttpsData = { countryList: [], osList: [], dateToCountryOSPageloadData: {},
                   dateToHistoricalPageloadData: {} };

// Process a string `s` and, for each row (line), call `f()` with an
// array of each tab-separated value within that row.
function parse_delim(s, delim, f) {
  var ix_end = 0;
  for (var ix = 0; ix < s.length; ix = ix_end + 1) {
    ix_end = s.indexOf('\n', ix);
    if (ix_end == -1) {
      ix_end = s.length;
    }
    var row = s.substring(ix, ix_end).trim().split(delim);
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
                  fill: "tozeroy", line: { color: someGreen } }
  var tActive = { type: "scatter", name: "Certificates Active", x:[], y:[],
                  line: { color: leOrange, dash: 'dot' } }
  var tFqdn = { type: "scatter", name: "Fully-Qualified Domains Active",
                x:[], y:[], line: { color: leBlue, dash: 'line' } }
  var tRegDom = { type: "scatter", name: "Registered Domains Active", x:[], y:[],
                  marker: { symbol: "diamond" }, line: { color: someGreen, dash: 'dash' } }

  parse_delim(this.responseText, '\t', function(row){
    if (!dateFormat.test(row[0])) {
      return;
    }

    insertPoint(tIssued, row[0], row[1]);
    insertPoint(tActive, row[0], row[2]);
    insertPoint(tFqdn, row[0], row[3]);
    insertPoint(tRegDom, row[0], row[4]);
  });

  var plotIt = plot.bind(null, tIssued, tActive, tFqdn, tRegDom);
  if (document.readyState === "complete") {
    plotIt();
  } else {
    window.addEventListener("load", plotIt);
  }
}

function plot(tIssued, tActive, tFqdn, tRegDom) {
  // Various running aggregates over time
  {
    let traces = [ tActive, tFqdn, tRegDom ];
    let layout = {
      margin: { t: 20 },
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
    let activeUsage = document.getElementById('activeUsage');
    if (activeUsage) {
      Plotly.plot(activeUsage, traces, layout);
    }
  }

  // Certificates issued over time
  {
    let traces = [ tIssued ];
    let layout = {
      margin: { t: 20 },
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
    let issuancePerDay = document.getElementById('issuancePerDay');
    if (issuancePerDay) {
      Plotly.plot(issuancePerDay, traces, layout);
    }
  }

  // Combined Graph: issuancePerDay + activeUsage
  {
    // Override the axis for the combined graph
    tIssued.yaxis = "y2";
    let traces = [ tActive, tFqdn, tRegDom, tIssued ];
    let layout = {
      margin: { t: 20 },
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
    let combinedTimeline = document.getElementById('combinedTimeline');
    if (combinedTimeline) {
      Plotly.plot(combinedTimeline, traces, layout);
    }
  }
}

function httpsCsvListener(responseText) {
  let countries = {};
  let operatingSystems = {};
  let dateToCountryOSPageloadData = {};

  parse_delim(responseText, ',', function(row){
    let datestamp = row[0].substring(0, 10); // Strip off the timestamp
    let os = row[1];
    let country = row[2];
    let reporting_ratio = row[3];
    let normalized_pageloads = row[4];
    let ratio = row[5];
    if (!dateFormat.test(datestamp)) {
      return;
    }

    if (!(datestamp in dateToCountryOSPageloadData)) {
      dateToCountryOSPageloadData[datestamp] = {};
    }

    let countryOSPageloadData = dateToCountryOSPageloadData[datestamp];
    if (!(country in countryOSPageloadData)) {
      countryOSPageloadData[country] = {};
    }

    let osPageloadData = countryOSPageloadData[country];
    osPageloadData[os] = { normalized_pageloads, reporting_ratio, ratio };

    // derive a master list for the UI
    countries[country] = 1;
    operatingSystems[os] = 1;
  });

  gHttpsData.countryList = Object.keys(countries);
  gHttpsData.osList = Object.keys(operatingSystems);
  gHttpsData.dateToCountryOSPageloadData = dateToCountryOSPageloadData;
}

function httpsDerivePageloadsFromNormalizedData(traceObj, includeInHttpsAnalysis,
                                                stackMovingAverage = []) {
  let dateToCountryOSPageloadData = gHttpsData.dateToCountryOSPageloadData;

  // Input data is not sorted, and so neither is the dictionary, so we need
  // to sort it before we continue.
  let sortedDates = Object.keys(dateToCountryOSPageloadData);
  sortedDates.sort();
  for (let datestamp of sortedDates) {
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=1414839#c19 for
    // parameter details
    let totalNormalizedPageloads = 0.0;

    // Preprocess to sum all normalized_pageloads for included rows
    for (let country in dateToCountryOSPageloadData[datestamp]) {
      for (let os in dateToCountryOSPageloadData[datestamp][country]) {
        if (includeInHttpsAnalysis(os, country)) {
          let row = dateToCountryOSPageloadData[datestamp][country][os];
          totalNormalizedPageloads += parseFloat(row.normalized_pageloads);
        }
      }
    }

    // Now derive the reporting ratio and secure pageload ratio
    let totalSecurePageloadRatio = 0.0;

    for (let country in dateToCountryOSPageloadData[datestamp]) {
      for (let os in dateToCountryOSPageloadData[datestamp][country]) {
        if (includeInHttpsAnalysis(os, country)) {
          let row = dateToCountryOSPageloadData[datestamp][country][os];
          let dimensionNormalizedPageloads = parseFloat(row.normalized_pageloads)
                                               / totalNormalizedPageloads;
          totalSecurePageloadRatio += parseFloat(row.ratio)
                                         * dimensionNormalizedPageloads;
        }
      }
    }

    let securePageloadPercentage = movingAvg(stackMovingAverage,
                                             totalSecurePageloadRatio * 100);
    insertPoint(traceObj, datestamp, securePageloadPercentage);
  }
}

function historicalHttpsCsvListener(responseText) {
  parse_delim(responseText, ',', function(row){
    let datestamp = row[0];
    let pageloads = row[1];
    if (!dateFormat.test(datestamp)) {
      return;
    }

    gHttpsData.dateToHistoricalPageloadData[datestamp] = pageloads;
  });
}

function importHistoricalGlobalData(traceObj, stackMovingAvg) {
  let sortedDates = Object.keys(gHttpsData.dateToHistoricalPageloadData);
  sortedDates.sort();
  for (let datestamp of sortedDates) {
    let pageloadPercent = gHttpsData.dateToHistoricalPageloadData[datestamp];
    let securePageloadPercentage = movingAvg(stackMovingAvg,
                                             pageloadPercent);
    insertPoint(traceObj, datestamp, securePageloadPercentage);
  }
}

let leBlue = '#103a71';
let leOrange = '#ffa409';
let someGreen = '#2ca02c';

// Firefox telemetry (HTTP_PAGELOAD_IS_SSL) over time
function httpsPlot() {
  let traces = [];

  {
    let traceObj = { type: "scatter", x:[], y:[], name: "All users", line: { color: leBlue } }
    let stackMovingAvg = [];
    importHistoricalGlobalData(traceObj, stackMovingAvg);
    httpsDerivePageloadsFromNormalizedData(traceObj, () => {
      return true;
    }, stackMovingAvg);
    traces.push(traceObj);
  }
  {
    let traceObj = { type: "scatter", x:[], y:[], name: "USA users", line: { color: leOrange, dash: 'dot' } }
    httpsDerivePageloadsFromNormalizedData(traceObj, (os, country) => {
      return (country == "US");
    });
    traces.push(traceObj);
  }
  {
    let traceObj = { type: "scatter", x:[], y:[], name: "Japan users", line: { color: someGreen, dash: 'dash' } }
    httpsDerivePageloadsFromNormalizedData(traceObj, (os, country) => {
      return (country == "JP");
    });
    traces.push(traceObj);
  }

  let layout = {
    margin: { t: 20 },
    yaxis: {
      title: 'Percent of Pageloads over HTTPS (14 day moving average)',
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
  let pageloadPercent = document.getElementById('pageloadPercent');
  if (pageloadPercent) {
    Plotly.plot(pageloadPercent, traces, layout);
  }
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", tsvListener);
oReq.open("GET", "/js/cert-timeline.tsv");
oReq.send();

var currentHttpsReqPromise = fetch("/js/current-https-adoption.csv")
.then((response) => {
  return response.text();
}).then((text) => {
  httpsCsvListener(text);
});

var historicalHttpsReqPromise = fetch("/js/historical-https-adoption.csv")
.then((response) => {
  return response.text();
}).then((text) => {
  historicalHttpsCsvListener(text);
});

// We shouldn't try to plot HTTPS until both the current and historical fetches
// are completed
Promise.all([currentHttpsReqPromise, historicalHttpsReqPromise])
.then(() => {
  if (document.readyState === "complete") {
    httpsPlot();
  } else {
    window.addEventListener("load", httpsPlot);
  }
});
