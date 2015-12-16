/*Zwyklu punkt 2d*/
function Point2d(x, y) {
	this.x = x;
	this.y = y;
}
/*Vertex ktory ma:
 * pozycje
 * czy zostal odwiedzony
 * liste sasiadow
 * element poprzedzajacy, takieg jego ojca
 * czy jest elementem szukanym
 * czy jest elementem od ktorego zaczynamy szukanie
 * swoj id
 * */
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
/*Rozdzielczosc calego obrazka rysowanego*/
var drawWidth = 900;/*szerokosc*/
var drawHeight = 650;/*wysokosc*/

/*Ilosc elementow do narysowania*/
var vertWidth = 20;/*W szerz*/

var vertHeight = 20;/*w zdluż*/

/*Tablica vertexow, czyli kazdego punktu ktory przeszukujemy*/
var vertices = new Array();

/*Inicjalizacja vertexow, tam jest *30+16 żeby jes troche od siebie poodsuwać*/
for ( var i = 0; i < vertWidth; i++) {
	for ( var j = 0; j < vertHeight; j++) {
		vertices.push(new Vertex(new Point2d(j * 25 + 15, i * 25 + 15), i
				* vertWidth + j));
	}
}

/*Scalowanie do rozmiaru*/
var scaleByX = d3.scale.linear().domain([ 0, (vertWidth) * 30 ]).range(
		[ 0, drawWidth ]);

var scaleByY = d3.scale.linear().domain([ 0, (vertHeight) * 30 ]).range(
		[ 0, drawHeight - 50 ]);

/*Tworzenie kwadracikow ktore graficznie przedstawiaja wierzcholki*/
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

var startVertex = null;
var endVertex = null;

/*Funkcja wybierajaca punkt poczatkowy i koncowy, poprzez klikniecie myszy używając jQuery*/
$(".vertex").click(function() {

	/*Pobierz id kliknietego kwadratu*/
	var ix = this.id.substring(2);
	/*pobierz element ktory kliknelismy dla d3*/
	var indexTod3 = d3.select("#" + this.id);

	/*Jezeli nie ma wybranego poczatkowego wierzcholka to ten klikniety nim jest*/
	if (startVertex == null) {
		/*Ustaw zmienna m_start w css na true*/
		if (indexTod3 != null)
			indexTod3.classed("m_start", true);

		/*Ustaw ze wlasnie ten wierzcholek jest wierzcholkiem poczatkowym*/
		vertices[ix].m_start = true;
		startVertex = vertices[ix];

		/*Jezeli nie ma koncowego wierzcholka to ten klikniety nim jest*/
	} else if (endVertex == null) {
		/*Ustaw zmienna m_end w css na true*/
		if (indexTod3 != null)
			indexTod3.classed("m_end", true);

		/*Ustaw ze wlasnie ten wierzcholek jest wierzcholkiem koncowym*/
		vertices[ix].m_end = true;
		endVertex = vertices[ix];

	} else {
			/*Jezeli zaznaczony wierzcholek jest wierzcholkiem startowym to go skasuj*/
		if (vertices[ix].m_start) {

			vertices[ix].m_start = false;
			startVertex = null;
			if (indexTod3 != null)
				indexTod3.classed("m_start", false);
/*Jezeli jest koncowym to tez go skasuj*/
		} else if (vertices[ix].m_end) {
			vertices[ix].m_end = false;
			endVertex = null;
			if (indexTod3 != null)
				indexTod3.classed("m_end", false);
		}

	}


});
/*Funkcja uruchamiajaca algorytm*/
function run()  {console.log("run");}
