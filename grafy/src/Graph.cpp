#include "Graph.h"

Graph::Graph()
{
    //ctor
}

Graph::~Graph()
{
    //dtor
}

/*
Typ GRAPH to enum w pliku enum.h
Konstruktor tworzacy randomowy graf na podstawie GRAPH type.
Jezeli type == G_LIST to tworzy graf oparty na liscie sasiedztwa
Jezeli type == G_MATRIX to tworzy graf oparty na macierzy

*/
Graph::Graph(int maxVert,int maxEdges,float density,GRAPH type)
{



    m_type=type;
    if(type == GRAPH::G_LIST)
    {
        m_vertices= maxVert;
        for(size_t i=0; i<m_vertices; i++)
        {
            m_nodesVector.push_back(Node(i));
        }


        for(size_t i=0; i<m_vertices; i++)
        {

            for(size_t j=0; j<maxEdges; j++)
            {
                int randomNumber = rand()%m_vertices ;
                if(randomNumber!=i  )
                {
                    if(!isEdge(i,randomNumber))
                    {
                        addEdge(i,randomNumber);
                    }

                }
            }


        }
    }
    else if(m_type == GRAPH::G_MATRIX)
    {

        int edgeCounter=0;


        m_nodesMatrix = Matrix(maxVert);
        int xRand=0,Yrand=0;
//dopoki nie mamy porzadanej gestosci wierzcholkow na krawedzie wykonuj
        do
        {
            //dopoki wylosowane liczby sa takie same losuj nastepne tak aby nie byly takie same
            do
            {
                xRand=random() % maxVert;
                Yrand=random() % maxVert;
            }
            while(xRand == Yrand);
            //sprawdz czy jest krawedz pomiedzy tymi wierzcholkami. Jezeli jest to przejdz do nastepnej iteracji petli ( continue)
            if(isEdge(xRand,Yrand))
            {
                continue;
            }
            addEdge(xRand,Yrand);
            edgeCounter++;

        }
        while(float(edgeCounter / maxVert)<density);

    }
}

Graph::Graph(const Matrix& m)
{

    m_type=G_MATRIX;
    m_nodesMatrix=m;

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

bool Graph::isEdge (int v1, int v2)
{



    switch(m_type)
    {

    case G_LIST :

        for(std::vector<int>::size_type i = 0; i != m_nodesVector[v1].getNeighbours().size(); i++)
        {
            if(m_nodesVector[v1].getNeighbours()[i]==v2)
            {
                return true;
            }

        }
        return false;

        break;
    case G_MATRIX:

        return (m_nodesMatrix.getValue(v1,v2) >0);

        break;
    }

    return false;

}
void Graph::addEdge(int a, int b,int c)
{

    switch(m_type)
    {

    case G_LIST :
        m_nodesVector[a].addNeighbor(b);
        break;
    case G_MATRIX:

        m_nodesMatrix.setValue(a,b,c);
        break;
    }
}

// Ladnie wyjasnione https://www.youtube.com/watch?v=Qdt5WJVkPbY
// a kod w zasadzie wzor z tad : http://algorytmikavlo.wikidot.com/floyd
void Graph::Matrix_Warshall()
{


    for(int k=0; k<m_nodesMatrix.getSize(); k++)
    {
        for(int from=0; from<m_nodesMatrix.getSize(); from++)
        {
            for(int to=0; to<m_nodesMatrix.getSize(); to++)
            {
// jezeli wartosc ktora obliczono jest miejsza niz wartosc ktora jest to znaczy ze ta sciezka jest krotsza.
m_nodesMatrix.setValue(from,to,
                                std::min(m_nodesMatrix.getValue(from,to),
                                        m_nodesMatrix.getValue(from,k)+m_nodesMatrix.getValue(k,to)
                                        )
                        );

            }

        }

    }
//    m_nodesMatrix=matrix;
}
void Graph::Matrix_DFS()
{
//tablica w ktorej sa informacje czy wierzcholek zostal odwiedzony
    int* vertChecked = new int [m_nodesMatrix.getSize()];
    for (int i = 0; i < m_nodesMatrix.getSize(); i++)
    {
        vertChecked [i] = NOT_VISITED;
    }
    for (int i = 0; i < m_nodesMatrix.getSize(); i++)
        if (vertChecked[i]==NOT_VISITED)
        {
            recurentDFS(i, vertChecked);
        }



}
void Graph::recurentDFS(int vertIterator, int* vertChecked)
{
    vertChecked[vertIterator]=VISITED;

    for (int j = 0; j < m_nodesMatrix.getSize(); j++)
        if (vertChecked[j]==NOT_VISITED && j != vertIterator && m_nodesMatrix.getValue(vertIterator,j))
        {
            recurentDFS(j, vertChecked);
        }
}



Matrix Graph::getMatrix() const
{
    return m_nodesMatrix;
}
