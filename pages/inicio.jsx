import React, { useState, useEffect, useContext } from "react";
import Header from "../components/header"
import Atividades from "../components/atividades"
import AuthContext from "../components/state/Auth/Context";
import { useRouter } from 'next/router';

import { Button, Flex, Spacer, Center, Text, SimpleGrid, Box, Skeleton } from "@chakra-ui/react"

function Begin() {
    const usuario = useContext(AuthContext)
    const router = useRouter();
    useEffect(() => {
        window.localStorage.removeItem("redirect");
        if (!(usuario)) {
            router.push('/entrar')
          }
    }, []);

    return (
        <>
            <Header inicio={true} missoes={false} loja={false} config={false} />
                <SimpleGrid columns={2} spacing={10} m="10">
                    <Box height="auto" width="100%"><Atividades /></Box>
                    <Box height="auto" width="80%">
                        <Skeleton height="400px" />
                    </Box>
                </SimpleGrid>
        </>
    )
}

export default Begin;