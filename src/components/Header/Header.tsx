import { Flex, Text, Icon, HStack, Box, Avatar } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Logo from "../../../public/img/logowhite.png"
import { RiSettings2Fill } from 'react-icons/ri';
import Image from 'next/image';


const Header = () => {
    const { data } = useSession();
    
    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"
        >
            <Image src={Logo} alt="Logo" />
            <Flex
                align="center"
                ml="auto"
            >
                <HStack
                    spacing="8"
                    mx="8"
                    pr="8"
                    py="1"
                    color="gray.300"
                    borderRightWidth={1}
                    borderColor="gray.700"
                >
                    <Icon as={RiSettings2Fill} fontSize="20"/>
                </HStack>
            { data?.user && (
                <Flex align="center">
                <Box mr={4}>
                    <Text>{data?.user?.name}</Text>
                    <Text color="gray.300" fontSize="small">
                        {data?.user?.email}
                    </Text>    
                </Box>
                <Avatar size="md" src={`${data?.user?.image}`}/>                    
                </Flex>
            )}
               
            </Flex>

        </Flex>
    )
}

export default Header;