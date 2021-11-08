import { makeStyles, styled } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as RiIcons from 'react-icons/ri';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { useContext } from 'react';
import { Context } from '../context';
import * as IoIcons from 'react-icons/io';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    display: 'flex',
    alignItems: 'center',
  },
  dropdownLink: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: 0,
    flex: 1,
    overflow: 'hidden',
    wordBreak: 'break-all',
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
  transition: 'all .1s',
});

const SidebarLabel = styled('span')({ marginLeft: 16 });

const DropdownLink = styled(Link)({
  background: '#414757',
  height: 60,
  paddingLeft: '2rem',
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

const SubMenu = () => {
  const classes = useStyles();
  const [subnav, setSubnav] = useState(false);
  const context = useContext(Context);
  const categories = context?.categories;

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to='/home'>
        <div className={classes.list}>
          <AiIcons.AiFillHome />
          <SidebarLabel>Главная</SidebarLabel>
        </div>
      </SidebarLink>
      <SidebarLink to='/category' onClick={showSubnav}>
        <div className={classes.list}>
          <FaIcons.FaListUl />
          <SidebarLabel>Категории</SidebarLabel>
        </div>
        <div>
          {subnav ? <RiIcons.RiArrowUpSFill /> : <RiIcons.RiArrowDownSFill />}
        </div>
      </SidebarLink>
      <table style={{ width: '100%' }}>
        <tr>
          {subnav &&
            categories &&
            categories.map((item, index) => {
              return (
                <DropdownLink to={`/category/${item.name}`} key={index}>
                  <IoIcons.IoIosArrowForward />
                  <Grid item className={classes.dropdownLink}>
                    <SidebarLabel>{item.name}</SidebarLabel>
                  </Grid>
                </DropdownLink>
              );
            })}
        </tr>
      </table>
      <SidebarLink to='/feedback'>
        <div className={classes.list}>
          <RiIcons.RiFeedbackLine />
          <SidebarLabel>Обратная связь</SidebarLabel>
        </div>
      </SidebarLink>
      <SidebarLink
        to='/'
        style={{ zIndex: 0, position: 'absolute', bottom: 0, width: '100%' }}
      >
        <div className={classes.list}>
          <RiIcons.RiLogoutBoxLine />
          <SidebarLabel>Выйти</SidebarLabel>
        </div>
      </SidebarLink>
    </>
  );
};

export default SubMenu;
