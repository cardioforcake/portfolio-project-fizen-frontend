import {useEffect, useState, useRef} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InputOne from './components/inputs/InputOne'

function Tutorial(props){
    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route/>
                    <Route path="/">
                        <InputOne/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Tutorial