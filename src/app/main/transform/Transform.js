import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Application from './transform-components/Application';
import ApprovalList from './transform-components/ApprovalList';
import CommunityList from './transform-components/CommunityList';
import RowDataDetail from './transform-components/RowDataDetail';
import Table from './transform-components/MainTable';
// import MainPage from './transform-components/MainPage';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: '#38597E !important', // Corrected here
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    position: 'relative',
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {
    position: 'relative',
  },
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
  '.page-card': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '1px',
  },
}));

function Transform() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(location.pathname.replace('/transform/', ''));

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    navigate(`/transform/${newValue}`);
  };

  return (
    <TabContext value={selectedTab}>
      <Root
        header={
          <>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="Tabs"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#386BBA',
                },
                backgroundColor: 'white',
                marginTop: '10px',
              }}
            >
              <Tab label="Application" value="application" component={Link} to="/transform/application" />
              <Tab label="Approval List" value="approvallist" component={Link} to="/transform/approvallist" />
              <Tab label="Community List" value="communitylist" component={Link} to="/transform/communitylist" />
              <Tab label="Row Data Details" value="rowdatadetail" component={Link} to="/transform/rowdatadetail" />
            </Tabs>
          </>
        }
        content={
          <>
            <TabPanel value="application" sx={{ background: 'white', width: '100%', height: '100%' }}>
              <Application/>
              {/* <MainPage/> */}
              <Table/>
            </TabPanel>
            <TabPanel value="approvallist" sx={{ background: 'white', width: '100%', height: '100%' }}>
              <ApprovalList />
            </TabPanel>
            <TabPanel value="communitylist" sx={{ background: 'white', width: '100%', height: '100%' }}>
              <CommunityList />
            </TabPanel>
            <TabPanel value="rowdatadetail" sx={{ background: 'white', width: '100%', height: '100%' }}>
              <RowDataDetail />
            </TabPanel>
          </>
        }
        // scroll="content"
      />
    </TabContext>
  );
}

export default Transform;
