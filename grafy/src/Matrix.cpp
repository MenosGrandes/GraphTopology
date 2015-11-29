#include "Matrix.h"

Matrix::Matrix()
{

}

Matrix::~Matrix()
{
    delete [] m_data;
}
Matrix::Matrix(std::string filename)
{

}

Matrix::Matrix(int x)
{
    m_data=new bool[x*x];
}


int Matrix::getSize() const
{
    return m_size;
}

bool Matrix::getValue(int x, int y) const
{
    return m_data[x*m_size+y];
}



Matrix::Matrix(int x, bool* data)
{
    m_data=new bool[x*x];

    for(int i=0; i<x; i++)
    {
        for(int j=0; j<x; j++)
        {

            m_data[i*x+j]=data[i*x+j];
        }
    }
}