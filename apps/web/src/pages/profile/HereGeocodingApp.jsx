/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from '@chakra-ui/react';
import MapWithCoordinates from './mapWithCoordinates';
import { TbMapSearch } from 'react-icons/tb';

const HereGeocodingApp = ({ setUserAddress, value }) => {
  const [userPosition, setUserPosition] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const apikey = 'q2eLAxpU5cGor4pcibhkDNzrsvJXJWzVw2bNQvljwuk';

  const handleMarkerDragEnd = (newPosition) => {
    setUserPosition(newPosition);
  };

  const handleMarkerClick = async (position) => {
    const { lat, lng } = position;
    setUserAddress({ lat: lat, lng: lng });
    // setUserLocation({ lat: lat, lng: lng });
  };

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
            value,
          )}&apiKey=${apikey}`,
        );

        if (response.data.items.length > 0) {
          const coordinates = response.data.items[0].position;
          setUserPosition({ lat: coordinates.lat, lng: coordinates.lng });
          setUserAddress({ lat: coordinates.lat, lng: coordinates.lng });
        } else {
          console.log(`No results found for ${value}`);
        }
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
      }
    };

    if (value) {
      getCoordinates();
    }
  }, [value]);

  return (
    <Flex direction={'column'}>
      <Flex w={'full'} justify={'end'}>
        <Button
          onClick={onOpen}
          variant={'unstyled'}
          isDisabled={value ? false : true}
          fontSize={'12px'}
          w={'fit-content'}
          p={'3px 12px'}
          size={'xm'}
          borderRadius={'20px'}
          fontWeight={400}
          border={'1px solid'}
          borderColor={'gray'}
          display={'flex'}
          gap={1}
        >
          Sesuaikan Titik
          <TbMapSearch />
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection={'column'} gap={1}>
            <Flex
              p={'10px 15px'}
              bgColor={'white'}
              position={'absolute'}
              zIndex={10}
              top={'50px'}
              left={'35px'}
              w={'85%'}
              direction={'column'}
            >
              <Text fontSize={'12px'} color={'gray'}>Alamat kamu</Text>
              <Text>{value}</Text>
            </Flex>
            <MapWithCoordinates
              apikey={apikey}
              userPosition={userPosition}
              onMarkerDragEnd={handleMarkerDragEnd}
              onMarkerClick={handleMarkerClick}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button bgColor="colors.primary" color={'white'} onClick={onClose}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default HereGeocodingApp;
