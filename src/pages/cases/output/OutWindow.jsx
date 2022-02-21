// import * as React from "react";
// import { Box, Center, HStack, IconButton, Textarea } from "@chakra-ui/react";
// import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
// import { useEffect, useState } from "react";
// import { useStoreActions, useStoreState } from "../../../redux/store";
// import _ from "lodash";

// const OutWindow = () => {
//   const [outTextValue, setOutTextValue] = useState("");

//   const locked = useStoreState((state) => state.util.locked);
//   const selected = useStoreState((state) => state.cases.selected);
//   const inputData = useStoreState((state) => state.input.data);

//   const setLocked = useStoreActions((actions) => actions.util.setLocked);
//   const setOut = useStoreActions((actions) => actions.input.setOutData);

//   const outData = inputData.find((inputElement) => {
//     return _.isEqual(inputElement.id, selected);
//   })?.outData;

//   useEffect(() => {
//     setOutTextValue(outData !== undefined ? outData : "");
//   }, [selected, outData]);

//   function handleLockText() {
//     setLocked(!locked);
//   }

//   function handleUpdateOut(e) {
//     setOut({ caseIdentifier: selected, outData: e.target.value });
//   }

//   function handleTextChange(e) {
//     setOutTextValue(e.target.value);
//   }

//   return (
//     <Box w={"30%"} h={"100%"}>
//       <Center mb={5}>
//         <HStack>
//           <strong>Salida</strong>
//           <IconButton
//             aria-label={"Block OutWindow"}
//             icon={locked ? <LockIcon /> : <UnlockIcon />}
//             size={"sm"}
//             colorScheme={locked ? "red" : undefined}
//             onClick={() => handleLockText()}
//           />
//         </HStack>
//       </Center>

//       <Textarea
//         value={outTextValue}
//         onBlur={handleUpdateOut}
//         onChange={handleTextChange}
//         isReadOnly={locked}
//         h={"80%"}
//       />
//     </Box>
//   );
// };

// export default OutWindow;
