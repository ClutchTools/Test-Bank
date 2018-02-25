# **Calculate degrees of separation**

#### All credit goes to Tim Manfield https://github.com/tim-hr/stuff/wiki/System-design:-Calculate-degrees-of-separation

```markdown
You want to determine the separation between two people in a population (LinkedIn, Facebook, etc).

Assume that there's a getFriends function that will return the list of friends for a given Person.

You can then get the friends-of-friends by calling getFriends on each of the friends in the original result set. Then you can get friends-of-friends-of-friends and so on.

So, given Person A and Person B how can you determine if they are connected, and if so, how many "links" or "degrees" separate the two people?
```
