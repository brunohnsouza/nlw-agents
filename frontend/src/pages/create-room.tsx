import { useQuery } from "@tanstack/react-query";

type GetRoomsAPIResponse = Array<{
    id: string;
    name: string;
}>

export function CreateRoom() {
    const { isLoading } = useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3333/rooms');

            if (!response.ok) {
                throw new Error('Failed to fetch rooms');
            }

            const result: GetRoomsAPIResponse = await response.json();

            return result;
        }
    })

    return (
        <div>
            {isLoading && <p>Loading...</p>}
        </div>
    );
}