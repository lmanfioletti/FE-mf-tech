import React from "react";
import { useState, useEffect, useCallback } from "react"
import { Center, Flex, Spinner, VStack } from "@chakra-ui/react"
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import DriverCard from "../components/DriverCard/DriverCard";
import SyncChart from "../components/SyncChart/SyncChart";
import TwodChart from "../components/TowdChart/TowdChart";

import { ref, get, child } from "firebase/database"
import DropdownCard from "../components/DropdownCard/DropdownCard";

import { db } from "../services/firebase"
interface chartsProps {
    time: string[],
    temperature: number[],
    humidity: number[],
    valency: number[],
    excitation: number[]
};

interface dataProps {
    [index: number]: { 0: String; 1: responseDataProps; }
}

interface responseDataProps {
    time: string,
    valency: number,
    temperature: number,
    humidity: number,
    excitation: number,
}

interface responseProps {
    data: responseDataProps[],
    origin: string,
    destination: string,
};

interface tripName {
    origin: string,
    destination: string,
};

const Dashboard = () => {
    const [driverName, setDriverName] = useState("");
    const [driverID, setDriverID] = useState("");
    const [tripID, setTripID] = useState("");
    const [tripName, setTripName] = useState<tripName>({} as tripName);
    const [showOptions, setShowOptions] = useState(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [data, setData] = useState<chartsProps>({} as chartsProps);
    const [isSucess, setIsSucess] = useState(false);
    
    const dbRef = ref(db);

    useEffect(() => {
        const getSnapshot = async () => {
            try {
                const snapshot = await get(child(dbRef, 'drivers/' + driverID + "/trips/" + tripID));
                const snapshotName = await get(child(dbRef, 'drivers/' + driverID + "/full_name"));
                if (snapshot && snapshotName) {
                    setDriverName(snapshotName.val());
                    const newData: chartsProps = {
                        time: [],
                        temperature: [],
                        humidity: [],
                        valency: [],
                        excitation: [],
                    };
                    const response: responseProps = snapshot.val();
                    setTripName({ destination: response.destination, origin: response.origin });
                    const dataLenght: number = Object.keys(response.data).length;
                    const responseData: dataProps = Object.entries(response.data);
                    for (var i = 0; i < dataLenght; i++) {
                        if (i == 0 || i % 500 == 0) {
                            newData.time.push(responseData[i][1].time);
                            newData.temperature.push(parseFloat(responseData[i][1].temperature.toFixed(2)));
                            newData.humidity.push(parseFloat(responseData[i][1].humidity.toFixed(2)));
                        }
                        newData.valency.push(responseData[i][1].valency || 0);
                        newData.excitation.push(responseData[i][1].excitation || 0);
                    };
                    setData(newData);
                    setIsSucess(true);
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error(error);
            };

        }
        getSnapshot();
    }, [driverID, tripID, dbRef]);

    const onSelectTrip = useCallback((driverId: string, tripId: string) => {
        setShowOptions(false);
        setDriverID(driverId);
        setTripID(tripId);
        setIsSucess(false);
    }, [])
    
    const onBackToSelect = useCallback(() => {
        setShowOptions(true);
        setData({} as chartsProps);
    }, []);

    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                <Sidebar />
                {showOptions && <DropdownCard onSelectTrip={onSelectTrip} />}
                {!showOptions && (
                    <Flex width="100%" flexDir="column" >
                        {!isSucess &&
                            <Flex
                                w="100%"
                                h="100%"
                                align="center"
                                justify="center"
                            >
                                <Center>
                                    <Spinner label="Carregando dados do motorista..." color="purple" />
                                </Center>
                            </Flex>}
                        {isSucess && (
                            <>
                                <DriverCard onBack={onBackToSelect} driverName={driverName} tripName={tripName} />
                                <VStack display="block">
                                    <SyncChart xAxis={data.time} yAxis1={data.temperature} yAxis2={data.humidity} />
                                    <TwodChart xAxis={data.valency} yAxis={data.excitation} />
                                </VStack>
                            </>
                        )}
                    </Flex>
                )}
            </Flex>
        </Flex>
    );

};

export default Dashboard;


