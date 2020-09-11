import { Avatar, Button, Icon, Menu } from 'antd'
import { displayErrorMessage, displaySuccessNotification } from '../../../../lib/utils'

import { LOG_OUT } from '../../../../lib/graphql/mutations'
import { Link } from 'react-router-dom'
import { LogOut as LogOutData } from '../../../../lib/graphql/mutations/LogOut/__generated__/LogOut'
import React from 'react'
import { Viewer } from '../../../../lib/types'
import { useMutation } from '@apollo/react-hooks'

const { Item, SubMenu } = Menu

interface Props {
    viewer: Viewer
    setViewer: (viewer: Viewer) => void // function prop
}

export const MenuItems = ({ viewer, setViewer }: Props) => {
    const [logOut] = useMutation<LogOutData>(LOG_OUT, {
        onCompleted: (data) => {
            if (data && data.logOut) {
                setViewer(data.logOut)
                displaySuccessNotification("You're successfully logged out")
            }
        },
        onError: () => {
            displayErrorMessage("Sorry! We trying to fix this problem, try again later!")
        }

    })

    const handleLogOut = () => {
        logOut()
    }
    const subMenuLogin =
        viewer.id && viewer.avatar ? (
            <SubMenu title={<Avatar src={viewer.avatar} />}>
                <Item key="/user">
                    <Link to={`/user/${viewer.id}`}>
                        <Icon type="user" />
                      Profile
                </Link>
                </Item>
                <Item key='/logout'>
                    <div onClick={handleLogOut}>
                        <Icon type='logout' />
                    Log Out
                </div>
                </Item>
            </SubMenu>
        ) : (
                <Item key='/login'>
                    <Link to='/login'>
                        <Button type='primary'>Sign In</Button>
                    </Link>
                </Item>
            )

    return (
        <Menu mode='horizontal' selectable={false} className='menu'>
            <Item key='/host'>
                <Link to='/host'>
                    <Icon type='home' />
                      Host
                </Link>
            </Item>
            {subMenuLogin}
        </Menu>
    )
}
