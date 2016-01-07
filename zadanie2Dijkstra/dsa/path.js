///////////////////
 /*
function binaryHeap() {
	this.nodes = [];
}

binaryHeap.prototype.size = function() {
	return this.nodes.length;
};

binaryHeap.prototype.compare = function(node1, node2) {
	return node1.priority - node2.priority;
};
binaryHeap.prototype.insert_push = function(element) {
	this.nodes.push(element);
	this.bubbleUp(this.nodes.length - 1);
};

binaryHeap.prototype.remove_pop = function() {
	var ans = this.nodes[0];
	var last_element = this.nodes.pop();

	if (this.nodes.length > 0) {
		this.nodes[0] = last_element;
		this.sinkDown(0);
	}
	return ans;
};

binaryHeap.prototype.delete_node = function(node) {
	var length = this.nodes.length;
	isPresent = false;
	for (var i = 0; i < length; i++) {
		if ((this.nodes[i].content != node))
			continue;
		var end = this.nodes.pop();
		if (i == length - 1)
			break;
		this.nodes[i] = end;
		this.bubbleUp(i);
		this.sinkDown(i);
		isPresent = true;
		break;
	}
	return isPresent;
};

binaryHeap.prototype.top = function() {
	return this.nodes[0];
};

binaryHeap.prototype.sinkDown = function(i) {
	var length = this.nodes.length;
	while (true && i < length) {
		var flag = 0;
		if (2 * i + 1 < length
				&& this.compare(this.nodes[i], this.nodes[2 * i + 1]) > 0) {
			if (2 * i + 2 < length
					&& this.compare(this.nodes[2 * i + 1],
							this.nodes[2 * i + 2]) > 0) {
				flag = 2;
			} else {
				flag = 1;
			}
		} else if (2 * i + 2 < length
				&& this.compare(this.nodes[i], this.nodes[2 * i + 2]) > 0) {
			flag = 2;
		} else {
			break;
		}
		var temp = this.nodes[2 * i + flag];
		this.nodes[2 * i + flag] = this.nodes[i];
		this.nodes[i] = temp;
		i = 2 * i + flag;
	}
};

binaryHeap.prototype.bubbleUp = function(i) {

	var length = this.nodes.length;
	while (i > 0) {
		var index = Math.floor((i + 1) / 2) - 1;
		if (this.compare(this.nodes[i], this.nodes[index]) < 0) {
			var temp = this.nodes[index];
			this.nodes[index] = this.nodes[i];
			this.nodes[i] = temp;
			i = index;
		} else {
			break;
		}

	}
};

// //////////////////
function MinPQ(list) {

	bh = new binaryHeap();
	this.heap = bh;
}

MinPQ.prototype.push = function(node, priority) {
	var temp = new MinPQNodes(node, priority);
	this.heap.insert_push(temp);
};

MinPQ.prototype.pop = function() {
	return this.heap.remove_pop().content;
};

MinPQ.prototype.remove = function(node) {
	return this.heap.delete_node(node);
};

MinPQ.prototype.top = function() {
	return this.heap.top().content;
};
MinPQ.prototype.size = function() {
	return this.heap.size();
};

function MinPQNodes(content, priority) {
	this.content = content;
	this.priority = priority;
}
// //////////////////////////////////////////////
*/











function EuclideanDistance(first, second) {
	return Math.sqrt(Math.pow((first.x - second.x), 2)+ Math.pow((first.y - second.y), 2));
}

/* Zwyklu punkt 2d */
function Point2d(x, y) {
	this.x = x;
	this.y = y;
}
Point2d.prototype = {
	toString : function() {
		return this.x + " " + this.y;

	}

}
/*
 * Edge ma : swoj id koszt przejscia wierzcholek z ktorego ma isc wierzcholek do
 * ktorego ma isc
 */

function Edge(id, from, to) {
	this.m_id = id;
	this.m_cost = 0;
	this.m_from = from;
	this.m_to = to;

}

Edge.prototype = {
	constructor : Edge,
	/*
	 * funckja zwracajaca vierzcholek do ktorego ma sie udac z wierzcholka
	 * przekazanego do funkcji
	 */
	getVertex : function(vert) {
		if (this.m_from != null && this.m_from.m_id == vert.m_id) {
			return this.m_to;
		} else {
			return this.m_from;
		}
	}

}
/*
 * Vertex ktory ma: pozycje czy zostal odwiedzony liste sasiadow element
 * poprzedzajacy, takieg jego ojca czy jest elementem szukanym czy jest
 * elementem od ktorego zaczynamy szukanie swoj id
 */
