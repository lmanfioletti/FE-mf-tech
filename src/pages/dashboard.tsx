import { useState, useEffect } from "react"
import { Flex, VStack } from "@chakra-ui/react"
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import DriverCard from "@/components/DriverCard/DriverCard";
import SyncChart from "@/components/SyncChart/SyncChart";
import TwodChart from "@/components/TowdChart/TowdChart";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, child } from "firebase/database"

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
    const firebaseConfig = {
        databaseURL: "https://mftech-test-default-rtdb.firebaseio.com",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Realtime Database and get a reference to the service
    const db = getDatabase(app);

    const [driverID, setDriverID] = useState("lucas-manffioleti");
    const [tripID, setTripID] = useState("-NMHD38zq3vZe5IRoPlX");
    // const [data, setData] = useState<chartsProps>();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data: chartsProps = {
        time: [],
        temperature: [],
        humidity: [],
        valency: [],
        excitation: []
    };

    useEffect(() => {
        console.log("data", data);
    }, [data]);

    const dbRef = ref(db);
    get(child(dbRef, 'drivers/' + driverID + "/trips/" + tripID)).then((snapshot) => {
        if (snapshot.exists()) {
            const response: responseProps = snapshot.val();
            const dataLenght: number = Object.keys(response.data).length;
            const responseData: dataProps = Object.entries(response.data);
            console.log(responseData)
            for (var i = 0; i < dataLenght; i++) {
                if(i == 0 || i%100 == 0){
                    data.time.push(responseData[i][1].time);
                    data.temperature.push(parseFloat(responseData[i][1].temperature.toFixed(2)));
                    data.humidity.push(parseFloat(responseData[i][1].humidity.toFixed(2)));
                }
                data.valency.push(responseData[i][1].valency);
                data.excitation.push(responseData[i][1].excitation);
            };
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    const isSucess = true;

    // const driverData = ref(db, 'drivers' + driverID);
    // onValue(driverData, (snapshot) => {
    //     const data = snapshot.val();
    //     console.log(data);
    // });

    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                <Sidebar />
                <Flex width="100%" flexDir="column" >
                    <DriverCard />
                    <VStack display="block">
                        {isSucess && <SyncChart xAxis={data.time} yAxis1={data.temperature} yAxis2={data.humidity}/>}
                        <TwodChart xAxis={data.valency} yAxis={data.excitation}/>
                    </VStack>
                </Flex>
            </Flex>
        </Flex>
    );

};

export default Dashboard;


