#include <stdio.h>
#include <time.h>

int main()
{
    int sizes[] = {100, 500, 1000, 3000, 5000, 10000};
    int total_tests = 6;

    int t, n;
    clock_t start, end;
    double time_taken;

    printf("----- TIME COMPLEXITY ANALYSIS -----\n");
    printf("Testing for different input sizes automatically\n\n");

    for(t = 0; t < total_tests; t++)
    {
        n = sizes[t];
        printf("Input size n = %d\n", n);

        /* -------- O(1) -------- */
        start = clock();
        int x = 10;
        int y = x * x;
        end = clock();
        time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;
        printf("O(1)   Constant Time   : %f seconds\n", time_taken);

        /* -------- O(n) -------- */
        start = clock();
        int i, sum = 0;
        for(i = 0; i < n; i++)
        {
            sum = sum + i;
        }
        end = clock();
        time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;
        printf("O(n)   Linear Time     : %f seconds\n", time_taken);

        /* -------- O(n^2) -------- */
        start = clock();
        int j, count = 0;
        for(i = 0; i < n; i++)
        {
            for(j = 0; j < n; j++)
            {
                count++;
            }
        }
        end = clock();
        time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;
        printf("O(n^2) Quadratic Time  : %f seconds\n", time_taken);

        printf("-----------------------------------\n\n");
    }

    printf("Analysis complete.\n");
    return 0;
}