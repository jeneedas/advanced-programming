#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define BUFFER_SIZE 5
#define ITEMS 10

// Shared buffer
int buffer[BUFFER_SIZE];

int in = 0;
int out = 0;

// Synchronization tools
pthread_mutex_t mutex;
sem_t empty;
sem_t full;

/*
    Producer Thread
*/
void* producer(void* arg)
{
    for(int item = 1; item <= ITEMS; item++)
    {
        // Wait if buffer is full
        sem_wait(&empty);

        // Enter critical section
        pthread_mutex_lock(&mutex);

        // Add item to buffer
        buffer[in] = item;

        printf("Producer produced item %d at position %d\n", item, in);

        in = (in + 1) % BUFFER_SIZE;

        // Exit critical section
        pthread_mutex_unlock(&mutex);

        // Signal that buffer has one more filled slot
        sem_post(&full);

        sleep(1);
    }

    return NULL;
}

/*
    Consumer Thread
*/
void* consumer(void* arg)
{
    for(int i = 1; i <= ITEMS; i++)
    {
        // Wait if buffer is empty
        sem_wait(&full);

        // Enter critical section
        pthread_mutex_lock(&mutex);

        // Remove item from buffer
        int item = buffer[out];

        printf("Consumer consumed item %d from position %d\n", item, out);

        out = (out + 1) % BUFFER_SIZE;

        // Exit critical section
        pthread_mutex_unlock(&mutex);

        // Signal that buffer has one more empty slot
        sem_post(&empty);

        sleep(2);
    }

    return NULL;
}

int main()
{
    pthread_t producerThread;
    pthread_t consumerThread;

    // Initialize mutex
    pthread_mutex_init(&mutex, NULL);

    /*
        Initialize semaphores

        empty = BUFFER_SIZE
        full = 0
    */
    sem_init(&empty, 0, BUFFER_SIZE);
    sem_init(&full, 0, 0);

    // Create producer and consumer threads
    pthread_create(&producerThread, NULL, producer, NULL);
    pthread_create(&consumerThread, NULL, consumer, NULL);

    // Wait for threads to complete
    pthread_join(producerThread, NULL);
    pthread_join(consumerThread, NULL);

    // Destroy synchronization tools
    pthread_mutex_destroy(&mutex);

    sem_destroy(&empty);
    sem_destroy(&full);

    printf("\nExecution completed successfully.\n");

    return 0;
}