// components/LeftSideMenu.js
import { FaUser, FaUsers, FaUserCog, FaSave, FaChartBar } from 'react-icons/fa';
import MenuItem from '../common-components/MenuItem';

const LeftSideMenu = ({ userRole }) => {
  return (
    <div className="bg-light text-white p-4" style={{ height: '80vh' }}>
      <ul className="list-unstyled">
        <MenuItem href="/admin/admin-dashboard" icon={FaChartBar} label="Dashboard" />
        {userRole !== '3' && <MenuItem href="/admin/companies" icon={FaUsers} label="Companies" />}
        {userRole === '1' && <MenuItem href="/admin/candidates" icon={FaUser} label="Candidates" />}
        {userRole !== '3' && <MenuItem href="/admin/internal-team" icon={FaUserCog} label="Internal Team" />}
      </ul>
    </div>
  );
};

export default LeftSideMenu;
