#include <stdio.h>

int main()
{
    int n;
    printf("Enter value of n: ");
    scanf("%d", &n);

    int a;
    for(int i = 0; i < n; i++)
    {
        a = i;
    }
    printf("Operation 1 completed\n");
    printf("Time Complexity: O(n)\n");
    printf("Space Complexity: O(1)\n\n");

    int arr1[1000];
    for(int i = 0; i < n && i < 1000; i++)
    {
        arr1[i] = i;
    }
    printf("Operation 2 completed\n");
    printf("Time Complexity: O(n)\n");
    printf("Space Complexity: O(n)\n\n");

    int arr2[100][100];
    if(n > 100) n = 100;
    for(int i = 0; i < n; i++)
    {
        for(int j = 0; j < n; j++)
        {
            arr2[i][j] = i + j;
        }
    }
    printf("Operation 3 completed\n");
    printf("Time Complexity: O(n^2)\n");
    printf("Space Complexity: O(n^2)\n");

    return 0;
}
