import { createTheme } from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3450A1'
        },
        secondary: {
            main: '#1E0057'
        },
        text: {
            primary: '#fff',
            secondary: '#9FA3FF'
        }
    },
    typography: {
        h4: {
            fontWeight: 600
        }
    }
})


export default theme;