#ifndef GRAPHCALCULATIONS_H
#define GRAPHCALCULATIONS_H
#include "Graph.h"
class GraphCalculations
{
    public:
        GraphCalculations();
        virtual ~GraphCalculations();
        Matrix calculateFloydWarshall(const Graph g);
    protected:
    private:
};

#endif // GRAPHCALCULATIONS_H
