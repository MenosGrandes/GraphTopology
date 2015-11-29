#include <iostream>
#include "Graph.h"
int main()
{

    srand(time(0));


    /**Macierz sasiedztwa*/
    bool * data=new bool[9];
    data[0]=false;
    data[1]=true;
    data[2]=false;
    data[3]=true;
    data[4]=false;
    data[5]=true;
    data[6]=false;
    data[7]=true;
    data[8]=false;

    Matrix  m (3,data);
//    std::cout<<m;
    /**Lista sasiedztwa*/
    std::vector<Node> neighborList;
    Node n1(0);
    Node n2(1);
    Node n3(2);

    n1.addNeighbor(1);

    n2.addNeighbor(0);
    n2.addNeighbor(2);

    n3.addNeighbor(1);

    neighborList.push_back(n1);
    neighborList.push_back(n2);
    neighborList.push_back(n3);

//
//    for(Node n : neighborList)
//    {
//        std::cout<<n;
//    }

    Graph g(m);
    Graph g2(neighborList);
    std::cout<<g2<<"\n\n\n";
    std::cout<<g<<"\n\n\n\n\n";

    Graph g3(100000,1000);
    std::cout<<g3;
}
