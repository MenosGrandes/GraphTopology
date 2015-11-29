#include "GraphCalculations.h"

GraphCalculations::GraphCalculations()
{
    //ctor
}

GraphCalculations::~GraphCalculations()
{
    //dtor
}
Matrix GraphCalculations::calculateFloydWarshall(const Graph g)
{

    const std::vector<Node> nodes= g.getNodes();

    Matrix m(nodes.size());
    Matrix temp(nodes.size());

    for(int i=0; i<m.getSize();i++)
    {
        for(int j=0; i<m.getSize();j++)
        {

        }
    }

    for(int k = 0; k < g.getVertices(); k++)
    {
        for(int i = 0; i < g.getVertices(); i++)
        {
            for(int j = 0; j < g.getVertices(); j++)
            {



//                if(a[i][j]>a[i][k]+a[k][j])
//                {
//                 a[i][j]=a[i][k]+a[k][j];
//                }

            }
        }

    }

    return m;

}
