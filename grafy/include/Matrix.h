#ifndef MATRIX_H
#define MATRIX_H
#include <string>
#include <ostream>
#include <iostream>
class Matrix
{
public:
    Matrix(std::string filename);
    Matrix();
    Matrix(int x);
    Matrix(int x,bool *data);
    virtual ~Matrix();
    int getSize() const;
    bool getValue(int x,int y) const;
protected:
private:
    /** Size of Matrix*/
    int m_size;
    /**Data inside matrix. It's just true if there is connection between neighbours, and false if it's not.

    http://www.algorytm.org/klasyczne/grafy-i-ich-reprezentacje.html

    Example:
      	1 	2 	3 	4 	5
    1 	0 	1 	1 	0 	1
    2 	1 	0 	1 	1 	1
    3 	1 	1 	0 	1 	0
    4 	0 	1 	1 	0 	1
    5 	1 	1 	0 	1 	0

    there is edge between 1 and 2 , but non between 4 and 1.

    */
    bool * m_data;
};


inline std::ostream & operator <<( std::ostream & s, const Matrix & v )
{

    for(int i=0; i<v.getSize(); i++)
    {
        for(int j=0; j<v.getSize(); j++)
        {
            s<<v.getValue(i,j)<<" ";
        }
        s<<"\n";

    }
    return s ;
}
#endif // MATRIX_H
