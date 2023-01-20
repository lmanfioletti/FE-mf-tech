import { Flex, VStack } from "@chakra-ui/react"
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import DriverCard from "@/components/DriverCard/DriverCard";
import SyncChart from "@/components/SyncChart/SyncChart";
import TwodChart from "@/components/TowdChart/TowdChart";

const Dashboard = () => {
    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                <Sidebar />
                <Flex width="100%" flexDir="column" >
                        <DriverCard />
                        <VStack display="block">
                        <TwodChart />
                        <SyncChart />
                        </VStack>
                </Flex>
            </Flex>
        </Flex>
    );

};

export default Dashboard;


