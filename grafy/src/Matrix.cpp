#include "Matrix.h"

Matrix::Matrix()
{
m_data=nullptr;
}
Matrix::Matrix(int x):m_size(x)
{
    m_data=new int[x*x];

    for(int i=0; i<x; i++)
    {
        for(int j=0; j<x; j++)
        {
            m_data[i*x+j]=0;
        }
    }
}

Matrix::Matrix(int x, int* data):m_size(x)
{
    m_data=new int[x*x];


    for(int i=0; i<x; i++)
    {
        for(int j=0; j<x; j++)
        {
            m_data[i*x+j]=data[i*x+j];
        }
    }
}
Matrix::~Matrix()
{
   // delete [] m_data;
}
Matrix::Matrix(std::string filename)
{

}



int Matrix::getSize() const
{
    return m_size;
}

int Matrix::getValue(int x, int y) const
{
    return m_data[x*m_size+y];
}

void Matrix::setValue(int x,int y,int val)
{
    m_data[x*m_size+y]=val;
}


