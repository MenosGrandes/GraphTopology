#include "Graph.h"

Graph::Graph()
{
    //ctor
}

Graph::~Graph()
{
    //dtor
}
Graph::Graph(int maxVert,int maxEdges)
{


    m_vertices= rand()%maxVert;
    for(size_t i=0; i<m_vertices; i++)
    {
        m_nodesVector.push_back(Node(i));
    }


    for(size_t i=0; i<m_vertices; i++)
    {
        m_nodesVector[i];
        for(size_t j=0; j<maxEdges; j++)
        {
            int randomNumber = rand()%m_vertices ;
            if(randomNumber!=i && randomNumber %2==0 )
            {
                if(std::find(std::begin(m_nodesVector[i].getNeighbours()),std::end(m_nodesVector[i].getNeighbours()),randomNumber)==m_nodesVector[i].getNeighbours().end())
                {
                    m_nodesVector[i].addNeighbor(randomNumber);
                    m_nodesVector[randomNumber].addNeighbor(i);
                }

            }
        }

    }
}

Graph::Graph(const Matrix& m)
{

    m_vertices=m.getSize();
    for(size_t i=0; i<m_vertices; i++)
    {
        m_nodesVector.push_back(Node(i));
        std::cout<<m_nodesVector.size()<<"\n";
    }

    for(size_t i=0; i<m_vertices; i++)
    {
        for(size_t j=0; j<m_vertices; j++)
        {
            if(i!=j && m.getValue(i,j)==true && i>j)
            {
                m_nodesVector[i].addNeighbor(j);
                m_nodesVector[j].addNeighbor(i);
            }
        }

    }

}

Graph::Graph(const std::vector<Node> v)
{
    m_vertices=v.size();
    for(size_t i=0; i<v.size(); i++)
    {
        m_nodesVector.push_back(v[i]);
    }
}


std::vector<Node> Graph::getNodes() const
{
    return m_nodesVector;
}

int Graph::getVertices() const
{
    return m_vertices;
}


