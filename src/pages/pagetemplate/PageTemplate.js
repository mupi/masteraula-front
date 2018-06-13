import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'

const PageTemplate = ({children}) =>
    <div className="page">
        <MainMenu />
        {children}
    </div>
