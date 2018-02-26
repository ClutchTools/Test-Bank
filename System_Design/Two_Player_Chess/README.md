# **How would you design a two player online chess game?**

#### All credit goes to Tim Manfield https://github.com/tim-hr/stuff/wiki/System-design:-Calculate-degrees-of-separation

## The essence of this problem

The key here isn't really making a working 2-player chess game that only plays a single game at a time. It's assumed that you can do that, or at least that would be a different kind of a problem, more focused on implementation than on design.

This question, by contrast, is really about how you make such a chess-playing system **scalable** to many games, and furthermore make it **extensible** in various ways. The "exploring assumptions" section below (which you would do live, in real-time, in a real interview), is meant to illustrate how you'd touch on these factors just enough for you to be able to spin a coherent design story for your audience.


## Exploring assumptions

Before you can examine scalability and maintainability, the first step is to explore assumptions about the problem specification. In the case of this problem, you don't have a live interviewer, so you have to mimic the Q&A interaction on your own.

<table>
<tr>
<td><strong>How many parallel games can you have?</strong></td>
<td>Let's say just hundreds at first, but later it will scale to tens of thousands.</td>
</tr>
<tr>
<td><strong>How do you find someone to play with?</strong></td>
<td>To keep this simple let's say you create a game then it's up to you to share the game URL to your opponent outside of the system (i.e., via IM). You can't find or invite users directly within the system.</td>
</tr>
<tr>
<td><strong>Do you need to have a user account to play?</strong></td>
<td>Yes, you must sign up / sign in via Facebook or Google OAuth.</td>
</tr>

<tr>
<td><strong>Is there email validation?</strong></td>
<td>Let's say OAuth is configured with email permission required. We'll assume that this email is valid.</td>
</tr>

<tr>
<td><strong>Can the user choose the notification type?</strong></td>
<td>E.g., in-app only or email-only.  Yes they can, in a settings page.</td>
</tr>

<tr>
<td><strong>Can there be a computer player (AI)?</strong></td>
<td>No.</td>
</tr>

<tr>
<td><strong>Is the gameplay synchronous or asynchronous?</strong></td>
<td>
I.e., Synchronous means "like you are facing each other across a board in real life". Asynchronous means "like chess-by-mail games that were played a long time ago, before the Internet". Answer: The gameplay is <em>asynchronous</em>.
</td>
</tr>

<tr>
<td><strong>How do I know when it's my turn to play?</strong></td>
<td>There's a notification system that can alert you in-app or send you an email.</td>
</tr>

<tr>
<td><strong>Is this web-only or is there a mobile app as well?</strong></td>
<td>Good question! It's web-only... for now. Later, native mobile apps are likely.</td>
</tr>

<tr>
<td><strong>Do games "expire"?<strong></td>
<td>Yes, let's keep track of activity so we can archive inactive (abandoned) games.</td>
</table>