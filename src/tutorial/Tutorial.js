import {useEffect, useState, useRef} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InputOne from './components/inputs/InputOne'
import InputTwo from './components/inputs/InputTwo'
import InputThree from './components/inputs/InputThree'

function Tutorial(props){
    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/2'>
                        <InputTwo/>
                    </Route>
                    <Route path="/">
                        <InputOne/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Tutorial