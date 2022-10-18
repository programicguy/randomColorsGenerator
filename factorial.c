#include <stdio.h>

long factorial(int n);

int main()
{
    int n;
    long f;

    printf("Please enter a integer number : ");
    scanf("%d", &n);

    if(n < 0) 
        printf("Negative integer number is not defined!");
    else 
        f = factorial(n);
        printf("%d! = %ld", n, f);


    return 0;
}

long factorial(int n) {
    if(n == 0)
        return 1;
    else 
        return n*factorial(n-1);
}