import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    tableR: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        }
    },
    edit: {
        marginRight: '1rem',
        [theme.breakpoints.down('xs')]: {
            marginRight: '0rem',
        },
    }
}));
export default useStyles;