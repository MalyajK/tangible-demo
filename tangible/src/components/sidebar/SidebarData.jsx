import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as CgIcons from 'react-icons/cg';
import * as FcIcons from 'react-icons/fc';

export const SidebarData = [  
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <FcIcons.FcComboChart />,
    iconClosed: <RiIcons.RiAddFill />,
    iconOpened: <RiIcons.RiSubtractLine />,

    subNav: [
      {
        title: 'My Dashboard',
        path: '/dashboard/mydashboard',
        icon: <IoIcons.IoIosPerson />
      },
      {
        title: 'Team Dashboard',
        path: '/dashboard/teamdashboard',
        icon: <IoIcons.IoIosPeople />
      }
    ]
  },
  {
    title: 'Goals',
    path: '/goals',
    icon: <FcIcons.FcApproval />,
    iconClosed: <RiIcons.RiAddFill color=""/>,
    iconOpened: <RiIcons.RiSubtractLine color=""/>,

    subNav: [
      {
        title: 'This Week',
        path: '/reports/thisweek',
        icon: <FaIcons.FaCalendarWeek />,
        cName: 'sub-nav'
      },
      {
        title: 'This Month',
        path: '/reports/thismonth',
        icon: <CgIcons.CgViewMonth />,
        cName: 'sub-nav'
      },
      {
        title: 'This Quarter',
        path: '/reports/thisquarter',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: <FcIcons.FcTimeline />
  },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: <FcIcons.FcTodoList />,
    iconClosed: <RiIcons.RiAddFill />,
    iconOpened: <RiIcons.RiSubtractLine />,
    subNav: [
      {
        title: 'Add New',
        path: '/tasks/create',
        icon: <RiIcons.RiAddFill />
      }
    ]
  },
  {
    title: 'Team',
    path: '/team',
    icon: <FcIcons.FcFlowChart />
  },
  {
    title: 'Scheduler',
    path: '/scheduler',
    icon: <FcIcons.FcCalendar />,
    iconClosed: <RiIcons.RiAddFill />,
    iconOpened: <RiIcons.RiSubtractLine />,
  },
  {
    title: 'Notifications',
    path: '/notifications',
    icon: <IoIcons.IoMdNotifications color="brown"/>
  },
];