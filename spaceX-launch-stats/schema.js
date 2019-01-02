const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

// Lauches Type
const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

// Rocket Type
const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// Root Query that has resolver that resolve our data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    lauches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get('https://api.spacexdata.com/v3/launches')
          .then((res) => res.data);
      }
    },
    lauch: {
      type: LaunchType,
      args: {
        flight_number: {
          type: GraphQLInt
        }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then((res) => res.data);
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get('https://api.spacexdata.com/v3/rockets')
          .then((res) => res.data);
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then((res) => res.data);
      }
    }
  }
});

// Also takes mutation if we have any
module.exports = new GraphQLSchema({
  query: RootQuery
});

/*
{
  lauches {
    flight_number
    mission_name
    launch_year
    launch_date_local
    launch_success
    rocket{
      rocket_id
      rocket_name
      rocket_type
    }
  }
}

-----------------
{
  lauch(flight_number: 2){
    mission_name
    .....
  }
}
*/
