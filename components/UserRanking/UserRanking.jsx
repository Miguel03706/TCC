import react, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./userRanking.module.scss"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Text,
    Button, 
    Center
} from "@chakra-ui/react"

function UserRanking() {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        listarRanking()
    }, []);


    useEffect(() => {
        console.log(ranking)
    }, [ranking])

    async function listarRanking() {
        const res = await axios.get(`http://localhost/api/ranking.php`)
        setRanking(res.data.result);
    }


    return (
        <>
            <div className={styles.container} >
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>usuário</Th>
                            <Th>Experiência</Th>
                            <Th>Posição</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ranking.map(usuarios => {
                            return (
                                <Tr key={usuarios.id}>
                                    <Td><Text><Center>{usuarios.user}</Center></Text></Td>
                                    <Td><Text><Center>{usuarios.pontos}</Center></Text></Td>
                                    <Td><Text><Center>{usuarios.posicao + 'º'}</Center></Text></Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>

            </div>
        </>
    )

}

export default UserRanking;