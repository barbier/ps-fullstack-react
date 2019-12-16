import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom'

const Navigation = () => (
    <Link to="/dashboard">
        My app
    </Link>
)

export const ConnectedNavigation = connect(state => state)(Navigation)