import React from 'react'
import { connect } from 'react-redux'

export const TaskList = ({tasks, name}) => (
    <>
        <h2>{name}</h2>
        <ul>
            {
                tasks.map(task => <li>{task.name}</li>)
            }
        </ul>
    </>
)

const mapStateToProps = (state, ownProps) => {
    const groupID = ownProps.id
    return {
        name: ownProps.name,
        id: groupID,
        tasks: state.tasks.filter(task => task.group === groupID),
    }
}

export const ConnectedTaskList = connect(mapStateToProps)(TaskList)