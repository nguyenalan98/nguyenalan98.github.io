//draws the wine bottle
function drawBottle (){
    let bottle = d3.select("svg#bottle");
    bottle.append("rect").attr("id","fill").attr("x",45).attr("y",565).attr("width",25).attr("height",150).attr("fill","rgb(92, 14, 14)").attr("stroke","none").attr("transform","rotate(-90,140,600)").attr("rx",20).attr("ry",20);
    bottle.append("rect").attr("id","label").attr("x",120).attr("y",350).attr("height",250).attr("width",120).attr("fill","white").attr("stroke","black").attr("stroke-width",3);
    bottle.append('svg').attr('id','digitBox').attr('x',120).attr('y',350).attr("height",200).attr("width",120);
    bottle.append("text").attr("x",180).attr("y",500).text("Servings").attr('class', 'labelText');
    bottle.append("text").attr("x",180).attr("y",530).text("Per Capita").attr('class', 'labelText');
    bottle.append("text").attr("x",180).attr("y",560).text("Per Year").attr('class', 'labelText');
}

//draws the grapevine
function drawVine(){
  d3.selectAll(".branch").attr("transform","translate(100)");
  d3.selectAll(".vine").attr("transform","translate(100)");
  d3.selectAll(".tip").attr("transform","translate(100)");
  d3.selectAll(".stick").attr("transform","translate(100)");
  let vine = d3.select("#grapevine");

//draws the grapes on the grapevine
  function drawGrapes(x,y,rank,id){
      let grapes = vine.append("g").attr("class","grapeCluster").attr("width",18).attr("height",18).attr("transform","translate("+ x + "," + y + ")").attr("rank",rank).attr("id",id);
      grapes.append("circle").attr("cx",0).attr("cy",0).attr("r", 6).attr("fill","purple").attr("class","grape")
      grapes.append("circle").attr("cx",7).attr("cy",0).attr("r", 6).attr("fill","purple").attr("class","grape");
      grapes.append("circle").attr("cx",-7).attr("cy",0).attr("r", 6).attr("fill","purple").attr("class","grape");

      grapes.append("circle").attr("cx",-3.5).attr("cy",6).attr("r", 6).attr("fill","purple").attr("class","grape");
      grapes.append("circle").attr("cx",3.5).attr("cy",6).attr("r", 6).attr("fill","purple").attr("class","grape");

      grapes.append("circle").attr("cx",0).attr("cy",12).attr("r", 6).attr("fill","purple").attr("class","grape");
  }

  //information on where to draw the grapeclusters and attaches names of the top countries
  let grapeClusterMetaData = [{x:38,y:650,rank:10,id:"Portugal"},{x:104,y:590,rank:9,id:"Chile"},{x:28,y:520,rank:8,id:"South Africa"},{x:97.5,y:485,rank:7,id:"Germany"},
  {x:33,y:422.5,rank:6,id:"Australia"},{x:91,y:338,rank:5,id:"Argentina"},{x:34,y:260,rank:4,id:"Spain"},{x:91,y:182,rank:3,id:"US"},
  {x:32.5,y:97.5,rank:2,id:"Italy"},{x:88,y:61,rank:1,id:"France"}];

//forEach loop to draw all the grapes from metadata
  grapeClusterMetaData.forEach(function(d){
      drawGrapes(d.x+100,d.y,d.rank,d.id);
      if(d.rank%2 === 1){
        vine.append("text").text(d.id).attr("x",d.x+115).attr("y",d.y+10).attr("class","grapeLabelsLeft");
      }
      else{
        vine.append("text").text(d.id).attr("x",d.x+85).attr("y",d.y+10).attr("class","grapeLabelsRight");
      }
    })
}

//draws the slider for happiness and appends the smiley/text
function drawSlider()
{
  const margin = { top: 25, bottom: 25, right: 25, left: 25 };
  const svg2 = d3.select("svg#happiness");
  const happinessSlider = svg2.append("g").attr('id', 'happinessSlider')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  happinessSlider.append("text")
    .attr("x", 15)
    .attr("y", 0)
    .style("font-family","Avenir, sans-serif")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "green")
    .text("Happiness Rating: ");
  happinessSlider.append("path")
    .attr('id', 'happySmile')
    .attr('d', 'M 440 25 L 450 25')
    .style("fill", "none")
    .style("stroke", "gray");
  happinessSlider.append("line")
    .attr('x1', 15)
    .attr('x2', 415)
    .attr('y1', 25)
    .attr('y2', 25)
    .style("stroke", "rgb(99, 54, 10)")
    .style("stroke-width", 1);
    happinessSlider.append("circle")
    .attr('cx', 445)
    .attr('cy', 18)
    .attr('r', 20)
    .style("fill", "none")
    .style("stroke", "gray");
  happinessSlider.append("circle")
    .attr('cx', 435)
    .attr('cy', 17)
    .attr('r', 1)
    .style("stroke", "gray");
  happinessSlider.append("circle")
    .attr('cx', 455)
    .attr('cy', 17)
    .attr('r', 1)
    .style("stroke", "gray");

  let grapeSlider = happinessSlider.append("g").attr("id", "slider");
  grapeSlider.append("circle").attr('cx', 8).attr('cy', 18).attr('r', 5).style("fill", "purple").style("stroke", "rgb(61, 8, 122)");
  grapeSlider.append("circle").attr('cx', 15).attr('cy', 18).attr('r', 5).style("fill", "purple").style("stroke", "rgb(61, 8, 122)");
  grapeSlider.append("circle").attr('cx', 22).attr('cy', 18).attr('r', 5).style("fill", "purple").style("stroke", "rgb(61, 8, 122)");
  grapeSlider.append("circle").attr('cx', 11).attr('cy', 25).attr('r', 5).style("fill", "purple").style("stroke", "rgb(61, 8, 122)");
  grapeSlider.append("circle").attr('cx', 19).attr('cy', 25).attr('r', 5).style("fill", "purple").style("stroke", "rgb(61, 8, 122)");
  grapeSlider.append("circle").attr('cx', 15).attr('cy', 32).attr('r', 5).style("fill", "purple").style("stroke", "rgb(61, 8, 122)");
  grapeSlider.append("line").attr('x1', 15).attr('x2', 15).attr('y1', 5).attr('y2', 14).style("stroke", "green").style("stroke-width", "4px");
}

//draws the cluster of grapes in center of screen that show top 10 wine varietals
function drawVarietalCluster()
{
  const grapesPlot = d3.select("svg#grapes").append("g")
    .attr('id', 'grapesPlot')
    .attr("transform", "translate(" + 80 + "," + 80 + ")");

  grapesPlot.append("text")
  .attr("id", "starter-text")
  .attr("x", 0)
  .attr("y", 100)
  .style("font-family","Avenir, sans-serif")
  .style("font-size", "36px")
  .style("font-weight", "bold")
  .style("text-align", "center")
  .style("fill", "purple")
  .text("Choose a Country!");

}
