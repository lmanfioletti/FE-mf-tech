import { Flex, SimpleGrid, Box, Text } from "@chakra-ui/react"
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import DriverCard from "@/components/DriverCard/DriverCard";

const Dashboard = () => {
    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                <Sidebar />
                <Flex width="100%" flexDir="column" >
                    <DriverCard />
                    <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
                        <Box
                            p="8"
                            bg="gray.800"
                            borderRadius={8}
                        >
                            <Text fontSize="lg" mb="4">
                                Temperatura
                            </Text>
                        </Box>
                        <Box
                            p="8"
                            bg="gray.800"
                            borderRadius={8}
                        >
                            <Text fontSize="lg" mb="4">
                                Umidade
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Flex>
            </Flex>
        </Flex>
    );

};

export default Dashboard;


