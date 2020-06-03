import withStyles from "@material-ui/core/styles/withStyles";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";



export default withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
}))(Button);