# About
This is a project where people can vote on their favorite restaurant to have lunch.

# Rules

1 - One restaurant cannot be choosen on the same week

2 - One user can vote just one time per day

3 - The user need to have a interface to check the winner

# Installation

You just need to install dependencies:

```bash
npm install
```

And start the program

```bash
node bin/www
```

# Test

1º - Run the server

```
node bin/www
```

2º - Run the test

```
npm test
```

# What could be improved?

```
1 - Could be using Angular2
```

```
2 - Could be able to change my vote
```

# How it works

```
One user can vote just once per day, so after his vote he can't vote and the list of available places changed for a message that says to wait.
```

```
One place can't be voted more than once per week, so on the list it will not appear for voting this is how i am making this rule.
```

```
One user should be able to check who is the winner, there is a page Result for this.
```

```
11:45 is the deadline to make vote, after this time the next check will see the winner with the biggest number os votes, if there is no vote I get the first.
```
