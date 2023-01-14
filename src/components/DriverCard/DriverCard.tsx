import { Text, Flex, Link, Icon, HStack, Avatar, Box } from '@chakra-ui/react';

import { RiArrowLeftSLine } from 'react-icons/ri';

interface DriverProps {
    name: string,
    info: string,
    avatarSrc?: string,
};

const DriverCard = () => {

    const driver: DriverProps = {
        name: "José da Condução Consiente",
        info: "Alguma informação importante sobre o José"
    };

    return (
        <Flex
            mb={6}
        >
            <HStack>
                <Link alignItems="center" display="flex">
                    <Icon as={RiArrowLeftSLine} fontSize="40" />
                </Link>
                <Avatar size="lg" name={driver.name} src={driver.avatarSrc} />
                <Box mr={4}>
                    <Text fontSize="3xl" >{driver.name}</Text>
                    <Text>{driver.info}</Text>
                </Box>

            </HStack>
        </Flex>
    );

}

export default DriverCard;