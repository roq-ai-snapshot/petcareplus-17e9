import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Founder'];
  const roles = ['Founder', 'Veterinarian', 'Product', 'Customer Support', 'Guest'];
  const applicationName = 'PetCarePlus';
  const tenantName = 'Pet Care';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Founder:
1. As a founder, I want to be able to create and manage my Pet Care business profile on the PetCarePlus platform, so that I can showcase my services and attract new customers.
2. As a founder, I want to be able to view and analyze the usage statistics of the PetCarePlus app by my customers, so that I can make informed decisions about my business and improve customer satisfaction.
3. As a founder, I want to be able to manage and assign roles to my team members (veterinarians, product, and customer support) within the PetCarePlus app, so that they can efficiently perform their tasks and contribute to the success of the business.
4. As a founder, I want to be able to receive notifications about important events and updates related to my business, so that I can stay informed and take necessary actions.

Veterinarian:
1. As a veterinarian, I want to be able to access and update pet health records, including vaccination history and medical notes, so that I can provide accurate and timely care to my patients.
2. As a veterinarian, I want to be able to schedule and manage appointments with pet owners through the PetCarePlus app, so that I can efficiently manage my time and provide care to as many pets as possible.
3. As a veterinarian, I want to be able to communicate with pet owners through the PetCarePlus app, so that I can answer their questions, provide updates on their pet's health, and build trust with my clients.

Product:
1. As a product team member, I want to be able to manage and update the inventory of pet care products and services offered by our Pet Care business, so that our customers can easily find and purchase what they need.
2. As a product team member, I want to be able to track and analyze sales data for our products and services, so that I can identify trends and make informed decisions about our offerings.
3. As a product team member, I want to be able to receive and respond to customer feedback and reviews, so that I can continuously improve our products and services based on customer needs.

Customer Support:
1. As a customer support representative, I want to be able to access and manage customer accounts, so that I can assist them with any issues or questions they may have.
2. As a customer support representative, I want to be able to communicate with customers through the PetCarePlus app, so that I can provide timely and efficient support.
3. As a customer support representative, I want to be able to escalate and track customer issues to the appropriate team members, so that we can resolve problems quickly and maintain customer satisfaction.

Guest:
1. As a guest, I want to be able to browse and search for Pet Care businesses on the PetCarePlus platform, so that I can find the best care for my pet.
2. As a guest, I want to be able to view the profiles, services, and products offered by Pet Care businesses, so that I can make an informed decision about which business to choose.
3. As a guest, I want to be able to create an account and become a customer of a Pet Care business, so that I can access the full range of features and benefits offered by the PetCarePlus app.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
