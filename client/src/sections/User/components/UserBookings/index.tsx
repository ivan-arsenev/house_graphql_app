import { List, Typography } from 'antd'

import { ListingCard } from '../../../../lib/components'
import React from 'react'
import { User } from '../../../../lib/graphql/queries/User/__generated__/User'

interface Props {
    userBookings: User['user']['bookings']
    bookingsPage: number
    limit: number
    setBookingsPage: (page: number) => void
}

const { Paragraph, Text, Title } = Typography

export const UserBookings = ({
    userBookings,
    bookingsPage,
    limit,
    setBookingsPage
}: Props) => {
    const total = userBookings ? userBookings.total : undefined
    const result = userBookings ? userBookings.result : undefined

    const userBookingsList = userBookings ? (
        <List grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            lg: 4
        }}
            dataSource={result}
            locale={{ emptyText: "Your haven't made any bookings" }}
            pagination={{
                position: 'top',
                current: bookingsPage,
                total,
                defaultPageSize: limit,
                hideOnSinglePage: true,
                showLessItems: true,
                onChange: (page: number) => setBookingsPage(page)
            }}
            renderItem={userBookings => {
                const bookingHistory =
                    <div className="user-bookings__booking-history">
                        <div>
                            Check in: <Text strong>
                                {userBookings.checkIn}
                            </Text>
                        </div>
                        <div>
                            Check out: <Text strong>
                                {userBookings.checkOut}
                            </Text>
                        </div>
                    </div>
                return <List.Item>
                    {bookingHistory}
                    <ListingCard listing={userBookings.listing} />
                </List.Item>
            }}
        />
    ) : null

    const userBookingsElement = userBookingsList ? (
        <div className="user-bookings">
            <Title level={4} className="user-bookings__title">
                Listings
            </Title>
            <Paragraph className='user-bookings__description'>
                This section highlights the listings this user currently hosts and make available for booking
            </Paragraph>
            {userBookingsList}
        </div >
    ) : null

    return userBookingsElement
}
