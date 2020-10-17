---
title: "Minimum viable GraphQL: the concepts"
date: 2019-11-05T12:30:00Z
tags: ["js", "graphql", "learn"]
---

GraphQL is a specification for APIs developed at Facebook. It consists of a language for querying data and a runtime that understands those queries and gets the right data. In effect it's an agreed-upon convention with well-defined rules for fetching and serving data.

## Unique selling points

GraphQL's main selling points are (in my opinion):

1. Clients can query exactly the data they need (less over-fetching)
1. The data and queries are strongly typed via a schema (fewer typos)
1. There's a well-defined "right way to do it" (fewer opinions)

## Tooling

GraphQL's strictly spec'd and strongly typed nature lends itself to nice automated tooling. For example most APIs using GraphQL expose a [Graphiql](https://github.com/graphql/graphiql) explorer. This is a graphical interface that exposes the API schema and lets you make queries. You can see an example of this for the [demo Pokémon API](https://pokemon-gql.now.sh/api) we'll be using.

## Fetching data

GraphQL's query syntax is designed to be similar to JSON. This means the query ends up looking a lot like the resulting data. For example, sending this query to my [Pokémon GraphQL API](https://pokemon-gql.now.sh/api?query=%7B%0A%20%20allPokemon%7B%0A%20%20%20%20name%0A%20%20%7D%0A%7D):

```graphql
{
  allPokemon {
    name
  }
}
```

results in a JSON response that looks like this:

```json
{
  "data": {
    "allPokemon": [
      { "name": "bulbasaur" },
      { "name": "ivysaur" },
      { "name": "venusaur" },
      { "name": "charmander" },
      { "name": "charmeleon" },
      { "name": "charizard" },
      ...
    ]
  }
}
```

If we realise we also need the ID of each pokémon we can adjust our query like this:

```graphql
{
  allPokemon {
    name
    id
  }
}
```

Now our pokémon objects will also contain the `"id"` property.

Hopefully you can see how it's easier for a client to fetch exactly the data it needs, in the shape it needs. In a typical REST API the client might have to hit multiple endpoints, fetching lots of JSON it doesn't need, and then reformat it to the right shape.

### Query arguments

GraphQL queries can also accept arguments to allow filtering and sorting data, and fetching dynamically. For example we can get a specific pokémon with this query:

```graphql
{
  pokemon(name: "pikachu") {
    name
    id
    weight
  }
}
```

Here's the result:

```json
{
  "data": {
    "pokemon": {
      "id": "25",
      "name": "pikachu",
      "weight": 60
    }
  }
}
```

### Operation type and name

Until now we've been relying on a shorthand: without specifying the type of operation we're performing (or giving it a name) GraphQL assumes we're just querying data. The name is only required if you're performing multiple operations. Here's how our first query looks with the operation type and name specified:

```graphql
query Pokemons {
  allPokemon {
    name
  }
}
```

### Dynamic argument variables

Hard-coded arguments are not very useful. If we want to pass dynamic values in as arguments we need to use "variables". Variables must be declared (including their type) as part of the named query. They can then be referenced in the query arguments:

```graphql
query Pikachu($myName: String!) {
  pokemon(name: $myName) {
    name
    id
    weight
  }
}
```

The client must then send a separate `"variables"` object as part of the request. GraphQL will match the properties from this object to the variables declared in the query. We'll see how exactly this works when we talk about using GraphQL on the client in the next post.

The exclamation mark makes this a _required_ variable: the client _must_ pass a variable called `"name"` with a string value or it will receive an error.

## Sending data

So far we have only discussed fetching data. APIs usually also need a way to create or update data. GraphQL uses "mutations" to achieve this.

Mutations look similar to queries, but with the operation type set to "mutation" instead of "query" (the operation name is still optional). They usually also need some kind of input argument.

Our Pokémon API supports a `createPokemon` mutation that takes a new pokémon object as an argument:

```graphql
mutation MyNewPokemon {
  createPokemon(
    input: {
      name: "test"
      height: 1
      species_id: 10
      weight: 100
      base_experience: 5
      order: 1000
    }
  ) {
    id
    name
  }
}
```

You can [try this in GraphiQL](<https://pokemon-gql.now.sh/api?query=mutation%20create%20%7B%0A%09createPokemon(input%3A%20%7B%0A%20%20%20%20name%3A%20%22test%22%2C%0A%20%20%20%20height%3A%201%2C%0A%20%20%20%20species_id%3A%2010%2C%0A%20%20%20%20weight%3A%20100%2C%0A%20%20%20%20base_experience%3A%205%2C%0A%20%20%20%20order%3A%201000%0A%20%20%7D)%20%7B%0A%20%20%20%20name%0A%20%20%20%20id%0A%20%20%20%20order%0A%20%20%7D%0A%7D&operationName=create>).

Mutations should return what they just created so that you can immediately query for fields on it. Here we're asking for the ID and name of the created pokémon. Our response looks like this:

```json
{
  "data": {
    "createPokemon": {
      "id": "0",
      "name": "test"
    }
  }
}
```

## Actually sending queries

You may be wondering how you actually send these nice queries to a GraphQL API. That will depend on the client you're using as GraphQL is an intentionally client-agnostic spec. Read [Part Two of this series](/blog/minimum-viable-graphql-client/) for an introduction to making GraphQL requests from the browser using `fetch`.
