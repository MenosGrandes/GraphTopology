//http://eloquentjavascript.net/1st_edition/appendix2.html
/////////////////////////////////////////////////////////////////

function BinaryHeap(scoreFunction) {
	this.content = [];
	this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
	push : function(element) {
		// Add the new element to the end of the array.
		this.content.push(element);
		// Allow it to bubble up.
		this.bubbleUp(this.content.length - 1);
	},

	pop : function() {
		// Store the first element so we can return it later.
		var result = this.content[0];
		// Get the element at the end of the array.
		var end = this.content.pop();
		// If there are any elements left, put the end element at the
		// start, and let it sink down.
		if (this.content.length > 0) {
			this.content[0] = end;
			this.sinkDown(0);
		}
		return result;
	},

	remove : function(node) {
		var length = this.content.length;
		// To remove a value, we must search through the array to find
		// it.
		for ( var i = 0; i < length; i++) {
			if (this.content[i] != node)
				continue;
			// When it is found, the process seen in 'pop' is repeated
			// to fill up the hole.
			var end = this.content.pop();
			// If the element we popped was the one we needed to remove,
			// we're done.
			if (i == length - 1)
				break;
			// Otherwise, we replace the removed element with the popped
			// one, and allow it to float up or sink down as appropriate.
			this.content[i] = end;
			this.bubbleUp(i);
			this.sinkDown(i);
			break;
		}
	},

	size : function() {
		return this.content.length;
	},

	bubbleUp : function(n) {
		// Fetch the element that has to be moved.
		var element = this.content[n], score = this.scoreFunction(element);
		// When at 0, an element can not go up any further.
		while (n > 0) {
			// Compute the parent element's index, and fetch it.
			var parentN = Math.floor((n + 1) / 2) - 1, parent = this.content[parentN];
			// If the parent has a lesser score, things are in order and we
			// are done.
			if (score >= this.scoreFunction(parent))
				break;

			// Otherwise, swap the parent with the current element and
			// continue.
			this.content[parentN] = element;
			this.content[n] = parent;
			n = parentN;
		}
	},

	sinkDown : function(n) {
		// Look up the target element and its score.
		var length = this.content.length, element = this.content[n], elemScore = this
				.scoreFunction(element);

		while (true) {
			// Compute the indices of the child elements.
			var child2N = (n + 1) * 2, child1N = child2N - 1;
			// This is used to store the new position of the element,
			// if any.
			var swap = null;
			// If the first child exists (is inside the array)...
			if (child1N < length) {
				// Look it up and compute its score.
				var child1 = this.content[child1N], child1Score = this
						.scoreFunction(child1);
				// If the score is less than our element's, we need to swap.
				if (child1Score < elemScore)
					swap = child1N;
			}
			// Do the same checks for the other child.
			if (child2N < length) {
				var child2 = this.content[child2N], child2Score = this
						.scoreFunction(child2);
				if (child2Score < (swap == null ? elemScore : child1Score))
					swap = child2N;
			}

			// No need to swap further, we are done.
			if (swap == null)
				break;

			// Otherwise, swap and continue.
			this.content[n] = this.content[swap];
			this.content[swap] = element;
			n = swap;
		}
	}
};
/////////////////////////////////////////////////////////////////

/* Kopce */
var heapDijkstra = new BinaryHeap(function(x) {
	return x.m_distance;
});
var heapAStar = new BinaryHeap(function(x) {
	return x.m_distance2;
});

