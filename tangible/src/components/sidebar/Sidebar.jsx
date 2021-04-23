import React, { useState } from "react";
import styled from "styled-components";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import Avatar from "./Avatar";
import "./sidebar.css";

const SidebarNav = styled.nav`
  display: flex;
  padding-right: 7px;
  padding-top: 60px;
  background: #ededed;
  width: 230px;
  height: 100vh;
  justify-content: left;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, ] = useState(false);

  return (
    <>
      <IconContext.Provider value={{size: "1.7rem"}}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <div id="scroll" style={{ height: "450px", overflowY: "scroll"}}>
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </div>
            <Avatar />
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
