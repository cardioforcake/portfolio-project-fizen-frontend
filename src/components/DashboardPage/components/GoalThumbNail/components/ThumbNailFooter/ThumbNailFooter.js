import { Button, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  footerTN:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    height: '90%'
  }
}))

function ThumbNailFooter(props){
  const classes = useStyles()

  return(
    <div className={classes.footerTN}>
      <Button>
        <img src="/Trash.svg" alt="Delete" height="80%" />
      </Button>
      <Button>
        <img src="/Plus.svg" alt="Create" height="80%" />
      </Button>
      <Button>
        <img src="/Edit.svg" alt="Edit" height="80%" />
      </Button>
    </div>
  )
}

export default ThumbNailFooter