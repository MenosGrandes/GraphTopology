#ifndef NODE_H
#define NODE_H
#include <vector>
#include <ostream>
/*Mala klasa reprezentujaca pare. Potrzebna do ustalenia indeksu oraz kosztu przejscia z wezla wlasciciela na wezel o indeksie zawierajacym sie w tej klasie jako 'index' */
class NumberCost
{
public :
    int index;
    int cost;
    NumberCost(int i,int c)
    {
        index=i;
        cost=c;
    }
};

class Node
{
public:
    Node();
    Node(int owner,const std::vector<NumberCost> neighbours); //vector intow, nazwa wektora
    Node(int owner);

    virtual ~Node();
    std::vector<NumberCost> getNeighbours() const;
    int getOwner() const;


    void addNeighbor(NumberCost n);

protected:
private:
    std::vector<NumberCost> m_neighbours;
    int m_owner;

};
inline std::ostream & operator <<( std::ostream & s, const Node & nl )
{
    s<<"~~~~~~~~~~~~~~~~~~~~~\n";
    s<<"Owner: "<<nl.getOwner()<<"\nNeighbors: ";
    const std::vector<NumberCost> temp = nl.getNeighbours();


    for(size_t i=0; i<temp.size(); ++i)
    {
        s<<"index: "<<temp[i].index<<" cost: "<<temp[i].cost<<" ";

    }
    s<<"\n";

    return s ;
}
#endif // NODE_H
