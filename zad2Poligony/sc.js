function lineIntersect(line1, line2) {

	x1 = line1.m_start.x;
	y1 = line1.m_start.y;
	x2 = line1.m_end.x;
	y2 = line1.m_end.y;

	x3 = line2.m_start.x;
	y3 = line2.m_start.y;
	x4 = line2.m_end.x;
	y4 = line2.m_end.y;

	var x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4))
			/ ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
	var y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4))
			/ ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
	if (isNaN(x) || isNaN(y)) {
		return false;
	} else {
		if (x1 >= x2) {
			if (!(x2 <= x && x <= x1)) {
				return false;
			}
		} else {
			if (!(x1 <= x && x <= x2)) {
				return false;
			}
		}
		if (y1 >= y2) {
			if (!(y2 <= y && y <= y1)) {
				return false;
			}
		} else {
			if (!(y1 <= y && y <= y2)) {
				return false;
			}
		}
		if (x3 >= x4) {
			if (!(x4 <= x && x <= x3)) {
				return false;
			}
		} else {
			if (!(x3 <= x && x <= x4)) {
				return false;
			}
		}
		if (y3 >= y4) {
			if (!(y4 <= y && y <= y3)) {
				return false;
			}
		} else {
			if (!(y3 <= y && y <= y4)) {
				return false;
			}
		}
	}

	var p = new Point2d(x, y);
	p.m_type = 3;
	return p;
}
/*
 * Binary Search Tree implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * A binary search tree implementation in JavaScript. This implementation
 * does not allow duplicate values to be inserted into the tree, ensuring
 * that there is just one instance of each value.
 * @class BinarySearchTree
 * @constructor
 */
function BinarySearchTree() {

	/**
	 * Pointer to root node in the tree.
	 * @property _root
	 * @type Object
	 * @private
	 */
	this._root = null;
}

