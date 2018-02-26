# **How would you design a Url Shortener?**

#### All credit goes to Tim Manfield https://github.com/tim-hr/stuff/wiki/System-design:-Calculate-degrees-of-separation

## Basic components to satisfy the core use case(s)
For a URL shortening service, the core uses are the initial shortening and the subsequent expansion. Nothing else is really required.

### Shortening

Algorithmically you can consider how the shortening takes place. There will be some hashing mechanism. That mechanism should be reasonably efficient, you can discuss options. You don’t have to have anything suitable actually memorized, but you can talk about the characteristics of that algorithm that you’d look for. In this case, the primary motivation is shortness, so you’d want to find a hash that processed a URL into only a single-digit number of alphanumeric characters, probably.

How many URL’s theoretically could you accommodate? You’d do the math.

How do you handle hashing collisions? Consider the options.

What component of the architecture does the processing of this hash? Is it the web server? Some purpose-built server? 

How do you handle storing the resulting hash? What type of data store do you consider? Why might one be better than another?

### Expansion

Given some short hash of a URL, you look up the corresponding full URL and issue a redirect. (Which type of redirect?  301? 302? Something else?)

Which type of server in your architecture handles the request? 

How do you do the data lookup?

### System Components

Putting the above together, you can sketch out the system to minimally satisfy the core use cases as simply consisting of a single web server that performs the hashing itself, storing the resulting hash in a single instance of a relational db like Postgres. The hash is the indexed id of the URL. Collisions are primitively handled with an incremented suffix added to the hash result. Then the shortened URL is converted to the long form by the same cluster of web servers, who simply look up from Postgres and issue a 302 redirect (temporary type of redirect, because we probably want to see the traffic again later for tracking/reporting reasons rather than have the browser never send that user to us again).

This tiny system would work. It wouldn’t scale of course, but it would work.  That should be your starting point before throwing around a bunch more components and trying to perform a bunch of optimization. What would basically work?
## Scalability
For all scalability considerations you need to start with the production / operational context. What are your projected traffic patterns? What is the difference between read and write traffic? 

Is there a steady pattern or is it very spiky in some way? If it’s spiky, is it spiky based on time or perhaps based on some other factor, like the viral popularity of some social object in the system?

In the case of a URL shortening service, write traffic will be much more sporadic and light compared to read traffic (if it is at all popular, which is presumably what you’re planning for).

Read traffic has the potential to be tremendously spiky depending on the popularity of a given URL (or, rather, the popularity of the website that that URL leads to).  If Rihanna (or her faceless handlers, rather) posts your shortened URL on her Twitter feed then that shortened URL is probably going to get slammed.

That given, you almost certainly want to introduce a caching component to the design, for ultra-fast and ultra-cheap lookups of such “hot” URL’s. Where does that cache live?  There are various options, you can weigh the tradeoffs. Typically you’d use a purpose-built caching server like Redis. Now you have a lifecycle consideration to your caching. How and when do you populate, refresh, and expire cache entries?

Which system components are likely to fail?  Well you only have a couple of components to consider at first because you kept the initial system really simple to satisfy the basic use cases, right?  There’s a web server and a database.  Obviously, either of those could fail. 

Let’s look at failure modes from a resource consumption perspective.

First, to get it out of the way, any networked component can fail if it runs out of bandwidth to talk to other components. But don’t be seduced by that into thinking that that’s worth mentioning. It’s typically not a problem IRL. So don’t mention it, in answering questions like these… I’ve noticed that many HR grads tackling system design questions routinely mention bandwidth, trying to be thorough, but it just shouts of inexperience to do that, so don’t, please.  (Unless you are specifically talking about a mobile client trying to talk over a non-WIFI connection to your servers, then of course bandwidth constraints are worth considering).

Any component is a process or set of processes running ultimately on a machine (virtual or not), so it can run out of memory, disk space, or CPU.

The web server doesn’t write much to its own disk (aside from logs) so it will more likely fail, resource-wise, due to CPU or running out of memory.  Running out of disk should only happen in exceptional cases where the logging is misconfigured and the logs don’t rotate properly but just keep writing to new files and filling up disk. Running out of memory should only happen in exceptional cases where the app has a memory leak or is misconfigured for the machine it’s on. So the most likely resource-related failure mode of a web server is going to be running out of CPU.  

Note: you can mention that if this weren’t a Node server, and if this system weren’t so simple, with no dependencies other than on the database itself, you’d also face the potential for the web server to bog down while waiting for synchronous service calls to return. In a system unlike Node, where serving each request consumes considerable resources in order to service, the client requests will quickly stack up in a high-traffic situation, while waiting for 2nd- or 3rd-party calls to return, and the later requests can wind up dropping on the floor from timeouts.

