import { Button, Typography } from '@mui/material';
import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    constructor() {
        super();
        this.state = { hasError: false };
    }

    componentDidCatch(error) {
        this.setState({ hasError: true });
        console.log(error)
    }

    render() {
        if (this.state.hasError) {
            return <div className="errorBoundary">
                <Typography variant="h4" style={{ lineHeight: 1.7, fontWeight: 500 }} >Sorry Something went wrong!</Typography>
                <Typography variant="h4" style={{ lineHeight: 1.7, fontWeight: 500 }} >
                    {!window.navigator.onLine ? 'check your internet connection' : 'Try again later.'}
                </Typography>
                <Button variant="contained" style={{ textTransform: 'capitalize' }} onClick={() => { window.location.reload() }} disableElevation>
                    Try Again Now
                </Button>
            </div>
        }
        return this.props.children;
    }
}
