function roll(digitBox, target) // Animate serving number on bottle
{
    digitBox.selectAll('text').remove()
    var str_target = target.toString()
    var container_width = digitBox.width
    if(str_target.length == 3)
    {
        var digit_width = Math.round(40- 15)
        var digit_height = 80
        var d1 = digitBox.append('text')
            .attr('id', 'digitOne')
            .attr('x', 5)
            .attr('y', digit_height)
            .attr('class', 'scrollDigitTriplet')
            .text(0);
        var d2 = digitBox.append('text').attr('id', 'digitTwo')
            .attr('x', 40).attr('y', digit_height)
            .attr('class', 'scrollDigitTriplet').text(0);
        var d3 = digitBox.append('text').attr('id', 'digitThree')
            .attr('x', 75).attr('y',digit_height)
            .attr('class', 'scrollDigitTriplet').text(0);
        var d1v = 0;
        var d2v = 0;
        var d3v = 0;
        let timer = setInterval(function() {

            if(d3v != str_target.charAt(2))
            {
                d3v++;
                d3.text(d3v);
            }else if(d2v != str_target.charAt(1))
            {
                d2v++;
                d2.text(d2v);
            }else if(d3v == str_target.charAt(2) && d2v == str_target.charAt(1) && d1v != str_target.charAt(0))
            {
                d1v++;
                d1.text(d1v);
            }else{
                clearInterval(timer);
            }

            return
        },100);
    }else if(str_target.length ==2)
    {
        var digit_width = Math.round(60 - 10)
        var digit_height = 80
        var d1 = digitBox.append('text')
            .attr('id', 'digitOne')
            .attr('x', 10)
            .attr('y', digit_height)
            .attr('class', 'scrollDigitTwin')
            .text(0);
        var d2 = digitBox.append('text').attr('id', 'digitTwo')
            .attr('x', 60) .attr('y', digit_height)
            .attr('class', 'scrollDigitTwin').text(0);

        var d1v = 0;
        var d2v = 0;
        let timer = setInterval(function() {
            if(d2v != str_target.charAt(1))
            {
                d2v++;
                d2.text(d2v);
            }else if(d1v != str_target.charAt(0))
            {
                d1v++;
                d1.text(d1v);
            }else{
                clearInterval(timer);
            }

            return
        },100);
    }else{
        var d1 = digitBox.append('text')
            .attr('id', 'digitOne')
            .attr('x', 60)
            .attr('y', digit_height)
            .attr('class', 'scrollDigit')
            .text(0);

        var d1v = 0;
        let timer = setInterval(function() {
            if(d1v != str_target.charAt(0))
            {
                d1v++;
                d1.text(d1v);
            }else{
                clearInterval(timer);
            }
            return
        },100);
    }
}

// Animate bottle fill
function fillBottle(servings){
    d3.select("#fill").transition().delay(100).duration(500)
      .attr("width",d3.scaleLinear([0,380],[0,400])(servings));
}

