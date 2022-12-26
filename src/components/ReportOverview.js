import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import testFile from '../testFile.txt'

const ReportOverview = ({open, setOpen, id}) => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleClose = () => {
        setOpen(false);
      };

    const descriptionElementRef = useRef(null);

    useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);

    useEffect(() => {
        // load data here from report 
        if(open === true) {
          setIsLoading(true)
          fetch(testFile)
          .then(result => result.text())
          .then(data => {
            setData(data)
          })
          .finally(() => setIsLoading(false))
        }
        // eslint-disable-next-line
    }, [open])
  
    return (
      <div>
        <Dialog
            open={open}
            onClose={handleClose}
            scroll='paper'
        >
            <DialogTitle>Report</DialogTitle>
            <DialogContent 
              dividers={true}
              sx={{
                width: '400px',
                height: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    {!isLoading
                    ? data
                    : <CircularProgress/>
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
      </div>
    )
}

export default ReportOverview