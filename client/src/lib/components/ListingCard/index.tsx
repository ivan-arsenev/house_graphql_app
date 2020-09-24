import { Card, Icon, Typography } from 'antd'
import { formatListingPrice, iconColor } from '../../utils'

import { Link } from 'react-router-dom'
import React from 'react'

interface Props {
    listing: {
        id: string;
        title: string;
        image: string;
        address: string;
        price: number;
        numOfGuests: number
    }
}

const { Text, Title } = Typography

export const ListingCard = ({ listing }: Props) => {
    const {
        id,
        title,
        image,
        address,
        price,
        numOfGuests,
    } = listing

    return (
        <Link to={`/listing/${id}`}>
            <Card hoverable
                cover={<div style={{ backgroundImage: `url(${image})` }} className='listing-card__cover-img' />}

            >
                <div className="listing-card__details">
                    <div className="listing-card__description">
                        <Title className="listing-card__price">
                            {formatListingPrice(price)}
                            <span>/day</span>
                        </Title>
                        <Text strong ellipsis className='listing-card__address'>
                            {title}
                        </Text>
                        <Text ellipsis className='listing-card__location'>
                            {address}
                        </Text>
                    </div>
                    <div className="listing-card__dimensions listing-card__dimensions--guests">
                        <Icon type='user' style={{ color: iconColor }} />
                        <Text>{numOfGuests} guests</Text>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
