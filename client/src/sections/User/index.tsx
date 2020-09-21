import { Col, Layout, Row } from 'antd'
import { ErrorBanner, PageSkeleton } from '../../lib/components'
import { User as UserData, UserVariables } from '../../lib/graphql/queries/User/__generated__/User'

import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { USER } from '../../lib/graphql/queries'
import { UserProfile } from './components'
import { Viewer } from '../../lib/types'
import { useQuery } from '@apollo/react-hooks'

interface Props {
    viewer: Viewer
}

interface MatchParams {
    id: string
}

const { Content } = Layout

export const User = ({ match, viewer }: Props & RouteComponentProps<MatchParams>) => {

    const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
        variables: {
            id: match.params.id
        }
    })

    if (loading) {
        return (
            <Content className="user">
                <PageSkeleton />
            </Content>
        )
    }

    if (error) {
        return (
            <Content className="user">
                <ErrorBanner description='This user may not exist' />
                <PageSkeleton />
            </Content>
        )
    }


    const user = data ? data.user : null
    const viewerIsUser = viewer.id === match.params.id

    const userProfileElement = user ? <UserProfile viewerIsUser={viewerIsUser} user={user} /> : null

    return (
        <Content className='user'>
            <Row gutter={12} type='flex' justify='space-between'>
                <Col xs={24}>{userProfileElement}</Col>
            </Row>
        </Content>
    )
}
