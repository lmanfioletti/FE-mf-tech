import { Box, Stack, Text, Link, Icon } from '@chakra-ui/react';
import { RiDashboardLine } from "react-icons/ri";

const Sidebar = () => {
    return (
        <Box as='aside' w={64} mr={8}>
            <Stack spacing={12} align="flex-start">
                <Box>
                    <Text fontWeight="bold" color="gray.400" fontSize="small">GERAL</Text>
                    <Stack spacing={4} mt="6" align="stretch">
                        <Link display="flex" alignItems="center">
                            <Icon as={RiDashboardLine} fontSize="20" />
                            <Text ml={4} fontWeight="medium">Dashboard</Text>
                        </Link>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}

export default Sidebar;