import React, { useEffect, useState } from "react";
import axios from "axios";
import { TabPanel, Center, Image, Text, Button, Box } from "@chakra-ui/react";
import styles from "./licao2.module.scss";

function Licao2({ slug, handleNext }) {
    const [licao, setLicao] = useState([]);
    const [licaoOp, setLicaoOp] = useState([]);

    async function listarLicao() {
        const res = await axios.get(`http://localhost/api/admin/atividades.php?id=${slug}`);
        setLicao(res.data.result);
    }
    useEffect(() => {
        listarLicao();
        var teste = [0, 1, 2, 3];
        shuffleArray(teste);
        setLicaoOp(teste)
    }, []);

    function shuffleArray(inputArray){
        inputArray.sort(()=> Math.random() - 0.5);
    }

    return (
            <>
                {licao.map(atividade => (
                    <div key={atividade.id_atividade}>
                        <div className={styles.Img}>
                            <Center>
                                <Image src={`../../images/atividades/${atividade.licao.atividade2.imagem}`} h="300px" w="60%" />
                            </Center>
                        </div>
                        <div className={styles.Txt}>
                            <Center>
                                <Text>{atividade.licao.atividade2.texto}</Text>
                            </Center>
                        </div>
                        <div className={styles.Op}>
                            {atividade.licao.atividade2.res_escrita == 0 ?
                                <>
                                    <Center>
                                        <Button>{atividade.licao.atividade2.options[licaoOp[0]]}</Button>
                                        <Button>{atividade.licao.atividade2.options[licaoOp[1]]}</Button>
                                        <Button>{atividade.licao.atividade2.options[licaoOp[2]]}</Button>
                                        <Button>{atividade.licao.atividade2.options[licaoOp[3]]}</Button>
                                    </Center>
                                </>
                                : null
                            }
                        </div>
                        <Box align='right' marginRight="10" p='5' className={styles.Button}>
                        <Button colorScheme="teal" size="lg" onClick={handleNext}>
                            Proximo
                        </Button>
                    </Box>
                    </div>
                ))}
            </>
    )
}

export default Licao2;