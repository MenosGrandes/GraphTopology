#include <iostream>
#include "Graph.h"
#include <time.h>
#define INF 9999
int main()
{

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
    std::cout<<"PO:\n"<<g<<"\n";


}
