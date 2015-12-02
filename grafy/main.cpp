#include <iostream>
#include "Graph.h"
#include <time.h>
#define INF 9999
int main()
{
//http://www.csl.mtu.edu/cs4321/www/Lectures/Lecture%2016%20-%20Warshall%20and%20Floyd%20Algorithms.htm
//http://mcs.uwsuper.edu/sb/425/Prog/FloydWarshall.java

    srand(time(0));  //zeby random dzialal
    /*Przykladowe dane z tego filmiku : https://www.youtube.com/watch?v=Qdt5WJVkPbY*/
int *data = new int[16];

data[0]=0;
data[1]=8;
data[2]=999;
data[3]=1;

data[4]=999;
data[5]=0;
data[6]=1;
data[7]=999;

data[8]=4;
data[9]=999;
data[10]=0;
data[11]=999;

data[12]=999;
data[13]=2;
data[14]=9;
data[15]=0;
Matrix m(4,data);

/**Macierz sasiedztwa WARSHALL*/
    Graph g(m);
    std::cout<<"PRZED:\n"<<g<<"\n";
    g.Matrix_Warshall();
    std::cout<<"PO:\n"<<g<<"\n\n";
    Graph g2(Matrix(4,data));
    g2.Matrix_DFS();
/**Lista sasiedztwa*/
Node n0(0);
Node n1(1);
Node n2(2);
Node n3(3);


n0.addNeighbor(NumberCost(1,8));
n0.addNeighbor(NumberCost(3,1));

n1.addNeighbor(NumberCost(2,1));

n2.addNeighbor(NumberCost(0,4));

n3.addNeighbor(NumberCost(2,9));
n3.addNeighbor(NumberCost(1,2));
std::vector<Node> nodes;
nodes.push_back(n0);
nodes.push_back(n1);
nodes.push_back(n2);
nodes.push_back(n3);

//for(int i=0;i<nodes.size();i++)
//{
//std::cout<<nodes[i]<<"\n";
//}

Graph g3(nodes);
std::cout<<"~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n";
std::cout<<g3<<"\n";
return 0;

}
