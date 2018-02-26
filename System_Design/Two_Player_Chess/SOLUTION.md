# **How would you design a two player online chess game?**

#### All credit goes to Tim Manfield https://github.com/tim-hr/stuff/wiki/System-design:-Calculate-degrees-of-separation

## Outline of program design

### System nouns

We'll try to keep things simple. So at the top level, let's say there are the following objects:

* Sessions (either unauthenticated or authenticated)
* Players
* Games

The interesting action naturally takes place inside a Game, which we will define as skeletally as possible:

* Game
  1. `player1`: the uuid of that Player
  1. `player2`: the uuid of that Player
  1. `lastActive`: timestamp in epoch time
  1. `moveHistory`: array of strings in standard chess move notation

The `lastActive` attribute would be tracked in order to allow us to expire games, as per the specification.

Where are the rest of the attributes, you might ask?

### Design choice: reconstruct current state from history?

All the following attributes of a game instance can be inferred from `moveHistory`. 

1. `currentTurn`: enum for `White` or `Black`
1. `board`: 2-d array of board squares, piece names are enum of 'Knight', 'Bishop' etc.
1. `winState`: enum for `White` or `Black` or `null` if no winner yet
1. `takenWhitePieces`: array of piece names
1. `takenBlackPieces`: array of piece names

Right after a given Game is loaded into memory from storage, init code would reconstruct the current state by replaying the moves in `moveHistory`.

This approach is very DRY and fits in with some interesting design ideas, such as the "traditional databases are just global state, which is Bad, so rather than a monolithic schema for all uses, we should transform the event log into any schema we need" [idea that partially inspired Redux](https://www.confluent.io/blog/turning-the-database-inside-out-with-apache-samza/).

For a typical game design, this "replay only" approach is probably a controversial storage choice since it requires extra processing before you can do even basic operations and makes the system more opaque to querying and indexing.

We can easily see use cases where you want to move attributes back to top-level existence. For example, `winState` being implied means you can't easily run a query to see which games have been won, which seems potentially annoying.

However, let's say we go with reconstructing current state from history as a starting point for discussion. In a real interview I might or might not get pushback for going this way... probably not, I'd likely just have to justify the approach in response to their questions, in a collegial and logical manner.

### Decoupling rendering

One key factor we covered is that we want to support multiple client types.

This suggests that game logic needs to be completely decoupled from rendering. The game engine would be designed to handle abstract moves and return an abstract board. The I/O and rendering happens at another layer.

You could have the render function injected into the game logic component as a callback. However since this is a client-server system it's probably better to just have a simple linear MVC flow where:

*  UI reacts to user events
* a controller layer marshals those events into abstract moves that are sent as messages to the game logic component
* the game logic updates move history and thus board state
* controller is notified of update to board state
* controller passes board state to renderer
* UI is updated with fresh rendering

Pretty standard MVC stuff... you typically need to explain just enough to make it clear that you get the basic concept of decoupling.

## Outline of system architecture

### Back-of-the-envelope on traffic

Estimating load is usually a good early step in system design.

In our case, we know from the earlier requirements exploration that the system is meant to support "tens of thousands" of simultaneous games.

So, chess is a game with long think times, this isn't a twitchy first-person shooter.  Let's assume 30 seconds of think time on average, or 2 moves per minute per game.

If there are 10,000 games and 2 moves per minute per game, then that's 20,000 moves per minute. If we naively distribute that traffic evenly, then we have ~330 moves per second.

**However**, we also said that the gameplay is **asynchronous**, more like chess-by-mail than like playing each other face-to-face, in terms of the timing of moves.

Thus the traffic should drop dramatically. Let's change the estimation tack accordingly.  Let's assume that there are 50 moves per game  and games take 8 hours to complete on average.

There are 500,000 moves distributed over 28,800 seconds, or a naive average of 17 moves per second.

### Note: it's ok to make stuff up

The numbers above are made-up but plausible. Don't get too hung up on not knowing exact figures, or trying to concoct a scheme by which you would directly measure those numbers. Implementing metrics and business intelligence (BI) stuff so you can get hard data about user behavior is a completely separate topic and not germane unless the interviewer explicitly brings it up.

At this stage we assume the system isn't built yet and such hard data is not at hand, so we have to use our initial intuitions and common sense to put some reasonable starting figures into place for estimation.

### Desktop browser case
System architecture can be very plain-vanilla: a cluster of web app servers fronted by a load balancer, and a single database of any flavor to store all the games and sessions.

With the traffic described above, to maintain responsiveness we'd just need to vary the cluster size, easy-peasy.

If you didn't want to hit a RDBMS with session-lookup traffic then you could throw in a Redis instance to store the sessions, although for this amount of traffic it's hard to see why that's even necessary yet.

### Mobile app case

Games can be asynchronous, which suggests in the mobile app case having an offline mode. However we didn't actually ask that during the "exploring assumptions" phase. So we'd ask it now, in a real interview.

<table>
<tr>
<td><strong>Do the mobile apps have an offline mode?</strong></td>
<td>No.</td>
</tr>
</table>

Let's keep it simple and say "no". :)

By avoiding an offline mode, we avoid making a local copy of data in a sqlite database and we avoid having to sync, which can be annoying if you consider edge cases where players are playing on multiple devices and so forth.

## Summary

Hopefully it's clear that this reference answer is **not** meant to be a canonical description of **the** one-and-only way to make an online chess game. 

It's just one person's take, one person riffing on the topic. It's meant to illustrate the kind of explanation that tends to put interviewers at ease, because it pattern-matches to the way that work gets done in the real world.

Software engineers are frequently in this position of having to estimate things without much hard data to work with yet, and to design a system whose very requirements are still in flux.  Being able to flexibly and diplomatically deal with such a situation, in miniature, in the context of an interview problem like this, bodes well for your future performance on the team.