#include "Node.h"
#include <iostream>

Node::Node()
{

}

Node::~Node()
{
    //dtor
}
Node::Node(int owner, const std::vector<int> neighbours):m_owner(owner)
{
    for(size_t i=0; i<neighbours.size(); i++)
    {
        m_neighbours.push_back(neighbours[i]);
    }
}
Node::Node(int owner):m_owner(owner)
{
    m_owner=owner;
}
std::vector<int> Node::getNeighbours() const
{
    return m_neighbours;
}

int Node::getOwner() const
{
    return m_owner;
}


void Node::addNeighbor(int n)
{
    m_neighbours.push_back(n);
}

