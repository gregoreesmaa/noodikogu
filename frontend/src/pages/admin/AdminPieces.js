import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {adminPiecesTabToggled} from "../../state/reducers";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import AdminPiecesModifyTabView from "../../components/admin/AdminPiecesModifyTabView";
import Paper from "@material-ui/core/Paper/Paper";
import AdminAddPieceTabView from "../../components/admin/AdminAddPieceTabView";

const AdminPieces = ({toggledAdminPiecesTab, adminPiecesTabToggled}) =>
  <div className={'adminPieceTabs'}>
    <Paper>
      <Tabs
        value={toggledAdminPiecesTab}
        onChange={(event, idx) => adminPiecesTabToggled(idx)}
        centered
      >
        <Tab label="Muuda lugusid"/>
        <Tab label="Lisa uus lugu"/>
      </Tabs>
    </Paper>
    {toggledAdminPiecesTab === 0 && <AdminPiecesModifyTabView/>}
    {toggledAdminPiecesTab === 1 && <AdminAddPieceTabView/>}
  </div>;
const mapStateToProps = ({toggledAdminPiecesTab}) => ({toggledAdminPiecesTab});
const mapDispatchToProps = dispatch => bindActionCreators({adminPiecesTabToggled}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminPieces);