//animates the happiness slider
function animateSlider(finalX, country, happ_rating)
{
  var happinessSlider = d3.select('g#happinessSlider')
  var format1 = d3.format(".3n");
  d3.select("#slider").transition().delay(500).duration(500)
    .attr("transform", "translate(" + (finalX - 15) + "," + 0 + ")");
  happinessSlider
    .append("text")
      .attr("id", country.replace(/[ _\-,.:'#!\?]/g,"") + "text" + "happ")
      .attr("x", 175)
      .attr("y", 0);

  happinessSlider
    .append("line")
      .attr("id", country.replace(/[ _\-,.:'#!\?]/g,"") + "text")
      .attr('x1', finalX)
      .attr('x2', finalX)
      .attr('y1', 20)
      .attr('y2', 50)
  happinessSlider
    .append("text")
      .attr("id", country.replace(/[ _\-,.:'#!\?]/g,"") + "text")
      .attr("x", finalX)
      .attr("y", 60)
      .style("font-family","Avenir, sans-serif")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "green");
  d3.select("text#" + country.replace(/[ _\-,.:'#!\?]/g,"") + "texthapp").transition().delay(200)
    .text(format1(happ_rating)).attr('class','happinessRatingText');
}


//sets the top 10 varietals and relevant information
function grapeSetter(countryData) {
  d3.select("#starter-text").remove();
  d3.select("svg#varietalContainer")
    .append('text').attr('class', 'varietalHeaderText').
    attr('x',250).attr('y',190).text("Top 10 Varietals");

  var grapesPlot = d3.select('g#grapesPlot');
  let grapesCoordinates = [
      [50, 50],
      [130, 50],
      [210, 50],
      [280, 50],
      [100, 120],
      [170, 120],
      [240, 120],
      [135, 190],
      [205, 190],
      [160, 260]
  ];
  var counter = 0;
  var format2 = d3.format(".4n");
  countryData.forEach(function(d,i) {

    grapesPlot.append("path")
      .attr('d', 'M 170 25 L 180 -20 L 220 -40')
      .style("stroke", "green")
      .style("stroke-width", "10px")
      .style("fill", "none");
    grapesPlot.append("circle")
      .attr("id", "varGrape")
      .attr("cx", grapesCoordinates[counter][0])
      .attr("cy", grapesCoordinates[counter][1])
      .attr("r", 50)
      .style("fill", "purple")
      .style("stroke", "rgb(61, 8, 122)")
      .on("mouseover", function() {
        d3.select(this)
          .transition().duration(250)
          .style("fill", "#561a47");
        var textBox = grapesPlot.append("g").attr("id", "info");
        var rank = i + 1;
        textBox.append("text")
          .attr("id", d[1].replace(/[ _\-,.:'#!\?]/g,""))
          .attr("x", 170)
          .attr("y", 410)
          .attr("text-anchor", "middle")
          .style("fill", "#48034f")
          .style("font-family","Avenir, sans-serif")
          .style("font-size", "21px")
          .text("#" + rank + ": " + d[1])
        textBox.append("text")
          .attr("id", ("c" + d[0]).replace(/./g))
          .attr("x", 170)
          .attr("y", 440)
          .attr("text-anchor", "middle")
          .style("fill", "green")
          .style("font-family","Avenir, sans-serif")
          .style("font-size", "21px")
          .text(format2(d[0])+' Average Points')

        // Create display box for varietal information
        let boxDim = [0, 342, 350, 475];  //xL, xR, yT, yB
        textBox.append("line")
          .attr("id", "box")
          .attr("x1", boxDim[0])
          .attr("x2", boxDim[1])
          .attr("y1", boxDim[2])
          .attr("y2", boxDim[2])
        textBox.append("line").attr("id", "box").attr("x1", boxDim[0])
          .attr("x2", boxDim[1]).attr("y1", boxDim[3]).attr("y2", boxDim[3])

        textBox.append("line").attr("id", "box").attr("x1", boxDim[0])
          .attr("x2", boxDim[0]).attr("y1", boxDim[2]).attr("y2", boxDim[3])

        textBox.append("line").attr("id", "box").attr("x1", boxDim[1])
          .attr("x2", boxDim[1]).attr("y1", boxDim[2]).attr("y2", boxDim[3])

        d3.selectAll("#box")
          .style("stroke", "gray")
          .style("stroke-width", "1px")
        })
      .on("mouseout", function() {

        d3.select(this)
          .transition().duration(250)
          .style("fill", "purple")

        d3.select("#" + d[1].replace(/[ _\-,.:'#!\?]/g,"")).remove();
        d3.select("#" + ("c" + d[0]).replace(/./g)).remove();
        d3.selectAll("#box").remove();
        });

      counter += 1;
  })
}

//creating the different smiley faces
function dataReturn(name) {
  if (name == 'sadFace') { // sad
    return [
      [435, 30],
      [440, 24],
      [450, 24],
      [455, 30]
    ];
  }
  else if (name == 'straightSmile') { // straightSm
    return [
      [435, 27],
      [455, 27]
    ];
  }
  else if (name == 'softSmile') { // softSmile
    return [
      [435, 25],
      [440, 28],
      [450, 28],
      [455, 25]
    ];
  }
  else if (name == 'regularSmile') { // regSmile
    return [
      [435, 25],
      [440, 30],
      [450, 30],
      [455, 25]
    ];
  }
  else { // happySmile
    return [
      [430, 24],
      [438, 31],
      [452, 31],
      [460, 24]
    ];
  }
}

function smileScale(happiness) {
  if (happiness >= 4 && happiness <= 5) {
    return 'sadFace';
  }
  else if (happiness > 5 && happiness <= 6) {
    return 'straightSmile';
  }
  else if (happiness > 6 && happiness <= 6.5) {
    return 'softSmile';
  }
  else if (happiness > 6.5 && happiness <= 7) {
    return 'regularSmile';
  }
  else {
    return 'happySmile';
  }
}

var lastCountry = "";
function countryFinder(country, data) {
  var idd = lastCountry.replace(/[ _\-,.:'#!\?]/g,"") + "text";
  d3.select("text#" + idd).transition().delay(500).remove();
  d3.select("line#" + idd).transition().delay(500).remove();
  d3.select("text#" + idd + "happ").remove();

  var happinessScale = d3.scaleLinear().domain([4, 8]).range([15, 415]);
  Object.entries(data).forEach(function(d) {
  if (d[0] == country) {
    animateSlider(happinessScale(d[1].happiness_rating), country, d[1].happiness_rating);
    var smiletype = smileScale(d[1].happiness_rating);
    d3.select('path#happySmile')
      .attr('d', d3.line().curve(d3.curveCardinal)(dataReturn(smiletype)));
    grapeSetter(d[1].data.top_varietals);
    lastCountry = country;
  }
  });
}

// action for cluster  click
function clickClusterButtons(id, data)
{
  countryFinder(id, data);
  let servings = data[id]['consumption']['servings'];
  fillBottle(d3.scaleLinear([0,400],[0,400])(servings));
  roll(d3.select('svg#digitBox'), servings);

  d3.select("#title").text(id);
  d3.select("#description").remove();
}

// Full page animation anchors
function animate(data)
{
  d3.selectAll(".grapeCluster")
    .on("mouseover",function(d){
      d3.select(this).style("cursor","pointer");
      d3.select(this).selectAll(".grape").attr("fill","rgb(169,201,114)");
    })
    .on("mouseout",function(d){
      d3.select(this).selectAll(".grape").attr("fill","purple");
    })
    .on("click", function(){clickClusterButtons(this.id, data)}) ;

}
