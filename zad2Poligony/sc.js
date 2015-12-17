function clear() {
    	
    	
}
function myFunction() {
	svg.selectAll("*").remove();
	arrayOfPolygons = [];
		}

/*Zwyklu punkt 2d*/
function Point2d(x, y) {
	this.x = x;
	this.y = y;
}
Point2d.prototype =
	{
		toString : function()
		{
			return this.x + " " + this.y;
			
		}
		
	}
/*Polygon*/
function Polygon(id)
{
this.m_id=id;	
this.m_points=new Array();
this.m_size=0;
}

var arrayOfPolygons = new Array();
Polygon.prototype =
	{
		
		addPoint : function(point)
		{
			this.m_points.push(point);
			this.m_size ++;
			console.log(this.m_id);
		},
		create : function()
		{
			arrayOfPolygons.push(this);
			
			svg.selectAll("polygon")
		    .data(arrayOfPolygons)
		  .enter().append("polygon")
		  .attr("points",function(d) { 
	          return d.m_points.map(function(d) { return [d.x,d.y].join(","); }).join(" ");})
	      .attr("stroke","white")
	      .attr("stroke-width",2)
		  .attr("fill","none");
			
		}
	};

    var svg = d3.select(".implementation");
    var polyArray = new Array();
   var polygonCounter=0;
    
   polyArray.push(new Polygon(polygonCounter));
   
    function drawCircle(x, y, size) {
        console.log('Drawing circle at', x, y, 2);
        svg.append("circle")
            .attr('class', 'click-circle')
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 1);
        polyArray[polygonCounter].addPoint(new Point2d(x, y));
        
    }
    
    svg.on('click', function() {
        var coords = d3.mouse(this);
        console.log(coords);
        drawCircle(coords[0], coords[1], 2);
    });
    $(document).keypress(function(event){
       console.log(event.which);
    	switch(event.which)
    	{
    	
    	case 99 : //klawisz C
    		console.log(polygonCounter);
	    	polyArray[polygonCounter].create();
	    	polygonCounter++;
	    	polyArray.push(new Polygon(polygonCounter));
    	break;
    	}
        
        
     });

