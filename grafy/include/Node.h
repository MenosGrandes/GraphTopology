#ifndef NODE_H
#define NODE_H
#include <vector>
#include <ostream>

class Node
{
public:
    Node();
    Node(int owner,const std::vector<int> neighbours);
    Node(int owner);

    virtual ~Node();
    std::vector<int> getNeighbours() const;
    int getOwner() const;


    void addNeighbor(int n);

protected:
private:
    std::vector<int> m_neighbours;
    int m_owner;

};
inline std::ostream & operator <<( std::ostream & s, const Node & nl )
{
    s<<"~~~~~~~~~~~~~~~~~~~~~\n";
    s<<"Owner: "<<nl.getOwner()<<"\nNeighbors: ";
    const std::vector<int> temp = nl.getNeighbours();


    for(size_t i=0; i<temp.size(); ++i)
    {
        s<<temp[i]<<",";

    }
    s<<"\n";

    return s ;
}
#endif // NODE_H
