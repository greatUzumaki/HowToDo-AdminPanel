import { makeStyles, styled } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    display: 'flex',
    alignItems: 'center',
  },
});

const SidebarLink = styled(Link)({
  display: 'flex',
  color: '#e1e9fc',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 20,
  listStyle: 'none',
  height: 60,
  textDecoration: 'none',
  fontSize: 20,
  '&:hover': {
    background: '#252831',
    borderLeft: '4px solid #2283e6',
    cursor: 'pointer',
  },
});

const SidebarLabel = styled('span')({ marginLeft: 16 });

const DropdownLink = styled(Link)({
  background: '#414757',
  height: 60,
  paddingLeft: '3rem',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: '#f5f5f5',
  fontSize: 18,
  '&:hover': {
    background: '#2283e6',
    cursor: 'pointer',
  },
});

const SubMenu = ({ item }) => {
  const classes = useStyles();
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div className={classes.list}>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
