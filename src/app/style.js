import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        margin: '0px',

    },
    typo: {
        color: 'black',
        fontWeight: '700',
        marginBottom: '50px',
        marginTop: '80px',

    },
    paper: {
        textAlign: 'center',
        backgroundColor: '#0277bd',
        borderRadius: '0px',
        width: '100%',
        color: 'white',
        minHeight: '48px'
    },

    fab: {
        backgroundColor: '#de7d3c',
        '&:hover': {
            backgroundColor: 'grey'
        }
    },
    contain: {
        marginTop: '0.5rem',
        marginBottom: '0.9rem',
    },
    success: { backgroundColor: '#0277bd' },
    error: { backgroundColor: '#f50057' },
    warning: { backgroundColor: 'yellow' },
    info: { backgroundColor: 'blue' },
}));
export default useStyles;