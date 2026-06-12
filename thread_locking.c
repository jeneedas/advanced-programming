#include <stdio.h>
#include <pthread.h>

#define NUM_THREADS 4
#define INCREMENTS 100000

// Shared global counter
int counter = 0;

// Mutex variable
pthread_mutex_t lock;

/*
    Thread function WITHOUT synchronization
*/
void *increment_without_mutex(void *arg)
{
    for (int i = 0; i < INCREMENTS; i++)
    {
        counter++;
    }

    return NULL;
}

/*
    Thread function WITH mutex synchronization
*/
void *increment_with_mutex(void *arg)
{
    for (int i = 0; i < INCREMENTS; i++)
    {
        pthread_mutex_lock(&lock);

        counter++;

        pthread_mutex_unlock(&lock);
    }

    return NULL;
}

int main()
{
    pthread_t threads[NUM_THREADS];

    printf("===== WITHOUT MUTEX =====\n");

    counter = 0;

    // Create threads without mutex
    for (int i = 0; i < NUM_THREADS; i++)
    {
        pthread_create(&threads[i], NULL, increment_without_mutex, NULL);
    }

    // Wait for threads to finish
    for (int i = 0; i < NUM_THREADS; i++)
    {
        pthread_join(threads[i], NULL);
    }

    printf("Expected Counter Value = %d\n", NUM_THREADS * INCREMENTS);
    printf("Actual Counter Value   = %d\n", counter);

    /*
        Initialize mutex
    */
    pthread_mutex_init(&lock, NULL);

    printf("\n===== WITH MUTEX =====\n");

    counter = 0;

    // Create threads with mutex
    for (int i = 0; i < NUM_THREADS; i++)
    {
        pthread_create(&threads[i], NULL, increment_with_mutex, NULL);
    }

    // Wait for threads to finish
    for (int i = 0; i < NUM_THREADS; i++)
    {
        pthread_join(threads[i], NULL);
    }

    printf("Expected Counter Value = %d\n", NUM_THREADS * INCREMENTS);
    printf("Actual Counter Value   = %d\n", counter);

    /*
        Destroy mutex
    */
    pthread_mutex_destroy(&lock);

    return 0;
}