function Vertex(position, id) {
	this.m_neighbors = new Array();

	this.m_visited = false;

	this.m_start = false;
	this.m_end = false;

	this.m_ancestor = null;

	this.m_position = position;

	this.m_selected = false;

	this.m_id = id;

	this.m_distance = 0;
	this.m_distance2 = 0;
	
}

Vertex.prototype = {

	m_position : new Point2d(0, 0),
	constructor : Vertex,
	/* Dodaj polaczenie miedzy wierzcholkami */
	addEdge : function(edge) {
		/*
		 * Poniewaz kazdy wezel moze miec tylko 4 polaczenia sprawdzaj czy nie
		 * dodajesz za duzo
		 */
		if (this.m_neighbors.length < 4) {
			this.m_neighbors.push(edge);

		}

	},
	/**/
	checkEdge : function(vert) {
		var ret = false;
		for (var i = 0; i < this.m_neighbors.length; i++) {
			if (this.m_neighbors[i] != null
					&& (this.m_neighbors[i].m_to.m_id == vert.m_id || this.m_neighbors[i].m_from.m_id == vert.m_id)) {
				ret = true;
			}
		}
		return ret;
	},
	connectVertices : function(vert) {

		if (!this.checkEdge(vert) && !vert.checkEdge(this)) {
			var edge = new Edge("e" + this.m_id + "_" + vert.m_id, this, vert);
			this.addEdge(edge);
			vert.addEdge(edge);
			edge.m_cost = EuclideanDistance(this.m_position, vert.m_position);
			return edge;
		}
		return null;
	},
	findEdge : function(to) {

		for (var i = 0; i < this.m_neighbors.length; i++) {
			if (this.m_neighbors[i] != null
					&& (this.m_neighbors[i].m_to.m_id == to.m_id || this.m_neighbors[i].m_from.m_id == to.m_id)) {
				return this.m_neighbors[i];
			}
		}
		return null;
	}

}
//function changeProb(value)
//{
//	probabilityofEdge=value;
//	alert("asdasd");
//}


/* Prawdopodobienstwo wystapienia krawedzi */
var probabilityofEdge = 1;
/* Rozdzielczosc calego obrazka rysowanego */
var drawWidth = 900;/* szerokosc */
var drawHeight = 650;/* wysokosc */

/* Ilosc elementow do narysowania */
var vertWidth = 20;/* W szerz */

var vertHeight = 20;/* w zdluż */

/* Tablica vertexow, czyli kazdego punktu ktory przeszukujemy */
var vertices = new Array();
/* Tablice polaczen, Edge */
var edges = new Array();
/* Inicjalizacja vertexow, tam jest *30+16 żeby jes troche od siebie poodsuwać */
for (var i = 0; i < vertWidth; i++) {
	for (var j = 0; j < vertHeight; j++) {
		vertices.push(new Vertex(new Point2d(j * 25 + 15, i * 25 + 15), i* vertWidth + j));
	}
}
/* Tworzenie polaczen */

var edgeCount = 0;
for (var i = 0; i < vertWidth; i++) {
	for (var j = 0; j < vertHeight; j++) {
		var curIx = (i * vertHeight) + j;
		var curVertex = vertices[curIx];

		// We really only need to add down and right

		// If we're not at the top row
		// Add a vertex to the upwards
		// NOte - connectVertex checks if we're already connected

		// If not the last row
		// Add down
		if (j < vertHeight - 1) {
			// Add a 75% chance of having an edge, just for fun
			if (Math.random() < probabilityofEdge) {
				var downIx = curIx + 1;
				edges[edgeCount++] = curVertex.connectVertices(vertices[downIx]);

			}
		}

		// If not the last column
		// Add right
		if (i < vertWidth - 1) {
			// Add a 75% chance of having an edge, just for fun
			if (Math.random() < probabilityofEdge) {
				var rightIx = curIx + vertHeight;
				edges[edgeCount++] = curVertex.connectVertices(vertices[rightIx]);

			}
		}
	}
}

console.log("Edges: "+edges.length);

/* Scalowanie do rozmiaru */
var scaleByX = d3.scale.linear().domain([ 0, (vertWidth) * 30 ]).range(
		[ 0, drawWidth ]);

