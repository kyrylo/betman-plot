(function() {
  var countOwnGoals = function(results) {
    var i, total, len, score, cur;
    var $winOrLose;

    i = total = 0;
    len = results.length;

    do {
      cur = results.eq(i);
      score = cur.find('.score').text().split(' : ').map(Number);
      $winOrLose = cur.find('.winLoseIcon').find('a');

      if ($winOrLose.hasClass('form-l'))
        total += Math.min.apply(this, score);
      else if ($winOrLose.hasClass('form-w'))
        total += Math.max.apply(this, score);
      else
        total += score[0];
    } while (i++ < len);

    return total;
  };

  var sumAllGoals = function(upto) {
    var goals;

    return ['.h2h_home', '.h2h_away'].reduce(function(pv, cv) {
      goals = countOwnGoals($(cv).first().find('.highlight').slice(0, upto));
      return pv + goals;
    }, 0);
  };

  var plot = function(limit) {
    var win, html, coords;

    coords = [];
    win = window.open();

    for (var i = 1; i <= limit; i++)
      coords.push([i, sumAllGoals(i)/(2*i)]);

    html = '<!docftype html><html><head><link rel=\'stylesheet\' href=\'http://www.flotcharts.org/css/demo.css\' type=\'text/css\'></link><style>#placeholder{height: 680px;}</style><script src=\'http://www.flotcharts.org/javascript/jquery.min.js\'></script><script src=\'http://www.flotcharts.org/javascript/jquery.flot.min.js\'></script><script>' +
      '$(function(){ $.plot(\'#placeholder\', [{label: \'Коэффициент\', lineHeight:130, data: ' + JSON.stringify(coords) + '}], {xaxis: {tickSize: 1, tickDecimals: 0}, yaxis: {tickSize:0.1,tickDecimals: 2}, series: {points: {show:true}, lines:{show:true}}, grid:{hoverable: true}}  )})' +
      '</script></head><body><div id=\'placeholder\' class=\'demo-placeholder\'></div></body></html>';

    win.document.write(html);
    win.document.close();
  };

  plot(20);
})();
