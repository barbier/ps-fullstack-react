import { take, put, select } from 'redux-saga/effects'
import uuid from 'uuid'
import axios from 'axios'
import * as mutations from './mutations'

const url = 'http://localhost:3000'

export function* taskCreationSaga() {
    while (true) {
        const { groupID } = yield take(mutations.REQUEST_TASK_CREATION)
        const ownerID = 'U1'
        const taskID = uuid()
        yield put(mutations.createTask(groupID, ownerID, taskID))
        const { res } = yield axios.post(`${url}/task/new`, {
            task: {
                id: taskID,
                group: groupID,
                owner: ownerID,
                isComplete: false,
                name: "New task",
            }
        })

        console.log(`Info: ${res}`)
    }
}

export function* taskModificationSaga() {
    while (true) {
        const task = yield take([
            mutations.SET_TASK_COMPLETE,
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME,
        ])
        axios.post(`${url}/task/update`, {
            id: task.taskID,
            group: task.groupID,
            name: task.name,
            isComplete: task.isComplete,
        })
    }
}