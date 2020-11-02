import { Listing as ListingData, ListingVariables } from '../../lib/graphql/queries/Listing/__generated__/Listing'
import React, { useState } from 'react'

import { LISTING } from '../../lib/graphql/queries'
import { Layout } from 'antd'
import { PageSkeleton } from '../../lib/components'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

interface MatchParams {
    id: string
}

const { Content } = Layout
const PAGE_LIMIT = 3

export const Listing = ({ match }: RouteComponentProps<MatchParams>) => {
    const [bookingsPage, setBookingsPage] = useState(1)

    const { loading, data, error } = useQuery<ListingData, ListingVariables>(LISTING, {
        variables: {
            id: match.params.id,
            bookingsPage,
            limit: PAGE_LIMIT
        }
    })

    if (loading) {
        return (
            <Content className='listings'>
                <PageSkeleton />
            </Content>
        )
    }

    if (error) {

    }

    return (
        <div>
            Listing
        </div>
    )
}