function EuclideanDistance(first, second) {
	return Math.sqrt(Math.pow((first.x - second.x), 2)
			+ Math.pow((first.y - second.y), 2));
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
		for ( var i = 0; i < this.m_neighbors.length; i++) {
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

		for ( var i = 0; i < this.m_neighbors.length; i++) {
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

var startVertex = null;
var endVertex = null;
/* Prawdopodobienstwo wystapienia krawedzi */
var probabilityofEdge = 0.7;
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
for ( var i = 0; i < vertWidth; i++) {
	for ( var j = 0; j < vertHeight; j++) {
		vertices.push(new Vertex(new Point2d(j * 25 + 15, i * 25 + 15), i
				* vertWidth + j));
	}
}
/* Tworzenie polaczen */

var edgeCount = 0;
for ( var i = 0; i < vertWidth; i++) {
	for ( var j = 0; j < vertHeight; j++) {
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
				edges[edgeCount++] = curVertex
						.connectVertices(vertices[downIx]);

			}
		}

		// If not the last column
		// Add right
		if (i < vertWidth - 1) {
			// Add a 75% chance of having an edge, just for fun
			if (Math.random() < probabilityofEdge) {
				var rightIx = curIx + vertHeight;
				edges[edgeCount++] = curVertex
						.connectVertices(vertices[rightIx]);

			}
		}
	}
}

console.log("Edges: " + edges.length);

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
var interval = 50;
function Dijkstra(start, end) {

	/* Znuluj poprzednika oraz ustaw odleglosc na infinity */
	for ( var i = 0; i < vertices.length; i++) {
		vertices[i].m_distance = Infinity;
		vertices[i].m_distance2 = Infinity;

		vertices[i].m_ancestor = null;
		vertices[i].m_visited = false;
	}
	startVertex.m_distance = 0;

	heapDijkstra.push(startVertex);

	console.log("Ilosc: " + heapDijkstra.content.length);
	found = false;
	if (start.m_neighbors.length == 0) {
		alert("start pusty")
	} else if (end.m_neighbors.length == 0) {
		alert("end pusty")

	} else {
		window.setTimeout(DijkstraIter, interval, start, end);
	}
}

function DijkstraIter(start, end, time) {
	if (time != null) {
		highlightVertex(time, true, "visited");
		highlightVertex(time, false, "processing");
	}

	var processedVertex = heapDijkstra.pop();
	console.log(processedVertex.m_id);

	if (processedVertex == end) {
		alert("processedVertex = stop");
		found = true;

	} else if (processedVertex != null
			&& processedVertex.m_distance != Infinity) {

		highlightVertex(processedVertex, true, "processing");

		for ( var n = 0; n < processedVertex.m_neighbors.length; n++) {

			var distance = processedVertex.m_distance
					+ processedVertex.m_neighbors[n].m_cost;
			var vertex = processedVertex.m_neighbors[n]
					.getVertex(processedVertex);
			if (distance < vertex.m_distance) {
				vertex.m_distance = distance;
				vertex.m_ancestor = processedVertex;
				heapDijkstra.push(vertex);
			}
		}
		processedVertex.m_visited = true;
	}

	//unvisited.sort(vertexSortDijkstra);

	if (found == true) {

		if (end.distance != Infinity) {
			var iterator = end;
			while (iterator != start) {
				highlightVertex(iterator, true, "path");
				highlightEdge(iterator.findEdge(iterator.m_ancestor), true,
						"pathLine");

				iterator = iterator.m_ancestor;
			}

			highlightVertex(iterator, true, "path");
			//highlightEdge( iterator.findEdge( iterator.m_ancestor ), true, "path" );
			console.log("Znaleziono");
			alert("Znaleziono");
		} else {
			alert("Nie znaleziono, ale dotarlem do konca");
		}

	} else {
		if (heapDijkstra.content.length > 0) {
			window.setTimeout(DijkstraIter, interval, start, end,
					processedVertex);
		} else {

			alert("PathNotFound");
		}

	}

}
function AStar(start, end, time) {
	/* Znuluj poprzednika oraz ustaw odleglosc na infinity */
	for ( var i = 0; i < vertices.length; i++) {
		vertices[i].m_distance = Infinity;
		vertices[i].m_distance2 = Infinity;

		vertices[i].m_ancestor = null;
		vertices[i].m_visited = false;
	}
	startVertex.m_distance = 0;
	startVertex.m_distance2 = EuclideanDistance(start.m_position,
			end.m_position);

	heapAStar.push(startVertex);

	found = false;
	if (start.m_neighbors.length == 0) {
		alert("start pusty")
	} else if (end.m_neighbors.length == 0) {
		alert("end pusty")

	} else {
		window.setTimeout(AStarIter, interval, start, end);
	}

}
function AStarIter(start, end, time) {

	if (time != null) {
		highlightVertex(time, true, "visited");
		highlightVertex(time, false, "processing");
	}

	var processedVertex = heapAStar.pop();
	//	console.log(processedVertex);

	if (processedVertex == end) {
		alert("processedVertex = stop");
		found = true;

	} else {

		highlightVertex(processedVertex, true, "processing");

		for ( var n = 0; n < processedVertex.m_neighbors.length; n++) {

			var distance = processedVertex.m_distance
					+ processedVertex.m_neighbors[n].m_cost;
			var vertex = processedVertex.m_neighbors[n]
					.getVertex(processedVertex);

			if (distance < vertex.m_distance) {

				vertex.m_distance2 = distance
						+ EuclideanDistance(vertex.m_position, end.m_position);
				vertex.m_distance = distance;
				vertex.m_ancestor = processedVertex;
				heapAStar.push(vertex);
			}

		}
		processedVertex.m_visited = true;
	}

	if (found == true) {

		if (end.distance != Infinity) {
			var iterator = end;
			while (iterator != start) {
				highlightVertex(iterator, true, "path");
				highlightEdge(iterator.findEdge(iterator.m_ancestor), true,
						"pathLine");

				iterator = iterator.m_ancestor;
			}

			highlightVertex(iterator, true, "path");
			//highlightEdge( iterator.findEdge( iterator.m_ancestor ), true, "path" );
			console.log("Znaleziono");
			alert("Znaleziono");
		} else {
			alert("Nie znaleziono, ale dotarlem do konca");
		}

	} else {
		if (heapAStar.content.length > 0) {
			window.setTimeout(AStarIter, interval, start, end, processedVertex);
		} else {

			alert("PathNotFound");
		}

	}

}

function reset() {
	heapAStar.content = [];
	heapDijkstra.content = [];
	for ( var i = 0; i < vertices.length; i++) {
		with (vertices[i]) {

			m_selected = false;
			m_visited = false;
			m_ancestor = null;
			m_distance = 0;
			m_distance2 = 0;

		}
	}
}
/////////////////////// WYGLAD ///////////////////////////////

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

function highlightVertex(vertex, on, cssclass) {
	if (vertex != null) {
		var idname = "#vx" + vertex.m_id;
		d3.select(idname).classed(cssclass, on);
	}
}

// highlightEdge
// Highlights a given edge per the class given
// input: an Edge object
// It will look up that object's representation and add the specified class
function highlightEdge(edge, on, cssclass) {
	if (edge != null) {
		var idname = "#" + edge.m_id;
		d3.select(idname).classed(cssclass, on);
	}
}

/* Funkcja uruchamiajaca algorytm */
function runA() {
	redraw()
	console.log("run");
	AStar(startVertex, endVertex);
}
function runD() {
	redraw()
	console.log("run");
	Dijkstra(startVertex, endVertex);
}
function run() {
	console.log("run");
	AStar(startVertex, endVertex);
}
function redraw() {
	reset();

	if (lines)
		lines.attr("class", "line");
	if (rentangles) {
		rentangles.attr("class", function(d) {
			var toRet = "vertex";
			toRet += d.m_selected ? " m_selected" : "";
			toRet += d.m_start ? " m_start" : "";
			toRet += d.m_end ? " m_end" : "";
			return toRet;
		});

	}
}
