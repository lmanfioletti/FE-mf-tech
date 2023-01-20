import { Flex, Text, Icon, HStack, Box, Avatar, Image } from '@chakra-ui/react';

import { RiSettings2Fill } from 'react-icons/ri';

interface UserProps {
    name: string,
    email: string,
    avatarSrc: string,
};

const Header = () => {

    const user: UserProps = {
        name: "Fulano da Silva",
        email: "fulano123@gmail.com",
        avatarSrc: "https://avatarfiles.alphacoders.com/128/thumb-128984.png"
    };

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
            <Image src='img/logowhite.png'/>
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

                <Flex align="center">
                    <Box mr={4}>
                        <Text>{user.name}</Text>
                        <Text color="gray.300" fontSize="small">
                            {user.email}
                        </Text>    
                    </Box>
                    <Avatar size="md" name={user.name} src={user.avatarSrc}/>                    
                </Flex>
            </Flex>

        </Flex>
    )
}

export default Header;