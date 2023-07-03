import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthData } from 'entities/admin-auth/api'
import { AdminAuth } from 'shared/types'
import { AdminAuthSlice } from '../type'

export const loadAuthData = createAsyncThunk<
    AdminAuth,
    undefined,
    { state: { adminAuth: AdminAuthSlice }; rejectValue: string }
>(
    'admin/auth',
    async (_, { rejectWithValue }) => {
        try {
            const authData = await getAuthData()

            return authData
        } catch (error) {
            if (error instanceof Error) return rejectWithValue(error.message)

            return rejectWithValue('Unknown error')
        }
    },
    {
        condition: (_, { getState }) => {
            if (getState().adminAuth.status === 'loading') {
                return false
            }
        },
    },
)
