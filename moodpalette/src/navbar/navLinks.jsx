import React from "react";
import styled from "styled-components";

const NavLinksContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const LinksWrapper = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    height: 100%;
    list-style: none;
`;

const LinkItem = styled.li`
    height: 100%;
    padding: 0 2.2em;
    color: #222;
    font-weight: 400;
    font-size: 18px;
    align-items: center;
    justify-content: center;
    display: flex;
    border-top: 2px solid transparent;
    transition: all 220ms ease-in-out;

    &:hover {
        border-top: 2px solid #2ecc71;
    }

`;

const Link = styled.a`
    text-decoration: none;
    color: inherit;
    font-size: inherit;
`;

export default function NavLinks(props) {
    return <NavLinksContainer>
        <LinksWrapper>
            <LinkItem><Link href="#">Calendar View</Link></LinkItem>
            <LinkItem><Link href="#">Habit Tracker</Link></LinkItem>
            <LinkItem><Link href="#">Moo Pal Shop</Link></LinkItem>
            <LinkItem><Link href="#">Account</Link></LinkItem>
        </LinksWrapper>
    </NavLinksContainer>
}