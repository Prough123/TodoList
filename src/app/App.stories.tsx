import React from 'react'
import {action} from '@storybook/addon-actions'
import App from './App'
import StoryRouter from 'storybook-react-router';
import {ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator'

export default {
    title: 'App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator, StoryRouter]
}

export const AppBaseExample = (props: any) => {
    return (<App demo={true} />)
}
