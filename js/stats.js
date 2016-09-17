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

function insertPoint(trace, x, y) {
  if (/\d+/.exec(y)) {
    trace.x.push(x);
    trace.y.push(y);
  }
}

function tsvListener() {
  timeline = document.getElementById('timeline');

  tIssued = { type: "scatter", name: "Issued", x:[], y:[],
              yaxis: 'y2', fill: "tozeroy", showlegend: false,
              line: { color: '#2a7ae2' } }
  tActive = { type: "scatter", name: "Certificates Active", x:[], y:[] }
  tFqdn = { type: "scatter", name: "Fully-Qualified Domains Active", x:[], y:[] }
  tRegDom = { type: "scatter", name: "Registered Domains Active", x:[], y:[],
              marker: { symbol: "diamond" } }

  dateFormat = /\d{4}-\d{2}-\d{2}/;
  numFormat = /\d+/;

  parse_tsv(this.responseText.trim(), function(row){
    if (!dateFormat.exec(row[0])) {
      return;
    }

    insertPoint(tIssued, row[0], row[1]);
    insertPoint(tActive, row[0], row[2]);
    insertPoint(tFqdn, row[0], row[3]);
    insertPoint(tRegDom, row[0], row[4]);
  });

  traces = [ tActive, tFqdn, tRegDom, tIssued ];
  layout = {
    margin: { t: 0 },
    yaxis: {title: 'Active Count'},
    yaxis2: {
      title: 'Issued Per Day',
      titlefont: {color: '#2a7ae2'},
      tickfont: {color: '#2a7ae2'},
      overlaying: 'y',
      side: 'right',
      showgrid: false
    },
    legend: {
      xanchor:"left",
      yanchor:"top",
      x:0,
      y:1
    }
  }

  Plotly.plot( timeline, traces, layout);
}

window.onload = function () {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", tsvListener);
  oReq.open("GET", "/js/graphdata.tsv");
  oReq.send();
}