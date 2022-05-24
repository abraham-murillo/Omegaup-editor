import React from "react";
import { Box, Spacer, Flex, Image, Container, useColorModeValue, Text } from "@chakra-ui/react";

import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

import dark from "../assets/images/logoDark.png";
import light from "../assets/images/logoLight.png";

const Navbar = () => {
  const logo = useColorModeValue(light, dark);

  return (
    <Box boxShadow={"md"}>
      <Container maxW={"container.xl"}>
        <Flex align={"center"} height={"38px"}>
          <Box w={"86px"}>
            <Image w={"100px"} src={logo} />
          </Box>

          <Spacer />

          <Box>
            <ColorModeSwitcher />
          </Box>

        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
