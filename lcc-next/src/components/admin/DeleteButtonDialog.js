import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure, Button } from '@chakra-ui/react';
import { useRef } from 'react';

export default function DeleteButtonDialog({ handleDeleteButton }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();

	const handleDeleteButtonOnClick = () => {
		handleDeleteButton();
		onClose();
	};

	return (
		<>
			<Button colorScheme='red' onClick={onOpen}>
				Delete
			</Button>

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Content
						</AlertDialogHeader>

						<AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme='red' onClick={handleDeleteButtonOnClick} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
