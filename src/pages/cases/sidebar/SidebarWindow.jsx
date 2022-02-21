import React from "react";

import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { BsReverseLayoutTextSidebarReverse, CgLayoutList, FaUpload } from "react-icons/all";
import { motion } from "framer-motion";
import { useMediaPredicate } from "react-media-hook";
import { HiOutlineDotsVertical as Dots } from "react-icons/hi";
import { AddIcon, DownloadIcon } from "@chakra-ui/icons";

// import AddContainer from "../../../idk/modals/add/AddContainer";
// import AddMultipleCases from "../../../idk/modals/add/AddMultipleCases";

import Groups from "./Groups";

// import OutDownload from "../../../idk/modals/download/OutDownload";
// import OutUpload from "../../../idk/modals/download/OutUpload";

const SidebarWindow = (props) => {
  const { addRef } = props;

  const divBorderColor = useColorModeValue("gray.200", "gray.600");

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenLayout,
    onOpen: onOpenLayout,
    onClose: onCloseLayout,
  } = useDisclosure();
  const {
    isOpen: isOpenLoadAll,
    onOpen: onOpenLoadAll,
    onClose: onCloseLoadAll,
  } = useDisclosure();
  const {
    isOpen: isOpenMultiple,
    onOpen: onOpenMultiple,
    onClose: onCloseMultiple,
  } = useDisclosure();
  const {
    isOpen: isOpenDownload,
    onOpen: onOpenDownload,
    onClose: onCloseDownload,
  } = useDisclosure();
  const {
    isOpen: isOpenUpload,
    onOpen: onOpenUpload,
    onClose: onCloseUpload,
  } = useDisclosure();

  const isLargeScreen = useMediaPredicate("(min-width: 830px)");

  return (
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
      <Box
        w={"100%"}
        h={"75vh"}
        borderRight={"1px"}
        borderColor={divBorderColor}>

        <Box width={"100%"}>
          <Flex align={"center"} mb={4}>
            <Text mr={5} fontSize={"xl"} fontWeight={"bold"}>
              Grupos
            </Text>

            <Spacer />

            <Tooltip label={"Ctrl + A"}>
              <Button
                ref={addRef}
                size={"sm"}
                colorScheme={"green"}
                // onClick={() => tabIndex === 2 && onOpenAdd()}
                mr={2}>
                {isLargeScreen ? <p> Agregar</p> : <p> + </p>}
              </Button>
            </Tooltip>

            {/* <Menu>
              <MenuButton
                as={IconButton}
                icon={<Dots />}
                size={"sm"}
                syle={{ zIndex: 99 }} />
              <MenuList>
                <MenuItem
                  icon={<AddIcon />}
                  fontSize={"sm"}
                  onClick={onOpenMultiple}>
                  Agregar Múltiples Casos
                </MenuItem>

                <MenuDivider />

                <MenuItem
                  icon={<BsReverseLayoutTextSidebarReverse />}
                  fontSize={"sm"}
                  onClick={onOpenLayout}>
                  Layout
                </MenuItem>

                <MenuItem
                  icon={<CgLayoutList />}
                  fontSize={"sm"}
                  onClick={onOpenLoadAll}>
                  Cargar Layout en todos los Casos
                </MenuItem>

              </MenuList>
            </Menu> */}

            {/* Modals and drawers */}
            {/* <AddContainer 
              isOpen={isOpenAdd} 
              onClose={onCloseAdd} /> */}

            {/* <AddMultipleCases
              isOpen={isOpenMultiple}
              onClose={onCloseMultiple} /> */}

            {/* <LayoutContainer
              isOpen={isOpenLayout}
              onClose={onCloseLayout}
              displayWritingButton /> */}

            {/* <LoadLayout isOpen={isOpenLoadAll} onClose={onCloseLoadAll} /> */}

            {/* <OutDownload isOpen={isOpenDownload} onClose={onCloseDownload} /> */}

            {/* <OutUpload isOpen={isOpenUpload} onClose={onCloseUpload} /> */}

          </Flex>

          <Divider />

          <Groups />
        </Box>
      </Box>
    </motion.div>
  );
};

export default SidebarWindow;
