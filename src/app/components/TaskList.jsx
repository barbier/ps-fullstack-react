import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestTaskCreation } from '../store/mutations'

export const TaskList = ({tasks, name, id, createNewTask}) => (
    <>
        <h2>{name}</h2>
        <ul>
            {
                tasks.map(task => <Link to={`/task/${task.id}`} key={task.id}>
                    <li>{task.name}</li>
                </Link>)
            }
        </ul>
        <button onClick={() => createNewTask(id)}>Add new</button>
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createNewTask(id) {
            console.log("Creating a new task...", id)
            dispatch(requestTaskCreation(id))
        }
    }
}

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList)