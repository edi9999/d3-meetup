var planning=document.getElementById('planning')
var svgContainer=d3.select(planning)

// DATA

var phases=[
    {id:0,weekStartNumber:0,weekEndNumber:2,name:"Commencer la démo"},
    {id:1,weekStartNumber:2,weekEndNumber:5,name:"Installer Browser-sync"},
    {id:2,weekStartNumber:4,weekEndNumber:8,name:"Faire des slides"},
    {id:3,weekStartNumber:5,weekEndNumber:8,name:"Préparer le meetup"},
];

var xScale=d3.scale.linear()
    .domain([0,10])
    .range([0,400]);

var yScale=d3.scale.linear()
    .domain([0,10])
    .range([0,400]);

updatePositions=function (element) {
    element.style({fill:"blue"})
    element.attr("x",function(d){
        return xScale(d.weekStartNumber);
    })
    .attr("y",function(d,i){
        return yScale(i);
    })
    .attr("width",function(d){
        return Math.abs(xScale(d.weekEndNumber-d.weekStartNumber));
    })
    .attr("height",yScale(1))
    .attr("transform","")
    .style({fill:"blue"})
}

var coordsStart=[]
var moveX=0;

var move=function(phase,moveX){
    mX=Math.round(yScale.invert(moveX))
    phase.weekStartNumber+=mX;
    phase.weekEndNumber+=mX;
}

var drag = d3.behavior.drag()
    .on("dragstart", function() {
        coordsStart=d3.mouse(planning)
    })
    .on("dragend",function (phase) {
        move(phase,moveX)
        draw()
    })
    .on("drag",function () {
        var el=d3.select(this)
        var coords=d3.mouse(planning)
        moveX=coords[0]-coordsStart[0];
        el
            .attr("transform","translate("+moveX+","+0+")")
    });

draw=function () {
    var phasesSelection=svgContainer.selectAll("rect")
        .data(phases);

    phasesSelection
        .enter() // just the ones that are not in the dom
        .append("rect")
        .call(updatePositions)

    phasesSelection
        .call(drag)
        .transition()
        .duration(400)
        .call(updatePositions)

    phasesSelection.exit().transition().duration(300)
        .attr("width",0)
        .remove()
}

draw();

moveAround=function () {
    phases[0].weekStartNumber++;
    phases[1].weekStartNumber--;
    phases[2].weekStartNumber++;
    phases[3].weekStartNumber--;
    draw();
}

removeAll=function(){
    phases=[];
    draw();
}