var scaleByY = d3.scale.linear().domain([ 0, (vertHeight) * 30 ]).range(
		[ 0, drawHeight - 50 ]);

/* Tworzenie kwadracikow ktore graficznie przedstawiaja wierzcholki */
var rentangles = d3.select(".implementation").selectAll("rect").data(vertices)
		.enter().append("rect").attr("width", scaleByX(10)).attr("height",
				scaleByX(10)).attr("x", function(d) {
			return scaleByX(d.m_position.x);
		}).attr("y", function(d) {
			return scaleByY(d.m_position.y);
		}).attr("id", function(d) {
			return "vx" + d.m_id;
		}).attr("class", function(d) {
			return d.selected ? "vertex selected" : "vertex";
		});
/* Przeskaluj widok */
var chart = d3.select(".implementation").attr("width", drawWidth).attr(
		"height", drawHeight);
/* Dodaj linie miedzy wezlami, czyli dodaj wszystkie wezly */
var lines = d3.select(".implementation").selectAll("line").data(edges).enter()
		.append("line").attr("x1", function(d) {
			return scaleByX(d.m_from.m_position.x + scaleByX(Math.sqrt(20)));
		}).attr("y1", function(d) {
			return scaleByY(d.m_from.m_position.y + scaleByY(Math.sqrt(20)));
		}).attr("x2", function(d) {
			return scaleByX(d.m_to.m_position.x + scaleByX(Math.sqrt(20)));
		}).attr("y2", function(d) {
			return scaleByY(d.m_to.m_position.y + scaleByY(Math.sqrt(20)));
		}).attr("class", "line").attr("id", function(d) {
			return d.m_id;
		});
/*
 * Dodaj literki oznaczajace koszt przejscia miedzy wezlami var weights =
 * d3.select(".implementation").selectAll(".weight").data(edges).enter()
 * .append("text").attr("x", function(d) { if (d.m_from.m_position.x ==
 * d.m_to.m_position.x) { return
 * scaleByX(d.m_from.m_position.x+scaleByX(Math.sqrt(50))); } else { return
 * scaleByX((d.m_from.m_position.x +
 * d.m_to.m_position.x+scaleByX(Math.sqrt(50))) / 2); } }) .attr("y",
 * function(d) { if (d.m_from.m_position.y == d.m_to.m_position.y) {return
 * scaleByY(d.m_from.m_position.y+scaleByY(Math.sqrt(50))); } else { return
 * scaleByY((d.m_from.m_position.y +
 * d.m_to.m_position.y+scaleByY(Math.sqrt(50))) / 2); } }) .text(function(d) {
 * return d.m_cost; }) .attr("class", "cost");
 */
var startVertex = null;
var endVertex = null;

/*
 * Funkcja wybierajaca punkt poczatkowy i koncowy, poprzez klikniecie myszy
 * używając jQuery
 */
$(".vertex").click(function() {

	/* Pobierz id kliknietego kwadratu */
	var ix = this.id.substring(2);
	/* pobierz element ktory kliknelismy dla d3 */
	var indexTod3 = d3.select("#" + this.id);

	/*
	 * Jezeli nie ma wybranego poczatkowego wierzcholka to ten klikniety nim
	 * jest
	 */
	if (startVertex == null) {
		/* Ustaw zmienna m_start w css na true */
		if (indexTod3 != null)
			indexTod3.classed("m_start", true);

		/* Ustaw ze wlasnie ten wierzcholek jest wierzcholkiem poczatkowym */
		vertices[ix].m_start = true;
		startVertex = vertices[ix];

		/* Jezeli nie ma koncowego wierzcholka to ten klikniety nim jest */
	} else if (endVertex == null) {
		/* Ustaw zmienna m_end w css na true */
		if (indexTod3 != null)
			indexTod3.classed("m_end", true);

		/* Ustaw ze wlasnie ten wierzcholek jest wierzcholkiem koncowym */
		vertices[ix].m_end = true;
		endVertex = vertices[ix];

	} else {
		/*
		 * Jezeli zaznaczony wierzcholek jest wierzcholkiem startowym to go
		 * skasuj
		 */
		if (vertices[ix].m_start) {

			vertices[ix].m_start = false;
			startVertex = null;
			if (indexTod3 != null)
				indexTod3.classed("m_start", false);
			/* Jezeli jest koncowym to tez go skasuj */
		} else if (vertices[ix].m_end) {
			vertices[ix].m_end = false;
			endVertex = null;
			if (indexTod3 != null)
				indexTod3.classed("m_end", false);
		}

	}

});


