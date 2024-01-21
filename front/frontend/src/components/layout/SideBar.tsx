import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'react-minimal-side-navigation';

type Item = {
  item: string;
  title: string;
}

const Bar = styled.div`
  position: sticky;
  top: 200px;
  width: 10.5rem;
  height: 100%;
  /* position: fixed;
  left: 19rem;
  top: 12rem;
  transform: translate(1em, 12rem); */
`;

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setArr = [];

  return (
    <>
      <Bar>
        <Navigation
              // you can use your own router's api to get pathname
              activeItemId="/management/members"
              onSelect={({itemId}) => {
                // maybe push to the route
              }}
              items={[
                {
                  title: 'Dashboard',
                  itemId: '/dashboard',
                  // you can use your own custom Icon component as well
                  // icon is optional
                  //elemBefore: () => <Icon name="inbox" />,
                },
                {
                  title: 'Management',
                  itemId: '/management',
                  //elemBefore: () => <Icon name="users" />,
                  subNav: [
                    {
                      title: 'Projects',
                      itemId: '/management/projects',
                    },
                    {
                      title: 'Members',
                      itemId: '/management/members',
                    },
                  ],
                },
                {
                  title: 'Another Item',
                  itemId: '/another',
                  subNav: [
                    {
                      title: 'Teams',
                      itemId: '/management/teams',
                    },
                  ],
                },
              ]}
            />
      </Bar>
    </>
  );
};

export default SideBar;