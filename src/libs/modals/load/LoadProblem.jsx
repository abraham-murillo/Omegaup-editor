import React from "react";
import {
  Box,
  Button,
  Center,
  Code,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import { AiFillFileZip } from "react-icons/all";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { loadProblem } from "../../upload/loadProblem";
import { useAppContext } from "../../../App";

const LoadProblem = (props) => {
  const { isOpen, onClose } = props;
  const { setGenerator, setSolution, setWriting, setTitle, setGroups } = useAppContext();

  const [isUploading, setIsUploading] = useState(false);
  const [, forceRender] = useState({});

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: [".zip"],
    maxFiles: 1,
  });

  const outlineColor = useColorModeValue("rgba(0,0,0,0.5)", "white");

  function deleteFile() {
    acceptedFiles.length = 0;
    forceRender({});
  }

  function handleLoadFile() {
    setIsUploading(true);
    loadProblem(acceptedFiles[0]).then((data) => {
      console.log(data);
      setIsUploading(false);
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cargar problema</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Sube el zip completo del problema{" "}
            <Code> nombre-del-problema.zip</Code>
          </Text>
          <Box
            mt={3}
            h={"300px"}
            border={"1px dashed " + outlineColor}
            {...getRootProps()}>
            <input {...getInputProps()} />
            <Center h={"100%"}>
              <Center>
                <VStack>
                  <AiFillFileZip size={"3em"} color={outlineColor} />
                  <Text>Arrastra tu archivo aquí</Text>
                </VStack>
              </Center>
            </Center>
          </Box>
          <Box mt={2}>
            {acceptedFiles.map((file) => (
              <HStack key={file.size + file.name}>
                <p>{file.name}</p>
                <Spacer />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => deleteFile()}
                  aria-label={"Delete Zip"}
                />
              </HStack>
            ))}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant={"ghost"} mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button
            isLoading={isUploading}
            isDisabled={isUploading}
            colorScheme="green"
            onClick={() => handleLoadFile()}
            type={"submit"}>
            Cargar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoadProblem;