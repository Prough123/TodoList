import {Dispatch} from 'redux'
import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, FieldErrorType, LoginParamsType} from '../../api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import thunk from "redux-thunk";


export const loginTC = createAsyncThunk<undefined, LoginParamsType, {
    rejectValue: {
        errors: Array<string>,
        fieldsErrors?: Array<FieldErrorType>
    }
}>('auth/login',
    async (data, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await authAPI.login(data)
        try {
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err) {
            const error: AxiosError = err
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    })

export const logoutTC = createAsyncThunk(
    "auth/logout",
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await authAPI.logout()
        try {
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({})
            }
        } catch (error) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    })


export const logoutTC_ = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    }
    ,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