function highlightVertex( vertex, on, cssclass ) {
    if( vertex != null ) {
        var idname = "#vx"+vertex.m_id;
        d3.select(idname).classed( cssclass, on );
    }
}

// highlightEdge
// Highlights a given edge per the class given
// input: an Edge object
// It will look up that object's representation and add the specified class
function highlightEdge( edge, on, cssclass ) {
    if( edge != null ) {
        var idname = "#"+edge.m_id;
        d3.select(idname).classed( cssclass, on );
    }
}






/* Funkcja uruchamiajaca algorytm */
function runA() {
	console.log("run");
	AStar(startVertex, endVertex);
}
function runD() {
	console.log("run");
	Dijkstra(startVertex, endVertex);
}
function run() {
	console.log("run");
	AStar(startVertex, endVertex);
}
/*
 * var selectionRectangle = d3.select(".implementation") .on( "mousedown",
 * mouseDown) .on("mouseup",mouseUp);
 * 
 * function mouseDown() { var p = d3.mouse( this);
 * d3.select(".implementation").select(".selection").remove();
 * d3.select(".implementation").append( "rect") .attr({ rx : 6, ry : 6, class :
 * "selection", x : p[0], y : p[1], width : 0, height : 0, id : "checkRect" });
 * 
 * selectionRectangle.on("mousemove", mouseMove);
 *  } function mouseMove() { var s = d3.select(".implementation").select(
 * "rect.selection");
 * 
 * if( !s.empty()) { var p = d3.mouse( this),
 * 
 * d = { x : parseInt( s.attr( "x"), 10), y : parseInt( s.attr( "y"), 10), width :
 * parseInt( s.attr( "width"), 10), height : parseInt( s.attr( "height"), 10) },
 * move = { x : p[0] - d.x, y : p[1] - d.y } ;
 * 
 * if( move.x < 1 || (move.x*2<d.width)) { d.x = p[0]; d.width -= move.x; }
 * else { d.width = move.x; }
 * 
 * if( move.y < 1 || (move.y*2<d.height)) { d.y = p[1]; d.height -= move.y; }
 * else { d.height = move.y; }
 * 
 * s.attr( d); //console.log( d); }
 *  } function mouseUp() { selectionRectangle.on("mousemove", null); }
 */
/* DIJKSTRA */

var found = false; // bool sprawdzajacy czy juz trafilismy na koniec
var unvisited = Array(); // tablica nieodwiedzonych wierzcholkow
var interval=50;
function Dijkstra(start, end) {

	/* Znuluj poprzednika oraz ustaw odleglosc na infinity */
	for (var i = 0; i < vertices.length; i++) {
		vertices[i].m_distance = Infinity;
		vertices[i].m_distance2 = Infinity;

		vertices[i].m_ancestor = null;
		vertices[i].m_visited = false;
	}
	startVertex.m_distance=0;

	unvisited = vertices.concat();
	unvisited.sort(vertexSortDijkstra);
	found = false;
	if(start.m_neighbors.length==0)
	{
	alert("start pusty")
	}
	else if(end.m_neighbors.length==0)
	{
		alert("end pusty")

	}
	else{
	window.setTimeout(DijkstraIter,interval,start, end);
	}
}

