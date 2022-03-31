import { gql, useQuery } from '@apollo/client'
import { Layout, QueryResult, ModuleDetail } from '../components'

/**
 * GET_MODULE_AND_PARENT_TRACK gql query to retrieve a specific module and its parent track,
 * both needed for the ModuleDetail component
 */
export const GET_MODULE_AND_PARENT_TRACK = gql`
    query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
        module(id: $moduleId) {
            id
            title
            content
            videoUrl
        }
        track(id: $trackId) {
            id
            title
            modules {
                id
                title
                length
            }
        }
    }
`

/**
 * Module page fetches both parent track and module's data from the gql query GET_MODULE_AND_PARENT_TRACK
 * and feeds them to the Module detail component
 */
const Module = ({trackId, moduleId}) => {
  const {loading, error, data} = useQuery(GET_MODULE_AND_PARENT_TRACK, {
    variables: {
      moduleId,
      trackId
    }
  })
  return (
    <Layout fullWidh>
      <QueryResult loading={loading} error={error} data={data}>
        <ModuleDetail track={data?.track} module={data?.module} />
      </QueryResult>
    </Layout>
  )
}

export default Module
