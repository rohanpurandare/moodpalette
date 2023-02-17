import styled from "styled-components";
import NavLinks from "./navLinks";
import { useMediaQuery } from "react-responsive";
import MobileNavLinks from "./mobileNavLinks";
import Accessibility from "./accessibility";
import Logo from "./logo";

const NavBarContainer = styled.div`
    width: 100%;
    height: 160px;
    box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
    display: flex;
    align-items: center;
    padding: 0 1.5em;
`;

const LeftSection = styled.div`
    display: flex;
`;

const MiddleSection = styled.div`
    display: flex;
    flex: 2;
    height: 100%;
    justify-content: center;
`;

const RightSection = styled.div`
    display: flex;
`;

const DeviceSize = {
    mobile: 768,
    tablet: 992,
    laptop: 1324,
    desktop: 2024,
};

export default function NavBar(props) {
    const isMobile = useMediaQuery({maxWidth: DeviceSize.mobile});
    return <NavBarContainer>
        <LeftSection>
            <Logo />
        </LeftSection>
        <MiddleSection>
            {!isMobile && <NavLinks></NavLinks>}
            {isMobile && <MobileNavLinks></MobileNavLinks>}
        </MiddleSection>
        <RightSection>
            {!isMobile && <Accessibility />}
        </RightSection>
    </NavBarContainer>
}