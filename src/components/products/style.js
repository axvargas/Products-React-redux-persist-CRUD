import { makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(0.25),
    },
    table:{
        marginBottom:'1rem',
    },
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    foot: {
        [theme.breakpoints.down('xs')]: {
            '& .MuiTablePagination-spacer-234': {
                flex: 'none',
            },
            '& .MuiToolbar-gutters-54': {
                paddingLeft: '0px',
                paddingRight: '0px',
            },
            '& .MuiTablePagination-selectRoot-239': {
                marginLeft: '0px',
                marginRight: '28px'
            }
        },

    },
    typo: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
}));
export default useStyles;