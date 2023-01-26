import { useCallback, useEffect, useState } from "react";
import { Box, Button, Flex, Select, Stack, Text } from "@chakra-ui/react";
import { DatabaseReference, get, child, ref, getDatabase } from "firebase/database";
import { api } from "@/services/api";
import firebase from "@/pages/firebase";


const DropdownCard = (onSelectTrip: any) => {
    const driverID: string = "";
    const tripID: string = "";
    const [drivers, setDrivers] = useState();
    const [trips, setTrips] = useState();

    // Initialize Realtime Database and get a reference to the service
    const db = getDatabase(firebase);
    const dbRef = ref(db);
    
    useEffect(() => {
        const getSnapshot = async () => {
            try {
                const snapshot = await get(child(dbRef, 'drivers/all-drivers'));
                if (snapshot.exists()) {
                    const response = snapshot.val();
                    setDrivers(response);
                    console.log(snapshot.val())
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error(error);
            };
            
        }
        getSnapshot();
    }, [dbRef]);

    const onDriverSelect = useCallback((driverId: string) => {
        const getSnapshot = async () => {
            try {
                const snapshot = await get(child(dbRef, 'drivers/' + driverId + '/trips/all-trips'));
                if (snapshot.exists()) {
                    const response = snapshot.val();
                    setTrips(response);
                    console.log(snapshot.val())
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error(error);
            };
        }
        getSnapshot()
    }, [dbRef])


    const onHandleLoad = useCallback(() => {
        onSelectTrip(driverID, tripID)
    }, [onSelectTrip]);

    return (

        <Flex
            w="100vw"
            align="top"
            justify="center"
        >
            <Flex
                width="100%"
                maxWidth={660}
                bg="gray.800"
                p="8"
                borderRadius={8}
                flexDir="column"
            >
                <Stack spacing={4}>
                    <Box>
                        <Text fontSize="lg" mb="4">
                            Selecione um motorista
                        </Text>
                        <Select />
                    </Box>
                    <Box pb={6}>
                        <Text fontSize="lg" mb="4">
                            Selecione uma viagem
                        </Text>
                        <Select />
                    </Box>
                    <Button onClick={() => onHandleLoad()} type='submit' mt={6} colorScheme="purple" >Carregar dados</Button>
                </Stack>
            </Flex>
        </Flex>
    );
};

export default DropdownCard;