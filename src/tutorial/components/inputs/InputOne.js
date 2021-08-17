import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

function InputOne(props){
    return(
        <div>
            Tutorial #1
            <Link to="/2">
                <Button>Tut2</Button>
            </Link>
        </div>
    )
}

export default InputOne