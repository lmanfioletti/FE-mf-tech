import React from 'react';
import { Text, Flex, Link, Icon, HStack, Avatar, Box } from '@chakra-ui/react';

import { RiArrowLeftSLine } from 'react-icons/ri';

interface DriverProps {
    driverName: string,
    tripName: {
        origin: string,
        destination: string,
    },
    onBack: () => void,
};

const DriverCard = ({driverName, tripName, onBack}: DriverProps) => {

    return (
        <Flex
            mb={6}
        >
            <HStack>
                <Link alignItems="center" display="flex" onClick={onBack}>
                    <Icon as={RiArrowLeftSLine} fontSize="40" />
                </Link>
                <Avatar size="lg" name={driverName} />
                <Box mr={4}>
                    <Text fontSize="3xl" >{driverName}</Text>
                    <Text>{tripName.origin} - {tripName.destination}</Text>
                </Box>

            </HStack>
        </Flex>
    );

}

export default DriverCard;