The database is also most likely to be a failure point, resource-wise, when it is “out of CPU”, in a manner of speaking. This might or might not literally mean that the CPU is actually visibly pegged, perhaps a better way to say this is "running out of time". Meaning that the database as a program can only finish processing queries  in terms of executing simultaneous queries, especially even slightly long-running queries. Similar to the failure mode described above, queries can stack up in the processing queue (although database servers are multi-threaded, there are limits to how much context switching among parallel queries they can really do).

Some common ways that databases wind up getting asked to do much work per query:

* when proper indexes aren’t applied, so every query triggers a table scan.
* Or if there are too many / too-ugly joins that trigger a ton of processing per query.
* Or if lock contention becomes a problem (too many queries trying to update the same row or set of rows, given your database settings).

In your case, there’s hardly anything going on here. The naive initial solution has literally a two (or so) column table with the short URL as an indexed key, there’s nothing to join and the lookup will be fast due to the index. It’s pretty hard to see the system failing due to db lookups, this given. 

You could talk speculatively about how, if db performance somehow did become a problem in the future, you could approach the problem either vertically (beefing up the db server, which is usually the easy first step to take), or horizontally (figuring out how to spread the load across multiple shards, typically).  Of course, before taking either of those steps, you’d actually measure what’s going on in order to make an evidence-based decision about investing development time or dollars.  Which leads to...
## Maintainability / Operationalizing
One oft-overlooked angle to system design is how you’ll keep the thing running IRL. 

Being mere mortals and not omniscient super-beings (such as, say, Geoff Boss), we need data in digestible formats in order to be able to spot patterns when troubleshooting or generally for keeping tabs the system’s health.

That implies monitoring the system, like what New Relic or Data Dog provide. Make sure you know basically what those services do and the kind of graphs / visibility they give you. They also provide some alerting, more on that below.

You also need some kind of logging system, of course. You’re used to being able to look at a console and see your output streaming by for a single process on a single machine. When you go to scale you will have many instances all merrily writing reams of data to many logs. Therefore you will need to set up log aggregation and probably log searching / filtering as well.  Look at services like PaperTrail, LogEntries, and Splunk to see what features they offer.

Note in particular: although it’s indispensable to be able to manually pore over logs to look for exceptional situations and patterns, you’ll also want your system to automatically alert you when there are troubling patterns in the logs. That’s a standard feature area for logging services.

You may also want to track system uptime from the outside -- look at the Pingdom service. As the name suggests they do simple pings of your publicly visible pages (if the app requires sign-in), but they also can do Selenium-like scripts that mimic user activity. Either way they’ll check your uptime and you can trigger alerts through them as well. 

Having set up the above monitoring and alerting, you need to be able to react to problems quickly when they arise. That means setting up some kind of paging system, like what the PagerDuty service offers.  Check them out and see what their deal is too…

You’ll want to implement backups for your data.  Replicating your master database to one or more slave databases in near-realtime is a common simple approach there.  This enables you to flip a slave to master with minimal downtime for your overall system if the master database goes out of commission.

Speaking of downtime, what does happen when the system is down, either planned maintenance, or unplanned?  Since the component that’s crashing might be your normal web servers, you may want to have a separate dedicated server (or 3rd party service) to serve a maintenance page. Or perhaps you build it into your main web server, but in a way that falls back to simple static web page serving, so can still be served even if most things are broken. (A static page might not work well though if you want to display partially-dynamic things like announcing the time window of a specific scheduled downtime).

There’s a lot more stuff you can do in this area, of course (all these sections could be expanded into book-length treatments of all the possibilities and edge cases and strategies, obviously), but touching on the basics above will be very reassuring to your interviewer.

## Extensibility / Business needs
One VERY oft-overlooked angle to system design is catering to the business needs that drive the existence of this technical system in the first place. 

A big example is business reporting. Since we are presuming that the business in this hypothetical case is successful, there will be money and reason to afford business analysts poring over site data to optimize sales / traffic / partnerships, etc. 

The db queries to satisfy such business reporting needs often are long and expensive because they are aggregating and processing data over an entire time window.

The simple thing to mention here is that you don’t want those queries to be pummeling the live master database, so you can replicate the data off to a reporting slave, and hit that instead.

Another big business need is security, so you could potentially talk about that angle too. How might you stop DDOS attacks is a typical fun one here. 

## A quantitative estimation approach to all this
With the above basics in place, you can now try numerically estimating traffic and thereby figuring out what your pain points are likely to be and what options you have to address them.

To watch someone working through actual numeric back-of-the-envelope calculations that illustrate/apply some of the ideas above, and more besides, please read through / watch the (short!) vids at the following site: 
https://www.hiredintech.com/classrooms/system-design/lesson/55