function DijkstraIter(start, end,time) {
	if( time != null ) {
        highlightVertex( time, true, "visited" );
        highlightVertex( time, false, "processing" );
    }
	
	
	
	var processedVertex = unvisited.pop();
	console.log(processedVertex.m_id);

	if (processedVertex == end) {
		alert("processedVertex = stop");
		found = true;
		

		
	} else if (processedVertex != null && processedVertex.m_distance != Infinity) {

		
		
		highlightVertex( processedVertex, true, "processing" );
		
		
		for (var n = 0; n < processedVertex.m_neighbors.length; n++) {
			
			var distance = processedVertex.m_distance+ processedVertex.m_neighbors[n].m_cost;
			var vertex = processedVertex.m_neighbors[n].getVertex(processedVertex);
			if (distance < vertex.m_distance) {
				vertex.m_distance = distance;
				vertex.m_ancestor = processedVertex;
					
			}
		}
		processedVertex.m_visited = true;
	}

	unvisited.sort(vertexSortDijkstra);

	if (found == true) {
		
		if (end.distance != Infinity) {
			var iterator=end;
			while(iterator!=start)
				{
				highlightVertex( iterator, true, "path" );
	            highlightEdge( iterator.findEdge( iterator.m_ancestor ), true, "pathLine" );

				iterator=iterator.m_ancestor;
				}
			
			highlightVertex( iterator, true, "path" );
            //highlightEdge( iterator.findEdge( iterator.m_ancestor ), true, "path" );
			console.log("Znaleziono");
			alert("Znaleziono");
		} else {
			alert("Nie znaleziono, ale dotarlem do konca");
		}

	} else {
		if (unvisited.length > 0) {
            window.setTimeout( DijkstraIter, interval, start, end, processedVertex );
		} else {

			alert("PathNotFound");
		}

	}

}
function AStar(start,end,time)
{
	/* Znuluj poprzednika oraz ustaw odleglosc na infinity */
	for (var i = 0; i < vertices.length; i++) {
		vertices[i].m_distance = Infinity;
		vertices[i].m_distance2 = Infinity;

		vertices[i].m_ancestor = null;
		vertices[i].m_visited = false;
	}
	startVertex.m_distance=0;
	startVertex.m_distance2=EuclideanDistance(start.m_position, end.m_position);
	
	console.log(EuclideanDistance(start.m_position, end.m_position));
	
console.log("START : ");
console.log(startVertex);

	unvisited = vertices.concat();
	unvisited.sort(vertexSortAStar);
	found = false;
	if(start.m_neighbors.length==0)
	{
	alert("start pusty")
	}
	else if(end.m_neighbors.length==0)
	{
		alert("end pusty")

	}
	else{
	window.setTimeout(AStarIter,interval,start, end);
	}
	
	
}
function AStarIter(start,end,time)
{
	

	if( time != null ) {
        highlightVertex( time, true, "visited" );
        highlightVertex( time, false, "processing" );
    }
	
	
	
	var processedVertex = unvisited.pop();
	console.log(processedVertex);

	if (processedVertex == end) {
		alert("processedVertex = stop");
		found = true;
		

		
	} else  {

		
		
		highlightVertex( processedVertex, true, "processing" );
		
		
		for (var n = 0; n < processedVertex.m_neighbors.length; n++) {

			var distance = processedVertex.m_distance+ processedVertex.m_neighbors[n].m_cost;
			var vertex = processedVertex.m_neighbors[n].getVertex(processedVertex);
			
			if( distance < vertex.m_distance)
			{
				
				vertex.m_distance2= distance + EuclideanDistance(vertex.m_position,end.m_position );
				vertex.m_distance = distance;
				vertex.m_ancestor = processedVertex;
					
			}

		}
		processedVertex.m_visited = true;
	}

	unvisited.sort(vertexSortAStar);

	if (found == true) {
		
		if (end.distance != Infinity) {
			var iterator=end;
			while(iterator!=start)
				{
				highlightVertex( iterator, true, "path" );
	            highlightEdge( iterator.findEdge( iterator.m_ancestor ), true, "pathLine" );

				iterator=iterator.m_ancestor;
				}
			
			highlightVertex( iterator, true, "path" );
            //highlightEdge( iterator.findEdge( iterator.m_ancestor ), true, "path" );
			console.log("Znaleziono");
			alert("Znaleziono");
		} else {
			alert("Nie znaleziono, ale dotarlem do konca");
		}

	} else {
		if (unvisited.length > 0) {
            window.setTimeout( AStarIter, interval, start, end, processedVertex );
		} else {

			alert("PathNotFound");
		}

	}



}

function reset()
{
	

}
function vertexSortAStar(a, b) {
	if (a == null && b == null)
		return 0;
	if (a == null && b != null)
		return 1;
	if (b == null && a != null)
		return -1;
	if (a.m_distance2 > b.m_distance2)
		return -1;
	if (a.m_distance2 < b.m_distance2)
		return 1;
	else
		return 0;
}


function vertexSortDijkstra(a, b) {
	if (a == null && b == null)
		return 0;
	if (a == null && b != null)
		return 1;
	if (b == null && a != null)
		return -1;
	if (a.m_distance > b.m_distance)
		return -1;
	if (a.m_distance < b.m_distance)
		return 1;
	else
		return 0;
}
