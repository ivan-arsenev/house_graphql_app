import { Button, Card, DatePicker, Divider, Typography } from 'antd'
import { displayErrorMessage, formatListingPrice } from '../../../../lib/utils'
import moment, { Moment } from 'moment'

import React from 'react'

const { Paragraph, Title } = Typography

interface Props {
    price: number;
    checkInDate: Moment | null;
    checkOutDate: Moment | null;
    setCheckOutDate: (checkOutDate: Moment | null) => void;
    setCheckInDate: (checkInDate: Moment | null) => void;
}



export const ListingCreateBooking = ({ price, checkInDate, checkOutDate, setCheckOutDate, setCheckInDate }: Props) => {

    const disabledDate = (currentDate?: Moment) => {
        if (currentDate) {
            const dateIsBeforeEndOfDay = currentDate.isBefore(moment().endOf('day'))

            return dateIsBeforeEndOfDay
        } else {
            return false
        }

    }

    const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
        if (checkInDate && selectedCheckOutDate)
            if (moment(selectedCheckOutDate).isBefore(checkInDate, 'days')) {
                return displayErrorMessage("You can't book date of check out to be prior to check in!")
            }
        setCheckOutDate(selectedCheckOutDate)
    }

    const datePicker = (checkIn: boolean) => {
        const dateValue = checkIn ? checkInDate : checkOutDate
        const checkText = `Check ${checkIn ? 'In' : 'Out'}`
        const onChangeFunc = checkIn ? setCheckInDate : verifyAndSetCheckOutDate
        const checkOutInputDisabled = !checkIn && !checkInDate

        return <div className='listing-booking__card-date-picker'>
            <Paragraph strong>{checkText}</Paragraph>
            <DatePicker
                disabledDate={disabledDate}
                format={'YYYY/MM/DD'}
                showToday={false}
                value={dateValue ? dateValue : undefined}
                onChange={onChangeFunc}
                disabled={checkOutInputDisabled}
                onOpenChange={() => checkIn && setCheckOutDate(null)}
            />
        </div>
    }

    const buttonDisabled = !checkInDate || !checkOutDate
    return (
        <div>
            <Card className="listing-booking__card">
                <div>
                    <Paragraph>
                        <Title level={2} className='listing-booking__card-title'>
                            {formatListingPrice(price)}
                            <span>/day</span>
                        </Title>
                    </Paragraph>
                    {datePicker(true)}
                    <Divider />
                    {datePicker(false)}
                </div>
                <Divider />
                <Button disabled={buttonDisabled} size='large' type='primary' className='listing-booking__card-cta'>Request to book!</Button>
            </Card>
        </div>
    )
}
