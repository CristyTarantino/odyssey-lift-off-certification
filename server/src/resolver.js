const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: (_, __, {dataSources}) => {
      return dataSources.trackAPI.getTracksForHome();
    },

    // get a single track by id, for the Track page
    track: (_, {id}, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id)
    },

    // get a single module by id, for the Module page
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id)
    }
  },
  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: async (_, { id }, {dataSources}) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id)
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null
        }
      }
    }
  },
  /*
   The parent argument contains data returned by our tracksForHome resolver,
   and because tracksForHome returns a list,
   Apollo Server iterates through that list and calls the author resolver once for each track.
   It passes the current track as the value of parent, enabling us to extract the authorId.
   */
  Track: {
    author: ({authorId}, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id)
    }
  },
}

module.exports = resolvers;
