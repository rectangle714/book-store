import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router";
import 'styles/layout/sideBar.css';
import BookIcon from '@mui/icons-material/Book';
import styled from 'styled-components';
import { Navigation } from 'react-minimal-side-navigation';

const Bar = styled.div`
  top: 250px;
  width: 12.5rem;
  height: 100%;
  left: 5.5rem;
  // position: fixed;
  padding-top: 15rem;
  // transform: translate(1em, 12rem);
`;

const SideBar = ({setTitleValue}:any) => {
  let {state} = useLocation();
  setTitleValue(state.title);

  useEffect(()=> {

  }, [state])

  return (
    <>
      <Bar>
        <Navigation
              activeItemId={state.itemId}
              onSelect={(itemId) => {
                state.itemId = itemId;
              }}
              items={[
                {
                  title: '베스트',
                  itemId: '/best',
                  subNav : [],
                  elemBefore: () => <BookIcon name="inbox" style={{ fontSize: '1.2rem' }}/>,
                },
                {
                  title: '소설',
                  itemId: '/novel',
                  subNav: [
                    {
                      title: '국내소설',
                      itemId: '/novel/korea',
                    },
                    {
                      title: '외국소설',
                      itemId: '/novel/other',
                    },
                  ],
                  elemBefore: () => <BookIcon name="inbox" style={{ fontSize: '1.2rem' }}/>,
                },
                {
                  title: '자기계발',
                  itemId: '/selfImprovement',
                  subNav: [
                    {
                      title: '성공/처세',
                      itemId: '/selfImprovement/successCircumstances',
                    },
                    {
                      title: '자기능력계발',
                      itemId: '/selfImprovement/selfImprovement',
                    },
                  ],
                  elemBefore: () => <BookIcon name="inbox" style={{ fontSize: '1.2rem' }}/>,
                },
                {
                  title: '인문',
                  itemId: '/humanities',
                  subNav: [
                    {
                      title: '인문학일반',
                      itemId: '/humanities/11',
                    },
                    {
                      title: '심리학',
                      itemId: '/humanities/22',
                    },
                  ],
                  elemBefore: () => <BookIcon name="inbox" style={{ fontSize: '1.2rem' }}/>,
                },
                {
                  title: '시/에세이',
                  itemId: '/essay',
                  subNav: [
                    {
                      title: '한국시',
                      itemId: '/essay/korea',
                    },
                    {
                      title: '해외시',
                      itemId: '/essay/other',
                    },
                  ],
                  elemBefore: () => <BookIcon name="inbox" style={{ fontSize: '1.2rem' }}/>,
                }
              ]}
            />
      </Bar>
    </>
  );
};

export default SideBar;