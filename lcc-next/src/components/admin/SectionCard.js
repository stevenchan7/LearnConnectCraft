import { Card, CardBody, Button, Link, ButtonGroup } from '@chakra-ui/react';
import DeleteButtonDialog from '../../components/admin/DeleteButtonDialog';
import { deleteSectionByID } from '../../utils/section.util';
import { useToken } from '../../app/hooks/useToken';

export default function SectionCard({ section, setSectionData, courseId, index }) {
	const handleDeleteButton = async () => {
		try {
			await deleteSectionByID(section.id);
			setSectionData();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Card direction={'row'} className='items-center'>
			<CardBody>
				<p className='font-semibold'>
					Section {index + 1}: {section.title}
				</p>
			</CardBody>
			<ButtonGroup className='me-4'>
				<Link href={`/admin/course/${courseId}/section/${section.id}`}>
					<Button colorScheme='purple'>Edit</Button>
				</Link>
				<DeleteButtonDialog handleDeleteButton={handleDeleteButton} />
			</ButtonGroup>
		</Card>
	);
}
