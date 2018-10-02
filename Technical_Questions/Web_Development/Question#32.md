## Question

What happens when you type in google.com into your browser and press enter?

## Answer

ALL CREDIT -> https://github.com/tim-hr/stuff/wiki/Outline-for-%22What-happens-when-you-type-http:--www.gmail.com-into-your-browser-location-bar%3F%22

### What interviewers are looking for
```
1.) Do you have a clear, systemic understanding of how web apps work?
2.) Do you care about how things work under the hood, generally?
3.) Are you able to coherently marshal your thoughts about a system?
4.) Can you deal effectively with a very open-ended question, clarifying the questioner's intent and managing your time so as to give a "good" answer?
```

Good programmers operate fluidly at multiple levels of abstraction and across many components, tying them all together in a coherent story of how processes unfold.

In particular, when you are doing (a) system design and (b) troubleshooting, having those mental models in your head is a key asset.

Think of this as a weeder question to separate out people who can only code via copy/paste/tweak (and don't really understand what's going on) versus people who code based on clear mental models.

### Layman-level outline
* Browser accepts the input "google.com".
* Computer sends a request for that page to Google's computers.
* Google's computers process the request and sends the page contents back.
* Browser displays the page.

### High-level outline for interviews
* DNS lookup on the URL, now you have an IP address.
* Use the IP address + the port number (which is explicitly or implicitly described in the URL) to connect to the server via TCP/IP.
* Google is obviously a huge site with many servers, so some kind of load-balancing is involved to route the request to a specific available server.
* Use the TCP stream thus opened up to start sending text to the server.
* Send an HTTP request (which is just text) to tell the server which path, host, and "verb" (GET, POST, etc) you are requesting.
* The HTTP request also contains a variety of other important headers which tell the server who you are and more about what you want.
* The server process the text of the HTTP request into a request object in memory.
* The server probably has some kind of an MVC framework; it processes the request through that.
* The resulting bundle of HTML, inline JavaScript, inline CSS, and possibly inlined binary data, is packaged up into an HTTP response.
* The HTTP response is shipped back through the TCP stream.
* The browser begins parsing the big wad of text in the HTTP response.
* As HTML, JavaScript, CSS are parsed, more HTTP requests are sent out to fetch more assets for the page.
* The browser executes script and renders the results of all its parsing to the viewport.
Note: there is a LOT more than can be said, but outlining up to this level is probably good enough for most interviews.
