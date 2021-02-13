import * as tasksActions from './tasks-actions'
import {asyncActions as todolistsAsyncActions} from './todolists-reducer'
import {slice} from './todolists-reducer'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}

export {
    tasksActions,
    todolistsActions,
}