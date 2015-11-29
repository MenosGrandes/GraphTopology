#include <iostream>
#include "Matrix.h"
using namespace std;

int main()
{


bool * data=new bool[9];
data[0]=false;
data[1]=true;
data[2]=false;
data[3]=true;
data[4]=false;
data[5]=true;
data[6]=false;
data[7]=true;
data[8]=false;

Matrix * m = new Matrix(3,data);



}
