import { useState, useEffect } from "react"
import { Center, Flex, Spinner, VStack } from "@chakra-ui/react"
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import DriverCard from "../components/DriverCard/DriverCard";
import SyncChart from "../components/SyncChart/SyncChart";
import TwodChart from "../components/TowdChart/TowdChart";


import {ref,  get, child } from "firebase/database"
import { app, db, firebaseConfig} from "../services/firebase"
import { useSession } from "next-auth/react";
interface chartsProps {
    time: string[],
    temperature: number[],
    humidity: number[],
    valency: number[],
    excitation: number[]
};

interface dataProps {
    [index: number]: {0: String; 1: responseDataProps;}
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

const Dashboard = () => {
    const [driverID, setDriverID] = useState("lucas-manffioleti");
    const [tripID, setTripID] = useState("-NMHD38zq3vZe5IRoPlX");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [data, setData] = useState<chartsProps>({                    
        time: [],
        temperature: [],
        humidity: [],
        valency: [],
        excitation: [],});
    const [isSucess, setIsSucess] = useState(false);
    
    
    const dbRef = ref(db);

useEffect(() => {
        const getSnapshot = async () => {
            try {const snapshot = await get(child(dbRef, 'drivers/' + driverID + "/trips/" + tripID));
            if (snapshot.exists()) {
                const newData: chartsProps = {                    
                    time: [],
                    temperature: [],
                    humidity: [],
                    valency: [],
                    excitation: [],};
                const response: responseProps = snapshot.val();
                const dataLenght: number = Object.keys(response.data).length;
                const responseData: dataProps = Object.entries(response.data);
                for (var i = 0; i < dataLenght; i++) {
                    if(i == 0 || i%100 == 0){
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
        }catch(error){
            console.error(error);
        };

        }
        getSnapshot();
    }, [driverID, tripID, dbRef]);

    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                <Sidebar />
                <Flex width="100%" flexDir="column" >
                    <DriverCard />
                    <VStack display="block">
                        {!isSucess && 
                        <Center>
                        <Spinner label="Carregando dados do motorista..." color="purple"/>
                        </Center>}
                        {isSucess && <SyncChart xAxis={data.time} yAxis1={data.temperature} yAxis2={data.humidity}/>}
                        {isSucess && <TwodChart xAxis={data.valency} yAxis={data.excitation}/>}
                    </VStack>
                </Flex>
            </Flex>
        </Flex>
    );

};

export default Dashboard;


