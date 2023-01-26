import { useCallback, useEffect, useState } from "react";
import { Box, Button, Flex, Select, Stack, Text } from "@chakra-ui/react";
import { DatabaseReference, get, child, ref, getDatabase } from "firebase/database";
import firebase from "@/pages/firebase";

interface driver{
        full_name: string,
}
interface driverObject
    { 0: string; 1: driver; }
interface trip{
        destination: string,
        origin: string,
}
interface tripObject
    { 0: string; 1: trip; }

interface DropdownCardProps {
    onSelectTrip: (driverId: string, tripId: string) => void
}

const DropdownCard = ({onSelectTrip}: DropdownCardProps) => {
    const [driverID, setDriverID] = useState("");
    const [drivers, setDrivers] = useState<driverObject[]>([]);
    const [isLoadedDrivers, setIsLoadedDrivers] = useState(false);
    
    const [tripID, setTripID] = useState("");
    const [trips, setTrips] = useState<tripObject[]>([]);
    const [isLoadedTrips, setIsLoadedTrips] = useState(false);

    // Initialize Realtime Database and get a reference to the service
    const db = getDatabase(firebase);
    const dbRef = ref(db);
    
    
    const onSelectDriver = useCallback((driverId: string) => {
        setDriverID(driverId);
        const getSnapshot = async () => {
            try {
                const snapshot = await get(child(dbRef, 'drivers/' + driverId + '/trips/all_trips'));
                if (snapshot.exists()) {
                    const response: trip[] = snapshot.val();
                    const responseData: tripObject[] = Object.entries(response);
                    setTrips(responseData);
                    setIsLoadedTrips(true);
                    setTripID(responseData[0][0]);
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error(error);
            };
        }
        getSnapshot()
    }, [dbRef]);
    
    useEffect(() => {
        const getSnapshot = async () => {
            try {
                const snapshot = await get(child(dbRef, 'drivers/all_drivers'));
                if (snapshot.exists()) {
                    const response: driver[] = snapshot.val();
                    const responseData: driverObject[] = Object.entries(response);
                    setDrivers(responseData);
                    setIsLoadedDrivers(true);
                    onSelectDriver(responseData[0][0]);
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error(error);
            };
            
        }
        getSnapshot();
    }, [dbRef, onSelectDriver]);

    const onHandleLoad = useCallback(() => {
        onSelectTrip(driverID, tripID);
        setIsLoadedTrips(true);
        setIsLoadedTrips(false);
        setIsLoadedDrivers(false);
    }, [onSelectTrip, driverID, tripID]);

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
                        <Select onChange={(e) => onSelectDriver(e.target.value)}>
                            {drivers.map(driverId => 
                                {
                                    return (
                                    <option key={driverId[0]} value={driverId[0]}>{driverId[1].full_name}</option>
                                )
                            })}
                        </Select>
                    </Box>
                    <Box pb={6}>
                        <Text fontSize="lg" mb="4">
                            Selecione uma viagem
                        </Text>
                        <Select onChange={(e) => setTripID(e.target.value)}>
                            {trips.map(tripId => 
                                <option key={tripId[0]} value={tripId[0]}>{tripId[1].origin} - {tripId[1].destination}</option>
                            )}
                        </Select>
                    </Box>
                    <Button disabled={!isLoadedTrips} onClick={() => onHandleLoad()} type='submit' mt={6} colorScheme="purple" >Carregar dados</Button>
                </Stack>
            </Flex>
        </Flex>
    );
};

export default DropdownCard;