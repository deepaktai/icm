import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';


const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function DonorsPage(props) {


  return (
    <Root
      header={
        <div className="p-24">
          <h4></h4>
        </div>
      }
      content={
        <div className="p-24">
          <h4>Donors data</h4>
          <br />
        
        </div>
      }
      scroll="content"
    />
  );
}

export default DonorsPage;