BinarySearchTree.prototype = {

	//restore constructor
	constructor : BinarySearchTree,

	//-------------------------------------------------------------------------
	// Private members
	//-------------------------------------------------------------------------

	/**
	 * Appends some data to the appropriate point in the tree. If there are no
	 * nodes in the tree, the data becomes the root. If there are other nodes
	 * in the tree, then the tree must be traversed to find the correct spot
	 * for insertion. 
	 * @param {variant} value The data to add to the list.
	 * @return {Void}
	 * @method add
	 */
	add : function(value) {

		//create a new item object, place data in
		var node = {
			value : value,
			left : null,
			right : null
		},

		//used to traverse the structure
		current;

		//special case: no items in the tree yet
		if (this._root === null) {
			this._root = node;
		} else {
			current = this._root;

			while (true) {

				//if the new value is less than this node's value, go left
				if (value < current.value) {

					//if there's no left, then the new node belongs there
					if (current.left === null) {
						current.left = node;
						break;
					} else {
						current = current.left;
					}

					//if the new value is greater than this node's value, go right
				} else if (value > current.value) {

					//if there's no right, then the new node belongs there
					if (current.right === null) {
						current.right = node;
						break;
					} else {
						current = current.right;
					}

					//if the new value is equal to the current one, just ignore
				} else {
					break;
				}
			}
		}
	},

	/**
	 * Determines if the given value is present in the tree.
	 * @param {variant} value The value to find.
	 * @return {Boolean} True if the value is found, false if not.
	 * @method contains
	 */
	contains : function(value) {

		current = this._root;
		var found = false;
		//make sure there's a node to search
		while (!found && current) {

			//if the value is less than the current node's, go left
			if (value < current.value) {
				current = current.left;

				//if the value is greater than the current node's, go right
			} else if (value > current.value) {
				current = current.right;

				//values are equal, found it!
			} else {
				return current;
			}
		}

		//only proceed if the node was found
		return false;

	},

	/**
	 * Removes the node with the given value from the tree. This may require
	 * moving around some nodes so that the binary search tree remains
	 * properly balanced.
	 * @param {variant} value The value to remove.
	 * @return {void}
	 * @method remove
	 */
	remove : function(value) {

		var found = false, parent = null, current = this._root, childCount, replacement, replacementParent;

		//make sure there's a node to search
		while (!found && current) {

			//if the value is less than the current node's, go left
			if (value < current.value) {
				parent = current;
				current = current.left;

				//if the value is greater than the current node's, go right
			} else if (value > current.value) {
				parent = current;
				current = current.right;

				//values are equal, found it!
			} else {
				found = true;
			}
		}

		//only proceed if the node was found
		if (found) {

			//figure out how many children
			childCount = (current.left !== null ? 1 : 0)
					+ (current.right !== null ? 1 : 0);

			//special case: the value is at the root
			if (current === this._root) {
				switch (childCount) {

				//no children, just erase the root
				case 0:
					this._root = null;
					break;

				//one child, use one as the root
				case 1:
					this._root = (current.right === null ? current.left
							: current.right);
					break;

				//two children, little work to do
				case 2:

					//new root will be the old root's left child...maybe
					replacement = this._root.left;

					//find the right-most leaf node to be the real new root
					while (replacement.right !== null) {
						replacementParent = replacement;
						replacement = replacement.right;
					}

					//it's not the first node on the left
					if (replacementParent !== null) {

						//remove the new root from it's previous position
						replacementParent.right = replacement.left;

						//give the new root all of the old root's children
						replacement.right = this._root.right;
						replacement.left = this._root.left;
					} else {

						//just assign the children
						replacement.right = this._root.right;
					}

					//officially assign new root
					this._root = replacement;

					//no default

				}

				//non-root values
			} else {

				switch (childCount) {

				//no children, just remove it from the parent
				case 0:
					//if the current value is less than its parent's, null out the left pointer
					if (current.value < parent.value) {
						parent.left = null;

						//if the current value is greater than its parent's, null out the right pointer
					} else {
						parent.right = null;
					}
					break;

				//one child, just reassign to parent
				case 1:
					//if the current value is less than its parent's, reset the left pointer
					if (current.value < parent.value) {
						parent.left = (current.left === null ? current.right
								: current.left);

						//if the current value is greater than its parent's, reset the right pointer
					} else {
						parent.right = (current.left === null ? current.right
								: current.left);
					}
					break;

				//two children, a bit more complicated
				case 2:

					//reset pointers for new traversal
					replacement = current.left;
					replacementParent = current;

					//find the right-most node
					while (replacement.right !== null) {
						replacementParent = replacement;
						replacement = replacement.right;
					}

					replacementParent.right = replacement.left;

					//assign children to the replacement
					replacement.right = current.right;
					replacement.left = current.left;

					//place the replacement in the right spot
					if (current.value < parent.value) {
						parent.left = replacement;
					} else {
						parent.right = replacement;
					}

					//no default

				}

			}

		}

	},

	/**
	 * Returns the number of items in the tree. To do this, a traversal
	 * must be executed.
	 * @return {int} The number of items in the tree.
	 * @method size
	 */
	size : function() {
		var length = 0;

		this.traverse(function(node) {
			length++;
		});

		return length;
	},

	/**
	 * Converts the tree into an array.
	 * @return {Array} An array containing all of the data in the tree.
	 * @method toArray
	 */
	toArray : function() {
		var result = [];

		this.traverse(function(node) {
			result.push(node.value);
		});

		return result;
	},

	/**
	 * Converts the list into a string representation.
	 * @return {String} A string representation of the list.
	 * @method toString
	 */
	toString : function() {
		return this.toArray().toString();
	},

	/**
	 * Traverses the tree and runs the given method on each node it comes
	 * across while doing an in-order traversal.
	 * @param {Function} process The function to run on each node.
	 * @return {void}
	 * @method traverse
	 */
	traverse : function(process) {

		//helper function
		function inOrder(node) {
			if (node) {

				//traverse the left subtree
				if (node.left !== null) {
					inOrder(node.left);
				}

				//call the process method on this node
				process.call(this, node);

				//traverse the right subtree
				if (node.right !== null) {
					inOrder(node.right);
				}
			}
		}

		//start with the root
		inOrder(this._root);
	}
};

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

var queuePoints = new BinaryHeap(function(x) {
	return x.x;
});
var SL = new BinarySearchTree();

var IL = [];

//var queue2=new BinaryHeap(function(x){return x.m_id;})

// ///////////////////////////////////////////////////////////////

function SweepLine() {
	this.m_lines = [];

}
SweepLine.prototype = {

	sweep : function(queue) {
		
		
		var i = 0;
		while (queue.size() != 0) {
			console.log(i);
			console.log(queue.content);
			var currentPoint = queue.pop();
			// lewy
			if (currentPoint.m_type == 0) {
				var line = currentPoint.m_Line;
				SL.add(line);
				var segmentA = SL.contains(line).right;
				var segmentB = SL.contains(line).left;
				if (segmentA != null && segmentB != null) {
					var inter = lineIntersect(line, segmentA)
					var inter2 = lineIntersect(line, segmentB);

					if (inter != false) {
						queue.push(inter);
					}
					if (inter2 != false) {
						queue.push(inter2);
					}
				}
			}//prawy
			else if (currentPoint.m_type == 1) {
				var line = currentPoint.m_Line;

				var segmentA = SL.contains(line).right;
				var segmentB = SL.contains(line).left;
				SL.remove(line);
				if (segmentA != null && segmentB != null) {
					var inter = lineIntersect(segmentA, segmentB);

					var foundPointInEq = false;
					for ( var i = 0; i < queue.content.length; i++) {
						if (inter.x == queue.content[i].x && inter.y == queue.content[i].y) {
							foundPointInEq = true;
							break;
						}
					}

					if (inter != false && foundPointInEq == false) {
						queue.push(inter);
					}
				}
			} else//intersekcja
			{
				return true;
			}
			i++;
			console.log();
		}
		return false;

	}
}

