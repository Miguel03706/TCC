//import styles from "./atividades.module.scss";
import React, { useState, useEffect } from "react";
import {
    CircularProgress, CircularProgressLabel, Image, Center, Popover, PopoverTrigger,
    PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton,
    Button, Portal, useDisclosure
} from "@chakra-ui/react";
import Link from "next/link";
import axios from "axios";
import styles from "./atividades.module.scss";


function Atividades() {
    const initialFocusRef = React.useRef()

    const [atividades, setAtividades] = useState([]);
    const [color, setColor] = useState('');

    async function listarAtividades() {
        const res = await axios.get('http://localhost/api/atividades.php');
        setAtividades(res.data.result);
    }
    useEffect(() => {
        listarAtividades();
    }, []);

    useEffect(() => {
        if (localStorage.getItem('chakra-ui-color-mode') == "dark") {
            setColor('#49CFE1');

        } else {
            setColor('#E5DE2F');
        }
    }, [setColor]);

    return (
        <>
            {atividades.map(atividade => (
                <div key={atividade.id_atividade} className={styles.lista}>
                    <Center>
                        <CircularProgress value={atividade.progresso} size="100px" color={color}>
                            <CircularProgressLabel>
                                <Popover initialFocusRef={initialFocusRef}
                                    placement="bottom"
                                    closeOnBlur={true}
                                >
                                    <PopoverTrigger>
                                        <Button colorScheme="#00FFFFFF" className={styles.button} h="80px"><Center><Image src={`icons/atividades/${atividade.img}`} h="70px" /></Center></Button>
                                    </PopoverTrigger>
                                    <Portal>
                                        <PopoverContent boxShadow="none !important">
                                            <PopoverArrow />
                                            <div className={styles.licao} key={atividade.id_atividade}>
                                                {atividade.progresso == 0 ? "lição 0/4" : ""}
                                                {atividade.progresso == 25 ? "lição 1/4" : ""}
                                                {atividade.progresso == 50 ? "lição 2/4" : ""}
                                                {atividade.progresso == 75 ? "lição 3/4" : ""}
                                                {atividade.progresso >= 100 ? "lição 4/4" : ""}
                                            </div>
                                            <PopoverCloseButton />
                                            <PopoverBody className={styles.popBody}>
                                                <p><Button colorScheme="blue" w="100%">Explicação</Button></p><br />
                                                <Link href="licao/[licao]" as={`licao/${atividade.id_atividade}`}>
                                                    <Button colorScheme="blue" w="100%">Atividade</Button>
                                                </Link>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>

                            </CircularProgressLabel>
                        </CircularProgress>
                    </Center>
                </div>
            ))
            }
        </>
    )
}

export default Atividades;