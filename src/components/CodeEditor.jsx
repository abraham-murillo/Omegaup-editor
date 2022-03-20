import * as React from "react";
import {
  Box,
  HStack,
  NumberInput,
  NumberInputField,
  Select,
  Text,
  Button,
  AlertDialogCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

import { useState, useEffect } from "react";
import { languages } from "../libs/coding/codeLanguages"
import { runSingle, runMultiple, getResult } from "../libs/coding/runCodeApi";

languages.forEach((language) => {
  require(`ace-builds/src-noconflict/mode-${language.ace}`);
  require(`ace-builds/src-noconflict/snippets/${language.ace}`);
});

const CodeEditor = (props) => {
  const { code, setCode, language, setLanguage, height } = props;
  const [fontSize, setFontSize] = useState(14);
  const [languageIndex, setLanguageIndex] = useState(0);

  const codeStyle = useColorModeValue("tomorrow", "monokai");
  const codeToolbarStyle = useColorModeValue("#F9F9F9", "#2C323D");

  function handleFontSize(size) {
    setFontSize(size);
  }

  useEffect(() => {
    setLanguage(languages[languageIndex].extension);
  }, [languageIndex]);

  return (
    <>
      <Box border={"0.5px solid #C8CCD0"} borderRadius={2}>
        <Box
          borderBottom={"0.5px solid #C8CCD0"}
          bg={codeToolbarStyle}
          h={"48px"}
          p={"10px"}>
          <HStack>
            <Text fontSize={"smaller"}> Lenguaje </Text>
            <Select
              data-test={"language-select"}
              size={"sm"}
              fontSize={"13px"}
              h={"21.5px"}
              onChange={(e) => setLanguageIndex(parseInt(e.target.value))}>
              {languages.map((language, index) => (
                <option
                  key={language.ace + index}
                  value={index}
                  selected={index === languageIndex}>
                  {language.name}
                </option>
              ))}
            </Select>

            <Text fontSize={"smaller"}> Tamaño</Text>
            <NumberInput
              min={1}
              max={50}
              defaultValue={14}
              size={"small"}
              fontSize={"13px"}
              onChange={(valueAsString, valueAsNumber) => handleFontSize(valueAsNumber)}>
              <NumberInputField />
            </NumberInput>

          </HStack>
        </Box>

        <AceEditor
          placeholder={"Ingresa el código que soluciona el problema aquí"}
          mode={languages[languageIndex].ace}
          theme={codeStyle}
          fontSize={fontSize}
          name={"solutionEditor"}
          defaultValue={code}
          onChange={(newCode) => setCode(newCode)}
          width={"100%"}
          height={height + "px"}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            tabSize: 2,
          }}
        />
      </Box>
    </>
  )
};

export default CodeEditor;