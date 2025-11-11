import React from 'react';
import { Box, Heading, VStack, Link } from '@chakra-ui/react';
import { Link as RouterLink, Outlet } from 'react-router-dom';

function Userinterface() {
  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        <header>

          <Heading as="h1" size="2xl" textAlign="center">
            Admin-client
          </Heading>
        </header>

        <Box as="nav">
 
          <VStack 
            align="start" 
            spacing={4}
            borderWidth="1px"
            borderColor="gray.200"
            p={4}
            borderRadius="md"
          >

            <Heading as="h2" size="lg">
              Innehåll:
            </Heading>


            <Link as={RouterLink} to="/">
              Översikt
            </Link>

            <Link as={RouterLink} to="/overview">
              Användare
            </Link>

            <Link as={RouterLink} to="/units">
              Fordon
            </Link>
            
          </VStack>
        </Box>

        <main>
          <Outlet />
        </main>
      </VStack>
    </Box>
  );
}

export default Userinterface;