# Match Patterns

## Prompt

Given two text files: 
1.) input.txt - a free-text document composed of 1 or more lines of text
2.) patterns.txt - a set of search strings (1 per line). 

Create an application (CLI or GUI) that can run in three following modes:

### Modes:
1: output all the lines from input.txt that match exactly any pattern in patterns.txt
2: output all the lines from input.txt that contain a match from patterns.txt somewhere in the line.
3: output all the lines from input.txt that contain a match with edit distance <= 1 patterns.txt


An example of this:

```
input.txt
Hello.  This is line 1 of text.
and this is another.
line 3 here
the end

patterns.txt
the end
matches
line 3
and this is anoother.

Mode 1 outputs:
the end

Mode 2 outputs:
line 3 here
the end

Mode 3 outputs:
and this is another.
the end
```