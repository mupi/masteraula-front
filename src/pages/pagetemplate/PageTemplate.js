import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import { MainMenu, AboutMenu } from './menu'

const PageTemplate = ({children}) =>
    <div className="page">
        <MainMenu />
        {children}
    </div>
