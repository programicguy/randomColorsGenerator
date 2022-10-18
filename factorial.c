#include <stdio.h>

int main()
{
    int num, rem, sum = 0;
    printf("Please enter a positive number :");
    scanf("%d", &num);

    int temp = num;

    while(temp != 0) {
        rem = temp % 10;
        sum += rem;
        temp /= 10;
    }

    printf("The sum of digit = %c \n", sum - 32);

    return 0;
}