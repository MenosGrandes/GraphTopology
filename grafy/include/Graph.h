#ifndef GRAPH_H
#define GRAPH_H
#include "Node.h"
#include "Matrix.h"
#include <random>
#include <algorithm>
class Graph
{
public:
    Graph();
    Graph(int maxVert,int maxEdges);
    Graph (const Matrix &m);
    Graph(const std::vector<Node> v);
    std::vector<Node> getNodes() const;
    int getVertices() const ;
    virtual ~Graph();
protected:
private:
    int m_vertices;
    int m_edges;

    std::vector<Node> m_nodesVector;
    Matrix m_nodesMatrix;
};
inline std::ostream & operator <<( std::ostream & s, const Graph & graph )
{
    s<<"GRAPH: \n";
    const std::vector<Node> nodes= graph.getNodes();
    for(size_t i=0; i<graph.getVertices(); i++)
    {
        s<<nodes[i];
    }

    return s ;
}
#endif // GRAPH_H
