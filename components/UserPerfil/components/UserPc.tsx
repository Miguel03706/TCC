import React from "react";
import {
    Image, Center, Button, Input, useToast, Skeleton, Box, Grid, GridItem, VisuallyHidden
} from "@chakra-ui/react";
import styles from "../UserPerfil.module.scss";


function UserPc({handleCopy}){
    return(
        <>
         <Center p="10px">
                            <Skeleton height="30vh" width="40vw" />
                        </Center>
                        <Center p="10px">
                            <Box bg="#CCCCCC" w="40vw" h="100%" p={4} color="black" border="solid black 1px" borderRadius="10px">
                                <Grid
                                    h="80%"
                                    templateRows="repeat(2, 1fr)"
                                    templateColumns="repeat(5, 1fr)"
                                    gap={4}
                                >
                                    <GridItem rowSpan={2} colSpan={2}>
                                        <Center><Image src='icons/amigos.webp' h="100%" marginTop="10%" /></Center>
                                    </GridItem>
                                    <GridItem colSpan={3}>
                                        <Center textAlign="center"><p><h2>Convide Amigos!</h2></p></Center>
                                        <Center textAlign="center"> Chame seus amigos e ajude a ligua brasileira de sinais</Center>
                                    </GridItem>
                                    <GridItem colSpan={3}>
                                        <Center><Button colorScheme="blue" className={styles.btn_start} marginTop="5%" w="60%" onClick={handleCopy}>Compartilhar</Button></Center>
                                    </GridItem>
                                </Grid>
                            </Box>
                            <VisuallyHidden><textarea className="text">http://localhost:3000</textarea></VisuallyHidden>
                        </Center>
        </>
    );
}

export default UserPc;