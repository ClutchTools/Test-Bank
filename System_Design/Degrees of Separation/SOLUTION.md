# **Calculate degrees of separation**
#### All credit goes to Tim Manfield https://github.com/tim-hr/stuff/wiki/System-design:-Calculate-degrees-of-separation

## Data structure analysis

You have two trees, with Person A as the root node of 1st tree, and Person B as the root node of the 2nd tree. 

## Search strategy analysis

### DFS vs BFS

When traversing a tree, you have two basic options -- depth-first traversal (DFS) and breadth-first traversal (BFS).

Friend graphs in social networks tend to be shallow but broad (remember you are only a handful of degrees removed from anyone on earth!).

So for this use case, BFS is clearly superior to DFS, because DFS will take a lot longer to discover that you are merely 1 degree removed away from a friend.

### Single-direction BFS

So you can start a Person A and traverse the friend-tree looking for Person B, counting the "levels" as you go.

To illustrate, let's assume naively that each person anywhere in the population has 100 friends and in this particular case all the friends are distinct. 

So Person A has 100 friends, who then have 10,000 friends, who then have 1,000,000 friends. Person B is somewhere in the A's third-degree group of 1,000,000 friends.

If you search directly for Person B, it looks like this:

![image](http://i.imgur.com/PR1d7bPl.png)

### Launch from both directions

Instead of looking directly for Person B, it's a lot more efficient on average to launch the BFS from both directions and look for a common friend.

Same scenario as above -- Person A has 100 friends, who then have 10,000 friends, who then have 1,000,000 friends. And the same holds for Person B.

![image](http://i.imgur.com/tRnMzqWl.png)

Notice how the "common friends" approach can dramatically cut down the processing.

### Side note

This is assuming no further optimizations. In particular, we are not checking for an intersection while fetching friends -- the supplied diagrams assume that the entire set of friends at a given degree is assembled first, _then_ intersection is computed, which of course need not be the case. However the diagrams give the basic idea -- meeting in the middle is going to be a lot less work on average.

## Reference implementation

You may or may not need to provide an actual implementation to answer this problem. Often, you don't -- it suffices to provide an algorithmic description.

However for reference here is a simple implementation ([gist with rough tests](https://gist.github.com/tim-hr/08519a94b6ba56f97d8a7dbf73c38812)).

## How to scale this

When you have huge user populations as large as LinkedIn or Facebook, and then track the ginormous number of relationships between those users, you generally can't fit all that data into memory on one machine.

Adn even if you theoretically could, you probably still want to parallelize the processing for speed's sake, at least across different CPU cores on the same machine, or much more likely, distributed across different machines.

So, how can you break up this problem for distribution? 

### Analyze the processing phases for distribution / parallelization

To answer that, what are the different aspects of processing?

* the collection of node A friends into a friend set
* the collection of node B friends into a friend set
* the intersection of the friend set
* the orchestration of the above, including tracking current degrees of separation

You can envision each of the above pieces living in a different process and/or a different server, and tying the processing together with network calls.

The orchestrator would begin the processing for each degree of separation, break up the work into chunks, farm out the chunks as messages/jobs with a message-bus/job-queuing part of your system architecture. External workers would do the fetching of friends and build up the friend set in a common transient data store. This would automatically start happening in parallel once the number of friends at given degree became larger than the per-worker batch size, thus dramatically speeding up the fetch-and-store operation.

When the jobs are all done for a given phase (note: a "phase" could correspond to the first half or the second half of the `while` loop in the `calculateDegreesOfSeparation` above), then the orchestrator could either directly compute the intersection between sets or ask the common transient data store to do so.

### redis as an analogy

For example, Redis has a native Set data type, as well as facilities for detecting and fully-computing intersections between sets. LinkedIn and Facebook don't use Redis that way, because that tool doesn't scale well enough for their tremendous data sets, but you can speak to what you know, and could offer that as an analogy for how this might work.

### map/reduce as a real potential solution

You can look at map/reduce as an abstraction for organizing this type of processing. Here's [a random article describing that](http://stevekrenzel.com/finding-friends-with-mapreduce).




