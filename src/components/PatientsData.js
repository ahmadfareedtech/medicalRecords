import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import ReportOverview from "./ReportOverview";

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, report: 'CBC' },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, report: 'CBC' },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, report: 'CBC' },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, report: 'CBC' },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 28, report: 'CBC' },
//     { id: 6, lastName: 'Melisandre', firstName: 'Narthy', age: 150, report: 'CBC' },
//     { id: 7, lastName: 'Stark', firstName: 'Rob', age: 44, report: 'CBC' },
//     { id: 8, lastName: 'Greyjoy', firstName: 'Theon', age: 36, report: 'CBC' },
//     { id: 9, lastName: 'Baratheon', firstName: 'Stannis', age: 65, report: 'CBC' },
// ];

const row = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, report: 'CBC' },
]

const PatientsData = () => {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)

    const handleClickOpen = (id) => {
        setId(id)
        setOpen(true)
    }

    return (
        <>
            <ReportOverview open={open} setOpen={setOpen} id={id}/>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">First&nbsp;Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Last&nbsp;Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Age</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Report&nbsp;Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{row.firstName}</TableCell>
                    <TableCell align="center">{row.lastName}</TableCell>
                    <TableCell align="center">{row.age}</TableCell>
                    <TableCell align="center">{row.report}</TableCell>
                    <TableCell align="center"> 
                        <Button variant="contained" onClick={handleClickOpen.bind(this, row.id)}>View Report</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
    )
}

export default PatientsData