/*global Plotly*/
function doPlot() {

  // stats.js is used by stats.md to download graph data from the webserver,
  // and then display it using plotly.js.

  var numFormat = /\d+/;
  var dateFormat = /\d{4}-\d{2}-\d{2}/;

  var gHttpsData = { countryList: [], osList: [], dateToCountryOSPageloadData: {},
                    dateToHistoricalPageloadData: {} };

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
    Plotly.plot(dom, traces, layout);
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
    Plotly.plot(dom, traces, layout);
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
    Plotly.plot(dom, traces, layout);
  }

  function httpsCsvListener(responseText) {
    let countries = {};
    let operatingSystems = {};
    let dateToCountryOSPageloadData = {};

    parse_delim(responseText, ",", function(row){
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
    parse_delim(responseText, ",", function(row){
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

  let leBlue = "#103a71";
  let leOrange = "#ffa409";
  let someGreen = "#2ca02c";

  // Firefox telemetry (HTTP_PAGELOAD_IS_SSL) over time
  function httpsPlot(dom) {

    let traces = [];

    {
      let traceObj = { type: "scatter", x:[], y:[], name: loc.all_users, line: { color: leBlue } };
      let stackMovingAvg = [];
      importHistoricalGlobalData(traceObj, stackMovingAvg);
      httpsDerivePageloadsFromNormalizedData(traceObj, () => {
        return true;
      }, stackMovingAvg);
      traces.push(traceObj);
    }
    {
      let traceObj = { type: "scatter", x:[], y:[], name: loc.usa_users, line: { color: leOrange, dash: "dot" } };
      httpsDerivePageloadsFromNormalizedData(traceObj, (os, country) => {
        return (country == "US");
      });
      traces.push(traceObj);
    }
    {
      let traceObj = { type: "scatter", x:[], y:[], name: loc.japan_users, line: { color: someGreen, dash: "dash" } };
      httpsDerivePageloadsFromNormalizedData(traceObj, (os, country) => {
        return (country == "JP");
      });
      traces.push(traceObj);
    }

    let layout = {
      margin: { t: 20 },
      yaxis: {
        title: loc.percent_https,
        rangemode: "tozero",
        ticksuffix: "%"
      },
      legend: {
        xanchor: "left",
        yanchor: "top",
        x: 0,
        y: 1
      }
    };
    Plotly.plot(dom, traces, layout);
  }

  var path;
  if ( location.hostname === "letsencrypt.org" ) {
    path = "https://d4twhgtvn0ff5.cloudfront.net/";
  } else {
    path = "/js/"; // in dev, will use old data.
  }

  fetch(path+"cert-timeline.tsv")
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
    const currentHttpsReqPromise = fetch(path+"current-https-adoption.csv")
    .then(response => {
      return response.text();
    }).then(httpsCsvListener);

    const historicalHttpsReqPromise = fetch(path+"historical-https-adoption.csv")
    .then(response => {
      return response.text();
    }).then(historicalHttpsCsvListener);

    // We shouldn't try to plot HTTPS until both the current and historical fetches
    // are completed
    Promise.all([currentHttpsReqPromise, historicalHttpsReqPromise])
    .then(function(){
      pageloadPercent.innerHTML = ""; // remove waiting
      httpsPlot(pageloadPercent);
    });
  }
}

if (document.readyState === "complete") {
  doPlot();
} else {
  window.addEventListener("load", doPlot);
}
