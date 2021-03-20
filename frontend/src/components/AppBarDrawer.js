import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PaymentIcon from '@material-ui/icons/Payment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SettingsIcon from '@material-ui/icons/Settings';
/* import DataTable from './DataTable';
import AddIcon from '@material-ui/icons/Add';
import { ColumnHeaderSortIcon } from '@material-ui/data-grid'; */

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }, 
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  flex: {
    flex: 1
  },
  addButton: {
      fontSize: 20,
      margin: theme.spacing(2),
      /* cursor: pointer, */
  }, 
  /* appBarTitle: {
    display: 'flex',
    justifyContent: 'flex-end'
  }, */
  /* title: {
    flexGrow: 1,
  },
  appBarImage: {
    maxHeight: '75px',
    paddingRight: '20px'       
  }, */  
  logout: {
      underline: 'none',
      '&:hover': {
        backgroundColor: 'ffff'
      }
  },
  }, 
}));

export default function AppBarDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { user } = props;  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="inherit"        
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
         {/* <img
                className={classes.appBarImage}
                src="img/grandstack.png"
                alt="Management Logo"
              />  */}
          <Typography container variant="h6">
            Management
          </Typography>         
          {/* <IconButton>
             <NotificationsIcon />
          </IconButton>
          <IconButton>
             <AccountCircleIcon />
          </IconButton>        */}  
          <Typography>
            {/* <AddIcon className={ classes.addButton } /> */}
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>          
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />        
        { user &&
          <> 
          <List>
          <ListItem button>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText>{user.name}</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
            <ListItemText>Account Balance</ListItemText>
          </ListItem>
          </List>
          <Divider />
          <List>
          <ListItem button>
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            <ListItemText>Orders</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText>Setting</ListItemText>
          </ListItem>
          </List>
          <Divider />
          <List>
          <ListItem button>
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            <ListItemText>Salary</ListItemText>
          </ListItem> 
          <Link href='/logout'>        
          <ListItem button className={classes.logout}>          
            <ListItemIcon><ArrowBackIcon /></ListItemIcon>
            <ListItemText>Logout</ListItemText>          
          </ListItem> 
          </Link>         
          </List>
          </>
        }            
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography>
          {/* <h2>New Orders</h2> */}
          {/* <DataTable /> */}
        </Typography>
        <Typography>
          {/* <h2>Delivered Orders</h2> */}
          {/* <DataTable /> */}
        </Typography>        
      </main>
    </div>
  );
}
