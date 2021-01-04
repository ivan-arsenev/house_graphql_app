import { Col, Layout, Row } from 'antd'
import { ErrorBanner, PageSkeleton } from '../../lib/components'
import { ListingBookings, ListingCreateBooking, ListingDetails } from './components'
import { Listing as ListingData, ListingVariables } from '../../lib/graphql/queries/Listing/__generated__/Listing'
import React, { useState } from 'react'

import { LISTING } from '../../lib/graphql/queries'
import { Moment } from 'moment'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

interface MatchParams {
    id: string
}

const { Content } = Layout
const PAGE_LIMIT = 3

export const Listing = ({ match }: RouteComponentProps<MatchParams>) => {
    const [bookingsPage, setBookingsPage] = useState(1)
    const [checkInDate, setCheckInDate] = useState<Moment | null>(null)
    const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null)

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
        return (
            <Content className='listings'>
                <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon!" />
                <PageSkeleton />
            </Content>
        )
    }

    const listing = data ? data.listing : null
    const listingBookings = listing ? listing.bookings : null

    const listingDetailsElement = listing ? <ListingDetails listing={listing} /> : null

    const listingBookingsElement = listingBookings ?
        <ListingBookings
            setBookingsPage={setBookingsPage}
            bookingsPage={1}
            limit={1}
            listingBookings={listingBookings}
        /> : null

    const listingCreateBooking = listing ?
        <ListingCreateBooking
            price={listing.price}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            setCheckInDate={setCheckInDate}
        /> : null

    return (
        <Content className='listings'>
            <Row gutter={24} type='flex' justify='space-between'>
                <Col xs={24} lg={14}>
                    {listingDetailsElement}
                    {listingBookingsElement}
                </Col>
                <Col xs={24} lg={10}>
                    {listingCreateBooking}
                </Col>
            </Row>
        </Content>
    )
}