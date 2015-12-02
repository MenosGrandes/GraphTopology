#ifndef GRAPH_H
#define GRAPH_H
#include "Node.h"
#include "Matrix.h"
#include <random>
#include <algorithm>
#include "enum.h"
class Graph
{
public:

    Graph();
    virtual ~Graph();
    Graph(int maxVert,int maxEdges,float density,GRAPH type);
    GRAPH m_type;
    bool isEdge (int, int);
    void addEdge(int, int,int =1);




public:
// MATRIX GRAPH
    Graph (const Matrix &m);
    void Matrix_Warshall();
    void Matrix_DFS();
    void Matrix_recurentDFS(int vertIterator,int * vertChecked);
    Matrix getMatrix() const;
private:
    Matrix m_nodesMatrix;

//LIST GRAPH
public :

    Graph(const std::vector<Node> v);

    std::vector<Node> getNodes() const;
    int getVertices() const ;


private:
    int m_vertices;
    int m_edges;
    std::vector<Node> m_nodesVector;

};
inline std::ostream & operator <<( std::ostream & s, const Graph & graph )
{
//    if(graph.m_type==GRAPH::G_LIST)
//    {
//        s<<"GRAPH LIST: \n";
//        const std::vector<Node> nodes= graph.getNodes();
//        for(size_t i=0; i<graph.getVertices(); i++)
//        {
//            s<<nodes[i];
//        }
//    }
//    else if(graph.m_type == GRAPH::G_MATRIX)
//    {
        s<<"GRAPH LIST: \n";
        s<<graph.getMatrix();
//
//    }
    return s ;
}
#endif // GRAPH_H
