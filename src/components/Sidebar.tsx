import { makeStyles, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import SubMenu from './SubMenu';

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

interface ISidebar {
  sidebar: boolean;
}

const SidebarNav = styled('nav')({
  background: '#15171c',
  width: 250,
  overflow: 'auto',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: (props: ISidebar) => (props.sidebar ? '0' : '-100%'),
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
            <SubMenu />
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
