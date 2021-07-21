import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { styled } from '@material-ui/core/styles';
import { makeStyles, Typography } from '@material-ui/core';

const useStyle = makeStyles({
  title: { color: 'white', fontSize: '1.2rem' },
});

const Nav = styled('div')({
  background: '#15171c',
  height: 80,
  display: 'flex',
  position: 'sticky',
  width: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
  zIndex: 10,
});

const NavIcon = styled(Link)({
  marginLeft: '2rem',
  fontSize: '2rem',
  height: 80,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginRight: '2rem',
});

const SidebarNav = styled('nav')({
  background: '#15171c',
  width: 250,
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: ({ sidebar }) => (sidebar ? '0' : '-100%'),
  transition: '350ms',
  zIndex: 9,
});

const SidebarWrap = styled('div')({ width: '100%' });

const Sidebar = () => {
  const style = useStyle();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#' onClick={showSidebar}>
            {sidebar ? <AiIcons.AiOutlineClose /> : <FaIcons.FaBars />}
          </NavIcon>
          <Typography className={style.title} variant='button'>
            HowToDo Admin Panel
          </Typography>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#' onClick={showSidebar}></NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
