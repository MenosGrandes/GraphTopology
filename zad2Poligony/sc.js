$("#clear").click(
function()
{
	d3.select("svg").selectAll("*").remove();
	Lines=[];
});

$("#dsl").click(
		function()
		{
			
			sweep();
		});


function sortLines(lines)
{
	lines.sort(
			function(a,b)
			{
				return a.start.x - b.start.x;
			});
	
}
function sweep()
{
    for(var i=0;i<Lines.length;i++)
    	{
	lineD3 = vis.append("line")
    .attr("x1", Lines[i].start.x)
    .attr("y1", 0)
    .attr("x2", Lines[i].start.x)
    .attr("y2", 800)
    .attr("class", "lineSweepStart");

	lineD3 = vis.append("line")
    .attr("x1", Lines[i].end.x)
    .attr("y1", 0)
    .attr("x2", Lines[i].end.x)
    .attr("y2", 800)
    .attr("class", "lineSweepEnd");
////////////////////////////////////////
	lineD3 = vis.append("line")
    .attr("x1", Lines[i].start.x)
    .attr("y1", Lines[i].start.y)
    .attr("x2", Lines[i].end.x)
    .attr("y2", Lines[i].start.y)
    .attr("class", "lineSweepAbove");

	
	lineD3 = vis.append("line")
    .attr("x1", Lines[i].start.x)
    .attr("y1", Lines[i].end.y)
    .attr("x2", Lines[i].end.x)
    .attr("y2", Lines[i].end.y)
    .attr("class", "lineSweepBelow");

	
	
	}
    lineD3=null;
}


function show()
{
sortLines(Lines);
console.log("Lines :");
	for(var i=0;i<Lines.length;i++  )
		{
		console.log("line"+i+" "+Lines[i].toString());
		}
}
function Point2d(x,y)
{
this.x=x;
this.y=y;
}
Point2d.prototype.toString = function()
{

		return this.x + " " + this.y;
	
};
//Point2d.prototype.isBigger= function(point)
//{
//if(this.x >point.x)
//	{
//	return true;
//	}
//
//return false;
//}
function Line(a,b)
{
this.start=a;
this.end=b;
}
Line.prototype.toString = function()
{

		return "Start: "+this.start + " End: " + this.end;
	
};
//Line.prototype.swap = function()
//{
//if(this.start.x > this.end.x)
//	{
//	console.log("swap");
//	var tmp=this.end;
//	this.end=this.start;
//	this.start=tmp;	
//	}
//console.log("swap2");
//
//};
var lineD3;

var Lines = new Array();



function compare(a,b) {
	console.log("Sort : "+a.start.x + " "+b.start.x);

	}



var lineCounter=0;
var vis = d3.select("body").append("svg") 
    .attr("width", 1800)
    .attr("height", 600)
    .attr("align","right")
    .on("mousedown", mousedown)
    .on("mouseup", mouseup);

function mousedown() {
    var m = d3.mouse(this);
    lineD3 = vis.append("line")
        .attr("x1", m[0])
        .attr("y1", m[1])
        .attr("x2", m[0])
        .attr("y2", m[1]);
    
    vis.on("mousemove", mousemove);
}

function mousemove() {
    var m = d3.mouse(this);
    lineD3.attr("x2", m[0])
        .attr("y2", m[1]);
    

}

function mouseup() {
    vis.on("mousemove", null);
    
    var start= new Point2d(lineD3.attr("x1"),lineD3.attr("y1"));
    var end= new Point2d(lineD3.attr("x2"),lineD3.attr("y2"));

//    if(start.isBigger(end))
//    	{
//    	
//    	console.log("Bigger");
//    	}

    
    Lines.push(new Line(start,end));
    //Lines[lineCounter].swap();
    lineCounter++;

}
