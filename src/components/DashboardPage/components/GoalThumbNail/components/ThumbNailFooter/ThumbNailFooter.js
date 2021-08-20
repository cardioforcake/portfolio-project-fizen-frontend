import { Dialog, DialogContent, DialogContentText, Button, Typography, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {useEffect, useState} from 'react';

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
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  // Only open if we have a callback
  function handleOpenDelete() {
    if (props.doDeleteGoal) {
      setOpenDelete(true);
    }
  }

  return(
    <div className={classes.footerTN}>
      <Button onClick={() => handleOpenDelete()}>
        <img src="/Trash.svg" alt="Delete" height="80%" />
      </Button>
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <DialogContent>
          <DialogContentText>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <div>Would you like to DELETE this goal?</div>
              </Grid>
              <Grid container justifyContent="space-around">
                <Grid item>
                  <Button
                    variant="contained"
                    color="default"
                    onClick={() => {
                      setOpenDelete(false);
                      props.doDeleteGoal();
                    }}
                  >
                    YES
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => setOpenDelete(false)}>NO</Button>
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Button onClick={() => setOpenCreate(true)}>
        <img src="/Plus.svg" alt="Create" height="80%" />
      </Button>
      <Dialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      >
        <DialogContent>
          <DialogContentText>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <div>Would you like to create a new Goal?</div>
              </Grid>
              <Grid container justifyContent="space-around">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setOpenCreate(false);
                      props.doCreateGoal();
                    }}
                  >
                    YES
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setOpenCreate(false)}>
                    NO
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Button>
        <img src="/Edit.svg" alt="Edit" height="80%" />
      </Button>
    </div>
  )
}

export default ThumbNailFooter
