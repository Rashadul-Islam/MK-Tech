import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import './Sidebar.css'
import QuizIcon from '@mui/icons-material/Quiz';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../actions/userActions";
import { useDispatch, useSelector } from 'react-redux';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import MemberDashboard from '../../Screens/MemberDashboard/MemberDashboard';
import { AppBar, Typography } from '@mui/material';
import CreateProject from '../../Screens/CreateProject/CreateProject';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProjectList from '../../Screens/ProjectList/ProjectList';
import AppliedProject from '../../Screens/AppliedProject/AppliedProject';
import MemberRequest from '../../Screens/MemberRequest/MemberRequest';
import FinishProject from '../../Screens/FinishProject/FinishProject';
import ProgressMember from '../../Screens/ProgressMember/ProgressMember';
import CompleteProject from '../../Screens/CompleteProject/CompleteProject';
import CompleteProjectMember from '../../Screens/CompleteProjectMember/CompleteProjectMember';
import OpenProject from '../../Screens/OpenProject/OpenProject';
import MemberProgress from '../../Screens/MemberProgress/MemberProgress';
import MemberComplete from '../../Screens/MemberComplete/MemberComplete';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    let { path, url } = useRouteMatch();
    const dispatch = useDispatch();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logoutHandler = () => {
        dispatch(logout());
    };
    const role = useSelector((state) => state.userLogin.userInfo.role);

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <>
                    <ListItem button component={Link} to={`${url}`}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText className='item_hover' primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/home">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText className='item_hover' primary="Home" />
                    </ListItem>
                    {
                        role === "member" &&
                        <>
                            <ListItem button component={Link} to={`${url}/projects`}>
                                <ListItemIcon>
                                    <FormatListBulletedIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="Projects" />
                            </ListItem>
                            <ListItem button component={Link} to={`${url}/applied`}>
                                <ListItemIcon>
                                    <CloudDoneIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="Applied Project" />
                            </ListItem>
                            <ListItem button component={Link} to={`${url}/ProgressProject`}>
                                <ListItemIcon>
                                    <PendingIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="Progress Project" />
                            </ListItem>
                            <ListItem button component={Link} to={`${url}/completedProject`}>
                                <ListItemIcon>
                                    <CloudDoneIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="Completed Project" />
                            </ListItem>
                        </>
                    }

                    {
                        role === "supervisor" &&
                        <>
                            <ListItem button component={Link} to={`${url}/createProject`}>
                                <ListItemIcon>
                                    <AddCircleIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="Create Project" />
                            </ListItem>
                            <ListItem button component={Link} to={`${url}/memberRequest`}>
                                <ListItemIcon>
                                    <RequestPageIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="Member Request" />
                            </ListItem>
                            <ListItem button component={Link} to={`${url}/openProject`}>
                                <ListItemIcon>
                                    <CheckCircleIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="Open Project" />
                            </ListItem>
                            <ListItem button component={Link} to={`${url}/manageProject`}>
                                <ListItemIcon>
                                    <ManageAccountsIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="Manage Project" />
                            </ListItem>
                            <ListItem button component={Link} to={`${url}/complete`}>
                                <ListItemIcon>
                                    <CheckCircleIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="Complete Project" />
                            </ListItem>
                        </>
                    }
                    <ListItem button onClick={logoutHandler}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </>

            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography sx={{ fontFamily: 'cursive' }} variant="h6" noWrap component="div">
                        DASHBOARD
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Switch>
                    <Route exact path={`${path}`}>
                        <MemberDashboard />
                    </Route>
                    <ProtectedRoute path={`${path}/createProject`}>
                        <CreateProject />
                    </ProtectedRoute>
                    <ProtectedRoute path={`${path}/memberRequest`}>
                        <MemberRequest />
                    </ProtectedRoute>
                    <ProtectedRoute path={`${path}/projects`}>
                        <ProjectList />
                    </ProtectedRoute>
                    <ProtectedRoute path={`${path}/applied`}>
                        <AppliedProject />
                    </ProtectedRoute>
                    <ProtectedRoute path={`${path}/manageProject`}>
                        <FinishProject />
                    </ProtectedRoute>
                    <ProtectedRoute path={`${path}/projectMember/:id`}>
                        <ProgressMember />
                    </ProtectedRoute>
                    <ProtectedRoute path={`${path}/complete`}>
                        <CompleteProject />
                    </ProtectedRoute>
                    <ProtectedRoute path={`${path}/completeProject/:id`}>
                        <CompleteProjectMember />
                    </ProtectedRoute>
                    <ProtectedRoute path={`${path}/openProject`}>
                        <OpenProject />
                    </ProtectedRoute>
                    <ProtectedRoute path={`${path}/progressProject`}>
                        <MemberProgress />
                    </ProtectedRoute>
                    <ProtectedRoute path={`${path}/completedProject`}>
                        <MemberComplete />
                    </ProtectedRoute>
                </Switch>
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;