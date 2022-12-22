import { MonitorHeart } from "@mui/icons-material"
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
            <AppBar position="static">
                <Toolbar>
                    <MonitorHeart sx={{ marginRight: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Medical Records
                    </Typography>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header