var s = new SweepLine();

function LineToLine()
{
	for(var i=0;i<polyArray.length;i++){
	polyArray[i].checkComplex();
	var lines = polyArray[i].m_lines;
	//console.log(polyArray[i]);
	for(var i=0;i<lines.length;i++)
		{
		
			for(var j=0;j<lines.length;j++)
			{
				var inter=lineIntersect(lines[i],lines[j]);
				if(inter!=false)
					{
					drawHitPoint(inter.x,inter.y,3);
					}
				//console.log(inter);
			}
		}
	}
	}


function check() {

	
LineToLine();
	
	
}
function myFunction() {
	svg.selectAll("*").remove();
	arrayOfPolygons = [];
}

/* Zwyklu punkt 2d 
 *  m_type 0 - lewy
 *  m_type 1 - prawy
 * 
 * */
function Point2d(x, y) {
	this.x = x;
	this.y = y;
	this.m_type = 0;
	this.m_Line = null;
}
Point2d.prototype = {
	toString : function() {
		return this.x + " " + this.y;

	},
	setLine : function(id) {
		this.m_Line = id;
	},
	clone : function() {
		var p2 = new Point2d(this.x, this.y);
		p2.setLine(this.m_Line);
		p2.m_type = this.m_type;
		return p2;
	}

}
/* Polygon */
function Polygon(id) {
	this.m_id = id;
	this.m_points = new Array();
	this.m_size = 0;
	this.m_lines = [];
}
function Line(id, polygonID, start, end) {
	this.m_polygonId = polygonID;
	this.m_id = id;
	this.m_start = start;
	this.m_end = end;
}
Line.prototype = {
	checkLeft : function() {
		if (this.m_start.x > this.m_end.x) {
			var tmp = this.m_start;
			this.m_start = this.m_end;
			this.m_end = tmp;
		}
		this.m_start.m_type = 0;
		this.m_end.m_type = 1;
		this.m_start.setLine(this);
		this.m_end.setLine(this);
	}
}

var arrayOfPolygons = new Array();
Polygon.prototype = {
	checkComplex : function() {
		var lines = new Array();
		for ( var i = 0; i < this.m_points.length; i++) {
			console.log(i);
			if (i != this.m_points.length - 1) {
				// if()
				lines.push(new Line(i, this.m_id, this.m_points[i].clone(),
						this.m_points[i + 1].clone()));

			} else {
				console.log("end");
				lines.push(new Line(i, this.m_id, this.m_points[i].clone(),
						this.m_points[0].clone()));
			}

		}

		lines.forEach(function(e) {
			e.checkLeft();
		});
		console.log(lines);
		for ( var i = 0; i < lines.length; i++) {
			//console.log(lines[i].m_end);
			queuePoints.push(lines[i].m_end);
			queuePoints.push(lines[i].m_start);
			this.m_lines.push(lines[i]);

		}
		//console.log(que)

	},
	addPoint : function(point) {
		this.m_points.push(point);
		this.m_size++;
		console.log(this.m_id);
	},
	create : function() {
		arrayOfPolygons.push(this);

		svg.selectAll("polygon").data(arrayOfPolygons).enter()
				.append("polygon").attr("points", function(d) {
					return d.m_points.map(function(d) {
						return [ d.x, d.y ].join(",");
					}).join(" ");
				}).attr("stroke", "white").attr("stroke-width", 2).attr("fill",
						"none");

	}
};

var svg = d3.select(".implementation");
var polyArray = new Array();
var polygonCounter = 0;

polyArray.push(new Polygon(polygonCounter));

function drawCircle(x, y, size) {
	console.log('Drawing circle at', x, y, 2);
	svg.append("circle").attr('class', 'click-circle').attr("cx", x).attr("cy",
			y).attr("r", 1);
	polyArray[polygonCounter].addPoint(new Point2d(x, y));

}
function drawHitPoint(x, y, size) {
	svg.append("circle").attr("cx", x).attr("cy",
			y).attr("r", size).attr("fill","red");

}
svg.on('click', function() {
	var coords = d3.mouse(this);
	console.log(coords);
	drawCircle(coords[0], coords[1], 2);
});
$(document).keypress(function(event) {
	console.log(event.which);
	switch (event.which) {

	case 99: // klawisz C
		console.log(polygonCounter);
		polyArray[polygonCounter].create();
		polygonCounter++;
		polyArray.push(new Polygon(polygonCounter));
		break;
	}

});
