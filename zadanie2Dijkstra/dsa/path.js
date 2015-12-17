/*Zwyklu punkt 2d*/
function Point2d(x, y) {
	this.x = x;
	this.y = y;
}
/*
 * Edge ma : swoj id koszt przejscia wierzcholek z ktorego ma isc wierzcholek do
 * ktorego ma isc
 */

function Edge(id, from, to) {
	this.m_id = id;
	this.m_cost = Math.ceil(Math.random() * 10);
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
			var ret=false;
		for ( var i = 0; i < this.m_neighbors.length; i++) {
			if (this.m_neighbors[i] != null
					&& (this.m_neighbors[i].m_to.m_id == vert.m_id || this.m_neighbors[i].m_from.m_id == vert.m_id)) {
				ret= true;
			}
		}
		return ret;
	},
	connectVertices : function(vert) {

		if (!this.checkEdge(vert) && !vert.checkEdge(this)) {
			var edge = new Edge("e" + this.id + "_" + vert.m_id, this, vert);
			this.addEdge(edge);
			vert.addEdge(edge);
			
			return edge;
		}
		return null;
	},
	findEdge : function(to) {

		for ( var i = 0; i < this.m_neighbors.length; i++) {
			if (this.m_neighbors[i] != null
					&& (this.m_neighbors[i].m_to.m_id == to.m_id || this.m_neighbors[i].m_from.m_id == to.m_id)) {
				return this.edges[i];
			}
		}
		return null;
	}

}

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
			if (Math.random() < 0.50) {
				var downIx = curIx + 1;
				edges[edgeCount++] = curVertex
						.connectVertices(vertices[downIx]);

			}
		}

		// If not the last column
		// Add right
		if (i < vertWidth - 1) {
			// Add a 75% chance of having an edge, just for fun
			if (Math.random() < 0.50) {
				var rightIx = curIx + vertHeight;
				edges[edgeCount++] = curVertex
						.connectVertices(vertices[rightIx]);

			}
		}
	}
}

console.log(edges.length);

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
/*Dodaj linie miedzy wezlami, czyli dodaj wszystkie wezly*/
var lines = d3.select(".implementation").selectAll("line")
		.data(edges).enter()
		.append("line")
		.attr("x1", function(d) {	return scaleByX(d.m_from.m_position.x+scaleByX(Math.sqrt(20)));	})
		.attr("y1", function(d) {	return scaleByY(d.m_from.m_position.y+scaleByY(Math.sqrt(20)));	})
		.attr("x2", function(d) {	return scaleByX(d.m_to.m_position.x+scaleByX(Math.sqrt(20)));})
		.attr("y2", function(d) {	return scaleByY(d.m_to.m_position.y+scaleByY(Math.sqrt(20)));	})
		.attr("class", "line").attr("m_id", function(d) {
			return d.m_id;
		});
/*Dodaj literki oznaczajace koszt przejscia miedzy wezlami*/
 var weights = d3.select(".implementation").selectAll(".weight").data(edges).enter()
 .append("text").attr("x", function(d) {
	 if (d.m_from.m_position.x == d.m_to.m_position.x) 
	 { return scaleByX(d.m_from.m_position.x+scaleByX(Math.sqrt(50))); }
	 else 
	 { return scaleByX((d.m_from.m_position.x + d.m_to.m_position.x+scaleByX(Math.sqrt(50))) / 2); }
 })
 .attr("y", function(d) 
{
	 if (d.m_from.m_position.y == d.m_to.m_position.y)
	{return scaleByY(d.m_from.m_position.y+scaleByY(Math.sqrt(50))); } 
	 else 
	 { return scaleByY((d.m_from.m_position.y + d.m_to.m_position.y+scaleByY(Math.sqrt(50))) / 2); }
 })
 .text(function(d) { return d.m_cost; })
.attr("class", "cost");

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
/* Funkcja uruchamiajaca algorytm */
function run() {
	console.log("run");
}
