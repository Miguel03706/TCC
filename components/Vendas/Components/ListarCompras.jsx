import React, { useEffect, useState, useCallback } from 'react';
import DB from "../../../pages/api/MySQL";
import { Text, Image, Center, Flex, Square, Box, Button, useToast } from "@chakra-ui/react";
import styles from "../vendas.module.scss";

export default function ListarCompras({ money }) {
    const [compras, setCompras] = useState([]);
    const [dinheiro, setDinheiro] = useState(0);
    const [preco, setPreco] = useState([]);
    const [comprar, setComprar] = useState([]);
    const toast = useToast()

    useEffect(() => {
        DB.listarCompras().then(setCompras);
    }, []);

    useEffect(() => {
        { compras.map(itens => { setDinheiro(itens.dinheiro) }) }
    }, [compras]);
    useEffect(() => {
        money(dinheiro)
    }, [dinheiro]);

    useEffect(async () => {
       if(dinheiro >= 100 && dinheiro >= preco){
        await DB.comprarItens(comprar, preco);
        DB.listarCompras().then(setCompras);
       }else if(comprar.length > 0){
        toast({
            title: "Sem dinheiro.",
            description: "Você não tem dinheiro suficiente para comprar esse produto, realize mais atividades para ganhar mais prêmios.",
            status: "error",
            duration: 1500,
            isClosable: true,
          })
       }
       
    }, [comprar]);

    return (
        <>
            {compras.map(itens => {
                return (
                    <div key={itens.id_produto}>
                        <Box w="auto" bg="green.500" border="1px solid black">
                            <Center>
                                <Text>{itens.nome}</Text>
                            </Center>
                        </Box>
                        <Box w="auto" border="1px solid black">
                            <Center><Image src={`../images/loja/${itens.img}.webp`} h="100px" w="auto" /></Center>
                            <Center><Text>{itens.descricao}</Text></Center>
                        </Box>
                        <Square bg="blue.500" w="auto" border="1px solid black" p="5px">
                            {
                                itens.compras[`${itens.id_produto}`].buy == 0 ?
                                    <Button colorScheme="teal"
                                        onClick={(e) => {
                                            setPreco(itens.preco)
                                            setComprar(itens.id_produto)
                                        }
                                        }>Comprar por: {itens.preco}</Button>
                                    :
                                    <>
                                        <Button colorScheme="teal" isDisabled>Já possui</Button>
                                    </>
                            }
                        </Square>
                    </div>
                )
            })}
        </>
    )
}