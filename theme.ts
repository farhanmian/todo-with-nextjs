// import { createTheme } from "@material-ui/core";
import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: '#fff'
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#fff'
        },
        secondary: {
            main: '#000'
        }
    },
    typography: {
        h4: {
            fontWeight: 600
        }
    },
    
})


export default theme;