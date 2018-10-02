# Merge Linked-Lists solution

This problem has varying levels of difficulties:

Easy: Return an Array of the summed values 
Medium: Return a Linked List with the node values being the summed values
Hard: Return a Linked List with the node values being the summed values in linear time

Keys things the person will hopefully ask about are - 

1.) Clarificaiton of the inputs
2.) What does the LL look like and show their familiarity with the data structure but also to make sure there is a common understanding what the data structure will look like between the interviewer and interviewee
3.) **MOST IMPORTANTLY** Can they expect linked lists with differing amounts of nodes (Yes they can!)

General outline to the solution is - 

* Defining a linked list constructor and creating an instance of it
* Recursively iterating through both linked lists at the same time with two pointers (one for each list)
* Checking inside the recursion if the pointer has reached null 
* Adding the node.values that the pointers are pointing to and passing that into the addToTail method of your returning link list
* Recurse until both pointers reach null and the return the newly created linked list