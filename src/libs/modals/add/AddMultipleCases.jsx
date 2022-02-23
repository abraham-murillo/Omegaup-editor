// import * as React from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormHelperText,
//   FormLabel,
//   HStack,
//   Input,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalHeader,
//   ModalOverlay,
//   NumberDecrementStepper,
//   NumberIncrementStepper,
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   Text,
//   useColorModeValue,
//   useToast,
// } from "@chakra-ui/react";
// import { FormEvent, useRef, useState } from "react";
// import ReactSelectDark from "../../ReactSelectDark";
// import { uuid } from "uuidv4";
// import { CheckIcon } from "@chakra-ui/icons";

// const AddMultipleCases = (props) => {
//   const { isOpen, onClose } = props;

//   const [prefix, setPrefix] = useState("");
//   const [suffix, setSuffix] = useState("");

//   const groupData = useStoreState((state) => state.cases.data);

//   const caseNumberRef = useRef(0);
//   const idsToDelete = useRef([]);

//   const darkTheme = useColorModeValue(false, true);

//   const addCase = useStoreActions((actions) => actions.cases.addCase);
//   const removeCase = useStoreActions((actions) => actions.cases.removedCase);
//   const options = groupData.map((groupElement) => {
//     return {
//       value: groupElement.groupId,
//       label: groupElement.name,
//     };
//   });

//   const toastBgColor = useColorModeValue("green.500", "green.200");
//   const toastColor = useColorModeValue("white", "black");
//   const [selectedValue, setSelectedValue] = useState(options[0].value);

//   const toast = useToast();

//   function handleSelectChange(event) {
//     setSelectedValue(event.value);
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     const selectedGroupData = groupData.find(
//       (groupElement) => groupElement.groupId === selectedValue
//     );
//     let ids = [];
//     if (selectedGroupData !== undefined) {
//       let caseNumber = 0;
//       for (let i = 0; i < caseNumberRef.current; i++) {
//         do {
//           caseNumber++;
//           const name = prefix + caseNumber + suffix;
//           const caseExist = selectedGroupData.cases.find(
//             (caseElement) => caseElement.name === name
//           );
//           if (caseExist === undefined) {
//             const newId = uuid();
//             ids.push(newId);
//             addCase({
//               caseId: newId,
//               name: name,
//               groupId: selectedGroupData.groupId,
//               defined: false,
//               points: 0,
//             });
//             break;
//           }
//         } while (true);
//       }
//       idsToDelete.current = ids;
//       //console.log(ids);
//     }
//     toast({
//       render: () => (
//         <Box
//           bg={toastBgColor}
//           color={toastColor}
//           rounded={"md"}
//           p={4}
//           onClick={undoCreation}
//           cursor={"pointer"}
//         >
//           <HStack>
//             <CheckIcon />
//             <Text fontWeight={"bold"}> Creado multiples casos!</Text>
//           </HStack>
//           {"    "}Click para deshacer
//         </Box>
//       ),
//     });
//     onClose();
//   }

//   function undoCreation() {
//     const selectedGroupData = groupData.find(
//       (groupElement) => groupElement.groupId === selectedValue
//     );
//     //console.log(idsToDelete);
//     if (selectedGroupData !== undefined) {
//       idsToDelete.current.forEach((id) => {
//         removeCase({ caseId: id, groupId: selectedGroupData.groupId });
//       });
//     }
//     toast.closeAll();
//   }

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Agregar Multiples Casos</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <form onSubmit={(e) => handleSubmit(e)}>
//             <HStack mt={3}>
//               <FormControl>
//                 <FormLabel> Prefijo</FormLabel>
//                 <Input
//                   data-test={"prefix-input"}
//                   onChange={(e) => setPrefix(e.target.value)}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel> Sufijo</FormLabel>
//                 <Input onChange={(e) => setSuffix(e.target.value)} />
//               </FormControl>
//             </HStack>
//             <FormControl mt={5} isRequired>
//               <FormLabel> Número de casos</FormLabel>
//               <NumberInput
//                 data-text={"multiple-cases-input"}
//                 onChange={(e, valueAsNumber) =>
//                   (caseNumberRef.current = valueAsNumber)
//                 }
//               >
//                 <NumberInputField required />
//                 <NumberInputStepper>
//                   <NumberIncrementStepper />
//                   <NumberDecrementStepper />
//                 </NumberInputStepper>
//               </NumberInput>
//             </FormControl>
//             <FormControl mt={5} isRequired>
//               <FormLabel> Grupo</FormLabel>
//               <ReactSelectDark
//                 onChange={handleSelectChange}
//                 value={options.find((obj) => obj.value === selectedValue)}
//                 options={options}
//                 darkTheme={darkTheme}
//                 defaultValue={{ label: "sin_grupo", value: options[0].value }}
//               />
//               <FormHelperText>
//                 Tus casos tendrán el nombre {prefix}1{suffix}, {prefix}2{suffix}
//                 , ...
//               </FormHelperText>
//             </FormControl>
//             <Button
//               data-test={"add-multiple-cases-btn"}
//               type={"submit"}
//               colorScheme={"green"}
//               isFullWidth
//               mt={10}
//               mb={5}
//             >
//               Agregar
//             </Button>
//           </form>
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default AddMultipleCases;
